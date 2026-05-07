import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { storefrontApiRequest, formatPrice, getPrimaryProductImage, type ShopifyProduct } from "@/lib/shopify";

const PRODUCT_BY_HANDLE_LITE = `
  query ProductLite($handle: String!) {
    product(handle: $handle) {
      id title handle
      priceRange { minVariantPrice { amount currencyCode } }
      images(first: 2) { edges { node { url altText } } }
    }
  }
`;

type LiteProduct = {
  id: string;
  title: string;
  handle: string;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: ShopifyProduct["node"]["images"];
};

export function RelatedProducts({ handles, heading = "Related products" }: { handles: string[]; heading?: string }) {
  const [items, setItems] = useState<LiteProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all(
      handles.map((h) =>
        storefrontApiRequest(PRODUCT_BY_HANDLE_LITE, { handle: h })
          .then((d) => d?.data?.product as LiteProduct | null)
          .catch(() => null),
      ),
    ).then((res) => {
      if (cancelled) return;
      setItems(res.filter((p): p is LiteProduct => !!p));
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [handles.join(",")]);

  if (handles.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="font-display text-xl text-ink mb-4">{heading}</h2>
      {loading ? (
        <div className="flex justify-center py-6"><Loader2 className="size-5 animate-spin text-primary" /></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((p) => {
            const img = getPrimaryProductImage(p as unknown as ShopifyProduct["node"]);
            const price = p.priceRange.minVariantPrice;
            return (
              <Link key={p.id} to="/product/$handle" params={{ handle: p.handle }} className="group block bg-background border border-border rounded-md overflow-hidden hover:border-primary transition">
                <div className="bg-mist aspect-square overflow-hidden">
                  {img && <img src={img.url} alt={img.altText || p.title} loading="lazy" className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" />}
                </div>
                <div className="p-3">
                  <h3 className="font-display text-sm text-ink line-clamp-2">{p.title}</h3>
                  <p className="mt-1 text-sm font-medium text-ink">{formatPrice(price.amount, price.currencyCode)}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
