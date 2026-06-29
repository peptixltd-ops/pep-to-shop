import { createFileRoute } from "@tanstack/react-router";
import { blogPosts } from "@/data/blog";
import { categories } from "@/data/categories";
import {
  SHOPIFY_STOREFRONT_URL,
  SHOPIFY_STOREFRONT_TOKEN,
} from "@/lib/shopify";

const SITE = "https://pondokpeptides.com";

const STATIC_ROUTES: Array<{ path: string; changefreq: string; priority: string }> = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/shop", changefreq: "weekly", priority: "0.9" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/about", changefreq: "monthly", priority: "0.6" },
  { path: "/reviews", changefreq: "weekly", priority: "0.7" },
  { path: "/faqs", changefreq: "monthly", priority: "0.6" },
  { path: "/contact", changefreq: "monthly", priority: "0.5" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms-and-conditions", changefreq: "yearly", priority: "0.3" },
  { path: "/cookie-policy", changefreq: "yearly", priority: "0.3" },
  { path: "/disclaimer", changefreq: "yearly", priority: "0.3" },
  { path: "/returns-policy", changefreq: "yearly", priority: "0.3" },
  { path: "/refund-policy", changefreq: "yearly", priority: "0.3" },
  { path: "/shipping-policy", changefreq: "yearly", priority: "0.3" },
  { path: "/cancellation-policy", changefreq: "yearly", priority: "0.3" },
  { path: "/sitemap", changefreq: "monthly", priority: "0.3" },
];

async function fetchAllProductHandles(): Promise<Array<{ handle: string; updatedAt: string }>> {
  const handles: Array<{ handle: string; updatedAt: string }> = [];
  let cursor: string | null = null;
  // paginate up to ~5 pages of 250 = 1250 products (more than enough)
  for (let i = 0; i < 5; i++) {
    const query = `
      query AllProducts($cursor: String) {
        products(first: 250, after: $cursor) {
          edges {
            cursor
            node { handle updatedAt }
          }
          pageInfo { hasNextPage }
        }
      }
    `;
    const res = await fetch(SHOPIFY_STOREFRONT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables: { cursor } }),
    });
    if (!res.ok) break;
    const json = (await res.json()) as {
      data?: {
        products?: {
          edges: Array<{ cursor: string; node: { handle: string; updatedAt: string } }>;
          pageInfo: { hasNextPage: boolean };
        };
      };
    };
    const edges = json.data?.products?.edges ?? [];
    for (const e of edges) handles.push({ handle: e.node.handle, updatedAt: e.node.updatedAt });
    if (!json.data?.products?.pageInfo.hasNextPage) break;
    cursor = edges[edges.length - 1]?.cursor ?? null;
    if (!cursor) break;
  }
  return handles;
}

function urlTag(loc: string, opts: { lastmod?: string; changefreq?: string; priority?: string } = {}) {
  const parts = [`<loc>${loc}</loc>`];
  if (opts.lastmod) parts.push(`<lastmod>${opts.lastmod.slice(0, 10)}</lastmod>`);
  if (opts.changefreq) parts.push(`<changefreq>${opts.changefreq}</changefreq>`);
  if (opts.priority) parts.push(`<priority>${opts.priority}</priority>`);
  return `  <url>${parts.join("")}</url>`;
}

export const Route = createFileRoute("/sitemap.xml")({
  
  server: {
    handlers: {
      GET: async () => {
        let products: Array<{ handle: string; updatedAt: string }> = [];
        try {
          products = await fetchAllProductHandles();
        } catch {
          products = [];
        }

        const urls: string[] = [];

        for (const r of STATIC_ROUTES) {
          urls.push(urlTag(`${SITE}${r.path}`, { changefreq: r.changefreq, priority: r.priority }));
        }

        for (const c of categories) {
          urls.push(urlTag(`${SITE}/${c.slug}`, { changefreq: "weekly", priority: "0.85" }));
        }

        for (const p of products) {
          urls.push(
            urlTag(`${SITE}/product/${p.handle}`, {
              lastmod: p.updatedAt,
              changefreq: "weekly",
              priority: "0.9",
            }),
          );
        }

        for (const post of blogPosts) {
          urls.push(
            urlTag(`${SITE}/blog/${post.slug}`, {
              lastmod: post.date,
              changefreq: "monthly",
              priority: "0.7",
            }),
          );
        }

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=600, s-maxage=3600",
          },
        });
      },
    },
  },
});
