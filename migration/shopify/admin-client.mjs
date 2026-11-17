const READ_ONLY_METHODS = new Set(["GET"]);

export const REQUIRED_SCOPES = [
  "read_products",
  "read_inventory",
  "read_customers",
  "read_orders",
  "read_all_orders",
  "read_discounts",
  "read_shipping",
];

export function adminConfig(env = process.env) {
  return {
    token: env.SHOPIFY_ADMIN_TOKEN || "",
    domain: env.SHOPIFY_STORE_DOMAIN || "cqdyni-4v.myshopify.com",
    version: env.SHOPIFY_ADMIN_API_VERSION || "2025-10",
    scopes: REQUIRED_SCOPES,
  };
}

export function assertAdminToken() {
  const config = adminConfig();
  if (!config.token) {
    console.error(JSON.stringify({
      blocker: true,
      service: "Shopify Admin API",
      credential: "SHOPIFY_ADMIN_TOKEN",
      why: "Customers, orders, discount values, inventory and shipping settings are not available from the public catalogue.",
      minimum_scopes: config.scopes,
      store: config.domain,
      writes: "none — this client only sends GET",
    }, null, 2));
    process.exitCode = 2;
    return null;
  }
  return config;
}

export async function adminGet(path) {
  const config = assertAdminToken();
  if (!config) return null;
  return adminRequest("GET", path);
}

export async function adminRequest(method, path) {
  if (!READ_ONLY_METHODS.has(method)) {
    throw new Error(`Refusing ${method} ${path}. Shopify import is read-only.`);
  }
  const config = assertAdminToken();
  if (!config) return null;
  const url = `https://${config.domain}/admin/api/${config.version}${path}`;
  const response = await fetch(url, {
    method,
    headers: { "X-Shopify-Access-Token": config.token, Accept: "application/json" },
  });
  if (!response.ok) throw new Error(`Shopify Admin ${response.status} ${path}`);
  return response.json();
}

export async function adminGetAll(path, key) {
  const rows = [];
  let next = path;
  while (next) {
    const config = adminConfig();
    const url = next.startsWith("http") ? next : `https://${config.domain}/admin/api/${config.version}${next}`;
    const response = await fetch(url, {
      method: "GET",
      headers: { "X-Shopify-Access-Token": config.token, Accept: "application/json" },
    });
    if (!response.ok) throw new Error(`Shopify Admin ${response.status} ${url}`);
    const body = await response.json();
    rows.push(...(body[key] || []));
    const link = response.headers.get("link") || "";
    const match = link.match(/<([^>]+)>; rel="next"/);
    next = match ? match[1] : "";
  }
  return rows;
}

export function usesFixture(argv = process.argv) {
  return argv.includes("--fixture");
}
