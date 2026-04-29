import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — Pondok" },
      { name: "description", content: "Answers to common questions about Pondok orders, products, payments and compliance." },
      { property: "og:title", content: "FAQs — Pondok" },
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
  ],
  "Payments": [
    { q: "Which payment methods do you accept?", a: "Visa, Mastercard, Amex, Apple Pay, Google Pay, Shop Pay." },
    { q: "Is checkout secure?", a: "All payments are PCI-compliant with end-to-end encryption." },
    { q: "Do you offer subscriptions?", a: "Yes — save 15% on recurring monthly deliveries. Cancel anytime." },
  ],
  "Product & Quality": [
    { q: "Are products third-party tested?", a: "Yes — every batch is independently tested. Certificates available on request." },
    { q: "Where are products made?", a: "MHRA-registered UK facilities under GMP standards." },
    { q: "Are products vegan?", a: "Many products are vegan-friendly — see individual product pages." },
  ],
  "Compliance": [
    { q: "Are your products legal in the UK?", a: "Yes. All products are food-grade supplements compliant with UK and EU regulations." },
    { q: "Do you make medical claims?", a: "No. Products are food supplements and not intended to diagnose, treat, cure or prevent disease." },
  ],
  "Support": [
    { q: "How do I contact you?", a: "Email hello@pondok.co or use the contact form. We reply within 4 working hours." },
    { q: "Returns?", a: "Unopened products can be returned within 30 days for a full refund." },
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
