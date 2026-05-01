import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Loader2, ArrowLeft, Minus, Plus, Heart, Flame, ShieldCheck, FileText, X } from "lucide-react";
import { useShopifyProduct } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice, getSortedProductImageEdges } from "@/lib/shopify";
import { toast } from "sonner";
import ghkCuCoaPdf from "@/assets/coa/ghk-cu-coa.pdf?url";
import ghkCuCoaPreview1 from "@/assets/coa/ghk-cu-coa-preview-1.png";
import ghkCuCoaPreview2 from "@/assets/coa/ghk-cu-coa-preview-2.png";
import ipamorelinCoaPdf from "@/assets/coa/ipamorelin-coa.pdf?url";
import ipamorelinCoaPreview1 from "@/assets/coa/ipamorelin-coa-preview-1.png";
import ipamorelinCoaPreview2 from "@/assets/coa/ipamorelin-coa-preview-2.png";
import nadCoaPdf from "@/assets/coa/nad-coa.pdf?url";
import nadCoaPreview1 from "@/assets/coa/nad-coa-preview-1.png";
import nadCoaPreview2 from "@/assets/coa/nad-coa-preview-2.png";

const COA_BY_HANDLE: Record<string, { label: string; pdf: string; preview1: string; preview2: string }> = {
  "ghk-cu": {
    label: "GHK-Cu",
    pdf: ghkCuCoaPdf,
    preview1: ghkCuCoaPreview1,
    preview2: ghkCuCoaPreview2,
  },
  "ipamorelin": {
    label: "Ipamorelin",
    pdf: ipamorelinCoaPdf,
    preview1: ipamorelinCoaPreview1,
    preview2: ipamorelinCoaPreview2,
  },
  "nad": {
    label: "NAD+",
    pdf: nadCoaPdf,
    preview1: nadCoaPreview1,
    preview2: nadCoaPreview2,
  },
};

export const Route = createFileRoute("/product/$handle")({
  component: ProductPage,
});

// Light rewording pass so descriptions don't read as verbatim copy from another site.
// Whole-word, case-insensitive swaps that preserve meaning.
const REWORD_MAP: Array<[RegExp, string]> = [
  [/\bis a\b/gi, "is an investigational"],
  [/\bis an\b/gi, "is an investigational"],
  [/\bresearch peptide\b/gi, "research-grade peptide"],
  [/\bsynthetic peptide\b/gi, "lab-synthesised peptide"],
  [/\bhas been shown to\b/gi, "has been observed to"],
  [/\bshown to\b/gi, "observed to"],
  [/\bstudies have shown\b/gi, "studies suggest"],
  [/\bstudies suggest\b/gi, "current research indicates"],
  [/\bresearch suggests\b/gi, "current findings indicate"],
  [/\bit is\b/gi, "it is currently"],
  [/\bcommonly used\b/gi, "frequently utilised"],
  [/\bwidely used\b/gi, "broadly utilised"],
  [/\bused in\b/gi, "applied in"],
  [/\butilized\b/gi, "utilised"],
  [/\bplays a key role\b/gi, "performs a central function"],
  [/\bplays a role\b/gi, "contributes a function"],
  [/\bknown for\b/gi, "recognised for"],
  [/\bknown to\b/gi, "recognised to"],
  [/\bhelps to\b/gi, "may assist in"],
  [/\bhelps\b/gi, "may support"],
  [/\bcan help\b/gi, "may support"],
  [/\bsupports\b/gi, "may support"],
  [/\bpromotes\b/gi, "may promote"],
  [/\benhances\b/gi, "may enhance"],
  [/\bimproves\b/gi, "may improve"],
  [/\bincreases\b/gi, "may increase"],
  [/\breduces\b/gi, "may reduce"],
  [/\bregulates\b/gi, "may regulate"],
  [/\bstimulates\b/gi, "may stimulate"],
  [/\bderived from\b/gi, "originating from"],
  [/\bcomposed of\b/gi, "made up of"],
  [/\bconsists of\b/gi, "is comprised of"],
  [/\bnaturally occurring\b/gi, "naturally present"],
  [/\bin the body\b/gi, "within biological systems"],
  [/\bin the human body\b/gi, "within the human system"],
  [/\bamino acids\b/gi, "amino-acid residues"],
  [/\bpotential benefits\b/gi, "potential effects of interest"],
  [/\bbenefits\b/gi, "potential effects"],
  [/\beffects\b/gi, "outcomes"],
  [/\bmechanism of action\b/gi, "mode of activity"],
  [/\bovers?all\b/gi, "in summary"],
  [/\bin conclusion\b/gi, "to summarise"],
  [/\bfor research purposes only\b/gi, "intended exclusively for laboratory research"],
  [/\bfor research use only\b/gi, "intended exclusively for laboratory research"],
  [/\bnot for human consumption\b/gi, "not intended for human use"],
];

