import { Link } from "@tanstack/react-router";
import bottle from "@/assets/product-bottle.jpg";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to="/shop" className="group block">
      <div className="bg-mist aspect-square overflow-hidden">
        <img
          src={bottle}
          alt={product.name}
          loading="lazy"
          width={896}
          height={896}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="pt-5">
        <p className="text-[10px] uppercase tracking-[0.2em] text-primary mb-1.5">{product.category}</p>
        <h3 className="font-display text-lg text-ink">{product.name}</h3>
        <p className="text-sm text-muted-foreground mt-0.5">{product.tagline}</p>
        <p className="mt-3 text-base font-medium text-ink">£{product.price}</p>
      </div>
    </Link>
  );
}
