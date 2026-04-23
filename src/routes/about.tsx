import { createFileRoute } from "@tanstack/react-router";
import bottles from "@/assets/bottles-desk.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — PeptiX" },
      { name: "description", content: "PeptiX makes premium UK supplements built on purity, consistency and trust." },
      { property: "og:title", content: "About PeptiX" },
      { property: "og:description", content: "UK-made supplements built on purity, consistency and trust." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <section className="container-x py-16 md:py-24 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">About PeptiX</p>
        <h1 className="font-display text-5xl md:text-6xl text-ink max-w-3xl mx-auto leading-tight">Committed To Precision. Built On Trust.</h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">High-quality supplements supplied with consistency, control and uncompromising standards.</p>
      </section>
      <section className="grid lg:grid-cols-2">
        <img src={bottles} alt="PeptiX bottles" loading="lazy" width={1280} height={896} className="w-full h-full object-cover aspect-[4/3] lg:aspect-auto" />
        <div className="bg-mist p-10 lg:p-20 flex flex-col justify-center space-y-5 text-foreground/80">
          <h2 className="font-display text-3xl text-ink">Our Mission</h2>
          <p>PeptiX exists to make premium wellness supplements straightforward — clean formulations, honest labelling, fast delivery.</p>
          <p>We work directly with UK manufacturers operating under GMP standards. Every batch is independently tested, and every certificate is available on request.</p>
          <p>No marketing fluff. No oversized claims. Just dependable products that fit into the way you already train, recover and live.</p>
        </div>
      </section>
      <section className="container-x py-20 md:py-28">
        <h2 className="font-display text-3xl md:text-4xl text-ink text-center mb-14">Our Standards</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { t: "Sourcing", d: "Ingredients sourced from established suppliers with full traceability." },
            { t: "Manufacturing", d: "Produced in MHRA-registered UK facilities under GMP standards." },
            { t: "Testing", d: "Every batch independently tested for purity, potency and contaminants." },
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
