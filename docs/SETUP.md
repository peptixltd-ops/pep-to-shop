# Pondok Peptides on Medusa

Draft migration. Do not merge. `main` still runs the Lovable site.

## What runs where

- `apps/storefront` is the Next.js storefront. Deploy it on Vercel. It keeps the Lovable markup, Tailwind tokens, and copy.
- `apps/backend` is Medusa v2.22.1 with Postgres and Redis. Deploy it on a VPS.
- `docker-compose.yml` starts Postgres, Redis, the backend, and the storefront together.
- `migration/shopify` reads Shopify. It never writes to Shopify.

## Local backend

Requires Node 22.23 or newer, Postgres 16, and Redis 7.

```sh
cd apps/backend
cp .env.example .env
# fill JWT_SECRET, COOKIE_SECRET, and MEDUSA_ADMIN_PASSWORD
npm install
npx medusa db:migrate
npx medusa exec ./src/scripts/seed.ts
npx medusa develop
```

The seed writes the publishable key and region id to `apps/storefront/.env.local`. Admin: http://localhost:9000/app when `MEDUSA_DISABLE_ADMIN` is not `true`. Store API: http://localhost:9000

Seeded catalogue: the 19 public Pondok Peptides products (vendor `Pondok Peptides`) with their Shopify prices, SKUs, and image URLs. UK region, GBP, stock location Barking (131A Movers Lane, IG11 7UQ). Shipping is calculated: Royal Mail Tracked 24, £4.95, free over £75, UK only. Those figures come from the shipping policy and stay in `packages/config/shipping.mjs` until a reviewed Shopify shipping import replaces them.

## Local storefront

```sh
cd apps/storefront
npm install
npm run dev
```

http://localhost:3000

Sandbox checkout uses provider `pp_sandbox_sandbox` and test approval `last4` `4242`. It does not charge a card. Phone is required. The country-code list defaults to +44.

## Docker on a VPS

```sh
docker compose up --build
```

Then, inside the backend container, run `npx medusa exec ./src/scripts/seed.ts` once. Put real secrets in the host environment, not in the image.

## Shopify import

All scripts are GET-only. A missing token exits 2 and writes nothing to Shopify.

```sh
# plans only, no network
node migration/shopify/delta-sync.mjs --fixture

# live read, then a later re-run continues from the saved cursor
SHOPIFY_ADMIN_TOKEN=... node migration/shopify/delta-sync.mjs
```

Filter (env, documented in `.env.example`):

- `SHOPIFY_VENDOR` default `Pondok Peptides`
- `SHOPIFY_SALES_CHANNEL_ID` optional
- `SHOPIFY_SALES_CHANNEL_NAME` optional

Orders keep `shopify_order_name` (for example `#1042`) and `shopify_order_number` on the import plan. Mixed-vendor orders are flagged and not imported. Customers are imported without passwords and without email. One manual reset:

```sh
node migration/shopify/request-password-reset.mjs --email person@example.com
```

`--send` is ignored unless `EMAIL_TRANSPORT=smtp` and `SMTP_URL` are set, and even then delivery is still marked TODO until an SMTP client is wired. The importer never calls this script.

## Email

From address is `info@pondokpeptides.com` via `EMAIL_FROM` and `EMAIL_FROM_NAME`. Default transport is `log`: one JSON line per message in the backend outbox. Newsletter signup stores the address locally and returns the on-page code. It does not send mail.

## Payments

`pp_sandbox_sandbox` completes checkout in test mode. `pp_wallid_wallid` (pay by bank) and `pp_niftipay_niftipay` (card) are provider modules with TODOs where the provider HTTP contract is not in this repo. They refuse to authorize a payment, so a missing integration cannot mark an order paid.
