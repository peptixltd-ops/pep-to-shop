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
  "Every batch is independently HPLC tested with a verified Certificate of Analysis, shipped with fast next-day UK delivery from Pondok Peptides, a trusted UK peptide supplier.";

export const categories: Category[] = [
  {
    slug: "glp1-metabolic-peptides",
    title: "GLP-1 & Metabolic Peptides",
    h1: "GLP-1 & Metabolic Peptides UK",
    metaTitle:
      "GLP-1 & Metabolic Peptides UK | Buy Retatrutide, Tirzepatide, Semaglutide | Pondok Peptides",
    metaDescription:
      "Buy GLP-1 and metabolic research peptides in the UK. Shop Retatrutide UK, Tirzepatide UK and Semaglutide UK with batch-specific third-party COAs and fast UK delivery.",
    intro:
      "GLP-1 and metabolic peptides are among the most studied compounds in modern incretin research. Whether you are exploring GLP-1 receptor activity with Semaglutide UK, the dual GIP/GLP-1 mechanism of Tirzepatide UK, or the next-generation triple agonist Retatrutide UK, Pondok Peptides supplies research-grade material with verified purity for laboratory study.",
    productHandles: ["retatrutide", "tirzepatide", "semaglutide", "cagrilintide"],
    sections: [
      {
        h2: "Buy Retatrutide UK, Tirzepatide UK and Semaglutide UK",
        body: [
          "Retatrutide is a triple incretin agonist targeting the GLP-1, GIP and glucagon receptors simultaneously, currently the most discussed metabolic peptide in clinical literature. Tirzepatide is a dual GIP/GLP-1 receptor agonist, and Semaglutide is the original long-acting GLP-1 analogue that defined the modern category.",
          "All three are supplied by Pondok Peptides as lyophilised research-grade material with batch-specific Certificates of Analysis. Each vial is intended exclusively for in-vitro laboratory research. " +
            TRUST_LINE,
        ],
      },
      {
        h2: "Why researchers choose Pondok for GLP-1 and metabolic peptides",
        body: [
          "We commission independent third-party HPLC testing on every batch and publish the resulting COA on each product page. That means when you buy Retatrutide UK, Tirzepatide UK or Semaglutide UK from Pondok, the lot number on the vial matches the certificate.",
          "Discreet packaging, tracked next-day UK delivery, and a UK-based support team that responds within four working hours. We do not split shipments, we do not substitute lots, and we do not ship without a sealed, intact lyophilised cake.",
        ],
      },
      {
        h2: "Mechanism of action overview",
        body: [
          "GLP-1 receptor agonists like Semaglutide slow gastric emptying and modulate appetite signalling in research models. Tirzepatide adds GIP receptor activity, which has shown additive metabolic effects in current literature. Retatrutide layers in glucagon receptor agonism, recruiting an additional energy expenditure pathway.",
          "Cagrilintide, a long-acting amylin analogue, is frequently studied as a complementary co-agonist alongside Semaglutide. Pondok supplies all four for laboratory comparison work.",
        ],
      },
      {
        h2: "Reconstitution and storage",
        body: [
          "GLP-1 and metabolic peptides are supplied as lyophilised powder. Reconstitute with sterile bacteriostatic water at room temperature and store reconstituted material at 2 to 8 degrees Celsius for up to 28 days. Unopened vials should be stored at minus 20 degrees Celsius for long-term stability.",
          "Pair every vial with our bacteriostatic water for clean, contamination-free reconstitution. See our blog guide on how to reconstitute peptides for the full step-by-step protocol.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the strongest GLP-1 / metabolic peptide currently in research?",
        a: "Retatrutide is currently the most potent in published literature, acting as a triple agonist on GLP-1, GIP and glucagon receptors. Tirzepatide is the strongest dual agonist, and Semaglutide remains the benchmark single-receptor GLP-1 reference compound.",
      },
      {
        q: "Are these peptides legal to buy in the UK?",
        a: "Yes. All compounds are sold strictly as research chemicals for in-vitro laboratory use, in line with UK and EU regulations. They are not medicines, supplements or food products.",
      },
      {
        q: "Do you ship Retatrutide, Tirzepatide and Semaglutide together?",
        a: "Yes. Combined orders ship in a single tracked, discreet, temperature-controlled package by next-day UK courier when placed before 3pm.",
      },
      {
        q: "What purity should I expect?",
        a: "All Pondok weight loss peptides are HPLC verified at a minimum of 98 percent purity, with batch-specific COAs available for download on each product page.",
      },
    ],
  },
  {
    slug: "tissue-repair-peptides",
    title: "Tissue Repair Peptides",
    h1: "Tissue Repair Peptides UK",
    metaTitle:
      "Tissue Repair Peptides UK | Buy BPC-157 UK, TB-500 UK | 3rd Party Tested | Pondok Peptides",
    metaDescription:
      "Buy tissue repair research peptides in the UK. Shop BPC-157 UK and TB500 UK with batch-specific third-party COAs, high purity and fast UK delivery from Pondok Peptides.",
    intro:
      "Tissue repair peptides such as BPC-157 UK and TB500 UK are studied for their roles in tissue regeneration, angiogenesis and gastrointestinal protection. Pondok Peptides supplies both as research-grade lyophilised powder, with batch-specific Certificates of Analysis available on every product page.",
    productHandles: ["bpc-157-tb-500-mix", "tb-500"],
    sections: [
      {
        h2: "Buy BPC-157 UK and TB500 UK",
        body: [
          "BPC-157 (Body Protection Compound 157) is a synthetic pentadecapeptide derived from a protective gastric protein. TB-500 (the bioactive fragment of Thymosin Beta-4) is widely studied for its role in actin sequestration and cell migration.",
          "These two compounds are frequently paired together in laboratory recovery research, which is why Pondok offers a dedicated BPC-157 / TB-500 mix vial alongside the standalone TB-500 product. " +
            TRUST_LINE,
        ],
      },
      {
        h2: "Why pair BPC-157 with TB-500?",
        body: [
          "Current research suggests BPC-157 and TB-500 act through complementary mechanisms. BPC-157 has been observed to influence growth factor expression and angiogenesis, while TB-500 plays a role in cell migration and actin regulation. Together they form one of the most studied combinations in tissue repair research.",
          "Pondok supplies the combination as a pre-blended mix vial for protocol consistency, alongside individual TB-500 vials for researchers who want to dose-titrate independently.",
        ],
      },
      {
        h2: "Quality and verification",
        body: [
          "Every BPC-157 and TB-500 batch ships with a Certificate of Analysis confirming identity by mass spectrometry and purity by HPLC. Lyophilised under nitrogen and sealed with crimped aluminium caps for stability.",
          "Pondok is a UK peptide supplier built around verification, not marketing claims. If a vial leaves our facility, it has a matching, downloadable certificate.",
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
        q: "Are BPC-157 and TB-500 third-party tested?",
        a: "Yes. Pondok Peptides commissions independent HPLC and MS testing on every batch of BPC-157 and TB-500. Certificates are available on each product page.",
      },
      {
        q: "What is the difference between TB-500 and Thymosin Beta-4?",
        a: "TB-500 is the synthetic active fragment of the larger Thymosin Beta-4 protein. The fragment retains the studied bioactivity while being easier to synthesise to high purity.",
      },
      {
        q: "Can BPC-157 and TB-500 be reconstituted in the same vial?",
        a: "Yes, this is why Pondok offers a pre-blended BPC-157 / TB-500 mix. For researchers who want independent dosing, we recommend reconstituting each vial separately with bacteriostatic water.",
      },
      {
        q: "Do you ship BPC-157 to the UK with next-day delivery?",
        a: "Yes. UK orders placed before 3pm ship the same working day on tracked next-day courier service.",
      },
    ],
  },
  {
    slug: "senolytic-longevity-peptides",
    title: "Senolytic & Longevity Peptides",
    h1: "Senolytic & Longevity Peptides UK",
    metaTitle:
      "Senolytic & Longevity Peptides UK | Buy GHK-Cu UK, MOTS-C UK, NAD Peptide UK | Pondok Peptides",
    metaDescription:
      "Buy senolytic and longevity research peptides in the UK. Shop GHK-Cu UK, MOTS-C UK and NAD peptide UK with batch-specific third-party COAs and fast UK delivery from Pondok Peptides.",
    intro:
      "Senolytic and longevity peptides are an emerging research category covering mitochondrial function, cellular signalling and copper-mediated repair. Pondok Peptides supplies GHK-Cu UK, MOTS-C UK and NAD peptide UK as research-grade lyophilised material, all third-party tested.",
    productHandles: ["ghk-cu", "mots-c", "nad", "ss-31"],
    sections: [
      {
        h2: "Buy GHK-Cu UK, MOTS-C UK and NAD Peptide UK",
        body: [
          "GHK-Cu is a copper tripeptide originating from human plasma, studied extensively for its role in extracellular matrix signalling and skin remodelling research. MOTS-C is a mitochondrial-derived peptide investigated for its influence on metabolic homeostasis. NAD precursor peptides are studied for their contribution to cellular energetics and sirtuin pathway activity.",
          "All three are supplied by Pondok with batch-specific COAs and shipped under tracked UK delivery. " +
            TRUST_LINE,
        ],
      },
      {
        h2: "The senolytic and longevity research stack",
        body: [
          "Researchers frequently study GHK-Cu, MOTS-C and NAD in parallel to compare effects across mitochondrial, dermal and cellular signalling pathways. SS-31 (Elamipretide) is also commonly included for its targeted mitochondrial cardiolipin binding profile.",
          "Pondok stocks all four senolytic and longevity peptides for direct comparative laboratory work.",
        ],
      },
      {
        h2: "Purity and verification",
        body: [
          "Every longevity peptide leaves our facility with a Certificate of Analysis confirming identity, mass and purity. Pondok works exclusively with audited synthesis partners and commissions independent verification on every lot.",
        ],
      },
      {
        h2: "Storage protocol",
        body: [
          "Store lyophilised senolytic and longevity peptides at minus 20 degrees Celsius long term. After reconstitution with sterile bacteriostatic water, refrigerate at 2 to 8 degrees Celsius and use within 28 days. GHK-Cu in particular is light-sensitive and should be stored away from direct UV exposure.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between GHK-Cu and standard GHK?",
        a: "GHK is the base tripeptide. GHK-Cu is the copper-bound complex which is the form most studied in research. Pondok supplies the copper-bound complex.",
      },
      {
        q: "Is MOTS-C a mitochondrial peptide?",
        a: "Yes. MOTS-C is encoded within mitochondrial DNA and is studied for its influence on metabolic regulation and mitochondrial biogenesis pathways.",
      },
      {
        q: "What is the NAD peptide form you supply?",
        a: "Pondok supplies a research-grade NAD+ formulation for laboratory use. Full specifications and batch COA are listed on the NAD product page.",
      },
      {
        q: "Are these peptides safe to ship in summer temperatures?",
        a: "Yes. Lyophilised peptides are stable at ambient temperatures for short transit periods. We ship promptly so material spends minimal time in transit before refrigeration.",
      },
    ],
  },
  {
    slug: "cognitive-neuropeptides",
    title: "Cognitive & Neuropeptides",
    h1: "Cognitive & Neuropeptides UK",
    metaTitle:
      "Cognitive & Neuropeptides UK | Buy Semax UK, Selank UK | 3rd Party Tested | Pondok Peptides",
    metaDescription:
      "Buy cognitive and neuropeptide research compounds in the UK. Shop Semax UK and Selank UK with batch-specific third-party COAs, high purity and fast UK delivery from Pondok Peptides.",
    intro:
      "Cognitive peptides and neuropeptides such as Semax UK and Selank UK are Russian-origin research compounds studied for their roles in modulating BDNF expression, attention and stress response in laboratory models. Pondok Peptides supplies both as third-party tested research material.",
    productHandles: ["semax", "selank"],
    sections: [
      {
        h2: "Buy Semax UK and Selank UK",
        body: [
          "Semax is a synthetic heptapeptide originating from a fragment of adrenocorticotropic hormone (ACTH 4-10), studied for its role in BDNF expression and neuroprotection research. Selank is a synthetic analogue of the immunomodulatory peptide tuftsin, studied for its anxiolytic-like profile in current literature.",
          "Both are supplied by Pondok as lyophilised research-grade material with batch-specific COAs. " +
            TRUST_LINE,
        ],
      },
      {
        h2: "Why pair Semax with Selank?",
        body: [
          "Researchers commonly compare Semax and Selank head to head. Semax is studied for BDNF modulation and attention, while Selank is studied for its calming, anxiolytic-like profile. Together they form the canonical Russian cognitive and neuropeptide pair in current literature.",
        ],
      },
      {
        h2: "Verification and purity",
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
        a: "No. Semax is derived from ACTH (4-10) and is studied for BDNF and attention. Selank is derived from tuftsin and is studied for anxiolytic-like effects.",
      },
      {
        q: "What purity is your Selank?",
        a: "All Pondok Selank batches are HPLC verified at 98 percent purity or higher with batch-specific COA available on the product page.",
      },
      {
        q: "Do you sell Semax and Selank as a pair?",
        a: "We supply them as separate vials so researchers can independently control concentration and protocol. Pair them in your cart for combined shipping.",
      },
      {
        q: "Are Semax and Selank legal in the UK?",
        a: "Yes, sold strictly as research chemicals for in-vitro laboratory use.",
      },
    ],
  },
  {
    slug: "growth-hormone-secretagogues",
    title: "Growth Hormone Secretagogues",
    h1: "Growth Hormone Secretagogues UK",
    metaTitle:
      "Growth Hormone Secretagogues UK | Buy Ipamorelin UK, Tesamorelin UK, IGF-LR3 UK | Pondok Peptides",
    metaDescription:
      "Buy growth hormone secretagogue research peptides in the UK. Shop Ipamorelin UK, Tesamorelin UK and IGF-LR3 UK with batch-specific third-party COAs and fast UK delivery.",
    intro:
      "Growth hormone secretagogues cover GHRPs, GHRH analogues and IGF-1 variants. Pondok Peptides supplies Ipamorelin UK, Tesamorelin UK and IGF-LR3 UK as research-grade lyophilised material, all with batch-specific third-party COAs.",
    productHandles: ["ipamorelin", "tesamorelin", "igf-lr3"],
    sections: [
      {
        h2: "Buy Ipamorelin UK, Tesamorelin UK and IGF-LR3 UK",
        body: [
          "Ipamorelin is a selective GHRP (growth hormone releasing peptide) studied for its clean GH-pulse profile without significant cortisol or prolactin influence. Tesamorelin is a GHRH analogue studied extensively in metabolic research. IGF-LR3 is a long-arginine variant of IGF-1 with extended in-vitro half-life.",
          "All three are supplied by Pondok as lyophilised research-grade material with full batch documentation. " +
            TRUST_LINE,
        ],
      },
      {
        h2: "GHRP, GHRH and IGF-1 explained",
        body: [
          "GHRPs (such as Ipamorelin) act on the ghrelin receptor to trigger GH release. GHRH analogues (such as Tesamorelin) work through the GHRH receptor to extend GH pulse amplitude. IGF-1 variants (such as IGF-LR3) are downstream signalling molecules studied independently from upstream GH triggers.",
          "Pondok stocks one representative compound from each of the three classes so researchers can study the full pathway.",
        ],
      },
      {
        h2: "Verification and purity",
        body: [
          "Each Ipamorelin, Tesamorelin and IGF-LR3 batch ships with a Certificate of Analysis confirming identity and HPLC purity. Lyophilised under controlled conditions and stored cold from synthesis to dispatch.",
        ],
      },
      {
        h2: "Storage",
        body: [
          "Store lyophilised growth hormone secretagogues at minus 20 degrees Celsius long term. IGF-LR3 in particular benefits from minimised freeze-thaw exposure. After reconstitution, refrigerate at 2 to 8 degrees Celsius and use within 28 days.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the cleanest GHRP for laboratory work?",
        a: "Ipamorelin is generally considered the most selective GHRP in current literature, with minimal effect on cortisol or prolactin pathways.",
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
        q: "Do you third-party test growth hormone secretagogues?",
        a: "Yes. Every Ipamorelin, Tesamorelin and IGF-LR3 batch is independently HPLC tested. COAs are downloadable from each product page.",
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
