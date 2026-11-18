import catalogue from "@/data/catalogue.json";

export const POND_VENDOR = "Pondok Peptides";
export const SHOPIFY_ACCOUNT_URL = "/account";

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    vendor?: string;
    seo?: { title: string | null; description: string | null } | null;
    priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    images: { edges: Array<{ node: { url: string; altText: string | null } }> };
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

type Edge = ShopifyProduct;

const localCatalogue = catalogue as Edge[];

function normalisePrice(amount: string) {
  const value = Number(amount);
  return Number.isFinite(value) ? value.toFixed(2) : amount;
}

function withPrices(products: Edge[]): Edge[] {
  return products.map((product) => ({
    ...product,
    node: {
      ...product.node,
      priceRange: {
        minVariantPrice: {
          ...product.node.priceRange.minVariantPrice,
          amount: normalisePrice(product.node.priceRange.minVariantPrice.amount),
        },
      },
      variants: {
        edges: product.node.variants.edges.map((edge) => ({
          ...edge,
          node: { ...edge.node, price: { ...edge.node.price, amount: normalisePrice(edge.node.price.amount) } },
        })),
      },
    },
  }));
}

export async function getShopifyProducts(first = 50) {
  const products = withPrices(localCatalogue).filter((edge) => !edge.node.vendor || edge.node.vendor === POND_VENDOR);
  return products.slice(0, first);
}

export async function getShopifyProductByHandle(handle: string) {
  const products = await getShopifyProducts(100);
  return products.find((edge) => edge.node.handle === handle)?.node ?? null;
}

export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  if (variables.handle) {
    return { data: { product: await getShopifyProductByHandle(String(variables.handle)) } };
  }
  if (query.includes("products")) {
    const edges = await getShopifyProducts(50);
    return { data: { products: { edges } } };
  }
  return { data: {} };
}

export function formatPrice(amount: string, currencyCode: string) {
  const symbol = currencyCode === "GBP" ? "£" : currencyCode === "USD" ? "$" : currencyCode === "EUR" ? "€" : `${currencyCode} `;
  return `${symbol}${parseFloat(amount).toFixed(2)}`;
}

type ImageEdge = ShopifyProduct["node"]["images"]["edges"][number];

function getProductImageScore(image: ImageEdge["node"]) {
  const text = `${image.url} ${image.altText ?? ""}`.toLowerCase();
  let score = 0;
  if (["vial", "bottle", "mockup", "packshot", "product"].some((token) => text.includes(token))) score += 2;
  if (["label", "flat", "sticker", "artwork"].some((token) => text.includes(token))) score -= 3;
  return score;
}

export function getSortedProductImageEdges(images: ShopifyProduct["node"]["images"]["edges"] = []) {
  return [...images].sort((a, b) => getProductImageScore(b.node) - getProductImageScore(a.node));
}

export function getPrimaryProductImage(product: Pick<ShopifyProduct["node"], "images">) {
  return getSortedProductImageEdges(product.images.edges)[0]?.node ?? null;
}
