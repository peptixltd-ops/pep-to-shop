import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { adminGetAll, assertAdminToken, usesFixture } from "./admin-client.mjs";

const here = dirname(fileURLToPath(import.meta.url));

export function planDiscounts(priceRules, codesByRule) {
  return (priceRules || []).map((rule) => ({
    shopify_price_rule_id: rule.id,
    title: rule.title,
    value_type: rule.value_type,
    value: rule.value,
    starts_at: rule.starts_at || null,
    ends_at: rule.ends_at || null,
    codes: codesByRule[rule.id] || [],
    action: "upsert",
  }));
}

async function main() {
  let rules;
  let codes;
  if (usesFixture()) {
    const fixture = JSON.parse(readFileSync(resolve(here, "fixtures", "discounts.json"), "utf8"));
    rules = fixture.price_rules;
    codes = fixture.discount_codes;
  } else {
    if (!assertAdminToken()) return;
    rules = await adminGetAll("/price_rules.json?limit=250", "price_rules");
    codes = [];
    for (const rule of rules) {
      const rows = await adminGetAll(`/price_rules/${rule.id}/discount_codes.json?limit=250`, "discount_codes");
      codes.push(...rows.map((row) => ({ ...row, price_rule_id: rule.id })));
    }
  }
  const codesByRule = {};
  for (const code of codes || []) {
    const id = code.price_rule_id;
    codesByRule[id] = codesByRule[id] || [];
    codesByRule[id].push(code.code);
  }
  const plan = planDiscounts(rules, codesByRule);
  const file = resolve(here, "logs", "discounts-plan.json");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify({ at: new Date().toISOString(), plan }, null, 2));
  console.log(JSON.stringify({ wrote: file, rules: plan.length }));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
