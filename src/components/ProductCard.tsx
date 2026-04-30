import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import bottle from "@/assets/product-bottle.jpg";
import type { ShopifyProduct } from "@/lib/shopify";
import { formatPrice, getPrimaryProductImage } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const [adding, setAdding] = useState(false);

  const node = product.node;
  const image = getPrimaryProductImage(node);
  const variant = node.variants.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
    setAdding(true);
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    setAdding(false);
    toast.success("Added to cart", { description: node.title, position: "top-center" });
  };

  return (
    <Link to="/product/$handle" params={{ handle: node.handle }} className="group block">
      <div className="bg-mist aspect-square overflow-hidden">
        <img
          src={image?.url || bottle}
          alt={image?.altText || node.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="pt-5">
        <h3 className="font-display text-lg text-ink line-clamp-2">{node.title}</h3>
        <p className="mt-2 text-base font-medium text-ink">{formatPrice(price.amount, price.currencyCode)}</p>
        <button
          onClick={handleAdd}
          disabled={!variant || isLoading || adding}
          className="mt-3 w-full bg-primary text-primary-foreground px-4 py-2.5 text-xs uppercase tracking-wider hover:bg-primary/90 transition disabled:opacity-50 inline-flex items-center justify-center gap-2"
        >
          {adding ? <Loader2 className="size-3.5 animate-spin" /> : "Add to cart"}
        </button>
      </div>
    </Link>
  );
}
