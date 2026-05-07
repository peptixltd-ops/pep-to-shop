export type Bundle = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  /** Shopify product handles, in display order */
  productHandles: string[];
  /** Visual-only saving — no automatic Shopify discount yet */
  discountPercent: number;
};

export const bundles: Bundle[] = [
  {
    slug: "glp-1-stack",
    title: "GLP-1 Research Stack",
    tagline: "Triple-agonist comparison kit",
    description:
      "Compare the three leading metabolic peptides side-by-side: Retatrutide (triple agonist), Tirzepatide (dual GIP/GLP-1) and Semaglutide (GLP-1 reference).",
    productHandles: ["retatrutide", "tirzepatide", "semaglutide"],
    discountPercent: 10,
  },
  {
    slug: "recovery-stack",
    title: "Recovery & Repair Stack",
    tagline: "Soft-tissue research bundle",
    description:
      "BPC-157, TB-500 and GHK-Cu, the three most studied peptides in soft-tissue, vascular and connective-tissue recovery research.",
    productHandles: ["bpc-157", "tb-500", "ghk-cu"],
    discountPercent: 10,
  },
  {
    slug: "longevity-stack",
    title: "Longevity & Mitochondria Stack",
    tagline: "Cellular energy research bundle",
    description:
      "NAD+, MOTS-C and Epitalon, paired for mitochondrial, metabolic and cellular-ageing research models.",
    productHandles: ["nad", "mots-c", "epitalon"],
    discountPercent: 10,
  },
];

export function findBundlesForProduct(handle: string): Bundle[] {
  return bundles.filter((b) => b.productHandles.includes(handle));
}

export function getBundleBySlug(slug: string): Bundle | undefined {
  return bundles.find((b) => b.slug === slug);
}
