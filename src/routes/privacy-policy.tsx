import { createFileRoute } from "@tanstack/react-router";
import { PolicyHeader } from "@/components/PolicyHeader";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy, Pondok Peptides" },
      { name: "description", content: "How Oxford Research Syndicate Ltd (trading as Pondok Peptides) collects, uses and protects your personal data under UK GDPR." },
      { property: "og:title", content: "Privacy Policy, Pondok Peptides" },
      { property: "og:description", content: "Our UK GDPR-compliant privacy practices." },
      { property: "og:url", content: "https://pondokpeptides.com/privacy-policy" },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/privacy-policy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="container-x py-16 md:py-20 max-w-3xl">
      <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Legal</p>
      <h1 className="font-display text-4xl md:text-5xl text-ink mb-6">Privacy <span className="italic text-primary">Policy</span></h1>

      <PolicyHeader />

      <div className="space-y-7 text-foreground/85 leading-relaxed text-[15px]">
        <section>
          <h2 id="controller" className="font-display text-2xl text-ink mb-2">1. Data Controller</h2>
          <p>Oxford Research Syndicate Ltd, 131A Movers Lane, Barking, IG11 7UQ, is the data controller for personal data collected via pondokpeptides.com.</p>
        </section>

        <section>
          <h2 id="data" className="font-display text-2xl text-ink mb-2">2. Data we collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Identity &amp; contact:</strong> name, billing/shipping address, email, phone.</li>
            <li><strong>Order data:</strong> items purchased, order value, payment confirmation token. We never see your card details — payment is processed by Shopify Payments / Stripe.</li>
            <li><strong>Technical:</strong> IP, browser, device, pages viewed, referrer.</li>
            <li><strong>Communications:</strong> emails and form submissions you send us.</li>
          </ul>
        </section>

        <section>
          <h2 id="bases" className="font-display text-2xl text-ink mb-2">3. Lawful bases</h2>
          <p>Contract (to process and dispatch your order), legal obligation (tax and records retention), legitimate interests (fraud prevention, service improvement, transactional email), and consent (marketing email, non-essential cookies).</p>
        </section>

        <section>
          <h2 id="use" className="font-display text-2xl text-ink mb-2">4. How we use your data</h2>
          <p>Fulfilling orders, customer service, fraud prevention, statutory record keeping (6 years), and with your consent, marketing email which you can unsubscribe from at any time.</p>
        </section>

        <section>
          <h2 id="sharing" className="font-display text-2xl text-ink mb-2">5. Sharing</h2>
          <p>Shopify Inc. (storefront and checkout), Royal Mail or chosen courier (delivery), Stripe / Shopify Payments (payment processing), Google Analytics and Google Ads (with consent), our email service provider, and HMRC or law enforcement where legally required. We do not sell personal data.</p>
        </section>

        <section>
          <h2 id="transfers" className="font-display text-2xl text-ink mb-2">6. International transfers</h2>
          <p>Some processors are based in the United States. Transfers rely on the UK International Data Transfer Addendum to the EU Standard Contractual Clauses.</p>
        </section>

        <section>
          <h2 id="retention" className="font-display text-2xl text-ink mb-2">7. Retention</h2>
          <p>Order records: 6 years (HMRC). Marketing data: until you unsubscribe. Support emails: 2 years.</p>
        </section>

        <section>
          <h2 id="rights" className="font-display text-2xl text-ink mb-2">8. Your rights</h2>
          <p>Access, rectification, erasure, restriction, portability, objection, withdraw consent, and the right to complain to the Information Commissioner's Office (ico.org.uk). Email info@pondokpeptides.com to exercise any right; we respond within 30 days.</p>
        </section>

        <section>
          <h2 id="cookies" className="font-display text-2xl text-ink mb-2">9. Cookies</h2>
          <p>Strictly necessary cookies (cart, checkout, security) are always on. Analytics and advertising cookies are loaded only with your consent via the cookie banner.</p>
        </section>

        <section>
          <h2 id="changes" className="font-display text-2xl text-ink mb-2">10. Changes</h2>
          <p>We will post any update here with a new "Last updated" date.</p>
        </section>
      </div>
    </div>
  );
}
