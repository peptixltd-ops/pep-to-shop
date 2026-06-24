
# GMC Compliance Remediation Plan

## ⚠️ Two conflicts I need you to resolve before I start

In the last few messages you asked me to:

1. **Change the footer address** to `11 Bethell Avenue, Ilford, Essex, IG1 4UX`
2. **Route the contact form to** `peptixltd@gmail.com`

But this brief (the master identity block) requires:

1. **Registered address:** `131A Movers Lane, Barking, IG11 7UQ`
2. **Email:** `info@pondokpeptides.com` (and the GMC report explicitly flags `peptixltd@gmail.com` as a critical issue to remove)

**Please confirm which wins.** My assumption, unless you tell me otherwise:

- Use **131A Movers Lane, Barking, IG11 7UQ** as the registered/legal address everywhere (footer, policies, checkout, GMC). If `11 Bethell Avenue` is a trading/correspondence address, tell me and I'll list it separately or drop it.
- Replace **every** `peptixltd@gmail.com` with **`info@pondokpeptides.com`**, including the contact form `mailto:` I just wired up. Gmail addresses cannot remain anywhere per the report.

I will proceed on those assumptions if you say "go".

---

## Master identity block (source of truth, used everywhere)

```
Oxford Research Syndicate Ltd
Company No. 17207898
131A Movers Lane, Barking, IG11 7UQ, United Kingdom
Email: info@pondokpeptides.com
Phone: 07457 404317
VAT: Not VAT registered
```

Plus a standard relationship disclosure paragraph used in About, Footer micro-copy, and all policies:

> Pondok Peptides is a storefront brand operated by Oxford Research Syndicate Ltd (Company No. 17207898), which also operates BuyRetaUK, UK Peptide Labs and Oxford Research Peptides. Orders placed through pondokpeptides.com are processed, fulfilled and supported by Oxford Research Syndicate Ltd, and checkout is handled on shared infrastructure at checkout.oxfordresearchsyndicate.com.

---

## Phase 1 — Identity & checkout trust (CRITICAL)

Files I'll touch:
- `src/components/SiteFooter.tsx` — replace address, add structured company block (line-by-line), add company number, phone, email, VAT line, relationship disclosure link.
- `src/routes/contact.tsx` — swap `mailto:` target to `info@pondokpeptides.com`, add company block, add phone.
- `src/routes/about.tsx` — add identity + relationship disclosure section.
- `src/routes/privacy-policy.tsx`, `returns-policy.tsx`, `shipping-policy.tsx`, `terms-and-conditions.tsx` — append identical company information block; remove any gmail / placeholder.
- New `src/routes/who-we-are.tsx` (or section in About) — relationship disclosure between Pondok / BuyRetaUK / UK Peptide Labs / Oxford Research Peptides / ORS Ltd, stating who owns, processes payments, fulfils, and operates checkout.

**Checkout policies (Shopify admin, not code):** I'll give you exact copy to paste into Shopify → Settings → Policies so the checkout policies match the site word-for-word. I cannot edit them from code on non-Plus Shopify.

## Phase 2 — Policy alignment

- Rewrite all 4 policies so each starts with the master identity block and ends with the same contact block.
- Remove every `[INSERT …]`, `[LINK]`, gmail address, and placeholder.
- Provide identical text for Shopify checkout policies (copy/paste).

## Phase 3 — Product compliance (research-use-only rewrite)

For each product in `src/data/products.ts` and the route copy under `src/routes/*-peptides.tsx` / category pages:

- Strip all consumer/health/dosage/injection/outcome wording.
- Reframe as **"For Laboratory Research Use Only — Not for human or veterinary use"** at top of every product card and PDP.
- Add per-product: purity %, test method (HPLC/MS), COA placeholder link, batch/lot field.
- Rewrite descriptions to neutral lab-material language (e.g. "Lyophilised peptide intended for in-vitro laboratory investigation of [pathway]").
- Update product titles to drop "Buy" framing.
- Update image alt text and structured data (`Product` JSON-LD `description`).

