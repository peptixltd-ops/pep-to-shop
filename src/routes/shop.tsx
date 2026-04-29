import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All — Pondok" },
      { name: "description", content: "Browse Pondok's full range of products." },
      { property: "og:title", content: "Shop All — Pondok" },
      { property: "og:description", content: "Premium products from Pondok." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { products, loading, error } = useShopifyProducts(50);

  return (
    <div className="container-x py-16 md:py-20">
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Our Products</p>
        <h1 className="font-display text-5xl md:text-6xl text-ink">Shop <span className="text-primary italic">All</span></h1>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Carefully selected products to support how you live, train and recover.</p>
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
          {products.map((p) => <ProductCard key={p.node.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
