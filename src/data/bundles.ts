export type Bundle = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  /** Shopify product handles, in display order */
  productHandles: string[];
  /** Visual-only saving - no automatic Shopify discount yet */
  discountPercent: number;
};

export const bundles: Bundle[] = [
  {
    slug: "glp-1-stack",
    title: "GLP-1 Research Stack",
    tagline: "Triple-agonist comparison kit",
    description:
      "Compare the three leading incretin research peptides side-by-side: Retatrutide (triple agonist), Tirzepatide (dual GIP/GLP-1) and Semaglutide (GLP-1 reference) for in-vitro receptor signalling characterisation.",
    productHandles: ["retatrutide", "tirzepatide", "semaglutide"],
    discountPercent: 10,
  },
];

export function findBundlesForProduct(handle: string): Bundle[] {
  return bundles.filter((b) => b.productHandles.includes(handle));
}

export function getBundleBySlug(slug: string): Bundle | undefined {
  return bundles.find((b) => b.slug === slug);
}
