import { NextResponse } from "next/server";
import { applyFreeShipIfPresent, listShippingOptions, medusa, prepareCart } from "@/lib/medusa-cart";

type Item = { sku?: string; quantity: number };
type Body = {
  email?: string;
  items?: Item[];
  phone_country_code?: string;
  phone_national?: string;
  shipping_option_id?: string;
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
  if (!body.shipping_option_id) return NextResponse.json({ error: "Choose a shipping option." }, { status: 400 });

  try {
    const phone = `${code}${national.replace(/^0/, "")}`;
    const address = {
      first_name: shipping.first_name,
      last_name: shipping.last_name,
      address_1: shipping.address_1,
      city: shipping.city,
      postal_code: shipping.postal_code,
      country_code: "gb",
      phone,
      email: body.email,
    };
    const { cartId } = await prepareCart(items, address);
    const options = await listShippingOptions(cartId);
    const chosen = options.find((option) => option.id === body.shipping_option_id);
    if (!chosen) return NextResponse.json({ error: "That shipping option is not available for this order." }, { status: 400 });
    await medusa(`/store/carts/${cartId}/shipping-methods`, {
      method: "POST",
      body: JSON.stringify({ option_id: chosen.id }),
    });
    const freeShip = await applyFreeShipIfPresent(cartId);
    const priced = await medusa(`/store/carts/${cartId}?fields=id,total,shipping_total`);
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
    const cart = priced.cart || {};
    return NextResponse.json({
      ok: true,
      order_id: order?.id,
      display_id: order?.display_id,
      total: order?.total,
      phone,
      shipping_option: { ...chosen, amount: Number(cart.shipping_total ?? chosen.amount) },
      freeship: freeShip,
      shipping_total: cart.shipping_total,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
