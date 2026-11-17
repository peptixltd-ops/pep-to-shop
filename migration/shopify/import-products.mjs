import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { adminGetAll, assertAdminToken, usesFixture } from "./admin-client.mjs";
import { selectProducts } from "./filter.mjs";

const here = dirname(fileURLToPath(import.meta.url));

function load(name) {
  return JSON.parse(readFileSync(resolve(here, "fixtures", name), "utf8"));
}

export async function loadProducts() {
  if (usesFixture()) return load("products.admin.json");
  if (!assertAdminToken()) return null;
  const updated = process.env.SHOPIFY_UPDATED_AT_MIN ? `&updated_at_min=${encodeURIComponent(process.env.SHOPIFY_UPDATED_AT_MIN)}` : "";
  return adminGetAll(`/products.json?limit=250${updated}`, "products");
}

async function main() {
  const products = await loadProducts();
  if (!products) return;
  const plan = selectProducts(products);
  const file = resolve(here, "logs", "products-plan.json");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify({ at: new Date().toISOString(), ...plan }, null, 2));
  console.log(JSON.stringify({ wrote: file, accepted: plan.accepted.length, rejected: plan.rejected.length, filter: plan.filter }));
}

import { pathToFileURL } from "node:url";
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
