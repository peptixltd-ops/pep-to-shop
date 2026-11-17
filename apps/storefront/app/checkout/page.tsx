"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";

const CODES = [
  { code: "+44", label: "United Kingdom +44" },
  { code: "+353", label: "Ireland +353" },
  { code: "+1", label: "United States +1" },
  { code: "+33", label: "France +33" },
  { code: "+49", label: "Germany +49" },
  { code: "+31", label: "Netherlands +31" },
  { code: "+34", label: "Spain +34" },
  { code: "+39", label: "Italy +39" },
  { code: "+61", label: "Australia +61" },
  { code: "+971", label: "United Arab Emirates +971" },
];

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [countryCode, setCountryCode] = useState("+44");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [order, setOrder] = useState<{ display_id?: number; total?: number } | null>(null);
  const currency = items[0]?.price.currencyCode || "GBP";
  const goods = useMemo(() => items.reduce((sum, item) => sum + Number(item.price.amount) * item.quantity, 0), [items]);
  const shipping = goods >= 75 || goods === 0 ? 0 : 4.95;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus("sending");
    setMessage("");
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        phone_country_code: countryCode,
        phone_national: form.get("phone"),
        shipping: {
          first_name: form.get("first_name"),
          last_name: form.get("last_name"),
          address_1: form.get("address_1"),
          city: form.get("city"),
          postal_code: form.get("postal_code"),
          country_code: "gb",
        },
        items: items.map((item) => ({ sku: item.sku, quantity: item.quantity })),
        provider_id: form.get("provider"),
        payment_data: form.get("provider") === "pp_sandbox_sandbox" ? { approved: true, last4: "4242" } : {},
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      setStatus("error");
      setMessage(json.error || "Checkout failed.");
      return;
    }
    setOrder(json);
    setStatus("done");
    clearCart();
  }

  if (status === "done") {
    return (
      <div className="container-x py-16 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Order received</p>
        <h1 className="font-display text-4xl text-ink">Thank you.</h1>
        <p className="mt-4 text-muted-foreground">Order {order?.display_id} is recorded. Payment was taken with the sandbox provider and no card network was charged. A receipt is held in the local email outbox and is not sent automatically.</p>
        <Link href="/shop" className="inline-flex mt-8 bg-primary text-primary-foreground px-6 py-3 text-sm uppercase tracking-wider">Back to shop</Link>
      </div>
    );
  }

  return (
    <div className="container-x py-12 md:py-16">
      <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Checkout</p>
      <h1 className="font-display text-4xl md:text-5xl text-ink">Research order</h1>
      <p className="mt-3 text-sm text-muted-foreground max-w-2xl">For laboratory research use only. Not for human or veterinary use. A phone number is required. The country code defaults to +44.</p>
      {!items.length ? (
        <p className="mt-10 text-muted-foreground">Your cart is empty. <Link href="/shop" className="text-primary underline">Shop the catalogue</Link>.</p>
      ) : (
        <form onSubmit={onSubmit} className="mt-10 grid lg:grid-cols-[1.4fr_0.8fr] gap-10">
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input name="first_name" required placeholder="First name" className="border border-border px-4 py-3 text-sm" />
              <input name="last_name" required placeholder="Last name" className="border border-border px-4 py-3 text-sm" />
            </div>
            <input name="email" type="email" required placeholder="Email" className="w-full border border-border px-4 py-3 text-sm" />
            <div className="grid sm:grid-cols-[220px_1fr] gap-4">
              <select aria-label="Country code" value={countryCode} onChange={(event) => setCountryCode(event.target.value)} className="border border-border px-3 py-3 text-sm bg-background">
                {CODES.map((entry) => <option key={entry.code} value={entry.code}>{entry.label}</option>)}
              </select>
              <input name="phone" required inputMode="tel" placeholder="Phone number" className="border border-border px-4 py-3 text-sm" />
            </div>
            <input name="address_1" required placeholder="Address" className="w-full border border-border px-4 py-3 text-sm" />
            <div className="grid sm:grid-cols-2 gap-4">
              <input name="city" required placeholder="City" className="border border-border px-4 py-3 text-sm" />
              <input name="postal_code" required placeholder="Postcode" className="border border-border px-4 py-3 text-sm" />
            </div>
            <p className="text-sm text-muted-foreground">Shipping country: United Kingdom.</p>
            <fieldset className="border border-border p-4 space-y-2">
              <legend className="px-2 text-xs uppercase tracking-[0.2em] text-primary">Payment</legend>
              <label className="flex gap-2 text-sm"><input type="radio" name="provider" value="pp_sandbox_sandbox" defaultChecked /> Sandbox card (test, no charge, last4 4242)</label>
              <label className="flex gap-2 text-sm text-muted-foreground"><input type="radio" name="provider" value="pp_wallid_wallid" /> Wallid pay by bank (needs provider keys)</label>
              <label className="flex gap-2 text-sm text-muted-foreground"><input type="radio" name="provider" value="pp_niftipay_niftipay" /> NiftiPay card (needs provider keys)</label>
            </fieldset>
            {message && <p className="text-sm text-destructive">{message}</p>}
            <button disabled={status === "sending"} className="bg-primary text-primary-foreground px-7 py-3.5 text-sm uppercase tracking-wider disabled:opacity-50">
              {status === "sending" ? "Placing order…" : "Place order"}
            </button>
          </div>
          <aside className="bg-mist border border-border p-6 h-fit">
            <h2 className="font-display text-2xl text-ink mb-4">Summary</h2>
            <ul className="space-y-3 text-sm">
              {items.map((item) => (
                <li key={item.variantId} className="flex justify-between gap-4">
                  <span>{item.product.node.title} · {item.variantTitle} × {item.quantity}</span>
                  <span>{formatPrice(String(Number(item.price.amount) * item.quantity), item.price.currencyCode)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-border space-y-2 text-sm">
              <div className="flex justify-between"><span>Goods</span><span>{formatPrice(String(goods), currency)}</span></div>
              <div className="flex justify-between"><span>Royal Mail Tracked 24</span><span>{shipping === 0 ? "Free" : formatPrice(String(shipping), currency)}</span></div>
              <div className="flex justify-between font-semibold"><span>Estimated total</span><span>{formatPrice(String(goods + shipping), currency)}</span></div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Free delivery over £75. These rates follow the shipping policy until the Shopify shipping import is reviewed.</p>
          </aside>
        </form>
      )}
    </div>
  );
}
