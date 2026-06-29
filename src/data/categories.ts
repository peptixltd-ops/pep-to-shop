export type CategoryFAQ = { q: string; a: string };

export type Category = {
  slug: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  productHandles: string[];
  /** ordered, semantic content sections rendered as H2 + prose */
  sections: { h2: string; body: string[] }[];
  faqs: CategoryFAQ[];
};

const TRUST_LINE =
  "Every batch is independently HPLC characterised with a verified Certificate of Analysis, supplied for in-vitro laboratory research only by Pondok Peptides, a UK research peptide supplier.";

export const categories: Category[] = [
  {
    slug: "glp1-research-peptides",
    title: "GLP-1 Research Peptides",
    h1: "GLP-1 Research Peptides UK",
    metaTitle:
      "GLP-1 Research Peptides UK | Retatrutide, Tirzepatide, Semaglutide | Pondok Peptides",
    metaDescription:
      "GLP-1 research peptides supplied in the UK for in-vitro laboratory study. Retatrutide, Tirzepatide and Semaglutide reference material with batch-specific COAs.",
    intro:
      "GLP-1 research peptides are widely studied tools for in-vitro receptor signalling research. Pondok Peptides supplies Retatrutide, Tirzepatide, Semaglutide and Cagrilintide as lyophilised reference material with verified HPLC purity for laboratory study only.",
    productHandles: ["retatrutide", "tirzepatide", "semaglutide", "cagrilintide"],
    sections: [
      {
        h2: "Retatrutide, Tirzepatide and Semaglutide reference material",
        body: [
          "Retatrutide is a synthetic peptide referenced in incretin receptor signalling research at the GLP-1, GIP and glucagon receptors. Tirzepatide is referenced as a dual GIP/GLP-1 receptor research peptide, and Semaglutide is the long-acting GLP-1 reference analogue used in comparative in-vitro work.",
          "All three are supplied by Pondok Peptides as lyophilised research-grade material with batch-specific Certificates of Analysis. Each vial is supplied exclusively for in-vitro laboratory research. " +
            TRUST_LINE,
        ],
      },
      {
        h2: "Why researchers choose Pondok for GLP-1 reference peptides",
        body: [
          "We commission independent third-party HPLC characterisation on every batch and publish the resulting COA on each product page. Lot numbers on each vial match the certificate, supporting reproducible analytical work.",
          "Discreet packaging, tracked next-day UK dispatch, and a UK-based support team that responds within four working hours. We do not split shipments, we do not substitute lots, and we do not dispatch without a sealed, intact lyophilised cake.",
        ],
      },
      {
        h2: "Receptor signalling overview",
        body: [
          "Semaglutide is referenced as a GLP-1 receptor research peptide. Tirzepatide is referenced for dual GIP and GLP-1 receptor activity in published in-vitro literature. Retatrutide is referenced for activity at GLP-1, GIP and glucagon receptors in current research literature.",
          "Cagrilintide, a long-acting amylin analogue, is frequently studied as a complementary co-agonist alongside Semaglutide in receptor signalling research. Pondok supplies all four for comparative in-vitro work.",
        ],
      },
      {
        h2: "Reconstitution and storage",
        body: [
          "GLP-1 research peptides are supplied as lyophilised powder. Reconstitute with sterile bacteriostatic water at room temperature and store reconstituted material at 2 to 8 degrees Celsius for up to 28 days. Unopened vials should be stored at minus 20 degrees Celsius for long-term stability.",
          "Pair every vial with bacteriostatic water for clean, contamination-free reconstitution. See our blog guide on how to reconstitute peptides for the full step-by-step protocol.",
        ],
      },
    ],
    faqs: [
      {
        q: "Which GLP-1 research peptide has the broadest receptor profile in literature?",
        a: "Retatrutide is referenced in current literature as active at GLP-1, GIP and glucagon receptors. Tirzepatide is referenced as a dual GIP/GLP-1 reference peptide, and Semaglutide is the standard single-receptor GLP-1 reference compound.",
      },
      {
        q: "Are these peptides legal to supply for research in the UK?",
        a: "Yes. All compounds are supplied strictly as research chemicals for in-vitro laboratory use only, in line with UK and EU regulations. They are not medicines, supplements or food products.",
      },
      {
        q: "Do you ship Retatrutide, Tirzepatide and Semaglutide together?",
        a: "Yes. Combined orders ship in a single tracked, discreet, temperature-controlled package by next-day UK courier when placed before 3pm.",
      },
      {
        q: "What purity should I expect?",
        a: "All Pondok GLP-1 research peptides are HPLC characterised at a minimum of 98 percent purity, with batch-specific COAs available for download on each product page.",
      },
    ],
  },
  {
    slug: "structural-research-peptides",
    title: "Structural Research Peptides",
    h1: "Structural Research Peptides UK",
    metaTitle:
      "Structural Research Peptides UK | BPC-157, TB-500 Reference Material | Pondok Peptides",
    metaDescription:
      "Structural research peptides supplied in the UK for in-vitro laboratory study. BPC-157 and TB-500 reference material with batch-specific COAs and HPLC verification.",
    intro:
      "Structural research peptides such as BPC-157 and TB-500 are studied in vitro for their roles in cellular pathway research, including actin sequestration and angiogenesis signalling. Pondok Peptides supplies both as research-grade lyophilised powder, with batch-specific Certificates of Analysis on every product page.",
    productHandles: ["bpc-157-tb-500-mix", "tb-500"],
    sections: [
      {
        h2: "BPC-157 and TB-500 reference material",
        body: [
          "BPC-157 (Body Protection Compound 157) is a synthetic pentadecapeptide reference compound derived from a gastric protein sequence. TB-500 (the bioactive fragment of Thymosin Beta-4) is widely referenced in actin sequestration and cell migration research.",
          "These two compounds are frequently paired in in-vitro cellular pathway research, which is why Pondok offers a dedicated BPC-157 / TB-500 mix vial alongside the standalone TB-500 product. " +
            TRUST_LINE,
        ],
      },
      {
        h2: "Why pair BPC-157 with TB-500 in vitro?",
        body: [
          "Current literature references BPC-157 and TB-500 as acting through complementary cellular pathways. BPC-157 is referenced in growth-factor expression and angiogenesis signalling research, while TB-500 is referenced for cell migration and actin regulation. Together they form one of the most studied combinations in structural research.",
          "Pondok supplies the combination as a pre-blended mix vial for protocol consistency, alongside individual TB-500 vials for researchers running standalone in-vitro work.",
        ],
      },
      {
        h2: "Quality and analytical characterisation",
        body: [
          "Every BPC-157 and TB-500 batch ships with a Certificate of Analysis confirming identity by mass spectrometry and purity by HPLC. Lyophilised under nitrogen and sealed with crimped aluminium caps for stability.",
          "Pondok is a UK research peptide supplier built around analytical verification, not marketing claims. If a vial leaves our facility, it has a matching, downloadable certificate.",
        ],
      },
      {
        h2: "Storage and handling",
        body: [
          "Store lyophilised BPC-157 and TB-500 at minus 20 degrees Celsius for long-term stability. After reconstitution with bacteriostatic water, refrigerate at 2 to 8 degrees Celsius and use within 28 days. Avoid repeated freeze-thaw cycles.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are BPC-157 and TB-500 third-party characterised?",
        a: "Yes. Pondok Peptides commissions independent HPLC and MS characterisation on every batch of BPC-157 and TB-500. Certificates are available on each product page.",
      },
      {
        q: "What is the difference between TB-500 and Thymosin Beta-4?",
        a: "TB-500 is the synthetic active fragment of the larger Thymosin Beta-4 protein. The fragment retains the studied in-vitro activity while being easier to synthesise to high purity.",
      },
      {
        q: "Can BPC-157 and TB-500 be reconstituted in the same vial?",
        a: "Yes, this is why Pondok offers a pre-blended BPC-157 / TB-500 mix. For researchers who want independent dosing in vitro, we recommend reconstituting each vial separately with bacteriostatic water.",
      },
      {
        q: "Do you ship BPC-157 to the UK with next-day delivery?",
        a: "Yes. UK orders placed before 3pm ship the same working day on tracked next-day courier service.",
      },
    ],
  },
  {
    slug: "senescence-research-peptides",
    title: "Senescence Research Peptides",
    h1: "Senescence Research Peptides UK",
    metaTitle:
      "Senescence Research Peptides UK | GHK-Cu, MOTS-C, NAD+ Reference Material | Pondok Peptides",
    metaDescription:
      "Senescence pathway research peptides supplied in the UK for in-vitro study. GHK-Cu, MOTS-C and NAD+ reference material with batch-specific COAs.",
    intro:
      "Senescence pathway research peptides cover compounds referenced in mitochondrial signalling, cellular pathway research and copper-mediated extracellular matrix research. Pondok Peptides supplies GHK-Cu, MOTS-C and NAD+ as research-grade lyophilised material, all third-party characterised.",
    productHandles: ["ghk-cu", "mots-c", "nad", "ss-31"],
    sections: [
      {
        h2: "GHK-Cu, MOTS-C and NAD+ reference material",
        body: [
          "GHK-Cu is a copper tripeptide reference compound studied in extracellular matrix signalling research. MOTS-C is a mitochondrial-derived peptide referenced in cellular pathway research. NAD+ precursor peptides are referenced in cellular energetics and sirtuin pathway research.",
          "All three are supplied by Pondok with batch-specific COAs and shipped under tracked UK delivery. " +
            TRUST_LINE,
        ],
      },
      {
        h2: "The senescence pathway research stack",
        body: [
          "Researchers frequently study GHK-Cu, MOTS-C and NAD+ in parallel to compare in-vitro effects across mitochondrial, dermal and cellular signalling pathways. SS-31 (Elamipretide) is also commonly included for its referenced cardiolipin-binding profile in mitochondrial research.",
          "Pondok stocks all four for direct comparative in-vitro work.",
        ],
      },
      {
        h2: "Purity and analytical characterisation",
        body: [
          "Every senescence pathway research peptide leaves our facility with a Certificate of Analysis confirming identity, mass and purity. Pondok works exclusively with audited synthesis partners and commissions independent analytical characterisation on every lot.",
        ],
      },
      {
        h2: "Storage protocol",
        body: [
          "Store lyophilised senescence pathway research peptides at minus 20 degrees Celsius long term. After reconstitution with sterile bacteriostatic water, refrigerate at 2 to 8 degrees Celsius and use within 28 days. GHK-Cu in particular is light-sensitive and should be stored away from direct UV exposure.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between GHK-Cu and standard GHK?",
        a: "GHK is the base tripeptide. GHK-Cu is the copper-bound complex, which is the form most referenced in research literature. Pondok supplies the copper-bound complex.",
      },
      {
        q: "Is MOTS-C a mitochondrial peptide?",
        a: "Yes. MOTS-C is encoded within mitochondrial DNA and is referenced in cellular pathway research and mitochondrial biogenesis studies.",
      },
      {
        q: "What is the NAD+ form you supply?",
        a: "Pondok supplies a research-grade NAD+ formulation for in-vitro laboratory use. Full specifications and batch COA are listed on the NAD+ product page.",
      },
      {
        q: "Are these peptides stable in shipping?",
        a: "Yes. Lyophilised peptides are stable at ambient temperatures for short transit periods. We ship promptly so material spends minimal time in transit before refrigeration.",
      },
    ],
  },
  {
    slug: "neuro-research-peptides",
    title: "Neuro Research Peptides",
    h1: "Neuro Research Peptides UK",
    metaTitle:
      "Neuro Research Peptides UK | Semax, Selank Reference Material | Pondok Peptides",
    metaDescription:
      "Neuro research peptides supplied in the UK for in-vitro laboratory study. Semax and Selank reference material with batch-specific COAs and HPLC verification.",
    intro:
      "Neuro research peptides such as Semax and Selank are Russian-origin reference compounds studied in vitro for their roles in cellular pathway research, including BDNF expression and receptor signalling. Pondok Peptides supplies both as third-party characterised research material.",
    productHandles: ["semax", "selank"],
    sections: [
      {
        h2: "Semax and Selank reference material",
        body: [
          "Semax is a synthetic heptapeptide originating from a fragment of adrenocorticotropic hormone (ACTH 4-10), referenced in BDNF expression research. Selank is a synthetic analogue of the immunomodulatory peptide tuftsin, referenced in receptor signalling research in current literature.",
          "Both are supplied by Pondok as lyophilised research-grade material with batch-specific COAs. " +
            TRUST_LINE,
        ],
      },
      {
        h2: "Why study Semax and Selank in parallel?",
        body: [
          "Researchers commonly compare Semax and Selank head to head in vitro. Semax is referenced in BDNF expression research, while Selank is referenced in receptor signalling research. Together they form the canonical Russian-origin neuro research pair in current literature.",
        ],
      },
      {
        h2: "Analytical characterisation and purity",
        body: [
          "Every batch of Semax and Selank ships with a Certificate of Analysis confirming sequence by mass spectrometry and purity by HPLC at 98 percent or higher.",
        ],
      },
      {
        h2: "Storage",
        body: [
          "Store lyophilised Semax and Selank at minus 20 degrees Celsius for long-term stability. After reconstitution, refrigerate at 2 to 8 degrees Celsius and use within 28 days.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are Semax and Selank the same compound?",
        a: "No. Semax is derived from ACTH (4-10) and is referenced in BDNF expression research. Selank is derived from tuftsin and is referenced in receptor signalling research.",
      },
      {
        q: "What purity is your Selank?",
        a: "All Pondok Selank batches are HPLC characterised at 98 percent purity or higher, with batch-specific COA available on the product page.",
      },
      {
        q: "Do you sell Semax and Selank as a pair?",
        a: "We supply them as separate vials so researchers can independently control concentration and protocol. Pair them in your cart for combined shipping.",
      },
      {
        q: "Are Semax and Selank legal in the UK?",
        a: "Yes, supplied strictly as research chemicals for in-vitro laboratory use only.",
      },
    ],
  },
  {
    slug: "endocrine-research-peptides",
    title: "Endocrine Research Peptides",
    h1: "Endocrine Research Peptides UK",
    metaTitle:
      "Endocrine Research Peptides UK | Ipamorelin, Tesamorelin, IGF-LR3 Reference Material | Pondok Peptides",
    metaDescription:
      "Endocrine signalling research peptides supplied in the UK for in-vitro study. Ipamorelin, Tesamorelin and IGF-LR3 reference material with batch-specific COAs.",
    intro:
      "Endocrine signalling research peptides cover GHRPs, GHRH analogues and IGF-1 variants used as reference compounds in vitro. Pondok Peptides supplies Ipamorelin, Tesamorelin and IGF-LR3 as research-grade lyophilised material, all with batch-specific third-party COAs.",
    productHandles: ["ipamorelin", "tesamorelin", "igf-lr3"],
    sections: [
      {
        h2: "Ipamorelin, Tesamorelin and IGF-LR3 reference material",
        body: [
          "Ipamorelin is a selective GHRP reference peptide studied for receptor signalling at the ghrelin receptor in vitro. Tesamorelin is a GHRH analogue widely referenced in endocrine signalling research. IGF-LR3 is a long-arginine variant of IGF-1 with extended in-vitro half-life used as a reference compound.",
          "All three are supplied by Pondok as lyophilised research-grade material with full batch documentation. " +
            TRUST_LINE,
        ],
      },
      {
        h2: "GHRP, GHRH and IGF-1 receptor signalling overview",
        body: [
          "GHRPs (such as Ipamorelin) are referenced as ghrelin receptor research peptides. GHRH analogues (such as Tesamorelin) are referenced as GHRH receptor research peptides. IGF-1 variants (such as IGF-LR3) are downstream signalling reference molecules studied independently in vitro.",
          "Pondok stocks one representative compound from each of the three classes so researchers can study the full endocrine signalling pathway.",
        ],
      },
      {
        h2: "Analytical characterisation and purity",
        body: [
          "Each Ipamorelin, Tesamorelin and IGF-LR3 batch ships with a Certificate of Analysis confirming identity and HPLC purity. Lyophilised under controlled conditions and stored cold from synthesis to dispatch.",
        ],
      },
      {
        h2: "Storage",
        body: [
          "Store lyophilised endocrine research peptides at minus 20 degrees Celsius long term. IGF-LR3 in particular benefits from minimised freeze-thaw exposure. After reconstitution, refrigerate at 2 to 8 degrees Celsius and use within 28 days.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the most selective GHRP reference peptide in current literature?",
        a: "Ipamorelin is generally referenced as the most selective GHRP in current literature, with minimal cross-activity in receptor signalling studies at the cortisol or prolactin pathways.",
      },
      {
        q: "What is the difference between IGF-1 and IGF-LR3?",
        a: "IGF-LR3 is a long-arginine analogue of IGF-1 with an extended half-life in vitro and reduced binding to IGF binding proteins.",
      },
      {
        q: "Is Tesamorelin a GHRH or a GHRP?",
        a: "Tesamorelin is a GHRH (growth hormone releasing hormone) analogue, not a GHRP. They act on different receptors.",
      },
      {
        q: "Do you third-party characterise endocrine research peptides?",
        a: "Yes. Every Ipamorelin, Tesamorelin and IGF-LR3 batch is independently HPLC characterised. COAs are downloadable from each product page.",
      },
    ],
  },
];

export const categoriesBySlug: Record<string, Category> = Object.fromEntries(
  categories.map((c) => [c.slug, c]),
);

/** Reverse lookup: which categories does this product belong to? */
export function getCategoriesForProduct(handle: string): Category[] {
  return categories.filter((c) => c.productHandles.includes(handle));
}
