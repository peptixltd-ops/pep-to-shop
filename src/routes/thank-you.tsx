import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { CheckCircle2, Package, Mail, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank you for your order | Pondok Peptides" },
      { name: "description", content: "Your order has been received. Thank you for shopping with Pondok Peptides." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ThankYouPage,
});

function getQueryParam(name: string): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get(name);
}

function ThankYouPage() {
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    // Clear cart after successful checkout
    clearCart();

    if (typeof window === "undefined") return;
    const w = window as unknown as { gtag?: (...a: unknown[]) => void; dataLayer?: unknown[] };
    const orderId = getQueryParam("order_id") || getQueryParam("order") || undefined;
    const valueRaw = getQueryParam("value") || getQueryParam("total");
    const value = valueRaw ? Number(valueRaw) : undefined;
    const currency = getQueryParam("currency") || "GBP";

    // Dedup: only fire conversion once per order_id (per browser)
    const dedupKey = orderId ? `pp_fired_conversion_${orderId}` : null;
    let alreadyFired = false;
    if (dedupKey) {
      try {
        alreadyFired = window.localStorage.getItem(dedupKey) === "1";
      } catch {
        try {
          alreadyFired = window.sessionStorage.getItem(dedupKey) === "1";
        } catch {
          alreadyFired = false;
        }
      }
    }
    if (alreadyFired) return;

    // Google Ads conversion (replace AW-CONVERSION_ID/LABEL with real IDs)
    if (typeof w.gtag === "function") {
      w.gtag("event", "conversion", {
        send_to: "AW-CONVERSION_ID/CONVERSION_LABEL",
        value: value ?? 0,
        currency,
        transaction_id: orderId ?? "",
      });
      w.gtag("event", "purchase", {
        transaction_id: orderId ?? "",
        value: value ?? 0,
        currency,
        items: [],
      });
    }
    // GTM dataLayer fallback
    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({
        event: "purchase",
        ecommerce: { transaction_id: orderId, value, currency, items: [] },
      });
    }

    // Mark as fired
    if (dedupKey) {
      try {
        window.localStorage.setItem(dedupKey, "1");
      } catch {
        try {
          window.sessionStorage.setItem(dedupKey, "1");
        } catch {
          /* ignore */
        }
      }
    }
  }, [clearCart]);

  return (
    <div className="bg-background">
      <section className="container-x py-20 md:py-28 text-center">
        <img src="/press/pondok-wordmark.png" alt="Pondok Peptides" className="mx-auto h-8 md:h-10 mb-10 opacity-90" />
        <div className="mx-auto inline-flex size-16 items-center justify-center rounded-full bg-[hsl(var(--accent))]/30 mb-6">
          <CheckCircle2 className="size-9 text-primary" />
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">Order confirmed</p>
        <h1 className="font-display text-4xl md:text-6xl tracking-[-0.02em] text-foreground">
          Thank you for your order.
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-muted-foreground">
          Your order has been received and is being prepared. You'll receive a confirmation email with tracking shortly.
        </p>

        <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
          <div className="border border-border p-6">
            <Mail className="size-5 text-primary mb-3" />
            <p className="text-sm font-medium">Check your inbox</p>
            <p className="text-xs text-muted-foreground mt-1">Order confirmation sent within minutes.</p>
          </div>
          <div className="border border-border p-6">
            <Package className="size-5 text-primary mb-3" />
            <p className="text-sm font-medium">Dispatched fast</p>
            <p className="text-xs text-muted-foreground mt-1">UK orders ship next business day.</p>
          </div>
          <div className="border border-border p-6">
            <ShoppingBag className="size-5 text-primary mb-3" />
            <p className="text-sm font-medium">Track in your account</p>
            <p className="text-xs text-muted-foreground mt-1">View status, invoices and reorder.</p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link to="/shop" className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 text-sm font-medium tracking-wide hover:bg-primary/90">
            Continue shopping
          </Link>
          <a
            href="https://account.pondokpeptides.com"
            className="inline-flex items-center border border-border px-6 py-3 text-sm font-medium tracking-wide hover:border-primary hover:text-primary"
          >
            View my orders
          </a>
        </div>
      </section>
    </div>
  );
}
