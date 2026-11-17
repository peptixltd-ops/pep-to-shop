import { NextResponse } from "next/server";
import { listShippingOptions, prepareCart } from "@/lib/medusa-cart";

type Item = { sku?: string; quantity: number };

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const items = ((body.items || []) as Item[]).filter((item) => item.sku && item.quantity > 0);
  if (!items.length) return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  const country = String(body.country_code || "gb").toLowerCase();
  const address = {
    first_name: body.first_name || "Quote",
    last_name: body.last_name || "Customer",
    address_1: body.address_1 || "Quote",
    city: body.city || "Barking",
    postal_code: body.postal_code || "IG11 7UQ",
    country_code: country,
    phone: "+440000000000",
  };
  try {
    const { cartId, freeShip } = await prepareCart(items, address);
    const options = await listShippingOptions(cartId);
    return NextResponse.json({ options, freeship: freeShip, currency_code: "gbp" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not load shipping options.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
