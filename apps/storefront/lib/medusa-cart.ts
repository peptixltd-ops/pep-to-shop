type CartItem = { sku?: string; quantity: number };

export type QuotedShippingOption = {
  id: string;
  name: string;
  amount: number;
  currency_code: string;
};

function backend() {
  const base = process.env.MEDUSA_BACKEND_URL || process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
  const key = process.env.MEDUSA_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
  const region = process.env.MEDUSA_REGION_ID || process.env.NEXT_PUBLIC_MEDUSA_REGION_ID;
  if (!base || !key || !region) throw new Error("Medusa storefront env is incomplete.");
  return { base, key, region };
}

export async function medusa(path: string, init: RequestInit = {}) {
  const { base, key } = backend();
  const response = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      "x-publishable-api-key": key,
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
  const text = await response.text();
  const json = text ? JSON.parse(text) : {};
  if (!response.ok) {
    const message = json.message || json.error || text || `Medusa ${response.status}`;
    throw new Error(typeof message === "string" ? message : JSON.stringify(message));
  }
  return json;
}

export function optionAmount(option: {
  amount?: number | null;
  calculated_price?: { calculated_amount?: number | null };
  currency_code?: string;
  calculated_price_currency?: string;
}) {
  const amount = option.calculated_price?.calculated_amount ?? option.amount ?? 0;
  return Number(amount);
}

export async function variantIdBySku() {
  const catalogue = await medusa("/store/products?limit=100&fields=id,handle,*variants");
  const bySku = new Map<string, string>();
  for (const product of catalogue.products || []) {
    for (const variant of product.variants || []) {
      if (variant.sku) bySku.set(String(variant.sku), variant.id);
    }
  }
  return bySku;
}

/** Attach FREESHIP when Medusa has that promotion. A missing code is ignored. */
export async function applyFreeShipIfPresent(cartId: string) {
  try {
    await medusa(`/store/carts/${cartId}/promotions`, {
      method: "POST",
      body: JSON.stringify({ promo_codes: ["FREESHIP"] }),
    });
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (/invalid|not found|does not exist/i.test(message)) return false;
    throw error;
  }
}

export async function prepareCart(items: CartItem[], address: Record<string, string>) {
  if (!address.email) throw new Error("A customer email is required to place an order.")
  const { region } = backend();
  const bySku = await variantIdBySku();
  const missing = items.filter((item) => item.sku && !bySku.has(String(item.sku)));
  if (missing.length) throw new Error(`Unknown SKU ${missing.map((item) => item.sku).join(", ")}`);
  const created = await medusa("/store/carts", { method: "POST", body: JSON.stringify({ region_id: region }) });
  const cartId = created.cart.id as string;
  for (const item of items) {
    if (!item.sku) continue;
    await medusa(`/store/carts/${cartId}/line-items`, {
      method: "POST",
      body: JSON.stringify({ variant_id: bySku.get(String(item.sku)), quantity: item.quantity }),
    });
  }
  await medusa(`/store/carts/${cartId}`, {
    method: "POST",
    body: JSON.stringify({
      email: address.email,
      shipping_address: address,
      billing_address: address,
    }),
  });
  return { cartId };
}

export async function listShippingOptions(cartId: string): Promise<QuotedShippingOption[]> {
  const listed = await medusa(`/store/shipping-options?cart_id=${cartId}`);
  return (listed.shipping_options || []).map((option: {
    id: string;
    name?: string;
    amount?: number;
    calculated_price?: { calculated_amount?: number; currency_code?: string };
  }) => ({
    id: option.id,
    name: option.name || "Shipping",
    amount: optionAmount(option),
    currency_code: option.calculated_price?.currency_code || "gbp",
  }));
}
