import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { adminGetAll, assertAdminToken, usesFixture } from "./admin-client.mjs";
import { classifyCustomer } from "./filter.mjs";

const here = dirname(fileURLToPath(import.meta.url));

/**
 * Customers are planned without passwords. Nothing is emailed.
 * Imported accounts must use the password reset flow before they can sign in.
 */
export function planCustomers(customers, orders) {
  return customers.map((customer) => {
    const decision = classifyCustomer(customer, orders);
    return {
      shopify_customer_id: customer.id,
      email: customer.email,
      first_name: customer.first_name || "",
      last_name: customer.last_name || "",
      phone: customer.phone || "",
      action: decision.action,
      reason: decision.reason,
      password: null,
      notify: false,
      metadata: {
        shopify_customer_id: customer.id,
        password_reset_required: decision.action === "import",
        imported_from_shopify: true,
      },
    };
  });
}

async function main() {
  let customers;
  let orders;
  if (usesFixture()) {
    customers = JSON.parse(readFileSync(resolve(here, "fixtures", "customers.json"), "utf8"));
    orders = JSON.parse(readFileSync(resolve(here, "fixtures", "orders.json"), "utf8"));
  } else {
    if (!assertAdminToken()) return;
    const updated = process.env.SHOPIFY_UPDATED_AT_MIN ? `&updated_at_min=${encodeURIComponent(process.env.SHOPIFY_UPDATED_AT_MIN)}` : "";
    customers = await adminGetAll(`/customers.json?limit=250${updated}`, "customers");
    orders = await adminGetAll(`/orders.json?status=any&limit=250${updated}`, "orders");
  }
  const plan = planCustomers(customers, orders);
  const file = resolve(here, "logs", "customers-plan.json");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify({ at: new Date().toISOString(), emailed: false, plan }, null, 2));
  const count = (action) => plan.filter((row) => row.action === action).length;
  console.log(JSON.stringify({ wrote: file, import: count("import"), ambiguous: count("flag-ambiguous"), skipped: count("skip"), emailed: false }));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
