import { Link } from "@tanstack/react-router";
import { getCategoriesForProduct } from "@/data/categories";

const SIBLING_LABEL: Record<string, string> = {
  "retatrutide": "Retatrutide (Research)",
  "tirzepatide": "Tirzepatide (Research)",
  "semaglutide": "Semaglutide (Research)",
  "cagrilintide": "Cagrilintide (Research)",
  "bpc-157": "BPC-157 (Research)",
  "tb-500": "TB-500 (Research)",
  "bpc-157-tb-500-mix": "BPC-157 + TB-500 Mix (Research)",
  "ghk-cu": "GHK-Cu (Research)",
  "mots-c": "MOTS-c (Research)",
  "nad": "NAD+ (Research)",
  "ss-31": "SS-31 (Research)",
  "ipamorelin": "Ipamorelin (Research)",
  "tesamorelin": "Tesamorelin (Research)",
  "igf-lr3": "IGF-1 LR3 (Research)",
  "selank": "Selank (Research)",
  "semax": "Semax (Research)",
  "pt-141": "PT-141 (Research)",
  "klow": "KLOW Blend (Research)",
  "bacteriostatic-water": "Bacteriostatic Water",
};

const SIBLING_PRIORITY = [
  "retatrutide", "tirzepatide", "semaglutide", "bpc-157", "tb-500",
];

export function ProductInternalLinks({ handle }: { handle: string }) {
  const categories = getCategoriesForProduct(handle);
  const parent = categories[0];
  if (!parent) return null;

  const siblings = parent.productHandles
    .filter((h: string) => h !== handle)
    .sort((a: string, b: string) => {
      const ai = SIBLING_PRIORITY.indexOf(a);
      const bi = SIBLING_PRIORITY.indexOf(b);
      const ar = ai === -1 ? 99 : ai;
      const br = bi === -1 ? 99 : bi;
      return ar - br;
    })
    .slice(0, 3);

  return (
    <section className="mt-16 max-w-5xl mx-auto">
      <div className="bg-mist border border-border rounded-md p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-2">Shop All</p>
        <h2 className="font-display text-2xl text-ink mb-2">More from {parent.title}</h2>
        <p className="text-sm text-foreground/70 mb-5">
          Browse all{" "}
          <Link
            to={`/${parent.slug}` as "/glp1-research-peptides"}
            className="text-primary underline underline-offset-2 hover:no-underline"
          >
            {parent.title.toLowerCase()}
          </Link>{" "}
          or view a related research peptide below.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {siblings.map((h: string) => (
            <li key={h}>
              <Link
                to="/product/$handle"
                params={{ handle: h }}
                className="block bg-background border border-border rounded-md px-4 py-3 text-sm text-ink hover:border-primary hover:text-primary transition text-center"
              >
                {SIBLING_LABEL[h] || h}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
