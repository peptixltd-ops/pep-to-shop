import { createFileRoute } from "@tanstack/react-router";
import bottles from "@/assets/bottles-desk.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About, Pondok Peptides" },
      { name: "description", content: "Pondok Peptides makes premium UK peptides built on purity, consistency and trust." },
      { property: "og:title", content: "About Pondok Peptides" },
      { property: "og:description", content: "UK-made peptides built on purity, consistency and trust." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <section className="container-x py-16 md:py-24 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">About Pondok Peptides</p>
        <h1 className="font-display text-5xl md:text-6xl text-ink max-w-3xl mx-auto leading-tight">Committed To Precision. Built On Trust.</h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">High-quality peptides supplied with consistency, control and uncompromising standards.</p>
      </section>
      <section className="grid lg:grid-cols-2">
        <img src={bottles} alt="Pondok Peptides bottles" loading="lazy" width={1280} height={896} className="w-full h-full object-cover aspect-[4/3] lg:aspect-auto" />
        <div className="bg-mist p-10 lg:p-20 flex flex-col justify-center space-y-5 text-foreground/80">
          <h2 className="font-display text-3xl text-ink">Our Mission</h2>
          <p>Pondok Peptides exists to make premium peptides straightforward, clean formulations, honest labelling, fast delivery.</p>
          <p>We partner with suppliers who are world-renowned for working to the highest pharmaceutical and research standards. A Certificate of Analysis is provided with every batch, and every batch is independently third-party tested before it leaves the facility.</p>
          <p>Driven by a relentless focus on quality, purity and excellence, peptide pioneers and an industry leader, setting the benchmark others follow.</p>
        </div>
      </section>
      <section className="container-x py-20 md:py-28">
        <h2 className="font-display text-3xl md:text-4xl text-ink text-center mb-14">Our Standards</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { t: "Sourcing", d: "Ingredients sourced from established suppliers with full traceability from start to finish." },
            { t: "Manufacturing", d: "Produced in audited, world-class facilities operating to the highest pharmaceutical and research standards." },
            { t: "Testing", d: "Every single batch independently third-party tested for purity, potency and contaminants, ensuring the highest and best quality product on the market." },
          ].map(s => (
            <div key={s.t} className="border border-border p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">{s.t}</p>
              <p className="text-foreground/80 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
