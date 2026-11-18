import test from "node:test";
import assert from "node:assert/strict";
import { selectProducts, classifyOrder, classifyCustomer, filterConfig } from "./filter.mjs";

const config = filterConfig({ SHOPIFY_VENDOR: "Pondok Peptides", SHOPIFY_SALES_CHANNEL_ID: "" });

test("keeps Pondok products and drops other vendors", () => {
  const { accepted, rejected } = selectProducts([
    { id: 1, handle: "retatrutide", title: "Retatrutide", vendor: "Pondok Peptides", variants: [{ id: 11, sku: "reta-10", title: "10mg", price: "59.00" }] },
    { id: 2, handle: "other", title: "Other", vendor: "Oxford Research Peptides", variants: [{ id: 21, sku: "x", title: "10mg", price: "1" }] },
  ], config);
  assert.equal(accepted.length, 1);
  assert.equal(accepted[0].handle, "retatrutide");
  assert.equal(rejected[0].reason, "vendor:Oxford Research Peptides");
});

test("optional sales channel filter rejects products published elsewhere", () => {
  const channelConfig = filterConfig({ SHOPIFY_VENDOR: "Pondok Peptides", SHOPIFY_SALES_CHANNEL_ID: "gid://channel/pondok" });
  const { accepted, rejected } = selectProducts([
    { id: 1, handle: "a", title: "A", vendor: "Pondok Peptides", sales_channels: [{ id: "gid://channel/other" }], variants: [] },
    { id: 2, handle: "b", title: "B", vendor: "Pondok Peptides", sales_channels: [{ id: "gid://channel/pondok" }], variants: [] },
  ], channelConfig);
  assert.equal(accepted.map((product) => product.handle).join(), "b");
  assert.equal(rejected[0].reason, "sales-channel:gid://channel/pondok");
});

test("preserves Shopify order name and number and flags mixed orders", () => {
  const mixed = classifyOrder({
    id: 9,
    name: "#1042",
    order_number: 1042,
    line_items: [
      { vendor: "Pondok Peptides", sku: "reta-10" },
      { vendor: "Oxford Research Peptides", sku: "ORP-1" },
    ],
  }, config);
  assert.equal(mixed.action, "flag-ambiguous");
  assert.equal(mixed.shopify_order_name, "#1042");
  assert.equal(mixed.shopify_order_number, 1042);
  const ours = classifyOrder({
    id: 10,
    name: "#1043",
    order_number: 1043,
    line_items: [{ vendor: "Pondok Peptides", sku: "reta-10" }],
  }, config);
  assert.equal(ours.action, "import");
});

test("imports a customer only from Pondok orders", () => {
  const orders = [{ id: 10, email: "a@example.com", line_items: [{ vendor: "Pondok Peptides" }] }];
  assert.equal(classifyCustomer({ id: 1, email: "a@example.com" }, orders, config).action, "import");
  assert.equal(classifyCustomer({ id: 2, email: "b@example.com" }, orders, config).action, "skip");
});
