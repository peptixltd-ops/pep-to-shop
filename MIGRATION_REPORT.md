# Pondok Peptides Medusa migration report

Draft only. Do not merge. Production DNS, Shopify, and the Lovable site on `main` are unchanged.

## What matches

The Next.js storefront is a direct port of this repo's Lovable routes, components, and Tailwind tokens (Syne, Inter, DM Mono, sage primary, mist background). It is not a redesign and it does not use Oxford Research Peptides catalogue copy.

Viewport screenshots against https://www.pondokpeptides.com at 375, 768, and 1440 are in `artifacts/comparisons/`. Pixelmatch threshold 0.1. Live is on the left, local is on the right.

| Width | Pages at 0.00% | Notes |
| --- | --- | --- |
| 375, 768, 1440 | home, shop, product (retatrutide), about, contact, faqs, privacy, terms, cookies, shipping, disclaimer, empty cart drawer | First viewport only |

Full-page home at 1440 is the same height on both sides (5845px) and differs by **0.18%**. That difference is below the first viewport, consistent with the review carousel advancing on one side during capture. There is no age gate in the Lovable source, and none appeared in these captures. The cookie policy describes a banner; the Lovable components do not render one, and the live pages captured here did not show one either.

Checkout is a new Medusa page using the same colours and type. It is not Shopify's hosted checkout, so it was not pixel-compared. A sandbox order completed locally: bacteriostatic water £6.00, Royal Mail Tracked 24 £4.95, total £10.95, phone stored as +44. A request without a phone number is rejected.

## What does not match yet

- Shopify Admin data is not imported. There is no admin token in this environment. The public catalogue (19 Pondok products) is seeded so the shop can run.
- Wallid and NiftiPay do not call a payment network. The sandbox provider is the working checkout path.
- Email is an outbox. Nothing is delivered.
- Historical Shopify order numbers are preserved on the import plan (`shopify_order_name`, `shopify_order_number`). Medusa's own `display_id` is still Medusa's sequence for new orders.
- Homepage FAQ says orders before 3pm and next-day tracked UK delivery. The shipping policy says dispatch before 14:00, Royal Mail Tracked 24, £4.95, free over £75. The visible FAQ text is unchanged. Checkout uses the shipping-policy figures until the Shopify shipping import is reviewed.
- Newsletter signup still shows the 20% code on screen. It does not email anyone. The Medusa promotion for that code is not created yet.
- A few Lovable asset binaries (ORS logo and email icons) are not files in git. They were downloaded from the live site into `apps/storefront/public/media` so the footer logo resolves.

## Health and therapeutic claims

Copy was not rewritten. Disclaimers that say products are not for therapeutic use were left as written and are not listed as claims. The following passages are affirmative or easy to read as personal, clinical, or physiological claims:

1. Home, review attributed to Emma L.: "As a personal-use buyer I appreciate how transparent the batch testing is."
2. Home, review attributed to Liam C.: "Whether it's for the lab bench or personal research interest, the quality and turnaround are unmatched."
3. Home FAQ and `/faqs`, bulk orders: "Yes, we offer bulk purchasing for researchers, clinics and laboratories."
4. `src/data/blog.ts`, retatrutide guide: "GLP-1 receptor agonism slows gastric emptying and modulates appetite-related signalling. GIP receptor agonism contributes additive metabolic effects observed in dual-agonist research. Glucagon receptor agonism, the third leg, recruits an additional energy-expenditure pathway by influencing hepatic glucose handling and lipid metabolism."
5. `src/data/blog.ts`, BPC-157 guide: "with literature spanning tendon, ligament, muscle, gastrointestinal and vascular models."
6. Tesamorelin product description from the public catalogue: "Tesamorelin is a research-grade growth hormone-releasing hormone (GHRH) analog studied in metabolic and endocrine pathways."

Product descriptions otherwise describe in-vitro receptor work and end with a not-for-human-use line. Reconstitution answers that say "inject the diluent" are about adding liquid to a vial, not about administering the peptide.

## Environment variable names

Backend: `STORE_CORS`, `ADMIN_CORS`, `AUTH_CORS`, `REDIS_URL`, `JWT_SECRET`, `COOKIE_SECRET`, `DATABASE_URL`, `EMAIL_OUTBOX`, `EMAIL_FROM`, `EMAIL_FROM_NAME`, `EMAIL_TRANSPORT`, `SMTP_URL`, `MEDUSA_ADMIN_EMAIL`, `MEDUSA_ADMIN_PASSWORD`, `MEDUSA_DISABLE_ADMIN`, `SHOPIFY_ADMIN_TOKEN`, `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_ADMIN_API_VERSION`, `SHOPIFY_VENDOR`, `SHOPIFY_SALES_CHANNEL_ID`, `SHOPIFY_SALES_CHANNEL_NAME`, `WALLID_API_KEY`, `WALLID_API_BASE`, `WALLID_WEBHOOK_SECRET`, `WALLID_MERCHANT_ID`, `NIFTIPAY_API_KEY`, `NIFTIPAY_API_BASE`, `NIFTIPAY_WEBHOOK_SECRET`, `NIFTIPAY_MERCHANT_ID`.

Storefront: `MEDUSA_BACKEND_URL`, `MEDUSA_PUBLISHABLE_KEY`, `MEDUSA_REGION_ID`, `NEXT_PUBLIC_MEDUSA_BACKEND_URL`, `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`, `NEXT_PUBLIC_MEDUSA_REGION_ID`, `NEXT_PUBLIC_STAGING`, `NEXT_PUBLIC_SITE_URL`.

## What we need next

- Shopify Admin token, read-only, for `cqdyni-4v.myshopify.com`. Scopes: `read_products`, `read_inventory`, `read_customers`, `read_orders`, `read_all_orders`, `read_discounts`, `read_shipping`. Confirm the Pondok sales channel id if products are shared with other storefronts. `SHOPIFY_VENDOR=Pondok Peptides` is the default filter.
- A decision on the six passages above before any copy edit.
- Confirmation of the shipping rate (policy £4.95 / free over £75 versus the homepage FAQ wording) and whether VAT is included.
- Wallid pay-by-bank API docs plus sandbox merchant id, API base, key, and webhook secret.
- NiftiPay card API docs plus sandbox merchant id, API base, key, and webhook secret.
- SMTP (or the provider you want) for `info@pondokpeptides.com`, and a named person to approve any one-customer password-reset send. Import will not email the customer list.
- VPS host for Medusa and the Vercel project for the storefront. DNS stays on the Lovable site until you cut over.
