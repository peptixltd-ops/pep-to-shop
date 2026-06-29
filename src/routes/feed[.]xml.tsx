import { createFileRoute } from "@tanstack/react-router";
import {
  SHOPIFY_STOREFRONT_URL,
  SHOPIFY_STOREFRONT_TOKEN,
} from "@/lib/shopify";

const SITE = "https://pondokpeptides.com";
const BRAND = "Pondok Peptides";
const GOOGLE_PRODUCT_CATEGORY = "5826";

// Handles (lowercased) of SKUs that must be excluded from Shopping ads
// but remain eligible for Free Listings.
const EXCLUDED_FROM_SHOPPING_ADS = new Set<string>([
  "pt-141",
  "retatrutide",
  "semaglutide",
  "tirzepatide",
  "cagrilintide",
  "klow",
]);

interface FeedProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  vendor: string | null;
  productType: string | null;
  updatedAt: string;
  images: Array<{ url: string; altText: string | null }>;
  variants: Array<{
    id: string;
    sku: string | null;
    title: string;
    availableForSale: boolean;
    price: { amount: string; currencyCode: string };
  }>;
}

const FEED_QUERY = `
  query FeedProducts($cursor: String) {
    products(first: 250, after: $cursor, query: "vendor:\\"Pondok Peptides\\"") {
      edges {
        cursor
        node {
          id
          handle
          title
          description
          vendor
          productType
          updatedAt
          images(first: 10) { edges { node { url altText } } }
          variants(first: 50) {
            edges {
              node {
                id
                sku
                title
                availableForSale
                price { amount currencyCode }
              }
            }
          }
        }
      }
      pageInfo { hasNextPage }
    }
  }
`;

async function fetchAllProducts(): Promise<FeedProduct[]> {
  const out: FeedProduct[] = [];
  let cursor: string | null = null;
  for (let i = 0; i < 10; i++) {
    const res = await fetch(SHOPIFY_STOREFRONT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query: FEED_QUERY, variables: { cursor } }),
    });
    if (!res.ok) break;
    const json = (await res.json()) as {
      data?: {
        products?: {
          edges: Array<{
            cursor: string;
            node: {
              id: string;
              handle: string;
              title: string;
              description: string;
              vendor: string | null;
              productType: string | null;
              updatedAt: string;
              images: { edges: Array<{ node: { url: string; altText: string | null } }> };
              variants: {
                edges: Array<{
                  node: {
                    id: string;
                    sku: string | null;
                    title: string;
                    availableForSale: boolean;
                    price: { amount: string; currencyCode: string };
                  };
                }>;
              };
            };
          }>;
          pageInfo: { hasNextPage: boolean };
        };
      };
    };
    const edges = json.data?.products?.edges ?? [];
    for (const e of edges) {
      const n = e.node;
      if (n.vendor && n.vendor !== BRAND) continue;
      out.push({
        id: n.id,
        handle: n.handle,
        title: n.title,
        description: n.description,
        vendor: n.vendor,
        productType: n.productType,
        updatedAt: n.updatedAt,
        images: n.images.edges.map((x) => x.node),
        variants: n.variants.edges.map((x) => x.node),
      });
    }
    if (!json.data?.products?.pageInfo.hasNextPage) break;
    cursor = edges[edges.length - 1]?.cursor ?? null;
    if (!cursor) break;
  }
  return out;
}

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function cdata(s: string): string {
  return `<![CDATA[${(s ?? "").replace(/\]\]>/g, "]]]]><![CDATA[>")}]]>`;
}

function buildItem(p: FeedProduct, v: FeedProduct["variants"][number]): string {
  const link = `${SITE}/product/${p.handle}`;
  const image = p.images[0]?.url ?? "";
  const additionalImages = p.images.slice(1, 11).map((i) => i.url);
  const price = `${parseFloat(v.price.amount).toFixed(2)} ${v.price.currencyCode}`;
  const availability = v.availableForSale ? "in_stock" : "out_of_stock";
  const itemId = v.sku && v.sku.trim().length > 0 ? v.sku : `${p.handle}-${v.id.split("/").pop()}`;
  const title = v.title && v.title !== "Default Title" ? `${p.title} - ${v.title}` : p.title;
  const handleLower = p.handle.toLowerCase();
  const excluded = EXCLUDED_FROM_SHOPPING_ADS.has(handleLower);

  const lines: string[] = [];
  lines.push("<item>");
  lines.push(`<g:id>${xmlEscape(itemId)}</g:id>`);
  lines.push(`<title>${cdata(title)}</title>`);
  lines.push(`<description>${cdata(p.description || title)}</description>`);
  lines.push(`<link>${xmlEscape(link)}</link>`);
  if (image) lines.push(`<g:image_link>${xmlEscape(image)}</g:image_link>`);
  for (const ai of additionalImages) {
    lines.push(`<g:additional_image_link>${xmlEscape(ai)}</g:additional_image_link>`);
  }
  lines.push(`<g:availability>${availability}</g:availability>`);
  lines.push(`<g:price>${xmlEscape(price)}</g:price>`);
  lines.push(`<g:brand>${xmlEscape(p.vendor || BRAND)}</g:brand>`);
  lines.push(`<g:condition>new</g:condition>`);
  lines.push(`<g:identifier_exists>false</g:identifier_exists>`);
  lines.push(`<g:google_product_category>${GOOGLE_PRODUCT_CATEGORY}</g:google_product_category>`);
  if (p.productType) lines.push(`<g:product_type>${cdata(p.productType)}</g:product_type>`);
  lines.push(`<g:mpn>${xmlEscape(itemId)}</g:mpn>`);
  if (excluded) {
    lines.push(`<g:excluded_destination>Shopping_ads</g:excluded_destination>`);
  }
  lines.push("</item>");
  return lines.join("");
}

export const Route = createFileRoute("/feed.xml")({
  
  server: {
    handlers: {
      GET: async () => {
        let products: FeedProduct[] = [];
        try {
          products = await fetchAllProducts();
        } catch {
          products = [];
        }

        const items: string[] = [];
        for (const p of products) {
          const variants = p.variants.length > 0 ? p.variants : [];
          for (const v of variants) items.push(buildItem(p, v));
        }

        const now = new Date().toUTCString();
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
<title>${xmlEscape(BRAND)} - Research Peptides Feed</title>
<link>${SITE}</link>
<description>Google Merchant product feed for ${xmlEscape(BRAND)}. For in-vitro laboratory research use only.</description>
<lastBuildDate>${now}</lastBuildDate>
${items.join("\n")}
</channel>
</rss>`;

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
