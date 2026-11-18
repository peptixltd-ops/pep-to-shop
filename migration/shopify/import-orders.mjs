import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { adminGetAll, assertAdminToken, usesFixture } from "./admin-client.mjs";
import { classifyOrder } from "./filter.mjs";

const here = dirname(fileURLToPath(import.meta.url));

export function planOrders(orders) {
  return orders.map((order) => {
    const decision = classifyOrder(order);
    return {
      action: decision.action,
      reason: decision.reason,
      shopify_order_id: decision.shopify_order_id,
      shopify_order_number: decision.shopify_order_number,
      shopify_order_name: decision.shopify_order_name,
      email: order.email || null,
      currency: order.currency || "GBP",
      total_price: order.total_price || null,
      financial_status: order.financial_status || null,
      fulfillment_status: order.fulfillment_status || null,
      line_items: decision.ours,
      metadata: {
        imported_from_shopify: true,
        shopify_order_id: decision.shopify_order_id,
        shopify_order_number: decision.shopify_order_number,
        shopify_order_name: decision.shopify_order_name,
      },
    };
  });
}

async function main() {
  let orders;
  if (usesFixture()) orders = JSON.parse(readFileSync(resolve(here, "fixtures", "orders.json"), "utf8"));
  else {
    if (!assertAdminToken()) return;
    const updated = process.env.SHOPIFY_UPDATED_AT_MIN ? `&updated_at_min=${encodeURIComponent(process.env.SHOPIFY_UPDATED_AT_MIN)}` : "";
    orders = await adminGetAll(`/orders.json?status=any&limit=250${updated}`, "orders");
  }
  const plan = planOrders(orders);
  const file = resolve(here, "logs", "orders-plan.json");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify({ at: new Date().toISOString(), plan }, null, 2));
  console.log(JSON.stringify({
    wrote: file,
    import: plan.filter((row) => row.action === "import").length,
    ambiguous: plan.filter((row) => row.action === "flag-ambiguous").length,
    skipped: plan.filter((row) => row.action === "skip").length,
  }));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
