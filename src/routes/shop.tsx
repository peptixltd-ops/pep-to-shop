import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All — Pondok Peptides" },
      { name: "description", content: "Browse Pondok Peptides's full range of products." },
      { property: "og:title", content: "Shop All — Pondok Peptides" },
      { property: "og:description", content: "Premium products from Pondok Peptides." },
    ],
  }),
  component: ShopPage,
});

// Best-seller priority order by product handle. Anything not listed
// falls to the end, sorted alphabetically by title.
const PRIORITY_ORDER = [
  // Row 1
  "retatrutide",
  "tirzepatide",
  "ghk-cu",
  "mots-c",
  // Row 2
  "bacteriostatic-water",
  "nad",
  "bpc-157-tb-500-mix",
  "ipamorelin",
  // Row 3
  "selank",
  "semaglutide",
  "tesamorelin",
  "klow",
  // Remaining
  "tb-500",
  "igf-lr3",
  "cagrilintide",
  "ss-31",
  "pt-141",
  "semax",
];

function ShopPage() {
  const { products, loading, error } = useShopifyProducts(50);

  const sortedProducts = [...products].sort((a, b) => {
    const ai = PRIORITY_ORDER.indexOf(a.node.handle);
    const bi = PRIORITY_ORDER.indexOf(b.node.handle);
    const aRank = ai === -1 ? Number.MAX_SAFE_INTEGER : ai;
    const bRank = bi === -1 ? Number.MAX_SAFE_INTEGER : bi;
    if (aRank !== bRank) return aRank - bRank;
    return a.node.title.localeCompare(b.node.title);
  });

  return (
    <div className="container-x py-16 md:py-20">
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Our Products</p>
        <h1 className="font-display text-5xl md:text-6xl text-ink">Shop <span className="text-primary italic">All</span></h1>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">For research purpose only.</p>
      </div>

      {loading && (
        <div className="flex justify-center py-20"><Loader2 className="size-6 animate-spin text-primary" /></div>
      )}
      {error && (
        <p className="text-center text-destructive py-20">Failed to load products: {error}</p>
      )}
      {!loading && !error && products.length === 0 && (
        <p className="text-center text-muted-foreground py-20">No products found.</p>
      )}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {sortedProducts.map((p) => <ProductCard key={p.node.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
