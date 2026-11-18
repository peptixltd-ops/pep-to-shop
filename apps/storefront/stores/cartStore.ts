"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ShopifyProduct } from "@/lib/shopify";
import { trackAddToCart } from "@/lib/analytics";

export interface CartItem {
  lineId: string | null;
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: { amount: string; currencyCode: string };
  quantity: number;
  selectedOptions: Array<{ name: string; value: string }>;
  sku?: string | null;
}

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  isSyncing: boolean;
  addItem: (item: Omit<CartItem, "lineId">) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;
  clearCart: () => void;
  syncCart: () => Promise<void>;
  getCheckoutUrl: () => string | null;
}

function skuFrom(item: Omit<CartItem, "lineId">) {
  if (item.sku) return item.sku;
  const match = item.product.node.variants.edges.find((edge) => edge.node.id === item.variantId);
  return match?.node.sku ?? null;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: "local",
      checkoutUrl: null,
      isLoading: false,
      isSyncing: false,
      addItem: async (item) => {
        const sku = skuFrom(item);
        const items = [...get().items];
        const existing = items.find((row) => row.variantId === item.variantId);
        if (existing) existing.quantity += item.quantity;
        else items.push({ ...item, sku, lineId: item.variantId });
        set({ items, checkoutUrl: "/checkout" });
        trackAddToCart({
          id: item.product.node.handle,
          name: item.product.node.title,
          price: item.price.amount,
          currency: item.price.currencyCode,
          quantity: item.quantity,
          variant: item.variantTitle,
        });
      },
      updateQuantity: async (variantId, quantity) => {
        const items = get().items
          .map((item) => (item.variantId === variantId ? { ...item, quantity } : item))
          .filter((item) => item.quantity > 0);
        set({ items, checkoutUrl: items.length ? "/checkout" : null });
      },
      removeItem: async (variantId) => {
        const items = get().items.filter((item) => item.variantId !== variantId);
        set({ items, checkoutUrl: items.length ? "/checkout" : null });
      },
      clearCart: () => set({ items: [], checkoutUrl: null }),
      syncCart: async () => {
        set({ isSyncing: false, checkoutUrl: get().items.length ? "/checkout" : null });
      },
      getCheckoutUrl: () => (get().items.length ? "/checkout" : null),
    }),
    { name: "pondok-cart", storage: createJSONStorage(() => localStorage) },
  ),
);
