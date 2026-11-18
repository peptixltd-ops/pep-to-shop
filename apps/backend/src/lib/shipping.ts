import { readFileSync, existsSync } from "node:fs"
import { resolve } from "node:path"

export type ShippingRules = {
  currency: "gbp"
  ukOnly: boolean
  freeFromGbp: number
  flatGbp: number
  label: string
  source: string
}

export const DEFAULT_SHIPPING: ShippingRules = {
  currency: "gbp",
  ukOnly: true,
  freeFromGbp: 75,
  flatGbp: 4.95,
  label: "Royal Mail Tracked 24",
  source: "shipping-policy-provisional",
}

export function loadShippingRules(): ShippingRules {
  const configured = process.env.SHIPPING_RULES_PATH
  const candidates = [
    configured,
    resolve(process.cwd(), "../../migration/shopify/state/shipping.json"),
    resolve(process.cwd(), "migration/shopify/state/shipping.json"),
  ].filter(Boolean) as string[]
  for (const file of candidates) {
    if (!existsSync(file)) continue
    const parsed = JSON.parse(readFileSync(file, "utf8")) as Partial<ShippingRules>
    return { ...DEFAULT_SHIPPING, ...parsed, source: parsed.source || file }
  }
  return DEFAULT_SHIPPING
}

export function quoteShipping(subtotalMajor: number, countryCode: string) {
  const rules = loadShippingRules()
  const country = String(countryCode || "").trim().toLowerCase()
  if (!country) throw new Error("A destination country is required.")
  if (rules.ukOnly && country !== "gb") {
    throw new Error("Pondok Peptides currently ships within the United Kingdom only.")
  }
  if (!Number.isFinite(subtotalMajor) || subtotalMajor < 0) {
    throw new Error("A valid goods subtotal is required to quote shipping.")
  }
  const amount = subtotalMajor >= rules.freeFromGbp ? 0 : rules.flatGbp
  const label = amount === 0 ? `${rules.label} (free over £${rules.freeFromGbp})` : rules.label
  return { amount, label, currency: rules.currency, country, source: rules.source }
}