I will list every product I touched in the final summary. I will NOT remove products — that's your decision.

## Phase 4 — SEO & feed compliance

- Rewrite `head()` meta titles/descriptions in every product/category route to laboratory-research framing, append "Research Use Only".
- Update `src/lib/shopify.ts` product title transformer / display layer if needed to suffix "(Research Use Only)" consistently in product cards.
- Update `src/routes/sitemap[.]xml.tsx` — no URL changes unless you want me to drop the consumer category routes; I'll list them for your call.
- Remove "Buy [X]" patterns from meta and H1s.

## Phase 5 — Trust signals

- Footer: structured company block, support email, phone, hours, company number, link to About + all policies.
- Add a "Customer Service" section to About or new `/customer-service` route with hours, phone, email, response time.
- Verify all policy links in footer resolve (no 404s).

## Phase 6 — GMC configuration (you do in GMC UI, I provide checklist)

I'll deliver an exact checklist: return URL → `/returns-policy`, customer service URL → `/contact`, business name = Oxford Research Syndicate Ltd, address, phone, email, target countries (you tell me which to keep: default UK only).

## Phase 7 — Promotional elements to disable during review

I will remove/hide from code:
- `src/components/PressMarquee.tsx` rendering (if it shows "selling fast" / urgency).
- `src/components/MobileStickyCTA.tsx` urgency copy.
- `src/components/TrustStrip.tsx` — strip "free shipping" / sale framing (keep neutral trust like "UK dispatch", "COA on request").
- `src/components/BundleCard.tsx` / `src/routes/bundles.*` — hide bundles route from nav + sitemap (keep code, gated behind a feature flag so you can re-enable post-appeal).
- Any "Sale", countdown, discount-code banners in `SiteHeader.tsx` / index hero.
- Cart drawer: remove discount code prompts only if present.

I will NOT touch checkout flow, cart store, Shopify API wiring, or payment logic.

## Phase 8 — Site-wide search & replace audit

I'll grep the whole repo for:
`Prapen`, `gmail.com`, `peptixltd`, `[INSERT`, `[LINK]`, `Movers Lane` (current), `Bethell`, `Oxford Research Syndicate` references in customer-facing copy, and produce a replacement map. Anything ambiguous I'll list for you instead of guessing.

---

## What I will NOT do without further confirmation

- Delete any products from `products.ts` or Shopify.
- Change checkout domain, cart store, or payment integration.
- Edit Shopify-hosted checkout policies (not possible from code — I'll give you paste-ready text).
- Touch GMC settings (no API access — checklist only).
- Change pricing or shipping rates.

---

## Execution order once you approve

1. Resolve the address + email conflict above.
2. Phase 1 + 2 + 8 in one batch (identity, policies, search/replace).
3. Phase 7 (disable promo elements).
4. Phase 3 + 4 (product + SEO rewrites) in a second batch — this is the largest single change.
5. Phase 5 trust signals + sitemap cleanup.
6. Deliver: GMC checklist, Shopify checkout-policy paste text, final compliance checklist, appeal-readiness summary.

---

## Decisions I need from you before I start

1. **Address:** Use `131A Movers Lane, Barking, IG11 7UQ` everywhere? (Or is Bethell Avenue a separate trading address to also list?)
2. **Email:** Replace every `peptixltd@gmail.com` with `info@pondokpeptides.com`, including the contact form? (Yes/No)
3. **Target countries for GMC:** UK only, or also EU/US?
4. **Bundles + sale routes:** OK to hide from nav/sitemap during appeal (code preserved)?
5. **Product removal:** Keep all products live and rewrite, or are there any you want removed before appeal?

Reply with the answers (a short "1. ORS address only, 2. yes, 3. UK only, 4. yes, 5. keep all" is enough) and I'll execute.
