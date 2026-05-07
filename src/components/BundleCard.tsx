import { useEffect, useState } from "react";
import { Loader2, Plus, Check } from "lucide-react";
import { storefrontApiRequest, formatPrice, getPrimaryProductImage, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { findBundlesForProduct, type Bundle } from "@/data/bundles";

// Single-product query (one call per bundle item) — keeps it simple and reuses an existing pattern.
const PRODUCT_BY_HANDLE_MIN = `
  query ProductByHandleMin($handle: String!) {
    product(handle: $handle) {
      id title description handle
      priceRange { minVariantPrice { amount currencyCode } }
      images(first: 3) { edges { node { url altText } } }
      variants(first: 5) {
        edges { node {
          id title sku
          price { amount currencyCode }
          availableForSale
          selectedOptions { name value }
        } }
      }
      options { name values }
    }
  }
`;

export function BundleCard({ bundle }: { bundle: Bundle }) {
  const [products, setProducts] = useState<ShopifyProduct["node"][]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all(
      bundle.productHandles.map((h) =>
        storefrontApiRequest(PRODUCT_BY_HANDLE_MIN, { handle: h }).then((r) => r?.data?.product).catch(() => null),
      ),
    ).then((res) => {
      if (cancelled) return;
      setProducts(res.filter(Boolean) as ShopifyProduct["node"][]);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [bundle.slug]);

  const subtotal = products.reduce(
    (s, p) => s + parseFloat(p.variants.edges[0]?.node.price.amount || "0"),
    0,
  );
  const currency = products[0]?.variants.edges[0]?.node.price.currencyCode || "GBP";
  const discounted = subtotal * (1 - bundle.discountPercent / 100);
  const allAvailable = products.length > 0 && products.every((p) => p.variants.edges[0]?.node.availableForSale);

  const handleAddAll = async () => {
    if (!allAvailable) return;
    setAdding(true);
    for (const p of products) {
      const v = p.variants.edges[0]?.node;
      if (!v) continue;
      await addItem({
        product: { node: p },
        variantId: v.id,
        variantTitle: v.title,
        price: v.price,
        quantity: 1,
        selectedOptions: v.selectedOptions || [],
      });
    }
    setAdding(false);
    toast.success(`${bundle.title} added to cart`, {
      description: `${products.length} items · save ${bundle.discountPercent}% with code BUNDLE${bundle.discountPercent}`,
      position: "top-center",
    });
  };

  return (
    <section className="mt-12 max-w-5xl mx-auto bg-mist/60 border border-border rounded-md p-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-primary mb-1">Bundle and save {bundle.discountPercent}%</p>
          <h2 className="font-display text-2xl text-ink">{bundle.title}</h2>
          <p className="text-sm text-foreground/70 mt-1 max-w-xl">{bundle.description}</p>
        </div>
        <div className="text-right">
          {!loading && (
            <>
              <p className="text-xs text-muted-foreground line-through">{formatPrice(subtotal.toString(), currency)}</p>
              <p className="text-2xl font-medium text-ink">{formatPrice(discounted.toString(), currency)}</p>
              <p className="text-[11px] text-primary">Use code <span className="font-mono">BUNDLE{bundle.discountPercent}</span> at checkout</p>
            </>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-3 flex justify-center py-8"><Loader2 className="size-5 animate-spin text-primary" /></div>
        ) : (
          products.map((p, i) => {
            const img = getPrimaryProductImage(p);
            const v = p.variants.edges[0]?.node;
            return (
              <div key={p.id} className="relative bg-background border border-border rounded p-3 text-center">
                {i > 0 && (
                  <Plus className="size-4 text-primary absolute -left-3 top-1/2 -translate-y-1/2 bg-mist rounded-full p-0.5 hidden sm:block" />
                )}
                <div className="aspect-square bg-mist mb-2 overflow-hidden rounded">
                  {img && <img src={img.url} alt={p.title} className="w-full h-full object-contain" loading="lazy" />}
                </div>
                <p className="text-xs font-medium text-ink line-clamp-2">{p.title}</p>
                {v && <p className="text-xs text-muted-foreground mt-1">{formatPrice(v.price.amount, v.price.currencyCode)}</p>}
              </div>
            );
          })
        )}
      </div>

      <button
        onClick={handleAddAll}
        disabled={loading || adding || !allAvailable}
        className="mt-5 w-full bg-primary text-primary-foreground px-6 py-3 text-sm uppercase tracking-wider hover:bg-primary/90 transition disabled:opacity-50 inline-flex items-center justify-center gap-2 rounded"
      >
        {adding ? <Loader2 className="size-4 animate-spin" /> : <><Check className="size-4" /> Add all {products.length || bundle.productHandles.length} to cart</>}
      </button>
      <p className="text-[11px] text-muted-foreground text-center mt-2">Visual saving shown. Apply code <span className="font-mono">BUNDLE{bundle.discountPercent}</span> at checkout to redeem.</p>
    </section>
  );
}

export function BundleCardsForProduct({ handle, initialProducts }: { handle: string; initialProducts?: Record<string, ShopifyProduct["node"][]> }) {
  const matches = findBundlesForProduct(handle);
  if (matches.length === 0) return null;
  return (
    <>
      {matches.map((b) => (
        <BundleCardWithInitial key={b.slug} bundle={b} initialProducts={initialProducts?.[b.slug]} />
      ))}
    </>
  );
}

function BundleCardWithInitial({ bundle, initialProducts }: { bundle: Bundle; initialProducts?: ShopifyProduct["node"][] }) {
  const [products, setProducts] = useState<ShopifyProduct["node"][]>(initialProducts ?? []);
  const [loading, setLoading] = useState(initialProducts ? false : true);
  const [adding, setAdding] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (initialProducts) {
      setProducts(initialProducts);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    Promise.all(
      bundle.productHandles.map((h) =>
        storefrontApiRequest(PRODUCT_BY_HANDLE_MIN, { handle: h }).then((r) => r?.data?.product).catch(() => null),
      ),
    ).then((res) => {
      if (cancelled) return;
      setProducts(res.filter(Boolean) as ShopifyProduct["node"][]);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [bundle.slug, initialProducts]);

  const subtotal = products.reduce(
    (s, p) => s + parseFloat(p.variants.edges[0]?.node.price.amount || "0"),
    0,
  );
  const currency = products[0]?.variants.edges[0]?.node.price.currencyCode || "GBP";
  const discounted = subtotal * (1 - bundle.discountPercent / 100);
  const allAvailable = products.length > 0 && products.every((p) => p.variants.edges[0]?.node.availableForSale);

  const handleAddAll = async () => {
    if (!allAvailable) return;
    setAdding(true);
    for (const p of products) {
      const v = p.variants.edges[0]?.node;
      if (!v) continue;
      await addItem({
        product: { node: p },
        variantId: v.id,
        variantTitle: v.title,
        price: v.price,
        quantity: 1,
        selectedOptions: v.selectedOptions || [],
      });
    }
    setAdding(false);
    toast.success(`${bundle.title} added to cart`, {
      description: `${products.length} items · save ${bundle.discountPercent}% with code BUNDLE${bundle.discountPercent}`,
      position: "top-center",
    });
  };

  return (
    <section className="mt-12 max-w-5xl mx-auto bg-mist/60 border border-border rounded-md p-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-primary mb-1">Bundle and save {bundle.discountPercent}%</p>
          <h2 className="font-display text-2xl text-ink">{bundle.title}</h2>
          <p className="text-sm text-foreground/70 mt-1 max-w-xl">{bundle.description}</p>
        </div>
        <div className="text-right">
          {!loading && (
            <>
              <p className="text-xs text-muted-foreground line-through">{formatPrice(subtotal.toString(), currency)}</p>
              <p className="text-2xl font-medium text-ink">{formatPrice(discounted.toString(), currency)}</p>
              <p className="text-[11px] text-primary">Use code <span className="font-mono">BUNDLE{bundle.discountPercent}</span> at checkout</p>
            </>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-3 flex justify-center py-8"><Loader2 className="size-5 animate-spin text-primary" /></div>
        ) : (
          products.map((p, i) => {
            const img = getPrimaryProductImage(p);
            const v = p.variants.edges[0]?.node;
            return (
              <div key={p.id} className="relative bg-background border border-border rounded p-3 text-center">
                {i > 0 && (
                  <Plus className="size-4 text-primary absolute -left-3 top-1/2 -translate-y-1/2 bg-mist rounded-full p-0.5 hidden sm:block" />
                )}
                <div className="aspect-square bg-mist mb-2 overflow-hidden rounded">
                  {img && <img src={img.url} alt={p.title} className="w-full h-full object-contain" loading="lazy" />}
                </div>
                <p className="text-xs font-medium text-ink line-clamp-2">{p.title}</p>
                {v && <p className="text-xs text-muted-foreground mt-1">{formatPrice(v.price.amount, v.price.currencyCode)}</p>}
              </div>
            );
          })
        )}
      </div>

      <button
        onClick={handleAddAll}
        disabled={loading || adding || !allAvailable}
        className="mt-5 w-full bg-primary text-primary-foreground px-6 py-3 text-sm uppercase tracking-wider hover:bg-primary/90 transition disabled:opacity-50 inline-flex items-center justify-center gap-2 rounded"
      >
        {adding ? <Loader2 className="size-4 animate-spin" /> : <><Check className="size-4" /> Add all {products.length || bundle.productHandles.length} to cart</>}
      </button>
      <p className="text-[11px] text-muted-foreground text-center mt-2">Visual saving shown. Apply code <span className="font-mono">BUNDLE{bundle.discountPercent}</span> at checkout to redeem.</p>
    </section>
  );
}
