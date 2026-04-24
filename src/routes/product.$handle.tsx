import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import { useShopifyProduct } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$handle")({
  component: ProductPage,
});

function ProductPage() {
  const { handle } = Route.useParams();
  const { product, loading, error } = useShopifyProduct(handle);
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const [variantId, setVariantId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  if (loading) {
    return <div className="container-x py-32 flex justify-center"><Loader2 className="size-6 animate-spin text-primary" /></div>;
  }
  if (error || !product) {
    return (
      <div className="container-x py-32 text-center">
        <p className="text-muted-foreground mb-4">Product not found.</p>
        <Link to="/shop" className="text-primary underline">Back to shop</Link>
      </div>
    );
  }

  const variants = product.variants.edges.map((e) => e.node);
  const selectedVariant = variants.find((v) => v.id === variantId) || variants[0];
  const images = product.images.edges;

  const handleAdd = async () => {
    if (!selectedVariant) return;
    setAdding(true);
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    setAdding(false);
    toast.success("Added to cart", { description: product.title });
  };

  return (
    <div className="container-x py-12 md:py-16">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
        <ArrowLeft className="size-4" /> Back to shop
      </Link>
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="space-y-3">
          <div className="bg-mist aspect-square overflow-hidden">
            {images[0] && <img src={images[0].node.url} alt={images[0].node.altText || product.title} className="w-full h-full object-cover" />}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {images.slice(1, 5).map((img, i) => (
                <div key={i} className="bg-mist aspect-square overflow-hidden">
                  <img src={img.node.url} alt={img.node.altText || ""} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="font-display text-4xl md:text-5xl text-ink">{product.title}</h1>
          <p className="mt-4 text-2xl font-medium text-ink">
            {formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
          </p>
          <div className="mt-6 text-foreground/80 leading-relaxed whitespace-pre-line">{product.description}</div>

          {variants.length > 1 && (
            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Variant</p>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setVariantId(v.id)}
                    disabled={!v.availableForSale}
                    className={`px-4 py-2 text-sm border transition ${
                      selectedVariant?.id === v.id ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary"
                    } ${!v.availableForSale ? "opacity-40" : ""}`}
                  >
                    {v.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleAdd}
            disabled={!selectedVariant?.availableForSale || isLoading || adding}
            className="mt-10 w-full md:w-auto bg-primary text-primary-foreground px-10 py-4 text-sm uppercase tracking-wider hover:bg-primary/90 transition disabled:opacity-50 inline-flex items-center justify-center gap-2"
          >
            {adding ? <Loader2 className="size-4 animate-spin" /> : selectedVariant?.availableForSale ? "Add to cart" : "Sold out"}
          </button>
        </div>
      </div>
    </div>
  );
}
