import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { getShopifyProducts, type ShopifyProduct } from "@/lib/shopify";
import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";

const shopSearchSchema = z.object({
  q: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/shop")({
  validateSearch: zodValidator(shopSearchSchema),
  loader: async () => {
    const products = await getShopifyProducts(50);
    return { products };
  },
  head: () => ({
    meta: [
      { title: "Shop UK Research Peptides | Buy Retatrutide, BPC-157, TB-500 | Pondok Peptides" },
      { name: "description", content: "Browse the full Pondok Peptides range. Buy retatrutide, tirzepatide, BPC-157, TB-500, GHK-Cu and more. 3rd party tested, COAs per batch, fast UK delivery." },
      { property: "og:title", content: "Shop UK Research Peptides | Pondok Peptides" },
      { property: "og:description", content: "3rd party tested research peptides with COAs per batch. Fast UK delivery." },
      { property: "og:url", content: "https://pondokpeptides.com/shop" },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/shop" }],
  }),
  component: ShopPage,
});

const PRIORITY_ORDER = [
  "retatrutide", "tirzepatide", "ghk-cu", "mots-c",
  "bacteriostatic-water", "nad", "bpc-157-tb-500-mix", "ipamorelin",
  "selank", "semaglutide", "tesamorelin", "klow",
  "tb-500", "igf-lr3", "cagrilintide", "ss-31", "pt-141", "semax",
];

function ShopPage() {
  const { q } = Route.useSearch();
  const { products } = Route.useLoaderData();
  const navigate = useNavigate({ from: "/shop" });
  const [query, setQuery] = useState(q);

  useEffect(() => { setQuery(q); }, [q]);

  const term = q.trim().toLowerCase();
  const filtered = term
    ? products.filter((p: ShopifyProduct) =>
        p.node.title.toLowerCase().includes(term) ||
        p.node.handle.toLowerCase().includes(term) ||
        (p.node.description || "").toLowerCase().includes(term)
      )
    : products;

  const sortedProducts = [...filtered].sort((a, b) => {
    const ai = PRIORITY_ORDER.indexOf(a.node.handle);
    const bi = PRIORITY_ORDER.indexOf(b.node.handle);
    const aRank = ai === -1 ? Number.MAX_SAFE_INTEGER : ai;
    const bRank = bi === -1 ? Number.MAX_SAFE_INTEGER : bi;
    if (aRank !== bRank) return aRank - bRank;
    return a.node.title.localeCompare(b.node.title);
  });

  return (
    <div className="container-x py-16 md:py-20">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Our Products</p>
        <h1 className="font-display text-5xl md:text-6xl text-ink">Shop <span className="text-primary italic">All</span></h1>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">For research purpose only.</p>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); navigate({ search: { q: query.trim() } }); }}
        className="max-w-xl mx-auto mb-12 relative"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search peptides (e.g. Retatrutide, BPC-157)"
          className="w-full bg-background border border-border pl-11 pr-11 py-3 text-sm focus:outline-none focus:border-primary"
          aria-label="Search products"
        />
        {q && (
          <button
            type="button"
            onClick={() => { setQuery(""); navigate({ search: { q: "" } }); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-primary"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        )}
      </form>

      {sortedProducts.length === 0 && (
        <p className="text-center text-muted-foreground py-20">
          {term ? `No products found for "${q}".` : "No products found."}
        </p>
      )}
      {sortedProducts.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {sortedProducts.map((p) => <ProductCard key={p.node.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
