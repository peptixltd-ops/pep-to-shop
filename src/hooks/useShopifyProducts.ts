import { useEffect, useState } from "react";
import {
  getShopifyProductByHandle,
  getShopifyProducts,
  type ShopifyProduct,
} from "@/lib/shopify";

export function useShopifyProducts(first = 50, query?: string) {
  const [initialData] = useState<ShopifyProduct[] | null>(null);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getShopifyProducts(first, query)
      .then((edges) => {
        if (cancelled) return;
        setProducts(edges);
        setError(null);
      })
      .catch((e: Error) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [first, query]);

  return { products, loading, error };
}

export function useShopifyProduct(handle: string) {
  const [initialData] = useState<ShopifyProduct["node"] | null>(null);
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getShopifyProductByHandle(handle)
      .then((productData) => {
        if (cancelled) return;
        setProduct(productData);
        setError(null);
      })
      .catch((e: Error) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [handle]);

  return { product, loading, error };
}
