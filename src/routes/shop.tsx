import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useState } from "react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All — PeptiX" },
      { name: "description", content: "Browse PeptiX's full range of premium recovery, performance and daily wellness supplements." },
      { property: "og:title", content: "Shop All — PeptiX" },
      { property: "og:description", content: "Premium recovery & performance supplements." },
    ],
  }),
  component: ShopPage,
});

const cats = ["All", "Recovery", "Performance", "Sleep", "Daily"] as const;

function ShopPage() {
  const [cat, setCat] = useState<typeof cats[number]>("All");
  const filtered = cat === "All" ? products : products.filter(p => p.category === cat);
  return (
    <div className="container-x py-16 md:py-20">
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Our Products</p>
        <h1 className="font-display text-5xl md:text-6xl text-ink">Shop <span className="text-primary italic">All</span></h1>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Carefully formulated supplements for recovery, performance and daily wellbeing.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {cats.map(c => (
          <button key={c} onClick={() => setCat(c)} className={`px-5 py-2.5 text-xs uppercase tracking-wider border transition ${cat === c ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border text-foreground/70 hover:border-primary"}`}>{c}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {filtered.map(p => <ProductCard key={p.slug} product={p} />)}
      </div>
    </div>
  );
}
