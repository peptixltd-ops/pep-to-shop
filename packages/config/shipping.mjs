/**
 * Pondok Peptides shipping defaults, taken from the shipping policy page.
 * The Shopify import writes migration/shopify/state/shipping.json when a
 * read-only admin token is available. Amounts are major GBP units.
 * This file is the provisional source until that import is reviewed.
 */
export const SHIPPING_RULES = {
  currency: "gbp",
  ukOnly: true,
  freeFromGbp: 75,
  flatGbp: 4.95,
  label: "Royal Mail Tracked 24",
  source: "shipping-policy-provisional",
};

export function quoteShipping(subtotal, country) {
  const code = String(country || "").trim().toLowerCase();
  const goods = Number(subtotal);
  if (!code) throw new Error("A destination country is required.");
  if (SHIPPING_RULES.ukOnly && code !== "gb") {
    throw new Error("Pondok Peptides currently ships within the United Kingdom only.");
  }
  if (!Number.isFinite(goods) || goods < 0) throw new Error("A valid goods subtotal is required.");
  const amount = goods >= SHIPPING_RULES.freeFromGbp ? 0 : SHIPPING_RULES.flatGbp;
  return { amount, label: SHIPPING_RULES.label, currency: "gbp", country: code };
}
