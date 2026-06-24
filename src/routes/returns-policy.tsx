import { createFileRoute } from "@tanstack/react-router";
import { COMPANY, CompanyInfoBlock } from "@/components/CompanyInfo";

export const Route = createFileRoute("/returns-policy")({
  head: () => ({
    meta: [
      { title: "Returns Policy, Pondok Peptides" },
      { name: "description", content: "Returns, replacement and refund policy for laboratory research peptides supplied by Oxford Research Syndicate Ltd." },
      { property: "og:title", content: "Returns Policy, Pondok Peptides" },
      { property: "og:description", content: "Returns, replacements and refunds for laboratory research peptides." },
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
      <p className="text-sm text-muted-foreground mb-10">Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long" })}</p>

      <div className="space-y-8 text-foreground/85 leading-relaxed text-[15px]">
        <section>
          <h2 className="font-display text-2xl text-ink mb-3">1. Operator</h2>
          <p>This returns policy is operated by <strong>{COMPANY.legalName}</strong> (Company No. {COMPANY.companyNumber}) for all orders placed on pondokpeptides.com and through the shared Oxford Research Syndicate checkout. The same policy applies whether you placed your order on the website or at checkout.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">2. Returns are restricted</h2>
          <p>Because our products are temperature-sensitive laboratory research compounds and require strict cold-chain storage, we cannot accept returns of opened, used or unsealed vials. This is for safety, integrity and traceability reasons.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">3. Damaged, defective or incorrect items</h2>
          <p>If your order arrives damaged, defective or incorrect, contact us within <strong>48 hours of delivery</strong> at <a className="text-primary hover:underline" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> with your order number, photos of the issue, and a brief description. We will arrange a replacement or refund at our discretion.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">4. Non-delivery</h2>
          <p>If tracking shows your order has not arrived, please contact us within 14 days of dispatch so we can investigate with the courier and resolve the issue promptly.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">5. Return address</h2>
          <p>Where a return is approved in writing by our customer-service team, items must be returned to: <strong>{COMPANY.legalName}, {COMPANY.addressLine1}, {COMPANY.addressLine2}, {COMPANY.postcode}, {COMPANY.country}</strong>. Do not send returns without first contacting us.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">6. Refunds</h2>
          <p>Approved refunds are issued to the original payment method within 5–10 working days of approval. Shipping charges are non-refundable except where the issue is our fault.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">7. Order cancellation</h2>
          <p>Orders can be cancelled before dispatch. Once an order has shipped, it cannot be cancelled.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">8. Statutory rights</h2>
          <p>Nothing in this policy affects your statutory rights under the Consumer Rights Act 2015 or other applicable UK law.</p>
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
