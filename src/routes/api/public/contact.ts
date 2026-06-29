import * as React from 'react'
import { render } from 'react-email'
import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { TEMPLATES } from '@/lib/email-templates/registry'

const SITE_NAME = 'Pondok Peptides'
const SENDER_DOMAIN = 'notify.pondokpeptides.com'
const FROM_DOMAIN = 'pondokpeptides.com'
const TEMPLATE_NAME = 'contact-enquiry'

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  order: z.string().trim().max(100).optional().default(''),
  message: z.string().trim().min(5).max(4000),
  // Honeypot — bots fill hidden fields. Must be empty.
  website: z.string().max(0).optional(),
})

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
}

function redact(email: string) {
  const [l, d] = email.split('@')
  return `${l?.[0] ?? '*'}***@${d ?? '***'}`
}

export const Route = createFileRoute('/api/public/contact')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (!supabaseUrl || !supabaseServiceKey) {
          return Response.json({ error: 'Server configuration error' }, { status: 500 })
        }

        let body: unknown
        try {
          body = await request.json()
        } catch {
          return Response.json({ error: 'Invalid JSON' }, { status: 400 })
        }

        const parsed = contactSchema.safeParse(body)
        if (!parsed.success) {
          return Response.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 })
        }
        const data = parsed.data

        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        const template = TEMPLATES[TEMPLATE_NAME]
        if (!template || !template.to) {
          return Response.json({ error: 'Template misconfigured' }, { status: 500 })
        }

        const recipient = template.to
        const messageId = crypto.randomUUID()

        // Render
        const templateData = {
          name: data.name,
          email: data.email,
          order: data.order,
          message: data.message,
          submittedAt: new Date().toUTCString(),
        }
        const element = React.createElement(template.component, templateData)
        const html = await render(element)
        const plainText = await render(element, { plainText: true })
        const subject = typeof template.subject === 'function' ? template.subject(templateData) : template.subject

        // Ensure unsubscribe token exists for the recipient (required by dispatcher)
        const normalized = recipient.toLowerCase()
        const { data: existingToken } = await supabase
          .from('email_unsubscribe_tokens')
          .select('token, used_at')
          .eq('email', normalized)
          .maybeSingle()

        let unsubscribeToken = existingToken?.token
        if (!existingToken) {
          unsubscribeToken = generateToken()
          await supabase
            .from('email_unsubscribe_tokens')
            .upsert({ token: unsubscribeToken, email: normalized }, { onConflict: 'email', ignoreDuplicates: true })
          const { data: stored } = await supabase
            .from('email_unsubscribe_tokens')
            .select('token')
            .eq('email', normalized)
            .maybeSingle()
          unsubscribeToken = stored?.token ?? unsubscribeToken
        }

        await supabase.from('email_send_log').insert({
          message_id: messageId,
          template_name: TEMPLATE_NAME,
          recipient_email: recipient,
          status: 'pending',
        })

        const { error: enqueueError } = await supabase.rpc('enqueue_email', {
          queue_name: 'transactional_emails',
          payload: {
            message_id: messageId,
            to: recipient,
            from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
            reply_to: data.email,
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
          console.error('contact enqueue failed', { error: enqueueError, recipient: redact(recipient) })
          await supabase.from('email_send_log').insert({
            message_id: messageId,
            template_name: TEMPLATE_NAME,
            recipient_email: recipient,
            status: 'failed',
            error_message: 'Failed to enqueue contact email',
          })
          return Response.json({ error: 'Failed to send' }, { status: 500 })
        }

        return Response.json({ success: true })
      },
    },
  },
})
