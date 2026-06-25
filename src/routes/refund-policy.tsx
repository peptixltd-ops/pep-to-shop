import { createFileRoute, Link } from "@tanstack/react-router";
import { PolicyHeader } from "@/components/PolicyHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy, Pondok Peptides" },
      { name: "description", content: "Refunds and returns information for orders placed with Oxford Research Syndicate Ltd, trading as Pondok Peptides." },
      { property: "og:title", content: "Refund Policy, Pondok Peptides" },
      { property: "og:description", content: "See our FAQ for full refund and return details." },
      { property: "og:url", content: "https://pondokpeptides.com/refund-policy" },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/refund-policy" }],
  }),
  component: RefundPage,
});

function RefundPage() {
  return (
    <div className="container-x py-16 md:py-20 max-w-3xl">
      <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Legal</p>
      <h1 className="font-display text-4xl md:text-5xl text-ink mb-6">Refund <span className="italic text-primary">Policy</span></h1>

      <PolicyHeader />

      <div className="space-y-6 text-foreground/85 leading-relaxed text-[15px]">
        <p>Please refer to our Frequently Asked Questions (FAQ) page for full information regarding refunds and returns, including the 14-day window for unopened items, faulty or incorrect goods, and how refunds are processed.</p>
        <p>For statutory and consumer-rights terms, see our <Link to="/returns-policy" className="text-primary hover:underline">Returns Policy</Link>.</p>
        <Button asChild className="mt-2"><Link to="/faqs">Visit the FAQ</Link></Button>
      </div>
    </div>
  );
}