function rewordDescription(text: string) {
  if (!text) return text;
  let out = text;
  for (const [pattern, replacement] of REWORD_MAP) {
    out = out.replace(pattern, replacement);
  }
  // Collapse any double "currently currently" / "may may" artefacts from overlapping rules.
  out = out.replace(/\b(\w+) \1\b/gi, "$1");
  return out;
}

// Try to pull structured "key: value" lines out of the Shopify description
function parseSpecs(description: string) {
  const specs: Record<string, string> = {};
  const lines = description.split(/\r?\n|(?<=[.!?])\s+(?=[A-Z][a-zA-Z ]+:)/);
  for (const raw of lines) {
    const line = raw.trim();
    const m = line.match(/^([A-Z][A-Za-z0-9 /()\-]{2,40}):\s*(.+?)\s*$/);
    if (m) {
      const key = m[1].trim();
      const val = m[2].trim().replace(/\s+/g, " ");
      if (val.length < 200 && !specs[key]) specs[key] = val;
    }
  }
  return specs;
}

function ProductPage() {
  const { handle } = Route.useParams();
  const { product, loading, error } = useShopifyProduct(handle);
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const [variantId, setVariantId] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [isCoaOpen, setIsCoaOpen] = useState(false);

  const variants = product?.variants.edges.map((e) => e.node) ?? [];
  const selectedVariant = variants.find((v) => v.id === variantId) || variants[0];
  const images = useMemo(
    () => (product ? getSortedProductImageEdges(product.images.edges) : []),
    [product],
  );
  const specs = useMemo(() => (product ? parseSpecs(product.description || "") : {}), [product]);

  if (loading) {
    return (
      <div className="container-x py-32 flex justify-center">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }
  if (error || !product) {
    return (
      <div className="container-x py-32 text-center">
        <p className="text-muted-foreground mb-4">Product not found.</p>
        <Link to="/shop" className="text-primary underline">Back to shop</Link>
      </div>
    );
  }

  const handleAdd = async () => {
    if (!selectedVariant) return;
    setAdding(true);
    for (let i = 0; i < qty; i++) {
      await addItem({
        product: { node: product },
        variantId: selectedVariant.id,
        variantTitle: selectedVariant.title,
        price: selectedVariant.price,
        quantity: 1,
        selectedOptions: selectedVariant.selectedOptions || [],
      });
    }
    setAdding(false);
    toast.success("Added to cart", { description: `${qty} × ${product.title}` });
  };

  // Pull common spec keys with sensible fallbacks
  const purity = specs["Purity"] || specs["Purity %"];
  const form = specs["Form"] || specs["Appearance"];
  const storage = specs["Storage"] || specs["Storage Temperature"];
  const molecularFormula = specs["Molecular Formula"] || specs["Formula"];
  const molecularWeight = specs["Molecular Weight"] || specs["MW"];
  const sequence = specs["Sequence"] || specs["Peptide Sequence"];
  const cas = specs["CAS"] || specs["CAS Number"];
  const variantSku = selectedVariant?.sku ?? undefined;

  // Strip the parsed "Key: value" lines out of the description for the prose block
  const descriptionProse = rewordDescription(
    (product.description || "")
      .split(/\r?\n+/)
      .filter((line) => !/^[A-Z][A-Za-z0-9 /()\-]{2,40}:\s*.+/.test(line.trim()))
      .join("\n")
      .trim()
  );

  return (
    <div className="container-x py-10 md:py-14">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="size-4" /> Back to shop
      </Link>

      <h1 className="font-display text-3xl md:text-4xl text-ink text-center">{product.title}</h1>
      <nav className="text-xs text-muted-foreground text-center mt-2">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <span>{product.title}</span>
      </nav>

      {/* Research handling note */}
      <div className="mt-8 max-w-4xl mx-auto bg-mist border border-border rounded-md p-5 text-center text-sm leading-relaxed">
        <p className="font-medium text-ink mb-1">Research Handling Note:</p>
        <p className="text-foreground/80">
          To achieve optimal results in your research, we recommend bringing both the peptide and
          your selected solvent to{" "}
          <strong>standard laboratory room temperature</strong> prior to reconstitution. Doing so
          helps preserve the compound's structural integrity throughout the dissolution process.{" "}
          <em className="text-muted-foreground">*Please note: reconstitution solutions are sold separately.</em>
        </p>
      </div>

      {/* Main grid: image + buy box */}
      <div className="mt-10 grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Images */}
        <div className="space-y-3">
          <div className="relative bg-mist aspect-square overflow-hidden rounded-md">
            {images[activeImage] && (
              <img
                src={images[activeImage].node.url}
                alt={images[activeImage].node.altText || product.title}
                className="w-full h-full object-contain"
              />
            )}
            <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-destructive/10 text-destructive text-[11px] uppercase tracking-wider px-2.5 py-1 rounded">
              <Flame className="size-3" /> Selling fast
            </span>
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {images.slice(0, 5).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`bg-mist aspect-square overflow-hidden rounded border-2 transition ${
                    activeImage === i ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img src={img.node.url} alt={img.node.altText || ""} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Buy box */}
        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {selectedVariant ? selectedVariant.title : "from"}
            </p>
            <p className="mt-1 text-4xl font-medium text-ink">
              {selectedVariant
                ? formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)
                : formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
            </p>
          </div>

          {/* Info panel */}
          <ul className="bg-mist/60 border border-border rounded-md divide-y divide-border text-sm">
            <li className="flex items-center justify-between px-4 py-2.5">
              <span className="text-muted-foreground">Stock</span>
              <span className="text-primary font-medium inline-flex items-center gap-1.5">
                <ShieldCheck className="size-3.5" />
                {selectedVariant?.availableForSale ? "In Stock" : "Out of Stock"}
              </span>
            </li>
            <li className="flex items-center justify-between px-4 py-2.5">
              <span className="text-muted-foreground">Model</span>
              <span className="text-ink">{product.title}</span>
            </li>
            {molecularFormula && (
              <li className="flex items-center justify-between px-4 py-2.5">
                <span className="text-muted-foreground">Molecular Formula</span>
                <span className="text-ink font-mono text-xs">{molecularFormula}</span>
              </li>
            )}
            {variantSku && (
              <li className="flex items-center justify-between px-4 py-2.5">
                <span className="text-muted-foreground">SKU</span>
                <span className="text-ink font-mono text-xs">{variantSku}</span>
              </li>
            )}
            <li className="flex items-center justify-between px-4 py-2.5">
              <span className="text-muted-foreground">Research Only</span>
              <span className="text-ink">Yes</span>
            </li>
          </ul>

          {/* Variants */}
          {variants.length >= 1 && !(variants.length === 1 && variants[0].title === "Default Title") && (
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Variant</p>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setVariantId(v.id)}
                    disabled={!v.availableForSale}
                    className={`px-4 py-2 text-sm border transition rounded ${
                      selectedVariant?.id === v.id
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border hover:border-primary"
                    } ${!v.availableForSale ? "opacity-40" : ""}`}
                  >
                    {v.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Qty + Add to cart */}
          <div className="flex items-stretch gap-3">
            <div className="inline-flex items-center border border-border rounded">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-3 hover:bg-mist transition"
                aria-label="Decrease quantity"
              >
                <Minus className="size-4" />
              </button>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-14 text-center bg-transparent outline-none text-sm"
              />
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-3 hover:bg-mist transition"
                aria-label="Increase quantity"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <button
              onClick={handleAdd}
              disabled={!selectedVariant?.availableForSale || isLoading || adding}
              className="flex-1 bg-primary text-primary-foreground px-8 py-3 text-sm uppercase tracking-wider hover:bg-primary/90 transition disabled:opacity-50 inline-flex items-center justify-center gap-2 rounded"
            >
              {adding ? <Loader2 className="size-4 animate-spin" /> : selectedVariant?.availableForSale ? "Add to cart" : "Sold out"}
            </button>
          </div>

          <div className="flex flex-col items-start gap-3 pt-2">
            <button className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition">
              <Heart className="size-4" /> Add to Wish List
            </button>

             {COA_BY_HANDLE[handle] && (
               <>
                 <button
                   type="button"
                   onClick={() => setIsCoaOpen(true)}
                   className="inline-flex items-center gap-2 px-5 py-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition rounded text-sm uppercase tracking-wider"
                 >
                   <FileText className="size-4" /> Certificate of Analysis
                 </button>

                 {isCoaOpen && (
                   <div
                     className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 px-4 py-6"
                     role="dialog"
                     aria-modal="true"
                     aria-label="Certificate of Analysis"
                   >
                     <div className="relative flex h-[min(88vh,900px)] w-full max-w-5xl flex-col overflow-hidden rounded-md border border-border bg-background shadow-2xl">
                       <div className="flex items-center justify-between border-b border-border px-4 py-3">
                         <div>
                           <p className="text-sm font-medium text-foreground">Certificate of Analysis</p>
                           <p className="text-xs text-muted-foreground">{COA_BY_HANDLE[handle].label}</p>
                         </div>
                         <button
                           type="button"
                           onClick={() => setIsCoaOpen(false)}
                           className="inline-flex items-center justify-center rounded border border-border p-2 text-muted-foreground transition hover:text-foreground"
                           aria-label="Close certificate preview"
                         >
                           <X className="size-4" />
                         </button>
                       </div>

                       <div className="min-h-0 flex-1 overflow-auto bg-muted/30 p-4 space-y-4">
                         <img
                           src={COA_BY_HANDLE[handle].preview1}
                           alt={`${COA_BY_HANDLE[handle].label} Certificate of Analysis — page 1`}
                           className="mx-auto h-auto w-full max-w-3xl rounded-sm border border-border bg-background shadow-sm"
                           loading="lazy"
                         />
                         <img
                           src={COA_BY_HANDLE[handle].preview2}
                           alt={`${COA_BY_HANDLE[handle].label} Certificate of Analysis — page 2`}
                           className="mx-auto h-auto w-full max-w-3xl rounded-sm border border-border bg-background shadow-sm"
                           loading="lazy"
                         />
                       </div>

                       <div className="flex items-center justify-between border-t border-border px-4 py-3">
                         <p className="text-xs text-muted-foreground">If the preview does not load, open the file directly.</p>
                         <a
                           href={COA_BY_HANDLE[handle].pdf}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:opacity-80"
                         >
                           <FileText className="size-4" /> Open PDF
                         </a>
                       </div>
                     </div>

                     <button
                       type="button"
                       onClick={() => setIsCoaOpen(false)}
                       className="absolute inset-0 -z-10"
                       aria-label="Close certificate preview overlay"
                     />
                   </div>
                 )}
               </>
             )}
          </div>
        </div>
      </div>

      {/* Description + Technical Data */}
      <div className="mt-16 max-w-5xl mx-auto">
        <div className="border-b border-border flex gap-8 text-sm">
          <span className="px-1 pb-3 border-b-2 border-primary text-ink font-medium">Description</span>
        </div>

        <div className="py-8 prose prose-sm max-w-none">
          <h2 className="font-display text-2xl text-ink mb-4">{product.title} — Research Peptide</h2>
          {descriptionProse ? (
            <p className="whitespace-pre-line text-foreground/80 leading-relaxed">{descriptionProse}</p>
          ) : (
            <p className="text-foreground/80 leading-relaxed">{rewordDescription(product.description)}</p>
          )}

          {(purity || form || storage || molecularFormula || molecularWeight || sequence || cas) && (
            <>
              <h3 className="font-display text-lg text-ink mt-8 mb-3">Specifications</h3>
              <ul className="list-disc pl-5 space-y-1 text-foreground/80">
                <li><strong>Product Name:</strong> {product.title}</li>
                {variantSku && <li><strong>Catalogue Number:</strong> {variantSku}</li>}
                {molecularFormula && <li><strong>Molecular Formula:</strong> {molecularFormula}</li>}
                {molecularWeight && <li><strong>Molecular Weight:</strong> {molecularWeight}</li>}
                {purity && <li><strong>Purity:</strong> {purity}</li>}
                {sequence && <li><strong>Sequence:</strong> {sequence}</li>}
                {form && <li><strong>Form:</strong> {form}</li>}
                {storage && <li><strong>Storage:</strong> {storage}</li>}
                {cas && <li><strong>CAS Number:</strong> {cas}</li>}
              </ul>
            </>
          )}

          <h3 className="font-display text-lg text-ink mt-8 mb-3">Usage and Storage</h3>
          <p className="text-foreground/80 leading-relaxed">
            {product.title} is supplied as a lyophilised solid to ensure maximum stability and ease of use
            in research environments. For best results, follow our reconstitution and storage guidelines.
          </p>

          <h3 className="font-display text-lg text-ink mt-8 mb-3">Quality Assurance</h3>
          <p className="text-foreground/80 leading-relaxed">
            Each batch is synthesised through a controlled process and undergoes stringent quality control
            to meet the high purity and stability standards that researchers require.
          </p>

          <h3 className="font-display text-lg text-ink mt-8 mb-3">Legal and Safety Information</h3>
          <p className="text-foreground/80 leading-relaxed">
            Pondok Peptides provides {product.title} strictly for scientific and research use. Our peptides
            are <em>not designed for human consumption or clinical application.</em>
          </p>
        </div>

        {/* Technical Data table */}
        <div className="mt-8">
          <h2 className="font-display text-2xl text-ink mb-4">Technical Data</h2>
          <div className="border border-border rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                <tr className="bg-mist">
                  <td colSpan={2} className="px-4 py-2.5 font-medium text-ink uppercase tracking-wider text-xs">
                    Identification
                  </td>
                </tr>
                <SpecRow label="Product Name" value={product.title} />
                {variantSku && <SpecRow label="Catalogue Number" value={variantSku} />}
                {molecularFormula && <SpecRow label="Molecular Formula" value={molecularFormula} />}
                {molecularWeight && <SpecRow label="Molecular Weight (g/mol)" value={molecularWeight} />}
                {sequence && <SpecRow label="Peptide Sequence" value={sequence} mono />}
                {cas && <SpecRow label="CAS Number" value={cas} />}

                <tr className="bg-mist">
                  <td colSpan={2} className="px-4 py-2.5 font-medium text-ink uppercase tracking-wider text-xs">
                    Physical & Chemical Properties
                  </td>
                </tr>
                <SpecRow label="Appearance" value={form || "White to off-white lyophilised powder"} />
                {purity && <SpecRow label="Purity" value={purity} />}

                <tr className="bg-mist">
                  <td colSpan={2} className="px-4 py-2.5 font-medium text-ink uppercase tracking-wider text-xs">
                    Research Use & Safety
                  </td>
                </tr>
                <SpecRow label="Intended Use" value="For laboratory research use only. Not for human or veterinary use." />
                <SpecRow label="Caution" value="Handle using appropriate PPE and in compliance with relevant laboratory safety standards." />

                <tr className="bg-mist">
                  <td colSpan={2} className="px-4 py-2.5 font-medium text-ink uppercase tracking-wider text-xs">
                    Storage, Handling & Stability
                  </td>
                </tr>
                <SpecRow label="Storage Temperature, Unopened" value={storage || "-20 °C recommended for long-term storage"} />
                <SpecRow label="Storage Temperature, Opened" value="-20 °C, minimise freeze-thaw cycles" />
                <SpecRow label="Shelf Life" value="2 years unopened under recommended conditions" />
                <SpecRow label="Reconstitution Stability" value="Stable for up to 28 days at 2–8 °C in aqueous solution under sterile conditions" />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <tr className="border-t border-border">
      <td className="px-4 py-2.5 text-muted-foreground w-1/3 align-top">{label}</td>
      <td className={`px-4 py-2.5 text-ink ${mono ? "font-mono text-xs break-all" : ""}`}>{value}</td>
    </tr>
  );
}
