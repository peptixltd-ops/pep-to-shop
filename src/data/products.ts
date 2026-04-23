export type Product = {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  category: "Recovery" | "Performance" | "Sleep" | "Daily";
  benefits: string[];
};

export const products: Product[] = [
  { slug: "marine-collagen", name: "Marine Collagen Peptides", tagline: "Skin, hair & joint support", price: 38, category: "Daily", benefits: ["10g hydrolysed peptides", "Type I & III", "Unflavoured"] },
  { slug: "creatine-monohydrate", name: "Pure Creatine Monohydrate", tagline: "Strength & power output", price: 28, category: "Performance", benefits: ["5g per serving", "Micronised", "Informed-Sport tested"] },
  { slug: "magnesium-glycinate", name: "Magnesium Glycinate", tagline: "Recovery & calm", price: 24, category: "Sleep", benefits: ["High absorption", "Gentle on stomach", "300mg elemental"] },
  { slug: "electrolyte-blend", name: "Daily Electrolyte Blend", tagline: "Hydration that performs", price: 32, category: "Performance", benefits: ["Sodium, potassium, magnesium", "Zero sugar", "Citrus flavour"] },
  { slug: "recovery-protein", name: "Whey Recovery Protein", tagline: "Lean muscle recovery", price: 44, category: "Recovery", benefits: ["24g protein", "Grass-fed", "Vanilla bean"] },
  { slug: "omega-3", name: "Triple-Strength Omega-3", tagline: "Heart, brain & joints", price: 30, category: "Daily", benefits: ["1200mg EPA/DHA", "Sustainably sourced", "No fishy aftertaste"] },
  { slug: "ashwagandha", name: "Ashwagandha KSM-66", tagline: "Stress & resilience", price: 26, category: "Sleep", benefits: ["600mg standardised", "Clinically studied", "Vegan capsules"] },
  { slug: "vitamin-d3-k2", name: "Vitamin D3 + K2", tagline: "Bone & immune support", price: 22, category: "Daily", benefits: ["4000IU D3", "100mcg MK-7", "Olive oil base"] },
];
