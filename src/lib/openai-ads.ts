// OpenAI Ads (oaiq) helpers — conversion tracking only.
// The OpenAI Pixel base installation is loaded elsewhere (e.g. GTM) and is
// intentionally left unchanged; these helpers only fire the order_created
// conversion event and preserve the `oppref` click-reference parameter.

const OPPREF_KEY = "pp_oppref";
const FIRED_PREFIX = "pp_oaiq_order_fired_";

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

/**
 * Fire the OpenAI Ads `order_created` conversion event exactly once per order.
 * Dedups on orderId (per browser) so refreshes/revisits of the confirmation
 * page do not double-count. No-ops when the pixel is not loaded.
 */
export function trackOpenAIOrderCreated(orderId?: string) {
  if (typeof window === "undefined") return;
  const w = window as OaiqWindow;

  const dedupKey = FIRED_PREFIX + (orderId || "unknown");
  try {
    if (window.localStorage.getItem(dedupKey) === "1") return;
  } catch {
    try {
      if (window.sessionStorage.getItem(dedupKey) === "1") return;
    } catch {
      /* ignore */
    }
  }

  if (typeof w.oaiq === "function") {
    try {
      w.oaiq("measure", "order_created", { type: "contents" });
    } catch {
      return; // don't mark as fired if the call itself failed
    }
  } else {
    return; // pixel not loaded yet; allow a later attempt
  }

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
