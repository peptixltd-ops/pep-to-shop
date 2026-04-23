import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews — PeptiX" },
      { name: "description", content: "Read verified reviews from PeptiX customers across the UK." },
      { property: "og:title", content: "Customer Reviews — PeptiX" },
      { property: "og:description", content: "Verified reviews from thousands of PeptiX customers." },
    ],
  }),
  component: ReviewsPage,
});

const all = [
  { name: "Dr. Sarah M.", text: "Best UK supplier I've used. Consistent quality across batches and support responds in hours.", product: "Marine Collagen" },
  { name: "Alex P.", text: "Ordered the recovery stack. Arrived next day, beautifully packaged.", product: "Recovery Protein" },
  { name: "James K.", text: "Excellent quality and fast delivery. Will definitely reorder.", product: "Creatine Monohydrate" },
  { name: "Priya S.", text: "Magnesium glycinate has become part of my evening routine. Sleep noticeably better.", product: "Magnesium Glycinate" },
  { name: "Tom H.", text: "Electrolyte blend is the cleanest tasting one I've tried. No artificial sweetness.", product: "Electrolyte Blend" },
  { name: "Mia R.", text: "Customer service replied within an hour on a Saturday. Genuinely impressive.", product: "Vitamin D3+K2" },
  { name: "Daniel O.", text: "Packaging is premium without feeling wasteful. Quality from start to finish.", product: "Omega-3" },
  { name: "Sophie L.", text: "Ashwagandha helped me through a stressful work period. Subtle but real difference.", product: "Ashwagandha" },
  { name: "Marcus B.", text: "Reordered three times now. Consistent product, consistent delivery.", product: "Creatine Monohydrate" },
];

function ReviewsPage() {
  return (
    <div className="container-x py-16 md:py-20">
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Customer Reviews</p>
        <h1 className="font-display text-5xl md:text-6xl text-ink">Trusted By <span className="text-primary italic">Thousands</span></h1>
        <div className="mx-auto mt-4 h-px w-12 bg-primary" />
        <p className="mt-6 text-muted-foreground">Average rating <strong className="text-ink">4.9/5</strong> from 14,500+ verified buyers.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {all.map(r => (
          <div key={r.name + r.product} className="bg-mist p-7 border border-border">
            <p className="text-sm font-semibold text-ink uppercase tracking-wide">{r.name}</p>
            <div className="flex gap-0.5 my-2 text-primary">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3.5 fill-current" />)}
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-b border-border pb-3 mb-4">Verified Buyer · {r.product}</p>
            <p className="text-sm text-foreground/80 leading-relaxed">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
