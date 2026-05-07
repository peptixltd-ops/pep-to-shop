// Long-form, product-specific FAQs for SEO (long-tail capture) and conversion.
// Each FAQ block expands the standard storage / reconstitution / shipping /
// batch testing / research-use compliance topics with product-specific context.

export type ProductFAQ = { q: string; a: string };

const COMMON_SHIPPING: ProductFAQ = {
  q: "How is this peptide shipped within the UK?",
  a: "Orders placed before 3pm Mon–Fri ship the same working day via tracked next-day courier (Royal Mail or DPD). Vials are packed in temperature-buffered, discreet outer packaging and arrive in 1–2 working days for UK addresses. Tracking is emailed at dispatch.",
};

const COMMON_BATCH_TESTING: ProductFAQ = {
  q: "Is every batch independently third-party tested?",
  a: "Yes. Every batch is verified by HPLC for purity and identity, with mass spectrometry confirmation where applicable. An in-house Certificate of Analysis is published on the product page, and we routinely commission independent third-party testing on batches at random to confirm internal results. Researchers requiring batch-specific external verification can request the lot reference and arrange independent testing.",
};

const COMMON_COMPLIANCE: ProductFAQ = {
  q: "Are these peptides legal to buy in the UK for research?",
  a: "Yes. This product is supplied as a research-grade compound, intended exclusively for in-vitro laboratory research. It is not a medicine and is not intended for human or veterinary use, ingestion, injection, or use in food, drugs or cosmetics. Buyers are responsible for handling, storing and using the material in compliance with their institutional and local laboratory safety standards.",
};

export const PRODUCT_FAQS: Record<string, ProductFAQ[]> = {
  "retatrutide": [
    {
      q: "How should Retatrutide be stored before and after reconstitution?",
      a: "Lyophilised Retatrutide vials should be stored at -20°C for long-term stability, or refrigerated at 2–8°C if intended for use within 30 days. Once reconstituted with bacteriostatic water, the solution is generally stable refrigerated at 2–8°C for up to 28 days under sterile handling. Always allow vials to reach room temperature before opening to prevent condensation, and protect from direct light at all times.",
    },
    {
      q: "How is Retatrutide reconstituted for laboratory use?",
      a: "Reconstitute the lyophilised powder with bacteriostatic water (commonly 1–3 mL per 5–10 mg vial, depending on the working concentration required). Inject the diluent slowly down the inside wall of the vial, do not inject directly onto the cake, and gently swirl until fully dissolved. Do not shake. Bacteriostatic water is sold separately and is recommended for laboratory reconstitution work over plain sterile water for solutions stored beyond 24 hours.",
    },
    {
      q: "What purity does Retatrutide ship at, and what does the COA confirm?",
      a: "Retatrutide ships at a typical HPLC purity of ≥98%. The Certificate of Analysis confirms peptide identity (sequence, molecular formula and weight), HPLC purity, MS or LC-MS identity confirmation where applicable, appearance of the lyophilised cake, and a batch / lot reference. The latest COA is downloadable on the product page.",
    },
    COMMON_SHIPPING,
    COMMON_BATCH_TESTING,
    {
      q: "Why does the Retatrutide vial look almost empty?",
      a: "This is normal. A 5 mg or 10 mg dose of peptide is a very small mass of material and typically presents as a thin film, a small disc, or a barely visible powder at the bottom of the vial. Mass cannot be reliably verified by weighing the vial, the glass, stopper and crimp seal dwarf the peptide weight. The proper verification method is analytical testing (HPLC / MS), as referenced in the COA.",
    },
    COMMON_COMPLIANCE,
  ],

  "tirzepatide": [
    {
      q: "How should Tirzepatide be stored before and after reconstitution?",
      a: "Lyophilised Tirzepatide is stable for up to 24 months at -20°C unopened, or for short-term use at 2–8°C. After reconstitution with bacteriostatic water, the solution should be stored at 2–8°C and used within 28 days under sterile conditions. Avoid repeated freeze–thaw cycles. Keep vials away from direct light and let them reach room temperature before opening to prevent moisture ingress.",
    },
    {
      q: "What diluent is recommended to reconstitute Tirzepatide?",
      a: "Bacteriostatic water (0.9% benzyl alcohol in sterile water) is the standard diluent for laboratory reconstitution of Tirzepatide because the preservative inhibits microbial growth in solutions stored beyond 24 hours. Inject the diluent slowly down the wall of the vial, swirl gently, and do not shake. The volume used depends on the target working concentration for the research protocol. Bacteriostatic water is sold separately on our store.",
    },
    {
      q: "What is the purity specification for Tirzepatide?",
      a: "Tirzepatide is supplied at a typical HPLC purity of ≥98%. The COA published on the product page confirms identity (sequence, molecular formula and weight), HPLC purity, MS confirmation where applicable, lyophilised appearance and the batch / lot reference. Researchers requiring batch-specific external verification can request the lot number and commission independent third-party HPLC.",
    },
    COMMON_SHIPPING,
    COMMON_BATCH_TESTING,
    {
      q: "Can Tirzepatide be combined with other peptides for research?",
      a: "Combination protocols are at the discretion of the researcher and depend on the experimental design. Tirzepatide is commonly studied alongside other GLP-1 / GIP-class compounds such as Retatrutide, Semaglutide and Cagrilintide in published metabolic research. Any combination work should be planned with appropriate analytical controls, and stored in line with the most restrictive stability profile of the compounds involved.",
    },
    COMMON_COMPLIANCE,
  ],

  "bpc-157": [
    {
      q: "How should BPC-157 be stored before and after reconstitution?",
      a: "Store lyophilised BPC-157 at -20°C for long-term stability, or refrigerated at 2–8°C if used within 30 days. Once reconstituted with bacteriostatic water, store at 2–8°C and use within 28 days. BPC-157 is light-sensitive, keep vials in their original packaging and away from direct light. Allow refrigerated or frozen vials to reach room temperature before opening to prevent condensation forming inside the vial.",
    },
    {
      q: "How is BPC-157 reconstituted in the lab?",
      a: "Reconstitute the lyophilised cake using bacteriostatic water as the diluent. Typical research volumes range from 1–3 mL of diluent per 5 mg vial, adjusted to the target working concentration. Add the diluent slowly down the inside wall of the vial, do not inject directly onto the powder, and swirl gently until clear. Do not shake. Bacteriostatic water is sold separately.",
    },
    {
      q: "What purity does BPC-157 ship at?",
      a: "BPC-157 is supplied at a typical HPLC purity of ≥98%. The downloadable in-house COA on the product page confirms identity (sequence, molecular formula and weight), HPLC purity, MS confirmation where applicable, lyophilised appearance and a batch / lot reference. Independent third-party verification can be arranged on request using the lot reference.",
    },
    {
      q: "Is BPC-157 commonly paired with TB-500 in research?",
      a: "Yes. BPC-157 and TB-500 are frequently studied together in tissue-repair research. We also offer a pre-formulated BPC-157 + TB-500 mix for protocols that benefit from a single reconstituted vial. As with any combination work, follow the most restrictive stability and storage profile of the compounds involved and document analytical controls separately.",
    },
    COMMON_SHIPPING,
    COMMON_BATCH_TESTING,
    COMMON_COMPLIANCE,
  ],
};

export function getProductFAQs(handle: string): ProductFAQ[] {
  return PRODUCT_FAQS[handle] || [];
}
