import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — Pondok Peptides" },
      { name: "description", content: "Answers to common questions about Pondok Peptides orders, products, payments and compliance." },
      { property: "og:title", content: "FAQs — Pondok Peptides" },
      { property: "og:description", content: "Common questions about orders, products, payments and compliance." },
    ],
  }),
  component: FaqsPage,
});

const faqTabs = {
  "Orders & Shipping": [
    { q: "How long does delivery take?", a: "Orders placed before 3pm ship same day via tracked next-day courier within the UK." },
    { q: "When are orders dispatched?", a: "Monday to Friday, excluding bank holidays." },
    { q: "Will I receive tracking?", a: "Yes — every order includes Royal Mail or DPD tracking." },
    { q: "What if my order hasn't arrived?", a: "Contact our team within 14 days and we'll resolve it the same working day." },
    { q: "Do you ship internationally?", a: "Currently UK only. EU shipping is planned for next year." },
    { q: "What if my product shows up damaged?", a: "Get in touch with your order number, a clear photo of the damage and a brief description. We'll arrange a reshipment of the damaged product as quickly as possible." },
  ],
  "Payments": [
    { q: "Which payment methods do you accept?", a: "Visa, Mastercard, Amex, Apple Pay, Google Pay, Shop Pay." },
    { q: "Is checkout secure?", a: "All payments are PCI-compliant with end-to-end encryption." },
    { q: "Do you offer subscriptions?", a: "Yes — save 15% on recurring monthly deliveries. Cancel anytime." },
  ],
  "Product & Quality": [
    { q: "Do you provide a Certificate of Analysis (CoA)?", a: "In-house CoAs are available to download on every product page. They are not batch-specific — they confirm peptide identity and minimum purity based on our internal HPLC and MS testing. CoAs are not shipped with orders. A typical CoA includes peptide identity (sequence, molecular formula and weight), HPLC purity (typically ≥98%), MS or LC-MS confirmation, appearance of the lyophilised product, and a batch/lot reference. If a CoA is missing from a product page, get in touch and we'll sort it. Researchers needing batch-level verification are encouraged to arrange independent testing." },
    { q: "What is the difference between peptide purity and peptide yield?", a: "Purity is the proportion of the target peptide relative to all peptide-related species, measured by HPLC — a purity of 98% means 98% is the correct sequence and 2% are related impurities. This is the main quality metric. Yield is the total mass recovered from a synthesis run after purification — a manufacturing figure, not a quality indicator. We specify products by purity, not yield, and yield figures are not published." },
    { q: "Why does a 5mg vial appear nearly empty? Can it be verified by weight?", a: "This is completely normal. 5mg is a tiny amount of material — roughly a few grains of fine salt — and in a standard 2ml or 3ml vial it appears as a thin film, a small disc, or barely visible powder at the bottom. Weighing the vial isn't a reliable check: lab balance tolerances often exceed the peptide mass at this scale, the glass, stopper, crimp seal and residual moisture dwarf the peptide weight, and tare weights vary vial-to-vial even within the same batch. The proper way to verify content is analytical testing (HPLC or mass spectrometry) — see the in-house CoA on each product page. If you have a concern about a specific vial, send the order reference and photos and we'll look into it." },
    { q: "Why does my vial appear different or lack a vacuum seal?", a: "Minor cosmetic differences between vials are normal and don't indicate a quality issue. The freeze-dried cake can range from a compact disc to a looser powder, and cap colours sometimes differ between batches. Not every vial is sealed under vacuum — some are nitrogen-flushed instead, and this depends on the manufacturer and the peptide. Vacuum or no vacuum, quality and purity are unaffected provided the vial has been stored correctly (sealed, refrigerated, away from light). If something looks wrong — a broken seal or visible contamination — send us photos and we'll investigate." },
    { q: "What vial sizes are available?", a: "Vial sizes and peptide quantities vary by product and are listed on each product page. Common sizes are 2mg, 5mg, 10mg and 15mg, with some products available in larger quantities. All vials are laboratory-grade borosilicate glass with crimped aluminium seals and rubber stoppers. If you need a quantity not listed on the site, let us know." },
    { q: "How should peptides be handled and stored?", a: "Proper handling keeps peptides in good condition. Temperature: store freeze-dried peptides at 2–8°C (fridge) for short-term use, or -20°C (freezer) for long-term storage. Light: keep away from direct light — UV can degrade tryptophan and tyrosine residues in particular. Moisture: keep vials sealed until use, as freeze-dried peptides absorb moisture from the air, accelerating degradation. Handling: let refrigerated or frozen vials reach room temperature before opening to prevent condensation forming inside. After reconstitution: aliquot into single-use volumes where possible and store frozen, avoiding repeated freeze-thaw cycles. Treat all products as research chemicals in line with your institutional safety guidelines. MSDS sheets are available on request for any product." },
    { q: "Where are products made?", a: "MHRA-registered UK facilities under GMP standards." },
  ],
  "Compliance": [
    { q: "Are your products legal in the UK?", a: "Yes. All products are research-grade compounds compliant with UK and EU regulations, supplied strictly for in-vitro laboratory research." },
    { q: "Do you make medical claims?", a: "No. Products are research compounds and not intended to diagnose, treat, cure or prevent disease." },
  ],
  "Support": [
    { q: "How do I contact you?", a: "Email hello@pondok.co or use the contact form. We reply within 4 working hours." },
    { q: "Do you accept returns?", a: "Due to the nature of our products, we cannot accept returns. We will, however, resolve any issues with your order promptly." },
    { q: "Do you issue refunds?", a: "Refunds are handled case-by-case by our customer service team. When asking about a refund, please include your order number and a description of the issue along with any supporting photos." },
  ],
} as const;

function FaqsPage() {
  const [tab, setTab] = useState<keyof typeof faqTabs>("Orders & Shipping");
  const [openQ, setOpenQ] = useState<number | null>(0);
  return (
    <div className="container-x py-16 md:py-20">
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Help Centre</p>
        <h1 className="font-display text-5xl md:text-6xl text-ink">Frequently Asked <span className="text-primary italic">Questions</span></h1>
        <div className="mx-auto mt-4 h-px w-12 bg-primary" />
      </div>
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {(Object.keys(faqTabs) as Array<keyof typeof faqTabs>).map(t => (
          <button key={t} onClick={() => { setTab(t); setOpenQ(0); }} className={`px-5 py-3 text-xs uppercase tracking-wider border transition ${tab === t ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border text-foreground/70 hover:border-primary"}`}>{t}</button>
        ))}
      </div>
      <div className="max-w-3xl mx-auto">
        {faqTabs[tab].map((item, i) => (
          <div key={item.q} className="border-b border-border">
            <button onClick={() => setOpenQ(openQ === i ? null : i)} className="w-full flex items-center justify-between py-5 text-left">
              <span className="font-medium text-ink">{item.q}</span>
              <Plus className={`size-4 text-primary transition-transform ${openQ === i ? "rotate-45" : ""}`} />
            </button>
            {openQ === i && <p className="pb-5 text-sm text-foreground/75 leading-relaxed">{item.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
