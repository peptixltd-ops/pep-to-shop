import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";
import { assertAdminToken, usesFixture } from "./admin-client.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const stateFile = resolve(here, "state", "cursor.json");

export function nextCursor(previous, now = new Date()) {
  return {
    products_updated_at: now.toISOString(),
    previous_products_updated_at: previous?.products_updated_at || null,
  };
}

function run(script) {
  const result = spawnSync(process.execPath, [resolve(here, script), ...process.argv.slice(2)], {
    stdio: "inherit",
    env: process.env,
  });
  if (result.status) process.exitCode = result.status;
}

async function main() {
  mkdirSync(resolve(here, "state"), { recursive: true });
  mkdirSync(resolve(here, "logs"), { recursive: true });
  const previous = existsSync(stateFile) ? JSON.parse(readFileSync(stateFile, "utf8")) : {};
  if (!usesFixture() && !assertAdminToken()) return;
  if (previous.products_updated_at && !usesFixture()) {
    process.env.SHOPIFY_UPDATED_AT_MIN = previous.products_updated_at;
  }
  for (const script of ["import-products.mjs", "import-customers.mjs", "import-orders.mjs", "import-discounts.mjs", "import-shipping.mjs"]) {
    run(script);
    if (process.exitCode) return;
  }
  const cursor = nextCursor(previous);
  writeFileSync(stateFile, JSON.stringify({ ...cursor, mode: usesFixture() ? "fixture" : "live" }, null, 2));
  console.log(JSON.stringify({ ok: true, cursor, emailed: false }));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
