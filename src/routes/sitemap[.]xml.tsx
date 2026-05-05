import { createFileRoute } from "@tanstack/react-router";
import { categories } from "@/data/categories";
import { blogPosts } from "@/data/blog";

const BASE = "https://pondokpeptides.com";

const STATIC = [
  { loc: "/", priority: "1.0", freq: "weekly" },
  { loc: "/shop", priority: "0.9", freq: "weekly" },
  { loc: "/blog", priority: "0.8", freq: "weekly" },
  { loc: "/about", priority: "0.6", freq: "monthly" },
  { loc: "/reviews", priority: "0.7", freq: "weekly" },
  { loc: "/faqs", priority: "0.6", freq: "monthly" },
  { loc: "/contact", priority: "0.5", freq: "monthly" },
];

const PRODUCT_HANDLES = [
  "retatrutide", "tirzepatide", "semaglutide", "bpc-157-tb-500-mix", "tb-500",
  "ghk-cu", "nad", "mots-c", "ipamorelin", "cagrilintide", "selank", "semax",
  "tesamorelin", "igf-lr3", "ss-31", "pt-141", "klow", "bacteriostatic-water",
];

function buildSitemap() {
  const urls: string[] = [];
  for (const s of STATIC) urls.push(`<url><loc>${BASE}${s.loc}</loc><changefreq>${s.freq}</changefreq><priority>${s.priority}</priority></url>`);
  for (const c of categories) urls.push(`<url><loc>${BASE}/${c.slug}</loc><changefreq>weekly</changefreq><priority>0.85</priority></url>`);
  for (const h of PRODUCT_HANDLES) urls.push(`<url><loc>${BASE}/product/${h}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`);
  for (const p of blogPosts) urls.push(`<url><loc>${BASE}/blog/${p.slug}</loc><lastmod>${p.date}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => new Response(buildSitemap(), { headers: { "Content-Type": "application/xml; charset=utf-8" } }),
    },
  },
});
