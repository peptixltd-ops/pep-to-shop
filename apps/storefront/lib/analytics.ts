// GA4 ecommerce event helpers (client-only).
// Safe no-op on SSR or when gtag is not yet loaded.

type GtagItem = {
  item_id: string;
  item_name: string;
  item_brand?: string;
  item_variant?: string;
  item_category?: string;
  price?: number;
  quantity?: number;
  index?: number;
};

function gtagEvent(event: string, params: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...a: unknown[]) => void; dataLayer?: unknown[] };
  try {
    if (typeof w.gtag === "function") {
      w.gtag("event", event, params);
    } else if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event, ...params });
    }
  } catch {
    /* ignore */
  }
}

function num(amount: string | number | undefined): number {
  if (amount == null) return 0;
  const n = typeof amount === "number" ? amount : parseFloat(amount);
  return Number.isFinite(n) ? n : 0;
}

export function trackViewItem(opts: {
  id: string;
  name: string;
  price: string | number;
  currency: string;
  variant?: string;
  category?: string;
}) {
  gtagEvent("view_item", {
    currency: opts.currency,
    value: num(opts.price),
    items: [{
      item_id: opts.id,
      item_name: opts.name,
      item_variant: opts.variant,
      item_category: opts.category,
      item_brand: "Pondok Peptides",
      price: num(opts.price),
      quantity: 1,
    } as GtagItem],
  });
}

export function trackViewItemList(opts: {
  list_id: string;
  list_name: string;
  items: Array<{ id: string; name: string; price: string | number; currency: string }>;
}) {
  if (!opts.items.length) return;
  const currency = opts.items[0].currency;
  gtagEvent("view_item_list", {
    item_list_id: opts.list_id,
    item_list_name: opts.list_name,
    items: opts.items.map((i, index) => ({
      item_id: i.id,
      item_name: i.name,
      item_brand: "Pondok Peptides",
      price: num(i.price),
      index,
      quantity: 1,
    } as GtagItem)),
    currency,
  });
}

export function trackAddToCart(opts: {
  id: string;
  name: string;
  price: string | number;
  currency: string;
  variant?: string;
  quantity: number;
}) {
  gtagEvent("add_to_cart", {
    currency: opts.currency,
    value: num(opts.price) * opts.quantity,
    items: [{
      item_id: opts.id,
      item_name: opts.name,
      item_variant: opts.variant,
      item_brand: "Pondok Peptides",
      price: num(opts.price),
      quantity: opts.quantity,
    } as GtagItem],
  });
}

export function trackBeginCheckout(opts: {
  value: number;
  currency: string;
  items: Array<{
    id: string;
    name: string;
    price: string | number;
    quantity: number;
    variant?: string;
  }>;
}) {
  gtagEvent("begin_checkout", {
    currency: opts.currency,
    value: opts.value,
    items: opts.items.map((i) => ({
      item_id: i.id,
      item_name: i.name,
      item_variant: i.variant,
      item_brand: "Pondok Peptides",
      price: num(i.price),
      quantity: i.quantity,
    } as GtagItem)),
  });
}

export function trackPurchase(opts: {
  transaction_id: string;
  value: number;
  currency: string;
  items?: Array<{ id: string; name: string; price: string | number; quantity: number }>;
}) {
  gtagEvent("purchase", {
    transaction_id: opts.transaction_id,
    value: opts.value,
    currency: opts.currency,
    items: (opts.items || []).map((i) => ({
      item_id: i.id,
      item_name: i.name,
      item_brand: "Pondok Peptides",
      price: num(i.price),
      quantity: i.quantity,
    } as GtagItem)),
  });
}
