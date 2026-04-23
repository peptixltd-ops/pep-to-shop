import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight, Star, Plus, Stethoscope, FlaskConical, Truck, Award } from "lucide-react";
import { useState, useEffect } from "react";
import heroImg from "@/assets/hero-still.jpg";
import bottlesImg from "@/assets/bottles-desk.jpg";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { PressMarquee } from "@/components/PressMarquee";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/components/ui/carousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PeptiX — Unlock More | Premium Recovery & Performance Supplements" },
      { name: "description", content: "UK-made recovery, performance and daily wellness supplements. Tested for purity. Trusted by 14,500+ customers." },
      { property: "og:title", content: "PeptiX — Unlock More" },
      { property: "og:description", content: "Premium recovery & performance supplements made in the UK." },
    ],
  }),
  component: HomePage,
});



const reviews = [
  { name: "Dr. Sarah M.", text: "Best UK supplier I've used. Consistent quality across batches and customer support responded within hours." },
  { name: "Alex P.", text: "Ordered the recovery stack. Arrived next day, beautifully packaged, and the third-party test results matched the product page exactly." },
  { name: "James K.", text: "Excellent quality and fast delivery. Products arrived well-packaged with COA included. Will definitely reorder." },
];

const faqTabs = {
  "Orders & Shipping": [
    { q: "How long does delivery take?", a: "Orders placed before 3pm ship same day via tracked next-day courier within the UK." },
    { q: "When are orders dispatched?", a: "Monday to Friday, excluding bank holidays. You'll receive a tracking link by email." },
    { q: "Will I receive tracking?", a: "Yes — every order includes Royal Mail or DPD tracking sent to your inbox once dispatched." },
    { q: "What if my order hasn't arrived?", a: "Contact our team within 14 days of dispatch and we'll resolve it the same working day." },
  ],
  "Payments": [
    { q: "Which payment methods do you accept?", a: "Visa, Mastercard, American Express, Apple Pay, Google Pay and Shop Pay at checkout." },
    { q: "Is checkout secure?", a: "All payments are processed via PCI-compliant providers with end-to-end encryption." },
  ],
  "Product & Quality": [
    { q: "Are products third-party tested?", a: "Yes — every batch is independently tested for purity and potency. Certificates available on request." },
    { q: "Where are products made?", a: "All formulations are manufactured in MHRA-registered UK facilities under GMP standards." },
  ],
  "Compliance": [
    { q: "Are your products legal in the UK?", a: "Yes. All products are food-grade supplements compliant with UK and EU regulations." },
    { q: "Do you make medical claims?", a: "No. Our products are food supplements and are not intended to diagnose, treat, cure or prevent any disease." },
  ],
  "Support": [
    { q: "How do I contact you?", a: "Email hello@peptix.co or use the contact form. We reply within 4 working hours." },
    { q: "Do you offer subscriptions?", a: "Yes — save 15% on recurring monthly deliveries. Cancel or pause anytime." },
  ],
} as const;

