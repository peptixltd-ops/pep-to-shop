import { createFileRoute } from "@tanstack/react-router";
import { PolicyHeader } from "@/components/PolicyHeader";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions, Pondok Peptides" },
      { name: "description", content: "Terms and conditions of sale for Oxford Research Syndicate Ltd, trading as Pondok Peptides. Research-use-only laboratory peptides." },
      { property: "og:title", content: "Terms & Conditions, Pondok Peptides" },
      { property: "og:description", content: "UK terms of sale for laboratory research peptides." },
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

      <PolicyHeader />

      <div className="space-y-7 text-foreground/85 leading-relaxed text-[15px]">
        <section>
          <h2 className="font-display text-2xl text-ink mb-2">1. These terms</h2>
          <p>These terms govern the sale of goods through pondokpeptides.com by Oxford Research Syndicate Ltd ("we", "us"). By placing an order you accept them.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">2. Research use only</h2>
          <p>All products are sold strictly for in-vitro laboratory research use. They are not medicines, food, cosmetics, supplements or veterinary products. They are not for human or animal consumption, injection, ingestion or topical use. By ordering you confirm you are a qualified researcher or research-procurement officer aged 18 or over and that the products will be used solely for laboratory research.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">3. Orders &amp; acceptance</h2>
          <p>Your order is an offer. A contract forms when we dispatch the goods and email you a shipping confirmation. We may decline or cancel any order at our discretion and refund in full.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">4. Price &amp; payment</h2>
          <p>Prices are in GBP. We are not VAT registered, so no VAT is charged. Payment is taken at checkout via Shopify Payments / Stripe.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">5. Delivery</h2>
          <p>See our Shipping Policy. Risk passes on delivery; title passes on full payment.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">6. Right to cancel</h2>
          <p>Where the buyer is a consumer, under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 you have 14 days from delivery to cancel an unopened, unused, sealed product. See our Returns Policy.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">7. Faulty or incorrect items</h2>
          <p>Contact us within 14 days of delivery with photos and batch number. We will replace, refund or credit.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">8. Liability</h2>
          <p>To the maximum extent permitted by law, our total liability for any order is limited to the price paid for that order. We do not exclude liability for death or personal injury caused by negligence, for fraud, or for any liability that cannot be excluded by law. We accept no liability for any use of the products outside in-vitro research.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">9. Force majeure</h2>
          <p>We are not liable for delays caused by events outside our reasonable control.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">10. Complaints &amp; ODR</h2>
          <p>Email info@pondokpeptides.com; we acknowledge within 2 working days and aim to resolve within 14 days. EU residents may also use the European Commission ODR platform at ec.europa.eu/consumers/odr.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">11. Governing law</h2>
          <p>English law applies. The courts of England and Wales have exclusive jurisdiction.</p>
        </section>
      </div>
    </div>
  );
}
