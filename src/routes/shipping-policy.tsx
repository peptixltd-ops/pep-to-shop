import { createFileRoute } from "@tanstack/react-router";
import { COMPANY, CompanyInfoBlock } from "@/components/CompanyInfo";

export const Route = createFileRoute("/shipping-policy")({
  head: () => ({
    meta: [
      { title: "Shipping Policy, Pondok Peptides" },
      { name: "description", content: "UK shipping, dispatch times and delivery information for laboratory research peptide orders from Oxford Research Syndicate Ltd." },
      { property: "og:title", content: "Shipping Policy, Pondok Peptides" },
      { property: "og:description", content: "UK shipping, dispatch and delivery information." },
      { property: "og:url", content: "https://pondokpeptides.com/shipping-policy" },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/shipping-policy" }],
  }),
  component: ShippingPage,
});

function ShippingPage() {
  return (
    <div className="container-x py-16 md:py-20 max-w-3xl">
      <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Legal</p>
      <h1 className="font-display text-4xl md:text-5xl text-ink mb-6">Shipping <span className="italic text-primary">Policy</span></h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long" })}</p>

      <div className="space-y-8 text-foreground/85 leading-relaxed text-[15px]">
        <section>
          <h2 className="font-display text-2xl text-ink mb-3">1. Operator</h2>
          <p>Orders are dispatched from the United Kingdom by <strong>{COMPANY.legalName}</strong> (Company No. {COMPANY.companyNumber}).</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">2. Where we ship</h2>
          <p>We currently ship within the <strong>United Kingdom only</strong>. International shipping is not available at this time.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">3. Dispatch times</h2>
          <p>Orders placed before <strong>3pm Monday–Friday</strong> are typically dispatched the same working day. Orders placed after 3pm, at weekends or on UK bank holidays are dispatched on the next working day.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">4. Delivery service</h2>
          <p>Orders are sent via tracked next-working-day couriers (Royal Mail Tracked 24 or DPD). Tracking is emailed once your order has been dispatched. Delivery aims are not guaranteed and may be affected by carrier delays.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">5. Shipping costs</h2>
          <p>UK standard shipping is offered free of charge. Any optional upgrades are shown at checkout.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">6. Packaging</h2>
          <p>Orders are dispatched in discreet, secure packaging. Vials are protected to maintain integrity during transit. Where appropriate, insulated packaging is used for temperature-sensitive compounds.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">7. Failed or missing deliveries</h2>
          <p>If the carrier is unable to deliver, follow the instructions left or use the tracking link to rearrange. If your tracking shows as delivered but you have not received the parcel, contact us within 7 days so we can investigate.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">8. Incorrect address</h2>
          <p>Please check delivery details carefully before placing your order. We cannot be responsible for parcels delivered to an address entered incorrectly at checkout.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">9. Contact</h2>
          <p>Email: <a className="text-primary hover:underline" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> · Phone: <a className="text-primary hover:underline" href={`tel:${COMPANY.phone.replace(/\s+/g, "")}`}>{COMPANY.phone}</a></p>
          <div className="mt-4 bg-mist border border-border p-5">
            <CompanyInfoBlock />
          </div>
        </section>
      </div>
    </div>
  );
}
