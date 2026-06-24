import { createFileRoute } from "@tanstack/react-router";
import { COMPANY, COMPANY_ADDRESS_ONELINE, CompanyInfoBlock } from "@/components/CompanyInfo";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions, Pondok Peptides" },
      { name: "description", content: "The terms governing your use of pondokpeptides.com and purchases from Oxford Research Syndicate Ltd." },
      { property: "og:title", content: "Terms & Conditions, Pondok Peptides" },
      { property: "og:description", content: "Terms governing use of pondokpeptides.com." },
      { property: "og:url", content: "https://pondokpeptides.com/terms-and-conditions" },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/terms-and-conditions" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="container-x py-16 md:py-20 max-w-3xl">
      <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Legal</p>
      <h1 className="font-display text-4xl md:text-5xl text-ink mb-6">Terms &amp; <span className="italic text-primary">Conditions</span></h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long" })}</p>

      <div className="space-y-8 text-foreground/85 leading-relaxed text-[15px]">
        <section>
          <h2 className="font-display text-2xl text-ink mb-3">1. About us</h2>
          <p>This website (pondokpeptides.com) is operated by <strong>{COMPANY.legalName}</strong> (trading as Pondok Peptides), a company registered in England &amp; Wales (Company No. {COMPANY.companyNumber}), registered address {COMPANY_ADDRESS_ONELINE}. {COMPANY.legalName} is the merchant of record for all orders and operates the shared checkout at checkout.oxfordresearchsyndicate.com.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">2. Research use only</h2>
          <p>All products sold on this site are supplied strictly for <strong>in-vitro laboratory research purposes only</strong>. They are not intended, and must not be used, for human or veterinary consumption, diagnosis, treatment, cure or prevention of any disease, or for use in food, drugs, cosmetics or household products. By placing an order you confirm you are a qualified researcher or institution and that you accept full responsibility for the lawful handling and use of the products.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">3. Eligibility</h2>
          <p>You must be at least 18 years old and have legal capacity to purchase. You are responsible for ensuring purchase and use of our products is lawful in your jurisdiction.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">4. Orders &amp; pricing</h2>
          <p>Placing an order is an offer to buy, subject to our acceptance. We reserve the right to refuse or cancel any order. Prices are shown in GBP. {COMPANY.legalName} is currently <strong>not VAT registered</strong>; no VAT is charged or shown on invoices. We may correct pricing errors prior to dispatch.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">5. Payment</h2>
          <p>Payment is taken at checkout via our secure payment processors. Title to the goods passes on full payment and dispatch.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">6. Delivery</h2>
          <p>See our <a className="text-primary hover:underline" href="/shipping-policy">Shipping Policy</a> for dispatch times, carriers and delivery terms.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">7. Returns &amp; refunds</h2>
          <p>See our <a className="text-primary hover:underline" href="/returns-policy">Returns Policy</a>. Due to the nature of laboratory research compounds, returns are restricted.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">8. Liability</h2>
          <p>To the maximum extent permitted by law, our liability for any product is limited to the price paid for it. We do not exclude liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded under English law.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">9. Intellectual property</h2>
          <p>All site content, branding, photography and copy are owned by {COMPANY.legalName} or licensed to it. You may not reproduce, copy or republish content without written permission.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">10. Governing law</h2>
          <p>These terms are governed by the laws of England &amp; Wales, and the courts of England &amp; Wales have exclusive jurisdiction over any dispute.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">11. Contact</h2>
          <p>Email: <a className="text-primary hover:underline" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> · Phone: <a className="text-primary hover:underline" href={`tel:${COMPANY.phone.replace(/\s+/g, "")}`}>{COMPANY.phone}</a></p>
          <div className="mt-4 bg-mist border border-border p-5">
            <CompanyInfoBlock />
          </div>
        </section>
      </div>
    </div>
  );
}
