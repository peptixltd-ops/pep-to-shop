import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/returns-policy")({
  head: () => ({
    meta: [
      { title: "Returns Policy, Pondok Peptides" },
      { name: "description", content: "Our returns, replacement and refund policy for research peptides supplied by Prapen Group Ltd." },
      { property: "og:title", content: "Returns Policy, Pondok Peptides" },
      { property: "og:description", content: "Returns, replacements and refunds for research peptides." },
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
      <p className="text-sm text-muted-foreground mb-10">Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long" })}</p>

      <div className="space-y-8 text-foreground/85 leading-relaxed text-[15px]">
        <section>
          <h2 className="font-display text-2xl text-ink mb-3">1. Returns are restricted</h2>
          <p>Because our products are temperature-sensitive research compounds and require strict cold-chain storage, we cannot accept returns of opened, used or unsealed vials. This is for safety, integrity and traceability reasons.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">2. Damaged, defective or incorrect items</h2>
          <p>If your order arrives damaged, defective or incorrect, contact us within <strong>48 hours of delivery</strong> at <a className="text-primary hover:underline" href="mailto:info@pondokpeptides.com">info@pondokpeptides.com</a> with your order number, photos of the issue, and a brief description. We will arrange a replacement or refund at our discretion.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">3. Non-delivery</h2>
          <p>If tracking shows your order has not arrived, please contact us within 14 days of dispatch so we can investigate with the courier and resolve the issue promptly.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">4. Refunds</h2>
          <p>Approved refunds are issued to the original payment method within 5–10 working days of approval. Shipping charges are non-refundable except where the issue is our fault.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">5. Order cancellation</h2>
          <p>Orders can be cancelled before dispatch. Once an order has shipped, it cannot be cancelled.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">6. Statutory rights</h2>
          <p>Nothing in this policy affects your statutory rights under the Consumer Rights Act 2015 or other applicable UK law.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">7. Contact</h2>
          <p>Prapen Group Ltd, 131 Movers Lane, Barking, IG11 7UQ, United Kingdom. Email: <a className="text-primary hover:underline" href="mailto:info@pondokpeptides.com">info@pondokpeptides.com</a>.</p>
        </section>
      </div>
    </div>
  );
}