function HomePage() {
  const [tab, setTab] = useState<keyof typeof faqTabs>("Orders & Shipping");
  const [openQ, setOpenQ] = useState<number | null>(0);

  return (
    <div>
      {/* PRESS MARQUEE */}
      <PressMarquee />

      {/* WHY CHOOSE — compact strip */}
      <section className="container-x py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: ShieldCheck, title: "High Purity", desc: "Carefully sourced ingredients meeting strict quality standards." },
            { icon: CheckCircle2, title: "Verified Consistency", desc: "Batch-to-batch reliability you can depend on." },
            { icon: Truck, title: "Fast UK Delivery", desc: "Secure, discreet and efficient fulfilment." },
            { icon: FileText, title: "Transparent Process", desc: "Clear documentation and no compromise on standards." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-mist border border-border p-4 text-center">
              <div className="mx-auto size-8 rounded-full bg-accent/40 flex items-center justify-center mb-2">
                <Icon className="size-3.5 text-primary" />
              </div>
              <h3 className="font-display text-sm text-ink mb-1">{title}</h3>
              <p className="text-[11px] text-muted-foreground leading-snug">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HERO */}
      <section className="bg-mist">
        <div className="container-x grid lg:grid-cols-2 gap-10 items-center py-16 lg:py-24">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-6"><span className="accent-bar" />Premium Wellness Supplements</p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-ink leading-[1.05]">
              <span className="italic text-primary">Unlock</span><br />More.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md leading-relaxed">
              Carefully formulated recovery, performance and daily wellness supplements — designed to support how you live, train and recover.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 text-sm uppercase tracking-wider hover:bg-primary/90 transition">
                Shop Now <ArrowRight className="size-4" />
              </Link>
              <Link to="/about" className="inline-flex items-center bg-transparent border border-ink/20 text-ink px-7 py-3.5 text-sm uppercase tracking-wider hover:bg-ink hover:text-background transition">
                Learn More
              </Link>
            </div>
          </div>
          <div className="relative">
            <img src={heroImg} alt="Premium PeptiX wellness supplements" width={1280} height={1280} className="w-full aspect-square object-cover" />
          </div>
        </div>
      </section>
      {/* PRODUCTS */}
      <section className="container-x py-20 md:py-28">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Our Products</p>
          <h2 className="font-display text-4xl md:text-5xl text-ink">Shop <span className="text-primary italic">All</span></h2>
          <div className="mx-auto mt-4 h-px w-12 bg-primary" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.slice(0, 4).map(p => <ProductCard key={p.slug} product={p} />)}
        </div>
        <div className="text-center mt-12">
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-primary border-b border-primary pb-1 hover:gap-3 transition-all">
            View all products <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-mist py-20 md:py-28">
        <div className="container-x">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Customer Reviews</p>
            <h2 className="font-display text-4xl md:text-5xl text-ink">Trusted By <span className="text-primary italic">Thousands</span></h2>
            <div className="mx-auto mt-4 h-px w-12 bg-primary" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map(r => (
              <div key={r.name} className="bg-background p-7 border border-border">
                <p className="text-sm font-semibold text-ink uppercase tracking-wide">{r.name}</p>
                <div className="flex gap-0.5 my-2 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3.5 fill-current" />)}
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-b border-border pb-3 mb-4">Verified Buyer</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="container-x py-20 md:py-28 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">About PeptiX</p>
        <h2 className="font-display text-4xl md:text-5xl text-ink max-w-3xl mx-auto leading-tight">Committed To Precision. Built On Trust.</h2>
        <p className="mt-5 text-muted-foreground max-w-xl mx-auto">High-quality supplements supplied with consistency, control and uncompromising standards.</p>
        <div className="mt-12 max-w-3xl mx-auto text-left text-foreground/80 space-y-4">
          <p>At PeptiX, we supply <strong>premium wellness supplements</strong> with a focus on purity, consistency and reliability.</p>
          <p>Every product is handled with <strong>precision</strong> — from sourcing to delivery — ensuring dependable standards at every stage.</p>
        </div>
      </section>


      {/* CONTROLLED VERIFIED RELIABLE */}
      <section className="grid lg:grid-cols-2">
        <img src={bottlesImg} alt="PeptiX collagen and creatine bottles" loading="lazy" width={1280} height={896} className="w-full h-full object-cover aspect-[4/3] lg:aspect-auto" />
        <div className="bg-mist p-10 lg:p-20 flex flex-col justify-center">
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-5">Controlled. Verified. Reliable.</h2>
          <p className="text-foreground/80 mb-6">All products supplied by PeptiX are food-grade supplements made under UK GMP standards.</p>
          <ul className="space-y-3">
            {["Independently batch-tested for purity", "Transparent labelling and ingredient disclosure", "Manufactured to UK regulatory standards"].map(t => (
              <li key={t} className="flex items-start gap-3 text-foreground/85">
                <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* STATS */}
      <section className="container-x py-20 md:py-28 text-center">
        <h2 className="font-display text-3xl md:text-4xl text-ink">Built For Long-Term Reliability</h2>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">PeptiX is designed to be a dependable supplier — focused on consistency, professionalism and trust.</p>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-b border-border py-10 max-w-4xl mx-auto">
          {[["≥99%", "Purity"], ["Quality", "Tested"], ["UK-Based", "Supplier"], ["Next Day", "Delivery"]].map(([k, v]) => (
            <div key={v}>
              <p className="font-display text-2xl text-primary">{k}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-mist py-20 md:py-28">
        <div className="container-x">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Help Centre</p>
            <h2 className="font-display text-4xl md:text-5xl text-ink">Frequently Asked <span className="text-primary italic">Questions</span></h2>
            <div className="mx-auto mt-4 h-px w-12 bg-primary" />
          </div>
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {(Object.keys(faqTabs) as Array<keyof typeof faqTabs>).map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); setOpenQ(0); }}
                className={`px-5 py-3 text-xs uppercase tracking-wider border transition ${tab === t ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border text-foreground/70 hover:border-primary"}`}
              >
                {t}
              </button>
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
      </section>
    </div>
  );
}
