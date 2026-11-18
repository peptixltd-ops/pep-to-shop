export const POND_VENDOR_DEFAULT = "Pondok Peptides";

export function filterConfig(env = process.env) {
  return {
    vendor: env.SHOPIFY_VENDOR || POND_VENDOR_DEFAULT,
    salesChannelId: env.SHOPIFY_SALES_CHANNEL_ID || "",
    salesChannelName: env.SHOPIFY_SALES_CHANNEL_NAME || "",
  };
}

export function productMatches(product, config = filterConfig()) {
  const vendor = product?.vendor || "";
  if (vendor !== config.vendor) return { ok: false, reason: `vendor:${vendor || "missing"}` };
  const channels = product.sales_channels || product.publications || product.channels || [];
  if (config.salesChannelId) {
    const ids = channels.map((channel) => String(channel.id || channel.channel_id || channel));
    if (ids.length && !ids.includes(String(config.salesChannelId))) {
      return { ok: false, reason: `sales-channel:${config.salesChannelId}` };
    }
  }
  if (config.salesChannelName) {
    const names = channels.map((channel) => String(channel.name || channel.title || ""));
    if (names.length && !names.includes(config.salesChannelName)) {
      return { ok: false, reason: `sales-channel-name:${config.salesChannelName}` };
    }
  }
  return { ok: true, reason: "vendor" };
}

export function selectProducts(products, config = filterConfig()) {
  const accepted = [];
  const rejected = [];
  for (const product of products || []) {
    const decision = productMatches(product, config);
    if (!decision.ok) {
      rejected.push({ id: product.id, handle: product.handle, reason: decision.reason });
      continue;
    }
    const variants = (product.variants || []).map((variant) => ({
      shopify_variant_id: variant.id,
      sku: variant.sku || null,
      title: variant.title || variant.option1 || "Default",
      price: variant.price ?? null,
      compare_at_price: variant.compare_at_price ?? null,
      option1: variant.option1 || null,
      inventory_quantity: variant.inventory_quantity ?? null,
    }));
    accepted.push({
      shopify_product_id: product.id,
      handle: product.handle,
      title: product.title,
      vendor: product.vendor,
      description: product.body_html || product.description || "",
      images: (product.images || []).map((image) => ({ src: image.src || image.url, alt: image.alt || null })),
      variants,
    });
  }
  return { accepted, rejected, filter: config };
}

function lineOurs(line, config) {
  return productMatches({ vendor: line.vendor, sales_channels: line.sales_channels }, config).ok;
}

export function classifyOrder(order, config = filterConfig()) {
  const lines = order.line_items || order.lineItems || [];
  const ours = [];
  const other = [];
  for (const line of lines) {
    if (lineOurs(line, config)) ours.push(line);
    else other.push(line);
  }
  const display = {
    shopify_order_id: order.id,
    shopify_order_number: order.order_number ?? null,
    shopify_order_name: order.name ?? null,
  };
  if (ours.length && other.length) return { action: "flag-ambiguous", reason: "mixed-vendor-order", ...display, ours, other };
  if (ours.length) return { action: "import", reason: "pondok-only", ...display, ours, other: [] };
  return { action: "skip", reason: other.length ? "other-vendor-only" : "empty", ...display, ours: [], other };
}

export function classifyCustomer(customer, orders, config = filterConfig()) {
  const email = String(customer.email || "").toLowerCase();
  const related = (orders || []).filter((order) => String(order.email || "").toLowerCase() === email || order.customer?.id === customer.id || order.customer_id === customer.id);
  const classes = related.map((order) => classifyOrder(order, config));
  const hasOurs = classes.some((entry) => entry.action === "import");
  const ambiguous = classes.some((entry) => entry.action === "flag-ambiguous");
  if (!hasOurs && !ambiguous) return { action: "skip", reason: "not-attributable-to-pondok" };
  if (ambiguous) return { action: "flag-ambiguous", reason: "shared-or-mixed-orders" };
  return { action: "import", reason: "pondok-orders-only" };
}
