import { trackBeginCheckout } from "@/lib/analytics";
import { useCartStore } from "@/stores/cartStore";

export function navigateToCheckout(url: string) {
  if (typeof window === "undefined") return;

  // Fire GA4 begin_checkout from the current cart snapshot before redirecting.
  try {
    const items = useCartStore.getState().items;
    if (items.length > 0) {
      const currency = items[0].price.currencyCode;
      const value = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
      trackBeginCheckout({
        value,
        currency,
        items: items.map((i) => ({
          id: i.product.node.handle || i.variantId,
          name: i.product.node.title,
          price: i.price.amount,
          quantity: i.quantity,
          variant: i.variantTitle,
        })),
      });
    }
  } catch { /* ignore */ }

  const checkoutWindow = window.open(url, "_top");

  if (!checkoutWindow) {
    window.location.assign(url);
  }
}
