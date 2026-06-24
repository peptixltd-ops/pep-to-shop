import { createFileRoute } from "@tanstack/react-router";
import { PolicyHeader } from "@/components/PolicyHeader";

export const Route = createFileRoute("/shipping-policy")({
  head: () => ({
    meta: [
      { title: "Shipping Policy, Pondok Peptides" },
      { name: "description", content: "UK-only Royal Mail Tracked 24 dispatch. £4.95 flat, free over £75. Oxford Research Syndicate Ltd, trading as Pondok Peptides." },
      { property: "og:title", content: "Shipping Policy, Pondok Peptides" },
      { property: "og:description", content: "Royal Mail Tracked 24 dispatch within the UK." },
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

      <PolicyHeader />

      <div className="space-y-7 text-foreground/85 leading-relaxed text-[15px]">
        <section>
          <h2 className="font-display text-2xl text-ink mb-2">1. Where we ship</h2>
          <p>United Kingdom only at this time.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">2. Dispatch</h2>
          <p>Orders placed before 14:00 UK on a working day are dispatched the same day. Orders after 14:00 or at weekends ship the next working day.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">3. Service &amp; cost</h2>
          <p>Royal Mail Tracked 24, £4.95 flat, free on orders over £75. Estimated delivery 1–3 working days from dispatch.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">4. Tracking</h2>
          <p>A tracking link is emailed when the label is generated.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">5. Handling</h2>
          <p>Lyophilised peptides are shipped at ambient temperature with desiccant. Refrigerate on arrival per the product page.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">6. Failed delivery or wrong address</h2>
          <p>If Royal Mail returns the parcel due to an incorrect address provided at checkout, we will re-ship at the buyer's cost.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">7. Lost in transit</h2>
          <p>If tracking shows no movement for 7 working days, contact info@pondokpeptides.com and we will open a Royal Mail claim and re-ship or refund.</p>
        </section>
      </div>
    </div>
  );
}
