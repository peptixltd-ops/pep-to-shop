import { createFileRoute } from "@tanstack/react-router";
import { PolicyHeader } from "@/components/PolicyHeader";

export const Route = createFileRoute("/returns-policy")({
  head: () => ({
    meta: [
      { title: "Returns Policy, Pondok Peptides" },
      { name: "description", content: "14-day returns window for unopened, sealed laboratory research peptides. Oxford Research Syndicate Ltd, trading as Pondok Peptides." },
      { property: "og:title", content: "Returns Policy, Pondok Peptides" },
      { property: "og:description", content: "How to return an unopened research peptide order within 14 days." },
      { property: "og:url", content: "https://pondokpeptides.com/returns-policy" },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/returns-policy" }],
  }),
  component: ReturnsPage,
});

function ReturnsPage() {
  return (
    <div className="container-x py-16 md:py-20 max-w-3xl">
      <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Legal</p>
      <h1 className="font-display text-4xl md:text-5xl text-ink mb-6">Returns <span className="italic text-primary">Policy</span></h1>

      <PolicyHeader />

      <div className="space-y-7 text-foreground/85 leading-relaxed text-[15px]">
        <section>
          <h2 className="font-display text-2xl text-ink mb-2">1. Window</h2>
          <p>Consumer buyers have 14 calendar days from delivery to request a return under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">2. Condition</h2>
          <p>Items must be unopened, with all tamper seals intact, in original packaging and in resaleable condition. For health, safety and product-integrity reasons we cannot accept returns of opened vials.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">3. How to return</h2>
          <p>Email info@pondokpeptides.com with your order number and reason. We will send a return address. Buyer pays return postage unless the item is faulty or incorrect; we recommend a tracked service.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">4. Faulty, incorrect or damaged on arrival</h2>
          <p>Contact us within 14 days with photos of the item, label, batch number and packaging. We will arrange a free replacement or a full refund including original delivery cost.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">5. Refunds</h2>
          <p>Issued to the original payment method within 5–10 business days of us receiving and inspecting the returned item.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">6. Non-returnable</h2>
          <p>Bacteriostatic water once the seal is broken; any item showing signs of use, contamination or temperature abuse; any item returned outside the 14-day window.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">7. Statutory rights</h2>
          <p>This policy does not affect your statutory rights as a consumer in the United Kingdom.</p>
        </section>
      </div>
    </div>
  );
}
