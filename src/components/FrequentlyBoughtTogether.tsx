import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { storefrontApiRequest, formatPrice, getPrimaryProductImage, type ShopifyProduct } from "@/lib/shopify";
import bottle from "@/assets/product-bottle.jpg";
import { getProductImageOverride } from "@/data/variantImages";

const BAC_WATER = "bacteriostatic-water";

const RELATED_GROUPS: Record<string, string[]> = {
  // GLP-1 / metabolic group
  "retatrutide": ["semaglutide", "tirzepatide", "cagrilintide", "mots-c", BAC_WATER],
  "semaglutide": ["retatrutide", "tirzepatide", "cagrilintide", "mots-c", BAC_WATER],
  "tirzepatide": ["retatrutide", "semaglutide", "cagrilintide", "mots-c", BAC_WATER],
  "cagrilintide": ["retatrutide", "semaglutide", "tirzepatide", "mots-c", BAC_WATER],
  "mots-c": ["retatrutide", "semaglutide", "tirzepatide", "cagrilintide", BAC_WATER],

  // Healing / repair combo
  "ghk-cu": ["tb-500", "bpc-157", BAC_WATER],
  "tb-500": ["ghk-cu", "bpc-157", BAC_WATER],
  "bpc-157": ["ghk-cu", "tb-500", BAC_WATER],

  // Mitochondrial / longevity
  "ss-31": ["nad", BAC_WATER],
  "nad": ["ss-31", BAC_WATER],

  // Nootropic pair
  "selank": ["semax", BAC_WATER],
  "semax": ["selank", BAC_WATER],

  // Bacteriostatic water pairs back with the most common reconstitution targets
  [BAC_WATER]: ["retatrutide", "semaglutide", "tirzepatide", "bpc-157"],
};

const PRODUCT_BY_HANDLE_LITE = `
  query GetProductLite($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      priceRange { minVariantPrice { amount currencyCode } }
      images(first: 5) { edges { node { url altText } } }
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

export function FrequentlyBoughtTogether({ handle }: { handle: string }) {
  const related = RELATED_GROUPS[handle] || [];
  const [items, setItems] = useState<LiteProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (related.length === 0) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    Promise.all(
      related.map((h) =>
        storefrontApiRequest(PRODUCT_BY_HANDLE_LITE, { handle: h })
          .then((d) => d?.data?.product as LiteProduct | null)
          .catch(() => null),
      ),
    ).then((results) => {
      if (cancelled) return;
      setItems(results.filter((p): p is LiteProduct => !!p));
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [handle, related.join(",")]);

  if (related.length === 0) return null;

  return (
    <section className="mt-16 max-w-5xl mx-auto">
      <h2 className="font-display text-2xl text-ink mb-2">Frequently Bought Together</h2>
      <p className="text-sm text-muted-foreground mb-6">Researchers often pair this peptide with the following.</p>
      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="size-5 animate-spin text-primary" />
        </div>
      ) : items.length === 0 ? (
        <p className="text-sm text-muted-foreground">No related products available.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {items.map((p) => {
            const overrideImage = getProductImageOverride(p.handle);
            const img = overrideImage ? null : getPrimaryProductImage(p as unknown as ShopifyProduct["node"]);
            const price = p.priceRange.minVariantPrice;
            return (
              <Link key={p.id} to="/product/$handle" params={{ handle: p.handle }} className="group block">
                <div className="bg-mist aspect-square overflow-hidden rounded-md">
                  <img
                    src={overrideImage || img?.url || bottle}
                    alt={overrideImage ? `${p.title} vial` : img?.altText || p.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="pt-3">
                  <h3 className="font-display text-sm text-ink line-clamp-2">{p.title}</h3>
                  <p className="mt-1 text-sm font-medium text-ink">
                    {formatPrice(price.amount, price.currencyCode)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
