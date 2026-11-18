import { chromium } from "playwright";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, "../artifacts/comparisons");
mkdirSync(outDir, { recursive: true });

const liveBase = process.env.LIVE_BASE || "https://www.pondokpeptides.com";
const localBase = process.env.LOCAL_BASE || "http://127.0.0.1:3000";
const widths = [375, 768, 1440];
const pages = [
  ["home", "/"],
  ["shop", "/shop"],
  ["product", "/product/retatrutide"],
  ["about", "/about"],
  ["contact", "/contact"],
  ["faqs", "/faqs"],
  ["privacy", "/privacy-policy"],
  ["terms", "/terms-and-conditions"],
  ["cookies", "/cookie-policy"],
  ["shipping", "/shipping-policy"],
  ["disclaimer", "/disclaimer"],
];

function heightFor(width) {
  if (width <= 375) return 812;
  if (width <= 768) return 1024;
  return 900;
}

async function shoot(page, url, cart) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForTimeout(1200);
  if (cart) {
    const button = page.getByRole("button", { name: "Cart", exact: true });
    if (await button.count()) await button.click();
    await page.waitForTimeout(400);
  }
  return await page.screenshot({ type: "png" });
}

function compare(liveBuf, localBuf) {
  const live = PNG.sync.read(liveBuf);
  const local = PNG.sync.read(localBuf);
  const width = Math.min(live.width, local.width);
  const height = Math.min(live.height, local.height);
  const a = new PNG({ width, height });
  const b = new PNG({ width, height });
  PNG.bitblt(live, a, 0, 0, width, height, 0, 0);
  PNG.bitblt(local, b, 0, 0, width, height, 0, 0);
  const diff = new PNG({ width, height });
  const mismatched = pixelmatch(a.data, b.data, diff.data, width, height, { threshold: 0.1 });
  const side = new PNG({ width: width * 2 + 8, height });
  PNG.bitblt(a, side, 0, 0, width, height, 0, 0);
  PNG.bitblt(b, side, 0, 0, width, height, width + 8, 0);
  return {
    percent: Number(((mismatched / (width * height)) * 100).toFixed(2)),
    mismatched,
    pixels: width * height,
    side: PNG.sync.write(side),
    diff: PNG.sync.write(diff),
  };
}

const browser = await chromium.launch();
const report = [];
for (const width of widths) {
  const context = await browser.newContext({
    viewport: { width, height: heightFor(width) },
    deviceScaleFactor: 1,
  });
  const livePage = await context.newPage();
  const localPage = await context.newPage();
  for (const [name, path] of pages) {
    const liveBuf = await shoot(livePage, liveBase + path, false);
    const localBuf = await shoot(localPage, localBase + path, false);
    const result = compare(liveBuf, localBuf);
    const stem = `${width}-${name}`;
    writeFileSync(resolve(outDir, `${stem}-side.png`), result.side);
    writeFileSync(resolve(outDir, `${stem}-diff.png`), result.diff);
    report.push({ width, page: name, path, diffPercent: result.percent, mismatched: result.mismatched, pixels: result.pixels });
    console.log(stem, result.percent + "%");
  }
  const liveCart = await shoot(livePage, liveBase + "/", true);
  const localCart = await shoot(localPage, localBase + "/", true);
  const cart = compare(liveCart, localCart);
  writeFileSync(resolve(outDir, `${width}-cart-side.png`), cart.side);
  writeFileSync(resolve(outDir, `${width}-cart-diff.png`), cart.diff);
  report.push({ width, page: "cart", path: "/ (cart drawer)", diffPercent: cart.percent, mismatched: cart.mismatched, pixels: cart.pixels });
  console.log(`${width}-cart`, cart.percent + "%");
  await context.close();
}
writeFileSync(resolve(outDir, "report.json"), JSON.stringify({ at: new Date().toISOString(), liveBase, localBase, report }, null, 2));
await browser.close();
const avg = report.reduce((sum, row) => sum + row.diffPercent, 0) / report.length;
console.log("average", avg.toFixed(2));
