import * as React from 'react'
import { render } from 'react-email'
import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { TEMPLATES } from '@/lib/email-templates/registry'

const SITE_NAME = 'Pondok Peptides'
const SENDER_DOMAIN = 'notify.pondokpeptides.com'
const FROM_DOMAIN = 'pondokpeptides.com'
const TEMPLATE_NAME = 'newsletter-welcome'

const SHOPIFY_STORE = 'cqdyni-4v.myshopify.com'
const SHOPIFY_API_VERSION = '2025-07'
const PARENT_PRICE_RULE_ID = 1812859748693
const CODE_PREFIX = 'WELCOME20-'

const phoneRegex = /^[\+\d\s\-\(\)]{7,}$/

const schema = z.object({
  email: z.string().trim().toLowerCase().email().max(255),
  phone: z.string().trim().max(50).optional().refine(
    (v) => !v || phoneRegex.test(v),
    { message: 'Invalid phone number' }
  ),
  // Honeypot — must be empty.
  website: z.string().max(0).optional(),
})

function randomSuffix(len = 6) {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const bytes = new Uint8Array(len)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('')
}

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
}

async function hashIp(ip: string): Promise<string> {
  const data = new TextEncoder().encode(ip)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 32)
}

async function createShopifyDiscountCode(code: string, adminToken: string): Promise<boolean> {
  const url = `https://${SHOPIFY_STORE}/admin/api/${SHOPIFY_API_VERSION}/price_rules/${PARENT_PRICE_RULE_ID}/discount_codes.json`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': adminToken,
    },
    body: JSON.stringify({ discount_code: { code } }),
  })
  if (!res.ok) {
    const body = await res.text()
    console.error('shopify discount create failed', { status: res.status, body })
    return false
  }
  return true
}

export const Route = createFileRoute('/api/public/newsletter-subscribe')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        const shopifyAdminToken = process.env.SHOPIFY_ACCESS_TOKEN
        if (!supabaseUrl || !supabaseServiceKey || !shopifyAdminToken) {
          return Response.json({ error: 'Server configuration error' }, { status: 500 })
        }

        let body: unknown
        try {
          body = await request.json()
        } catch {
          return Response.json({ error: 'Invalid JSON' }, { status: 400 })
        }

        const parsed = schema.safeParse(body)
        if (!parsed.success) {
          return Response.json({ error: 'Invalid email or phone' }, { status: 400 })
        }
        const { email, phone } = parsed.data

        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        // Suppression check (honour unsubscribes / bounces)
        const { data: suppressed } = await supabase
          .from('suppressed_emails')
          .select('email')
          .eq('email', email)
          .maybeSingle()
        if (suppressed) {
          return Response.json({ error: 'This address cannot be subscribed.' }, { status: 400 })
        }

        // Already subscribed?
        const { data: existing } = await supabase
          .from('newsletter_subscribers')
          .select('discount_code')
          .eq('email', email)
          .maybeSingle()
        if (existing) {
          return Response.json({ error: 'This email is already subscribed. Check your inbox for your previous code.' }, { status: 409 })
        }

        // Generate a unique code and create it in Shopify
        let code = ''
        let created = false
        for (let attempt = 0; attempt < 4 && !created; attempt++) {
          code = `${CODE_PREFIX}${randomSuffix(6)}`
          created = await createShopifyDiscountCode(code, shopifyAdminToken)
        }
        if (!created) {
          return Response.json({ error: 'Could not issue discount code. Please try again shortly.' }, { status: 502 })
        }

        // IP for basic abuse forensics
        const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || ''
        const ipHash = ip ? await hashIp(ip) : null
        const userAgent = request.headers.get('user-agent')?.slice(0, 500) || null

        const { error: insertError } = await supabase.from('newsletter_subscribers').insert({
          email,
          phone: phone || null,
          discount_code: code,
          source: 'popup',
          ip_hash: ipHash,
          user_agent: userAgent,
        })
        if (insertError) {
          console.error('subscriber insert failed', insertError)
          return Response.json({ error: 'Could not save subscription.' }, { status: 500 })
        }

        // Render + enqueue welcome email
        const template = TEMPLATES[TEMPLATE_NAME]
        if (!template) {
          return Response.json({ error: 'Template misconfigured' }, { status: 500 })
        }
        const expiresOn = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', {
          day: 'numeric', month: 'long', year: 'numeric',
        })
        const templateData = { code, expiresOn }
        const element = React.createElement(template.component, templateData)
        const html = await render(element)
        const plainText = await render(element, { plainText: true })
        const subject = typeof template.subject === 'function' ? template.subject(templateData) : template.subject

        // Ensure unsubscribe token exists (required by dispatcher)
        const { data: existingToken } = await supabase
          .from('email_unsubscribe_tokens')
          .select('token')
          .eq('email', email)
          .maybeSingle()
        let unsubscribeToken = existingToken?.token
        if (!existingToken) {
          const newToken = generateToken()
          await supabase
            .from('email_unsubscribe_tokens')
            .upsert({ token: newToken, email }, { onConflict: 'email', ignoreDuplicates: true })
          const { data: stored } = await supabase
            .from('email_unsubscribe_tokens')
            .select('token')
            .eq('email', email)
            .maybeSingle()
          unsubscribeToken = stored?.token ?? newToken
        }

        const messageId = crypto.randomUUID()
        await supabase.from('email_send_log').insert({
          message_id: messageId,
          template_name: TEMPLATE_NAME,
          recipient_email: email,
          status: 'pending',
        })

        const { error: enqueueError } = await supabase.rpc('enqueue_email', {
          queue_name: 'transactional_emails',
          payload: {
            message_id: messageId,
            to: email,
            from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
            sender_domain: SENDER_DOMAIN,
            subject,
            html,
            text: plainText,
            purpose: 'transactional',
            label: TEMPLATE_NAME,
            idempotency_key: messageId,
            unsubscribe_token: unsubscribeToken,
            queued_at: new Date().toISOString(),
          },
        })
        if (enqueueError) {
          console.error('newsletter enqueue failed', enqueueError)
          // Subscription + code are still valid; caller shows the code inline.
        }

        return Response.json({ success: true, code })
      },
    },
  },
})
