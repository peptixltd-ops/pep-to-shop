import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { adminGet, assertAdminToken, usesFixture } from "./admin-client.mjs";

const here = dirname(fileURLToPath(import.meta.url));

/**
 * Reads Shopify shipping zones and writes a provisional rules file.
 * It does not change Shopify. A person reviews the file before the next seed.
 */
export function summariseZones(zones) {
  const rates = [];
  for (const zone of zones || []) {
    for (const rate of [...(zone.price_based_shipping_rates || []), ...(zone.weight_based_shipping_rates || [])]) {
      rates.push({
        zone: zone.name,
        countries: (zone.countries || []).map((country) => country.code),
        name: rate.name,
        price: rate.price,
        min_order_subtotal: rate.min_order_subtotal || null,
        max_order_subtotal: rate.max_order_subtotal || null,
      });
    }
  }
  return { source: "shopify-admin", rates };
}

async function main() {
  let zones;
  if (usesFixture()) zones = JSON.parse(readFileSync(resolve(here, "fixtures", "shipping.json"), "utf8")).shipping_zones;
  else {
    if (!assertAdminToken()) return;
    const body = await adminGet("/shipping_zones.json");
    if (!body) return;
    zones = body.shipping_zones;
  }
  const summary = summariseZones(zones);
  const stateDir = resolve(here, "state");
  mkdirSync(stateDir, { recursive: true });
  const file = resolve(stateDir, "shipping.json");
  writeFileSync(file, JSON.stringify({
    currency: "gbp",
    ukOnly: true,
    freeFromGbp: 75,
    flatGbp: 4.95,
    label: "Royal Mail Tracked 24",
    source: "shopify-admin-review-required",
    shopify: summary,
  }, null, 2));
  const log = resolve(here, "logs", "shipping-plan.json");
  mkdirSync(dirname(log), { recursive: true });
  writeFileSync(log, JSON.stringify({ at: new Date().toISOString(), wrote: file, rates: summary.rates.length }, null, 2));
  console.log(JSON.stringify({ wrote: file, rates: summary.rates.length, note: "Review shipping.json before relying on it. Defaults stay £4.95 / free over £75 until the rates are copied into the rules." }));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
