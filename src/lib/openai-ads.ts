// OpenAI Ads attribution helpers. The base Pixel is installed in the root
// document; completed purchases are measured by Shopify Customer Events.

const OPPREF_KEY = "pp_oppref";
type OaiqWindow = Window & { oaiq?: (...args: unknown[]) => void };

/**
 * Persist the `oppref` OpenAI click-reference parameter so it survives
 * navigation through the site and into the checkout/order-confirmation flow.
 * Call once per page load from the root layout. Existing value is kept if the
 * current URL has no oppref param (first-touch attribution).
 */
export function preserveOppref() {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const oppref = params.get("oppref");
    if (oppref) {
      window.sessionStorage.setItem(OPPREF_KEY, oppref);
      try {
        window.localStorage.setItem(OPPREF_KEY, oppref);
      } catch {
        /* ignore */
      }
    }
  } catch {
    /* ignore */
  }
}

/** Read the preserved oppref value, if any. */
export function getOppref(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage.getItem(OPPREF_KEY) || window.localStorage.getItem(OPPREF_KEY);
  } catch {
    return null;
  }
}

/** Append the preserved click reference to Shopify's generated checkout URL. */
export function addOpprefToCheckoutUrl(checkoutUrl: string): string {
  const oppref = getOppref();
  if (!oppref) return checkoutUrl;

  try {
    const url = new URL(checkoutUrl);
    url.searchParams.set("oppref", oppref);
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}
