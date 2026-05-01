import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight, Star, Plus, Stethoscope, FlaskConical, Truck, Award } from "lucide-react";
import { useState, useEffect } from "react";
import heroRightImg from "@/assets/hero-right-image.png";
import bottlesImg from "@/assets/bottles-desk.jpg";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { ProductCard } from "@/components/ProductCard";
import { PressMarquee } from "@/components/PressMarquee";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pondok Peptides — Unlock More | Premium Recovery & Performance Supplements" },
      { name: "description", content: "UK-made recovery, performance and daily wellness supplements. Tested for purity. Trusted by 14,500+ customers." },
      { property: "og:title", content: "Pondok Peptides — Unlock More" },
      { property: "og:description", content: "Premium recovery & performance supplements made in the UK." },
    ],
  }),
  component: HomePage,
});



const reviews = [
  { name: "Dr. Sarah M.", text: "Easily the most reliable UK supplier we've used in the lab. Purity matches the COA every time and reconstitution is clean — no cloudiness, no residue." },
  { name: "Alex P., Research Tech", text: "Ordered Friday evening, arrived Monday morning, ice pack still cold. Lyophilised cake was intact and the lot number matched the certificate exactly." },
  { name: "James K., PhD candidate", text: "Independent third-party HPLC came back at 99.4% — bang on the label. Quality I can actually cite in my notes." },
  { name: "Emma L.", text: "Discreet packaging, fast delivery and clear labelling. As a personal-use buyer I appreciate how transparent the batch testing is." },
  { name: "Tom R., Lab Manager", text: "We've standardised on Pondok Peptides for our peptide work. Consistent purity batch-to-batch and the cold-chain shipping is genuinely well thought out." },
  { name: "Priya S., Researcher", text: "Every vial ships with a COA that actually means something. Customer service answered a technical solubility question within the hour." },
  { name: "Mark D.", text: "Switched from a US supplier — half the lead time, no customs headaches, and the purity reports are more detailed. Won't go back." },
  { name: "Hannah W., Postdoc", text: "Support team is excellent. Asked about storage stability and got a proper, sourced answer — not a copy-paste reply." },
  { name: "Liam C.", text: "Whether it's for the lab bench or personal research interest, the quality and turnaround are unmatched. Reordered four times now." },
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
    { q: "Are peptides third-party tested?", a: "Yes — every batch is independently tested for purity and potency. Certificates available on request." },
    { q: "Where are peptides made?", a: "All formulations are manufactured in MHRA-registered UK facilities under GMP standards." },
  ],
  "Compliance": [
    { q: "Are your peptides legal in the UK?", a: "Yes. All peptides are research-grade compounds compliant with UK and EU regulations." },
    { q: "Do you make medical claims?", a: "No. Our peptides are research compounds and are not intended to diagnose, treat, cure or prevent any disease." },
  ],
  "Support": [
    { q: "How do I contact you?", a: "Email hello@pondok.co or use the contact form. We reply within 4 working hours." },
    { q: "Do you offer subscriptions?", a: "Yes — save 15% on recurring monthly deliveries. Cancel or pause anytime." },
  ],
} as const;

