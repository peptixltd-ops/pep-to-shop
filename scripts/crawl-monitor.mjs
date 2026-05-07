#!/usr/bin/env node
/**
 * Production crawl monitor for pondokpeptides.com
 *
 * Run daily (e.g. via GitHub Actions cron, Vercel cron, or any scheduler):
 *   node scripts/crawl-monitor.mjs
 *
 * Exits with code 1 if any check fails so it can fail a CI job / cron alert.
 *
 * Optional env:
 *   ALERT_WEBHOOK_URL  — Slack/Discord/etc incoming webhook to POST failures to.
 */

const BASE = process.env.CRAWL_BASE_URL || "https://pondokpeptides.com";
const UA = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";

async function fetchHtml(path) {
  const url = `${BASE}${path}`;
  const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "text/html" } });
  const html = await res.text();
  return { url, status: res.status, html };
}

function check(name, condition, detail = "") {
  return { name, ok: !!condition, detail };
}

const checks = [];

async function run() {
  // 1. Homepage Best Sellers
  {
    const { html, status } = await fetchHtml("/");
    const expectedNames = ["Retatrutide", "Tirzepatide", "BPC-157"];
    const found = expectedNames.filter((n) => html.toLowerCase().includes(n.toLowerCase()));
    const noLoading = !/loading peptides/i.test(html);
    checks.push(check("Homepage status 200", status === 200, `status=${status}`));
    checks.push(check("Homepage Best Sellers rendered", found.length >= 2, `found=${found.join(",")}`));
    checks.push(check("Homepage not stuck on 'Loading peptides'", noLoading));
  }

  // 2. Shop product grid
  {
    const { html, status } = await fetchHtml("/shop");
    const expected = ["Retatrutide", "Tirzepatide", "BPC-157", "GHK-Cu"];
    const found = expected.filter((n) => html.toLowerCase().includes(n.toLowerCase()));
    checks.push(check("Shop status 200", status === 200, `status=${status}`));
    checks.push(check("Shop grid renders product names", found.length >= 3, `found=${found.join(",")}`));
  }

  // 3. PDP /product/retatrutide
  {
    const { html, status } = await fetchHtml("/product/retatrutide");
    const hasTitle = /retatrutide/i.test(html);
    const hasPrice = /£\s?\d/.test(html) || /GBP/.test(html);
    const hasDescription = html.length > 20000; // PDP is long when SSR'd
    const hasFAQ = /Frequently Asked|FAQPage|Technical Data/i.test(html);
    const hasProductSchema = /"@type"\s*:\s*"Product"/.test(html) && /application\/ld\+json/.test(html);
    checks.push(check("PDP status 200", status === 200, `status=${status}`));
    checks.push(check("PDP title present", hasTitle));
    checks.push(check("PDP price present", hasPrice));
    checks.push(check("PDP description rendered", hasDescription, `htmlLen=${html.length}`));
    checks.push(check("PDP FAQ/Technical content present", hasFAQ));
    checks.push(check("PDP Product JSON-LD schema present", hasProductSchema));
  }

  const failed = checks.filter((c) => !c.ok);
  for (const c of checks) {
    console.log(`${c.ok ? "✅" : "❌"} ${c.name}${c.detail ? ` — ${c.detail}` : ""}`);
  }

  if (failed.length > 0) {
    console.error(`\n${failed.length} check(s) failed.`);
    if (process.env.ALERT_WEBHOOK_URL) {
      try {
        await fetch(process.env.ALERT_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `Pondok Peptides crawl monitor: ${failed.length} failure(s)\n` +
              failed.map((f) => `• ${f.name}${f.detail ? ` (${f.detail})` : ""}`).join("\n"),
          }),
        });
      } catch (e) {
        console.error("Alert webhook failed:", e);
      }
    }
    process.exit(1);
  } else {
    console.log("\nAll crawl checks passed.");
  }
}

run().catch((e) => {
  console.error("Crawl monitor crashed:", e);
  process.exit(1);
});
