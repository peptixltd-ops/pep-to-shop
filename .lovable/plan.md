# Email Capture Popup — 20% Off Discount

## Overview
A first-time-visitor popup that captures an email in exchange for a unique 20% discount code. Shows after 8 seconds, re-prompts every 7 days until they subscribe, and sends the code via branded email.

## User Flow

```text
Visitor lands → 8s timer → Popup slides in
   ↓
Enters email → Submit
   ↓
Server: validate → check suppression → generate unique Shopify code
   ↓
Save subscriber → send branded email with code → show success state in popup
   ↓
Visitor copies code from popup OR email → applies at checkout
```

## Components to Build

### 1. Database (Lovable Cloud)
New table `newsletter_subscribers`:
- `email` (unique), `discount_code`, `source` (popup), `subscribed_at`, `code_used_at` (nullable), `ip_hash`
- RLS: service role only (no anon/authenticated grants — writes go through server route)
- Checks `suppressed_emails` before insert to respect unsubscribes

### 2. Shopify Discount Setup (one-time, manual)
Create a **price rule** in Shopify: `WELCOME20-PARENT`, 20% off entire order, once per customer, 30-day expiry from issue. Each subscriber gets a unique code (e.g. `WELCOME20-A7F3K9`) attached to this parent rule via the Shopify Admin API.

### 3. Server Route: `POST /api/public/newsletter-subscribe`
- Zod validation (email, honeypot field)
- Rate limit by IP hash (basic in-memory guard)
- Reject if already in `suppressed_emails` or `newsletter_subscribers`
- Generate 6-char random suffix → call Shopify Admin API to create discount code under parent price rule
- Insert subscriber row
- Enqueue branded email via existing `enqueue_email` RPC
- Return `{ success: true, code }` so popup can display it immediately

### 4. Email Template: `newsletter-welcome.tsx`
Branded React Email matching contact-enquiry style. Contents:
- Welcome + brand promise (HPLC ≥99%, COA on request)
- The unique code in a large mono box
- "Apply at checkout" CTA linking to `/shop`
- 30-day expiry notice
- Standard unsubscribe footer (auto-appended by dispatcher)

### 5. Popup Component: `NewsletterPopup.tsx`
- Mounts once from `__root.tsx`, client-only (`useEffect`)
- Reads `localStorage` key `pp_newsletter_prompt` — skips if dismissed <7 days ago or if already subscribed
- 8-second timer on first eligible page
- Design: centered modal, brand tokens (bg #FFFFFF, primary #486748, ink #061D2B), Syne heading, Inter body. Backdrop blur. Close (X) top-right + ESC key.
- States: `form` → `loading` → `success` (shows code with copy button) or `error`
- Honeypot hidden field for bot protection
- On success: sets `pp_newsletter_prompt = subscribed` (permanent skip)
- On dismiss: sets `pp_newsletter_prompt = <timestamp>` (7-day skip)

### 6. GA4 tracking
`newsletter_popup_view`, `newsletter_signup`, `newsletter_popup_dismiss` events via existing `analytics.ts` pattern.

## Copy (draft, no em-dashes)

**Headline:** Get 20% off your first order
**Sub:** Join the Pondok research list for launch alerts, batch drops, and one-time 20% off code delivered instantly.
**Button:** Send my code
**Success:** Your code is ready. Check your inbox too.
**Footnote:** For laboratory research use only. One code per address, valid 30 days.

## Technical Notes

- Shopify Admin API needs `write_discounts` scope. If the current session token lacks it, we prompt to reconnect Shopify before enabling issuance.
- Unique code generation is atomic per request (Shopify enforces uniqueness within a price rule).
- If Shopify code creation fails, the subscriber row is rolled back and the user sees an error — no orphan signups without codes.
- Popup does not block SSR/SEO — mounted client-only.

## Out of Scope (this iteration)
- Admin dashboard to view subscribers (CSV export via psql for now)
- A/B testing variants
- Exit-intent variant
- Sync to external ESP (Klaviyo, Mailchimp)

## Sequence
1. Create migration for `newsletter_subscribers` + grants + RLS
2. Create parent Shopify price rule (I'll do this via `shopify--create_price_rule` once you confirm scope)
3. Build email template + register in `TEMPLATES`
4. Build `/api/public/newsletter-subscribe` server route
5. Build `NewsletterPopup` component + mount in `__root.tsx`
6. Test end-to-end with a real email address
