import { createFileRoute, Link } from "@tanstack/react-router";
import { PolicyHeader } from "@/components/PolicyHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cancellation-policy")({
  head: () => ({
    meta: [
      { title: "Cancellation Policy, Pondok Peptides" },
      { name: "description", content: "How to cancel an order placed with Oxford Research Syndicate Ltd, trading as Pondok Peptides." },
      { property: "og:title", content: "Cancellation Policy, Pondok Peptides" },
      { property: "og:description", content: "See our FAQ for complete order-cancellation information." },
      { property: "og:url", content: "https://pondokpeptides.com/cancellation-policy" },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/cancellation-policy" }],
  }),
  component: CancellationPage,
});

function CancellationPage() {
  return (
    <div className="container-x py-16 md:py-20 max-w-3xl">
      <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Legal</p>
      <h1 className="font-display text-4xl md:text-5xl text-ink mb-6">Cancellation <span className="italic text-primary">Policy</span></h1>

      <PolicyHeader />

      <div className="space-y-6 text-foreground/85 leading-relaxed text-[15px]">
        <p>Please refer to our Frequently Asked Questions (FAQ) page for complete cancellation information, including the cut-off time for cancelling before dispatch and how consumer cancellation rights apply once an order has shipped.</p>
        <p>Statutory cancellation rights for consumers are summarised in our <Link to="/terms-and-conditions" className="text-primary hover:underline">Terms &amp; Conditions</Link>.</p>
        <Button asChild className="mt-2"><Link to="/faqs">Visit the FAQ</Link></Button>
      </div>
    </div>
  );
}