function HomePage() {
  const [tab, setTab] = useState<keyof typeof faqTabs>("Orders & Shipping");
  const [openQ, setOpenQ] = useState<number | null>(0);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [productsApi, setProductsApi] = useState<CarouselApi>();
  const { products: shopifyProducts, loading: productsLoading } = useShopifyProducts(50);

  const BEST_SELLER_ORDER = [
    "retatrutide",
    "ghk-cu",
    "bpc-157-tb-500-mix",
    "tirzepatide",
    "nad",
    "mots-c",
    "ipamorelin",
    "semaglutide",
  ];
  const sortedBestSellers = [...shopifyProducts].sort((a, b) => {
    const ai = BEST_SELLER_ORDER.indexOf(a.node.handle);
    const bi = BEST_SELLER_ORDER.indexOf(b.node.handle);
    const aRank = ai === -1 ? Number.MAX_SAFE_INTEGER : ai;
    const bRank = bi === -1 ? Number.MAX_SAFE_INTEGER : bi;
    if (aRank !== bRank) return aRank - bRank;
    return a.node.title.localeCompare(b.node.title);
  });

  useEffect(() => {
    const id = setInterval(() => setReviewIdx(i => (i + 1) % reviews.length), 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!productsApi) return;
    const id = setInterval(() => {
      if (productsApi.canScrollNext()) productsApi.scrollNext();
      else productsApi.scrollTo(0);
    }, 4000);
    return () => clearInterval(id);
  }, [productsApi]);

  const visibleReviews = [0, 1, 2].map(o => reviews[(reviewIdx + o) % reviews.length]);

  return (
    <div>
      {/* PRESS MARQUEE */}
      <PressMarquee />

      {/* TRUST STRIP */}
      <section className="container-x py-3">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {[
            { icon: Stethoscope, title: "Medical Grade" },
            { icon: FlaskConical, title: "3rd Party Tested" },
            { icon: Truck, title: "Fast & Discreet UK Delivery" },
            { icon: Award, title: "Trusted Since 2021" },
          ].map(({ icon: Icon, title }) => (
            <div key={title} className="bg-mist border border-border px-3 py-2.5 flex items-center justify-center gap-2 text-center">
              <Icon className="size-4 text-primary shrink-0" />
              <h3 className="font-display text-xs md:text-sm text-ink leading-tight">{title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* HERO — 50/50 split */}
      <section className="bg-mist">
        <div className="grid items-stretch min-[700px]:grid-cols-2">
          <div className="flex items-center px-6 md:px-10 lg:px-16 py-14 lg:py-24 min-w-0">
            <div className="w-full max-w-xl">
              <span className="inline-block mb-4 px-3 py-1 text-[10px] uppercase tracking-[0.25em] bg-ink text-background">For Research Use Only</span>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-ink leading-[1.05]">
                <span className="italic text-primary">Medical Grade</span><br />Research Peptides.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                3rd Party Tested — Pure Peptides. Trusted by over 10,000 customers.
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
          </div>
          <div className="relative min-h-[360px] min-[700px]:min-h-full">
            <img src={heroRightImg} alt="Clear glass research peptide vials on a stainless steel laboratory bench" width={1280} height={896} className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* BEST SELLERS — single row carousel */}
      <section className="container-x py-16 md:py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-2">Shop</p>
            <h2 className="font-display text-3xl md:text-4xl text-ink">Best <span className="italic text-primary">Sellers</span></h2>
          </div>
          <Link to="/shop" className="hidden md:inline-flex items-center gap-2 text-sm uppercase tracking-wider text-ink hover:text-primary transition">
            View All <ArrowRight className="size-4" />
          </Link>
        </div>
        {productsLoading ? (
          <div className="flex justify-center py-16"><span className="text-muted-foreground text-sm">Loading peptides…</span></div>
        ) : shopifyProducts.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">No peptides yet.</p>
        ) : (
          <Carousel setApi={setProductsApi} opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {sortedBestSellers.slice(0, 8).map(p => (
                <CarouselItem key={p.node.id} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <ProductCard product={p} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </section>

      {/* REVIEWS — compact horizontal carousel */}
      <section className="bg-background py-12 md:py-16 border-b border-border">
        <div className="container-x">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-2">Customer Reviews</p>
            <h2 className="font-display text-3xl md:text-4xl text-ink">Trusted By <span className="text-primary italic">Thousands</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 transition-opacity duration-500">
            {visibleReviews.map(r => (
              <div key={r.name} className="bg-mist p-5 border border-border flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-ink uppercase tracking-wide">{r.name}</p>
                  <div className="flex gap-0.5 text-primary">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3 fill-current" />)}
                  </div>
                </div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Verified Buyer</p>
                <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3">{r.text}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-1.5 mt-6">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setReviewIdx(i)}
                aria-label={`Show review ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === reviewIdx ? "w-6 bg-primary" : "w-1.5 bg-border"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="container-x py-20 md:py-28 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">About Pondok Peptides</p>
        <h2 className="font-display text-4xl md:text-5xl text-ink max-w-3xl mx-auto leading-tight">Committed To Precision. Built On Trust.</h2>
        <p className="mt-5 text-muted-foreground max-w-xl mx-auto">High quality peptides supplied with consistency, control and uncompromising standards.</p>
        <div className="mt-12 max-w-3xl mx-auto text-left text-foreground/80 space-y-4">
          <p>At Pondok Peptides, we supply <strong>premium peptides</strong> with a focus on purity, consistency and reliability.</p>
          <p>Every peptide is handled with <strong>precision</strong> — from sourcing to delivery — ensuring dependable standards at every stage.</p>
        </div>
      </section>


      {/* CONTROLLED VERIFIED RELIABLE */}
      <section className="grid lg:grid-cols-2">
        <img src={bottlesImg} alt="Cluster of clear glass Pondok Peptides research peptide vials in a sterile pharmaceutical laboratory" loading="lazy" width={1280} height={896} className="w-full h-full object-cover aspect-[4/3] lg:aspect-auto" />
        <div className="bg-mist p-10 lg:p-20 flex flex-col justify-center">
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-5">Controlled. Verified. Reliable.</h2>
          <ul className="space-y-3">
            {["Independently batch-tested for purity", "Transparent labelling", "Manufactured to strict standards"].map(t => (
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
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">Pondok Peptides is designed to be a dependable supplier — focused on consistency, professionalism and trust.</p>
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
