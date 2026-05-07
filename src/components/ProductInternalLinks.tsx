import { Link } from "@tanstack/react-router";
import { getCategoriesForProduct } from "@/data/categories";

const SIBLING_LABEL: Record<string, string> = {
  "retatrutide": "Buy Retatrutide UK",
  "tirzepatide": "Buy Tirzepatide UK",
  "semaglutide": "Buy Semaglutide UK",
  "cagrilintide": "Buy Cagrilintide UK",
  "bpc-157": "Buy BPC-157 UK",
  "tb-500": "Buy TB-500 UK",
  "bpc-157-tb-500-mix": "BPC-157 + TB-500 Mix UK",
  "ghk-cu": "Buy GHK-Cu UK",
  "mots-c": "Buy MOTS-C UK",
  "nad": "Buy NAD+ UK",
  "ss-31": "Buy SS-31 UK",
  "ipamorelin": "Buy Ipamorelin UK",
  "tesamorelin": "Buy Tesamorelin UK",
  "igf-lr3": "Buy IGF-1 LR3 UK",
  "selank": "Buy Selank UK",
  "semax": "Buy Semax UK",
  "pt-141": "Buy PT-141 UK",
  "klow": "Buy KLOW Blend UK",
  "bacteriostatic-water": "Bacteriostatic Water UK",
};

const SIBLING_PRIORITY = [
  "retatrutide", "tirzepatide", "semaglutide", "bpc-157", "tb-500",
];

export function ProductInternalLinks({ handle }: { handle: string }) {
  const categories = findCategoriesForProduct(handle);
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
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-2">Explore the range</p>
        <h2 className="font-display text-2xl text-ink mb-2">More from {parent.title}</h2>
        <p className="text-sm text-foreground/70 mb-5">
          Browse the full{" "}
          <Link
            to={`/${parent.slug}` as "/weight-loss-peptides"}
            className="text-primary underline underline-offset-2 hover:no-underline"
          >
            {parent.title.toLowerCase()} collection
          </Link>{" "}
          or jump straight to a related research peptide below.
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
