export type BlogFAQ = { q: string; a: string };

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  /** ISO date */
  date: string;
  readingMinutes: number;
  category: "Compound guide" | "Lab protocol";
  /** product handles internally cross-linked from this post */
  productLinks: string[];
  /** category slugs cross-linked */
  categoryLinks: string[];
  /** related blog slugs for "related guides" block */
  relatedSlugs: string[];
  sections: { h2: string; body: string[] }[];
  faqs: BlogFAQ[];
};

const RECON_CTA =
  "Pair every reconstitution with sterile bacteriostatic water for laboratory-grade results.";

export const blogPosts: BlogPost[] = [
  {
    slug: "what-is-retatrutide",
    title: "What is Retatrutide? A Research Guide",
    metaTitle: "What is Retatrutide? UK Research Guide | Pondok Peptides",
    metaDescription:
      "What is Retatrutide? A complete UK research guide to the triple GLP-1 / GIP / glucagon agonist, mechanism of action, current literature and how to buy Retatrutide UK.",
    excerpt:
      "Retatrutide is the triple incretin agonist defining the next generation of metabolic peptide research. Here is the full UK research guide.",
    date: "2026-04-15",
    readingMinutes: 9,
    category: "Compound guide",
    productLinks: ["retatrutide", "tirzepatide", "semaglutide", "bacteriostatic-water"],
    categoryLinks: ["glp1-research-peptides"],
    relatedSlugs: ["how-to-reconstitute-peptides", "how-to-store-peptides"],
    sections: [
      {
        h2: "Introduction to Retatrutide",
        body: [
          "Retatrutide (LY-3437943) is a synthetic peptide currently described in published literature as the most potent metabolic peptide agonist studied to date. Unlike Semaglutide, which acts as a single GLP-1 receptor agonist, or Tirzepatide, which is a dual GIP/GLP-1 agonist, Retatrutide engages three receptors at once: GLP-1, GIP and glucagon.",
          "This triple-agonist profile is the reason it has dominated metabolic research conversation since its phase 2 data was published. For laboratories studying incretin biology, Retatrutide is the most complete tool currently available.",
        ],
      },
      {
        h2: "Mechanism of action",
        body: [
          "GLP-1 receptor agonism slows gastric emptying and modulates appetite-related signalling. GIP receptor agonism contributes additive metabolic effects observed in dual-agonist research. Glucagon receptor agonism, the third leg, recruits an additional energy-expenditure pathway by influencing hepatic glucose handling and lipid metabolism.",
          "The combined receptor coverage is what produces the magnitude of metabolic outcomes seen in current literature.",
        ],
      },
      {
        h2: "How Retatrutide compares to Tirzepatide and Semaglutide",
        body: [
          "Semaglutide is the original long-acting GLP-1 reference compound. Tirzepatide added GIP for additive effect. Retatrutide adds glucagon receptor agonism on top of that, producing a third dimension of metabolic modulation. The three sit on a clear receptor-coverage spectrum, which is why they are frequently studied head-to-head.",
          "If your lab is comparing incretin strategies, Pondok stocks all three. See our GLP-1 research peptides category for the full lineup.",
        ],
      },
      {
        h2: "Reconstitution and storage",
        body: [
          "Retatrutide is supplied as a lyophilised powder. Bring the vial to room temperature, then reconstitute slowly down the side of the vial with sterile bacteriostatic water. Store reconstituted material at 2 to 8 degrees Celsius and use within 28 days. Unopened lyophilised vials should be stored at minus 20 degrees Celsius for long-term stability.",
          RECON_CTA,
        ],
      },
      {
        h2: "Buying Retatrutide UK",
        body: [
          "Pondok Peptides supplies Retatrutide UK with batch-specific Certificates of Analysis on every vial. Independent third-party HPLC verification confirms purity at 98 percent or higher. UK orders placed before 3pm ship the same working day on tracked next-day courier.",
        ],
      },
    ],
    faqs: [
      { q: "What is Retatrutide?", a: "Retatrutide is a triple agonist peptide engaging the GLP-1, GIP and glucagon receptors. It is the most potent metabolic peptide currently described in published literature." },
      { q: "Is Retatrutide stronger than Tirzepatide?", a: "In current published research data, Retatrutide produces larger metabolic effects than Tirzepatide due to the additional glucagon receptor agonism." },
      { q: "How do I store Retatrutide?", a: "Lyophilised vials at minus 20 degrees Celsius long term. Reconstituted material at 2 to 8 degrees Celsius for up to 28 days." },
      { q: "Is Retatrutide third-party tested at Pondok?", a: "Yes. Every batch is independently HPLC tested with a Certificate of Analysis available on the product page." },
    ],
  },
  {
    slug: "bpc-157-guide",
    title: "BPC-157: A Complete Research Guide",
    metaTitle: "BPC-157 UK Research Guide | Mechanism, Dosing & Storage | Pondok Peptides",
    metaDescription:
      "Complete BPC-157 UK research guide. Learn the mechanism of action, current literature, reconstitution, storage and where to buy BPC-157 UK with verified COAs.",
    excerpt:
      "BPC-157 (Body Protection Compound 157) is one of the most studied structural research peptides. Full UK guide with mechanism, storage and protocol.",
    date: "2026-04-10",
    readingMinutes: 10,
    category: "Compound guide",
    productLinks: ["bpc-157-tb-500-mix", "tb-500", "bacteriostatic-water"],
    categoryLinks: ["structural-research-peptides"],
    relatedSlugs: ["tb-500-guide", "how-to-reconstitute-peptides"],
    sections: [
      {
        h2: "What is BPC-157?",
        body: [
          "BPC-157 (Body Protection Compound 157) is a synthetic pentadecapeptide derived from a partial sequence of a protective gastric protein. It is one of the most extensively studied compounds in structural research peptide literature, with literature spanning tendon, ligament, muscle, gastrointestinal and vascular models.",
        ],
      },
      {
        h2: "Mechanism of action",
        body: [
          "Current research suggests BPC-157 influences nitric oxide system signalling, growth factor expression and angiogenesis. It has been observed to support cell migration and extracellular matrix remodelling in laboratory models.",
          "Its stability profile is unusual compared to many peptides, which is part of what made it attractive to researchers in the first place.",
        ],
      },
      {
        h2: "Why pair BPC-157 with TB-500?",
        body: [
          "BPC-157 and TB-500 are the canonical structural-research peptide pairing in current research. They act through complementary mechanisms, BPC-157 on growth factor and angiogenic pathways, TB-500 on actin sequestration and cell migration. Pondok offers a pre-blended BPC-157 / TB-500 mix vial for protocol consistency.",
          "See the full TB-500 guide for the partner compound's profile.",
        ],
      },
      {
        h2: "Reconstitution and storage",
        body: [
          "Supplied as lyophilised powder. Reconstitute with sterile bacteriostatic water at room temperature. Store reconstituted material at 2 to 8 degrees Celsius for up to 28 days. Lyophilised vials store at minus 20 degrees Celsius long term.",
          RECON_CTA,
        ],
      },
      {
        h2: "Buying BPC-157 UK",
        body: [
          "Pondok Peptides supplies BPC-157 UK with batch-specific COAs and tracked next-day UK delivery. Every batch is HPLC verified at 98 percent purity or higher.",
        ],
      },
    ],
    faqs: [
      { q: "What does BPC-157 stand for?", a: "Body Protection Compound 157, referring to a protective sequence originally derived from gastric juice." },
      { q: "Can BPC-157 be reconstituted with TB-500?", a: "Yes, this is the basis of the Pondok BPC-157 / TB-500 mix vial. For independent dose control, reconstitute each separately." },
      { q: "What is the purity of Pondok BPC-157?", a: "All BPC-157 batches at Pondok are HPLC verified at 98 percent purity or higher with batch-specific COA." },
      { q: "How should I store reconstituted BPC-157?", a: "At 2 to 8 degrees Celsius and use within 28 days. Avoid repeated freeze-thaw cycles." },
    ],
  },
  {
    slug: "tb-500-guide",
    title: "TB-500: A Complete Research Guide",
    metaTitle: "TB-500 UK Research Guide | Mechanism & Storage | Pondok Peptides",
    metaDescription:
      "Complete TB500 UK research guide. Learn the mechanism, how it pairs with BPC-157, reconstitution, storage and where to buy TB-500 UK with verified COAs.",
    excerpt:
      "TB-500 is the bioactive fragment of Thymosin Beta-4 and one of the most studied structural research peptides. Here is the complete UK research guide.",
    date: "2026-04-08",
    readingMinutes: 9,
    category: "Compound guide",
    productLinks: ["tb-500", "bpc-157-tb-500-mix", "bacteriostatic-water"],
    categoryLinks: ["structural-research-peptides"],
    relatedSlugs: ["bpc-157-guide", "how-to-store-peptides"],
    sections: [
      {
        h2: "What is TB-500?",
        body: [
          "TB-500 is the synthetic active fragment of the larger Thymosin Beta-4 protein. It retains the studied bioactivity of the full-length protein while being more practical to synthesise to high HPLC purity.",
        ],
      },
      {
        h2: "Mechanism of action",
        body: [
          "Thymosin Beta-4 is a major actin-sequestering protein in cells. TB-500 has been observed in research models to influence cell migration, extracellular matrix remodelling and angiogenesis. It is one of the most discussed structural research peptides in current literature.",
        ],
      },
      {
        h2: "Why pair TB-500 with BPC-157?",
        body: [
          "TB-500 and BPC-157 act through complementary mechanisms, which is why they are routinely studied together. Pondok offers them individually and as a pre-blended mix vial for laboratories that want a consistent protocol.",
        ],
      },
      {
        h2: "Reconstitution and storage",
        body: [
          "TB-500 is supplied as lyophilised powder. Reconstitute with sterile bacteriostatic water at room temperature. Store reconstituted material at 2 to 8 degrees Celsius for up to 28 days. Lyophilised at minus 20 degrees Celsius long term.",
          RECON_CTA,
        ],
      },
      {
        h2: "Buying TB-500 UK",
        body: [
          "Pondok Peptides supplies TB-500 UK with batch-specific Certificates of Analysis. Every vial is third-party HPLC tested at 98 percent purity or higher and ships next-day across the UK.",
        ],
      },
    ],
    faqs: [
      { q: "Is TB-500 the same as Thymosin Beta-4?", a: "TB-500 is the synthetic active fragment of Thymosin Beta-4. It is not the full-length protein but retains the studied bioactivity." },
      { q: "Can TB-500 be combined with BPC-157?", a: "Yes. The combination is the most studied structural-research pairing in current literature, available pre-blended in Pondok's BPC-157 / TB-500 mix." },
      { q: "What purity is Pondok TB-500?", a: "98 percent or higher, HPLC verified, with batch-specific COA on the product page." },
      { q: "How long does reconstituted TB-500 last?", a: "Up to 28 days at 2 to 8 degrees Celsius under sterile conditions." },
    ],
  },
  {
    slug: "ghk-cu-guide",
    title: "GHK-Cu: A Complete Research Guide",
    metaTitle: "GHK-Cu UK Research Guide | Copper Peptide Mechanism | Pondok Peptides",
    metaDescription:
      "Complete GHK-Cu UK research guide. Mechanism of the copper tripeptide, role in extracellular matrix research, storage and where to buy GHK-Cu UK.",
    excerpt:
      "GHK-Cu is a copper tripeptide originating from human plasma, studied for extracellular matrix and dermal remodelling research. Here is the full guide.",
    date: "2026-04-05",
    readingMinutes: 8,
    category: "Compound guide",
    productLinks: ["ghk-cu", "mots-c", "nad", "bacteriostatic-water"],
    categoryLinks: ["senescence-research-peptides"],
    relatedSlugs: ["mots-c-guide", "how-to-store-peptides"],
    sections: [
      {
        h2: "What is GHK-Cu?",
        body: [
          "GHK-Cu is a naturally occurring copper-binding tripeptide (glycyl-histidyl-lysine) originally identified in human plasma. Its concentration declines with age, which is part of why it has attracted such consistent research interest in dermal and senescence-pathway research contexts.",
        ],
      },
      {
        h2: "Mechanism of action",
        body: [
          "GHK-Cu has been observed to influence collagen synthesis, glycosaminoglycan production and extracellular matrix signalling. The copper-bound form (GHK-Cu) is the form most studied in research, distinct from the free tripeptide GHK.",
        ],
      },
      {
        h2: "Pairing with MOTS-C and NAD",
        body: [
          "GHK-Cu sits within the broader senescence research peptide stack alongside MOTS-C (mitochondrial-derived peptide) and NAD precursor research compounds. Together they cover dermal, mitochondrial and cellular energetics pathways.",
        ],
      },
      {
        h2: "Storage",
        body: [
          "GHK-Cu is light-sensitive. Store lyophilised at minus 20 degrees Celsius and shield from direct UV. After reconstitution with bacteriostatic water, refrigerate at 2 to 8 degrees Celsius and use within 28 days.",
          RECON_CTA,
        ],
      },
      {
        h2: "Buying GHK-Cu UK",
        body: [
          "Pondok supplies GHK-Cu UK with batch-specific COAs. Every batch is HPLC verified and ships next day across the UK.",
        ],
      },
    ],
    faqs: [
      { q: "What is the difference between GHK and GHK-Cu?", a: "GHK is the base tripeptide. GHK-Cu is the copper-bound complex, which is the form most studied in research." },
      { q: "Is GHK-Cu light-sensitive?", a: "Yes. Store away from direct UV and in opaque or shielded containers where possible." },
      { q: "What purity is Pondok GHK-Cu?", a: "98 percent or higher with batch-specific COA available on the product page." },
      { q: "Can GHK-Cu be paired with MOTS-C?", a: "Yes, both are commonly studied within the same senescence research peptide stack." },
    ],
  },
  {
    slug: "mots-c-guide",
    title: "MOTS-C: A Complete Research Guide",
    metaTitle: "MOTS-C UK Research Guide | Mitochondrial Peptide | Pondok Peptides",
    metaDescription:
      "Complete MOTS-C UK research guide. Learn about the mitochondrial-derived peptide, mechanism, current literature, storage and where to buy MOTS-C UK.",
    excerpt:
      "MOTS-C is a mitochondrial-derived peptide encoded within mtDNA, studied for metabolic regulation and mitochondrial biogenesis. Full guide here.",
    date: "2026-04-02",
    readingMinutes: 8,
    category: "Compound guide",
    productLinks: ["mots-c", "ghk-cu", "nad", "bacteriostatic-water"],
    categoryLinks: ["senescence-research-peptides"],
    relatedSlugs: ["ghk-cu-guide", "how-to-reconstitute-peptides"],
    sections: [
      {
        h2: "What is MOTS-C?",
        body: [
          "MOTS-C (Mitochondrial Open Reading Frame of the Twelve S rRNA Type-C) is a 16 amino acid peptide encoded within the mitochondrial 12S rRNA gene. It is one of a small number of identified mitochondrial-derived peptides currently studied for systemic metabolic effects.",
        ],
      },
      {
        h2: "Mechanism of action",
        body: [
          "Current research indicates MOTS-C may influence AMPK signalling and metabolic homeostasis. It is studied in research models for its potential role in glucose handling, mitochondrial biogenesis and exercise-related adaptation.",
        ],
      },
      {
        h2: "Place in the senescence research stack",
        body: [
          "MOTS-C frequently sits alongside GHK-Cu, NAD precursors and SS-31 in laboratory senescence research, each compound covering different mitochondrial or cellular pathways.",
        ],
      },
      {
        h2: "Storage",
        body: [
          "Store lyophilised MOTS-C at minus 20 degrees Celsius long term. Reconstitute with sterile bacteriostatic water and refrigerate at 2 to 8 degrees Celsius. Use within 28 days.",
          RECON_CTA,
        ],
      },
      {
        h2: "Buying MOTS-C UK",
        body: [
          "Pondok Peptides supplies MOTS-C UK as research-grade lyophilised material with batch-specific COAs and HPLC verified purity.",
        ],
      },
    ],
    faqs: [
      { q: "Is MOTS-C a mitochondrial peptide?", a: "Yes. MOTS-C is encoded within mitochondrial DNA and is one of the studied mitochondrial-derived peptides." },
      { q: "What is the purity of Pondok MOTS-C?", a: "98 percent or higher, HPLC verified, with batch COA on the product page." },
      { q: "Can MOTS-C be combined with NAD?", a: "Yes. Researchers frequently study them in parallel within the senescence research peptide stack." },
      { q: "How should MOTS-C be stored?", a: "Lyophilised at minus 20 degrees Celsius. Reconstituted at 2 to 8 degrees Celsius for up to 28 days." },
    ],
  },
  {
    slug: "how-to-store-peptides",
    title: "How to Store Peptides Correctly: A Lab Protocol",
    metaTitle: "How to Store Peptides Correctly | UK Lab Protocol | Pondok Peptides",
    metaDescription:
      "How to store peptides correctly. Lyophilised storage, reconstituted storage, freeze-thaw cycles and light exposure. Full UK lab protocol from Pondok Peptides.",
    excerpt:
      "Correct peptide storage is the difference between intact research material and degraded compound. Here is the complete lab storage protocol.",
    date: "2026-03-28",
    readingMinutes: 8,
    category: "Lab protocol",
    productLinks: ["bacteriostatic-water", "bpc-157-tb-500-mix", "retatrutide"],
    categoryLinks: ["structural-research-peptides", "glp1-research-peptides"],
    relatedSlugs: ["how-to-reconstitute-peptides", "bpc-157-guide"],
    sections: [
      {
        h2: "Why storage matters",
        body: [
          "Peptides are biologically active molecules. Improper storage causes hydrolysis, oxidation, aggregation and loss of activity. Even short periods at the wrong temperature can compromise a research batch.",
        ],
      },
      {
        h2: "Lyophilised storage",
        body: [
          "Lyophilised (freeze-dried) peptides should be stored at minus 20 degrees Celsius for long-term stability. For short-term use over a few weeks, refrigeration at 2 to 8 degrees Celsius is acceptable. Always allow a refrigerated or frozen vial to reach room temperature before opening to prevent moisture condensation inside the vial.",
        ],
      },
      {
        h2: "Reconstituted storage",
        body: [
          "Once reconstituted with sterile bacteriostatic water, store at 2 to 8 degrees Celsius and use within 28 days. Aliquot into single-use volumes where possible to avoid repeated freeze-thaw cycles, which are one of the leading causes of activity loss.",
        ],
      },
      {
        h2: "Light and air exposure",
        body: [
          "Some peptides (notably GHK-Cu) are light-sensitive and should be shielded from direct UV. All peptides should remain sealed until use, as freeze-dried material readily absorbs ambient moisture.",
        ],
      },
      {
        h2: "Freeze-thaw cycles",
        body: [
          "Repeated freezing and thawing accelerates degradation. Plan aliquot volumes around your protocol so each thawed vial is used in a single session.",
        ],
      },
    ],
    faqs: [
      { q: "What temperature should lyophilised peptides be stored at?", a: "Minus 20 degrees Celsius for long-term storage, or 2 to 8 degrees Celsius for short-term use within a few weeks." },
      { q: "How long does reconstituted peptide last?", a: "Up to 28 days at 2 to 8 degrees Celsius under sterile conditions." },
      { q: "Why should I avoid freeze-thaw cycles?", a: "Each freeze-thaw cycle accelerates degradation. Aliquot reconstituted material into single-use volumes." },
      { q: "Are peptides light-sensitive?", a: "Some are, notably GHK-Cu. Store away from direct UV exposure." },
    ],
  },
  {
    slug: "how-to-reconstitute-peptides",
    title: "How to Reconstitute Peptides: Step-by-Step Lab Protocol",
    metaTitle: "How to Reconstitute Peptides | Step-by-Step UK Protocol | Pondok Peptides",
    metaDescription:
      "How to reconstitute peptides correctly. Step-by-step UK lab protocol with bacteriostatic water, sterile technique and storage. From Pondok Peptides.",
    excerpt:
      "Reconstitution sets the baseline for every downstream measurement. Here is the complete step-by-step lab protocol.",
    date: "2026-03-25",
    readingMinutes: 7,
    category: "Lab protocol",
    productLinks: ["bacteriostatic-water", "retatrutide", "bpc-157-tb-500-mix", "ghk-cu"],
    categoryLinks: ["glp1-research-peptides", "structural-research-peptides", "senescence-research-peptides"],
    relatedSlugs: ["how-to-store-peptides", "what-is-retatrutide"],
    sections: [
      {
        h2: "What you need",
        body: [
          "A vial of lyophilised peptide, a vial of sterile bacteriostatic water, a sterile syringe and needle, alcohol swabs, and a clean working surface. Bacteriostatic water is the standard reconstitution solvent for research peptides because it includes 0.9 percent benzyl alcohol to inhibit bacterial growth.",
        ],
      },
      {
        h2: "Step-by-step protocol",
        body: [
          "1. Bring both the peptide vial and the bacteriostatic water to room temperature. This prevents condensation inside the lyophilised vial and helps preserve compound integrity.",
          "2. Wipe both vial stoppers with an alcohol swab.",
          "3. Draw the required volume of bacteriostatic water into the syringe.",
          "4. Insert the needle into the peptide vial at an angle so the water flows down the side of the vial onto the lyophilised cake. Do not jet water directly onto the cake, this causes mechanical degradation.",
          "5. Allow the cake to dissolve passively. Gently swirl, never shake. Shaking introduces air bubbles and can denature the peptide.",
          "6. Once fully dissolved, label the vial with the date of reconstitution and store at 2 to 8 degrees Celsius.",
        ],
      },
      {
        h2: "Calculating concentration",
        body: [
          "Concentration is total peptide mass divided by reconstitution volume. For example, a 5 mg vial reconstituted with 2 ml of bacteriostatic water yields a concentration of 2.5 mg/ml. Standardising reconstitution volume across your protocol simplifies downstream measurement.",
        ],
      },
      {
        h2: "Sterile technique",
        body: [
          "Always use a fresh sterile syringe and needle. Never reuse needles between vials. Bacteriostatic water inhibits bacterial growth but is not a substitute for clean technique.",
        ],
      },
    ],
    faqs: [
      { q: "What water should I use to reconstitute peptides?", a: "Sterile bacteriostatic water with 0.9 percent benzyl alcohol is the standard for research reconstitution." },
      { q: "Why should I add water to the side of the vial, not directly on the cake?", a: "Direct jets of water onto the lyophilised cake can cause mechanical degradation. Adding water down the side allows passive dissolution." },
      { q: "Can I shake the vial to dissolve the cake faster?", a: "No. Shaking introduces air bubbles and can denature the peptide. Swirl gently and let the cake dissolve passively." },
      { q: "How long is reconstituted peptide stable?", a: "Up to 28 days at 2 to 8 degrees Celsius under sterile conditions." },
    ],
  },
];

export const blogBySlug: Record<string, BlogPost> = Object.fromEntries(
  blogPosts.map((p) => [p.slug, p]),
);
