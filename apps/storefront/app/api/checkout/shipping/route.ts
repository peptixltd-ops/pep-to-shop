import { NextResponse } from "next/server";
import { medusa, variantIdBySku } from "@/lib/medusa-cart";

type Item = { sku?: string; quantity: number };

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const items = ((body.items || []) as Item[]).filter((item) => item.sku && item.quantity > 0);
  if (!items.length) return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  try {
    const bySku = await variantIdBySku();
    const missing = items.filter((item) => !bySku.has(String(item.sku)));
    if (missing.length) return NextResponse.json({ error: `Unknown SKU ${missing.map((item) => item.sku).join(", ")}` }, { status: 400 });
    const quote = await medusa("/store/shipping-quote", {
      method: "POST",
      body: JSON.stringify({
        items: items.map((item) => ({ variant_id: bySku.get(String(item.sku)), quantity: item.quantity })),
        country_code: body.country_code || "gb",
        postal_code: body.postal_code,
        city: body.city,
        address_1: body.address_1,
      }),
    });
    return NextResponse.json(quote);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not load shipping options.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
