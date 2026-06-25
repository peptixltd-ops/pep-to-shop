import { createFileRoute } from "@tanstack/react-router";
import { PolicyHeader } from "@/components/PolicyHeader";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer, Pondok Peptides" },
      { name: "description", content: "Research-use-only disclaimer for products supplied by Oxford Research Syndicate Ltd, trading as Pondok Peptides." },
      { property: "og:title", content: "Disclaimer, Pondok Peptides" },
      { property: "og:description", content: "Research-use-only notice and limitation of liability." },
      { property: "og:url", content: "https://pondokpeptides.com/disclaimer" },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/disclaimer" }],
  }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <div className="container-x py-16 md:py-20 max-w-3xl">
      <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Legal</p>
      <h1 className="font-display text-4xl md:text-5xl text-ink mb-6"><span className="italic text-primary">Disclaimer</span></h1>

      <PolicyHeader />

      <div className="space-y-7 text-foreground/85 leading-relaxed text-[15px]">
        <section>
          <h2 className="font-display text-2xl text-ink mb-2">General information</h2>
          <p>The information provided on this website is for general informational purposes only. It is offered in good faith but without warranty of any kind, express or implied.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">Research products</h2>
          <p>All peptide products sold through this website are supplied strictly for laboratory and scientific research purposes only. They are not intended for human consumption, veterinary use, therapeutic use, diagnostic use, cosmetic use, food use, or any other unauthorised application. Purchasers are responsible for ensuring products are handled only by suitably qualified professionals and in accordance with all applicable laws and regulations.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">No medical advice</h2>
          <p>Nothing contained on this website should be interpreted as medical advice, healthcare advice or treatment recommendations. If you require medical advice you must consult a qualified healthcare professional.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">No guarantees</h2>
          <p>While every effort is made to ensure accuracy, Oxford Research Syndicate Ltd makes no warranties or representations regarding the completeness, reliability or accuracy of the content on this website. Specifications, identifiers and analytical references are provided for laboratory documentation only.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">Limitation of liability</h2>
          <p>Oxford Research Syndicate Ltd shall not be liable for any misuse of products purchased through this website, nor for any direct, indirect, incidental or consequential loss arising from the use of the website or the products supplied, to the maximum extent permitted by law.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">Customer responsibility</h2>
          <p>Customers are responsible for ensuring compliance with all local, national and international laws and regulations before purchasing. Placing an order constitutes an acknowledgement that the products are intended solely for in-vitro laboratory research.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">External links</h2>
          <p>Where this website links to third-party websites, we have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">Contact</h2>
          <p><a className="text-primary hover:underline" href="mailto:info@pondokpeptides.com">info@pondokpeptides.com</a></p>
        </section>
      </div>
    </div>
  );
}
