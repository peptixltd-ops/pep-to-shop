import { toast } from "sonner";

export const SHOPIFY_API_VERSION = "2025-07";
export const SHOPIFY_STORE_PERMANENT_DOMAIN = "cqdyni-4v.myshopify.com";
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = "b20f6326fed24e760c7ebd7e2a8873aa";

export const POND_VENDOR = "Pondok Peptides";

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    vendor?: string;
    seo?: { title: string | null; description: string | null } | null;
    priceRange: {
      minVariantPrice: { amount: string; currencyCode: string };
    };
    images: {
      edges: Array<{ node: { url: string; altText: string | null } }>;
    };
      variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          sku?: string | null;
          price: { amount: string; currencyCode: string };
          availableForSale: boolean;
          selectedOptions: Array<{ name: string; value: string }>;
        };
      }>;
    };
    options: Array<{ name: string; values: string[] }>;
  };
}

type ShopifyImageEdge = ShopifyProduct["node"]["images"]["edges"][number];

function getProductImageScore(image: ShopifyImageEdge["node"]) {
  const text = `${image.url} ${image.altText ?? ""}`.toLowerCase();
  let score = 0;

  if (["vial", "bottle", "mockup", "packshot", "product"].some((token) => text.includes(token))) {
    score += 2;
  }

  if (["label", "flat", "sticker", "artwork"].some((token) => text.includes(token))) {
    score -= 3;
  }

  return score;
}

export function getSortedProductImageEdges(images: ShopifyProduct["node"]["images"]["edges"] = []) {
  return [...images].sort((a, b) => getProductImageScore(b.node) - getProductImageScore(a.node));
}

export function getPrimaryProductImage(product: Pick<ShopifyProduct["node"], "images">) {
  return getSortedProductImageEdges(product.images.edges)[0]?.node ?? null;
}

export const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          vendor
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 5) { edges { node { url altText } } }
          variants(first: 10) {
            edges {
              node {
                id
                title
                sku
                price { amount currencyCode }
                availableForSale
                selectedOptions { name value }
              }
            }
          }
          options { name values }
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      handle
      vendor
      priceRange { minVariantPrice { amount currencyCode } }
      images(first: 10) { edges { node { url altText } } }
      variants(first: 20) {
        edges {
          node {
            id
            title
            sku
            price { amount currencyCode }
            availableForSale
            selectedOptions { name value }
          }
        }
      }
      options { name values }
    }
  }
`;

export async function getShopifyProducts(first = 50, query?: string) {
  const scopedQuery = query ? `vendor:"${POND_VENDOR}" ${query}` : `vendor:"${POND_VENDOR}"`;
  const data = await storefrontApiRequest(PRODUCTS_QUERY, { first, query: scopedQuery });
  const edges = (data?.data?.products?.edges || []) as ShopifyProduct[];
  return edges.filter((e) => !e.node.vendor || e.node.vendor === POND_VENDOR);
}

export async function getShopifyProductByHandle(handle: string) {
  const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
  const product = (data?.data?.product || null) as ShopifyProduct["node"] | null;
  if (product && product.vendor && product.vendor !== POND_VENDOR) return null;
  return product;
}

export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description: "Shopify API access requires an active billing plan. Visit https://admin.shopify.com to upgrade.",
    });
    return;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: { message: string }) => e.message).join(", ")}`);
  }
  return data;
}

export function formatPrice(amount: string, currencyCode: string) {
  const symbol = currencyCode === "GBP" ? "£" : currencyCode === "USD" ? "$" : currencyCode === "EUR" ? "€" : `${currencyCode} `;
  return `${symbol}${parseFloat(amount).toFixed(2)}`;
}
