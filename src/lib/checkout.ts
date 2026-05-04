export function navigateToCheckout(url: string) {
  if (typeof window === "undefined") return;

  const checkoutWindow = window.open(url, "_top");

  if (!checkoutWindow) {
    window.location.assign(url);
  }
}