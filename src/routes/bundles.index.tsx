import { createFileRoute, Link } from "@tanstack/react-router";
import { bundles } from "@/data/bundles";

export const Route = createFileRoute("/bundles/")({
  head: () => ({
    meta: [
      { title: "Research Peptide Bundles | Pondok Peptides" },
      { name: "description", content: "Curated research peptide stacks for in-vitro laboratory comparison studies. HPLC-verified purity with batch-specific Certificates of Analysis." },
      { property: "og:title", content: "Research Peptide Bundles | Pondok Peptides" },
      { property: "og:description", content: "Curated research peptide stacks for in-vitro laboratory comparison studies. HPLC-verified, COA on every batch." },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/bundles" }],
  }),
  component: BundlesIndex,
});

function BundlesIndex() {
  return (
    <div className="container-x py-14">
      <h1 className="font-display text-3xl md:text-4xl text-ink text-center">Research Stacks & Bundles</h1>
      <p className="text-center text-foreground/70 mt-3 max-w-2xl mx-auto">Curated combinations of complementary peptides, with a visual saving applied. Use the bundle code at checkout to redeem.</p>
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {bundles.map((b) => (
          <Link key={b.slug} to="/bundles/$slug" params={{ slug: b.slug }} className="block bg-mist border border-border rounded-md p-6 hover:border-primary transition">
            <p className="text-[10px] uppercase tracking-[0.2em] text-primary mb-2">Save {b.discountPercent}%</p>
            <h2 className="font-display text-xl text-ink">{b.title}</h2>
            <p className="text-xs text-muted-foreground mt-1">{b.tagline}</p>
            <p className="text-sm text-foreground/70 mt-3 line-clamp-3">{b.description}</p>
            <p className="text-xs text-primary mt-4">{b.productHandles.length} products →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
