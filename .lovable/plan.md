You've sent ~11 distinct workstreams in one message. Some are code changes, several are audits/research, and a few are large content/architecture builds. Doing all of them in a single pass would take many hours and produce a sprawling diff that's hard to review. Here's how I'd phase it, with ship-now items first.

## Phase 1 — Quick code wins (ship today, ~30 min)

1. **Thank-you dedup** — Add `localStorage` key `pp_fired_conversion_{order_id}`. Skip `gtag('conversion')` and `gtag('purchase')` if already fired. Value/currency already pulled from URL params; will confirm Shopify pixel passes them.
2. **Mobile sticky Add-to-cart / Buy now** on `/product/$handle` — fixed bottom bar (`md:hidden`), shows truncated title, price, Add + Buy buttons, small "3rd-party tested" trust chip beside. Hides when the in-page Buy button is in view.
3. **Trust badge component** — build 4 SVG-style badges (Satisfaction Guarantee, Certified Product, Trusted, Secure Ordering) using brand green `#486748` + Syne, drop into homepage (replace/augment TrustStrip), product page below gallery, cart drawer footer, footer above "research-use only".

## Phase 2 — Bundles feature (~45 min, separate turn)

4. **Bundles** — new `src/data/bundles.ts` (Recovery / GLP-1 / Longevity), `/bundles` index route + `/bundles/$slug` detail, `BundleCard` shown on each member product page ("Frequently bundled — save X%"). One-click adds all variant IDs via `cartLinesAdd`. Discount applied via Shopify automatic discount or a stacked draft — needs your call: do you want me to **(a)** create a Shopify automatic discount (e.g. 10% off when all 3 SKUs in cart) via the Admin API, or **(b)** just visually show the saving and rely on a manual discount code at checkout? UK-Peptides uses (a).

## Phase 3 — Collection page upgrades (~45 min)

5. Upgrade `weight-loss-peptides`, `recovery-peptides`, `longevity-peptides`, `nootropics` with: SEO intro (200-300 words), TrustStrip, product grid (already there via CategoryPage), FAQ accordion + FAQPage schema, internal links to top blog posts, comparison table where relevant, bottom CTA.

## Phase 4 — Internal linking system (~30 min)

6. Add `RelatedProducts` + `RelatedGuides` blocks on every product page (driven by category + tag matching). Add product-link blocks at the bottom of every blog post. Add "Top products" + "Learn more" links to each category page. Already have `RelatedGuides.tsx` — will extend.

## Phase 5 — Blog content hub (content-heavy, ~60 min)

7. Restructure `src/data/blog.ts` into 4 hubs (Peptide Guides, Quality, Storage & Handling, Comparisons) with hub landing pages and cross-links to products. I won't write all the article bodies — I'll scaffold the structure + 1-2 pillar articles per hub. You'd brief me on the rest later.

## Phase 6 — Audits (delivered as written reports, not code)

8. **Product page SEO audit** — Retatrutide, Tirzepatide, Semaglutide, BPC-157, TB-500. Ranked issues list.
9. **PPC landing page audit** — same 3 priority pages, against Google Ads health/medical policy (this is high-risk: Google does NOT allow ads for unapproved peptides like retatrutide / tirzepatide / BPC-157 in most markets — I'll flag policy blockers).
10. **Trust architecture audit** — placement gaps across homepage / PDP / cart / footer.
11. **Checkout audit** — Shopify-hosted checkout, so most levers are in Shopify Admin (Shop Pay, express checkout, account optional, address autocomplete). I'll list what to toggle.

These audits are markdown reports I write into the chat, not code. Want them as `.md` files in `/mnt/documents/` too?

## Technical details

- Dedup uses `localStorage.setItem('pp_fired_conversion_' + orderId, '1')`; falls back to sessionStorage if localStorage blocked. Also dedupes the GTM `dataLayer.push`.
- Sticky CTA uses `IntersectionObserver` on the in-page Buy button; `position: fixed; bottom: 0` with safe-area-inset padding.
- Trust badges: inline SVG components in `src/components/TrustBadges.tsx`, sized 64-80px, brand green fills, Syne text. No raster images.
- Bundle pricing math: sum variants' prices, apply % off, show strikethrough.
- All FAQ blocks emit `application/ld+json` `FAQPage` via `head().scripts`.
- Product pages already have product schema in `product.$handle.tsx` — audit will verify.

## Decisions I need from you

1. **Bundles discount**: Shopify automatic discount via Admin API (a), or visual-only with manual code (b)?
2. **Audits format**: Inline chat reports, or `.md` files in documents?
3. **Phase order**: Run Phase 1 now and stop for your review, or push through 1-3 in one go?

Reply with answers (e.g. "1a, 2 inline, 3 push 1-3") and I'll start.