import { NextResponse } from "next/server";

type Item = { sku?: string; quantity: number };
type Body = {
  email?: string;
  items?: Item[];
  phone_country_code?: string;
  phone_national?: string;
  shipping?: {
    first_name?: string;
    last_name?: string;
    address_1?: string;
    city?: string;
    postal_code?: string;
    country_code?: string;
  };
  provider_id?: string;
  payment_data?: { approved?: boolean; last4?: string };
};

function backend() {
  const base = process.env.MEDUSA_BACKEND_URL || process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
  const key = process.env.MEDUSA_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
  const region = process.env.MEDUSA_REGION_ID || process.env.NEXT_PUBLIC_MEDUSA_REGION_ID;
  if (!base || !key || !region) throw new Error("Medusa storefront env is incomplete.");
  return { base, key, region };
}

async function medusa(path: string, init: RequestInit = {}) {
  const { base, key } = backend();
  const response = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      "x-publishable-api-key": key,
      ...(init.headers || {}),
    },
  });
  const text = await response.text();
  const json = text ? JSON.parse(text) : {};
  if (!response.ok) {
    const message = json.message || json.error || text || `Medusa ${response.status}`;
    throw new Error(typeof message === "string" ? message : JSON.stringify(message));
  }
  return json;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Body;
  const code = body.phone_country_code || "+44";
  const national = String(body.phone_national || "").replace(/[^\d]/g, "");
  if (!national) return NextResponse.json({ error: "A phone number is required." }, { status: 400 });
  if (!body.email || !body.email.includes("@")) return NextResponse.json({ error: "Email is required." }, { status: 400 });
  const shipping = body.shipping || {};
  if (!shipping.first_name || !shipping.last_name || !shipping.address_1 || !shipping.city || !shipping.postal_code) {
    return NextResponse.json({ error: "A complete UK shipping address is required." }, { status: 400 });
  }
  const country = (shipping.country_code || "gb").toLowerCase();
  if (country !== "gb") return NextResponse.json({ error: "Pondok Peptides currently ships within the United Kingdom only." }, { status: 400 });
  const items = (body.items || []).filter((item) => item.sku && item.quantity > 0);
  if (!items.length) return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });

  try {
    const { region } = backend();
    const catalogue = await medusa("/store/products?limit=50&fields=id,handle,*variants");
    const bySku = new Map<string, string>();
    for (const product of catalogue.products || []) {
      for (const variant of product.variants || []) {
        if (variant.sku) bySku.set(String(variant.sku), variant.id);
      }
    }
    const missing = items.filter((item) => !bySku.has(String(item.sku)));
    if (missing.length) return NextResponse.json({ error: `Unknown SKU ${missing.map((item) => item.sku).join(", ")}` }, { status: 400 });

    const created = await medusa("/store/carts", { method: "POST", body: JSON.stringify({ region_id: region }) });
    const cartId = created.cart.id;
    for (const item of items) {
      await medusa(`/store/carts/${cartId}/line-items`, {
        method: "POST",
        body: JSON.stringify({ variant_id: bySku.get(String(item.sku)), quantity: item.quantity }),
      });
    }
    const phone = `${code}${national.replace(/^0/, "")}`;
    const address = {
      first_name: shipping.first_name,
      last_name: shipping.last_name,
      address_1: shipping.address_1,
      city: shipping.city,
      postal_code: shipping.postal_code,
      country_code: "gb",
      phone,
    };
    await medusa(`/store/carts/${cartId}`, {
      method: "POST",
      body: JSON.stringify({ email: body.email, shipping_address: address, billing_address: address }),
    });
    const options = await medusa(`/store/shipping-options?cart_id=${cartId}`);
    const option = (options.shipping_options || [])[0];
    if (!option) return NextResponse.json({ error: "No shipping option is available for this address." }, { status: 400 });
    await medusa(`/store/carts/${cartId}/shipping-methods`, {
      method: "POST",
      body: JSON.stringify({ option_id: option.id }),
    });
    const provider = body.provider_id || "pp_sandbox_sandbox";
    const collection = await medusa("/store/payment-collections", {
      method: "POST",
      body: JSON.stringify({ cart_id: cartId }),
    });
    await medusa(`/store/payment-collections/${collection.payment_collection.id}/payment-sessions`, {
      method: "POST",
      body: JSON.stringify({ provider_id: provider, data: body.payment_data || { approved: true, last4: "4242" } }),
    });
    const completed = await medusa(`/store/carts/${cartId}/complete`, { method: "POST", body: "{}" });
    const order = completed.order;
    return NextResponse.json({
      ok: true,
      order_id: order?.id,
      display_id: order?.display_id,
      total: order?.total,
      phone,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
