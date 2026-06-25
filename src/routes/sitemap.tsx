import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title: "Sitemap, Pondok Peptides" },
      { name: "description", content: "Browse every section of pondokpeptides.com — catalogue, research collections, company information and legal policies." },
      { property: "og:title", content: "Sitemap, Pondok Peptides" },
      { property: "og:description", content: "All pages on pondokpeptides.com in one place." },
      { property: "og:url", content: "https://pondokpeptides.com/sitemap" },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/sitemap" }],
  }),
  component: SitemapPage,
});

const sections: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Main",
    links: [
      { label: "Home", to: "/" },
      { label: "Shop all peptides", to: "/shop" },
      { label: "Research blog", to: "/blog" },
      { label: "FAQs", to: "/faqs" },
      { label: "Customer feedback", to: "/reviews" },
    ],
  },
  {
    title: "Collections",
    links: [
      { label: "GLP-1 & metabolic peptides", to: "/glp1-metabolic-peptides" },
      { label: "Tissue repair peptides", to: "/tissue-repair-peptides" },
      { label: "Senolytic & longevity peptides", to: "/senolytic-longevity-peptides" },
      { label: "Cognitive & neuropeptides", to: "/cognitive-neuropeptides" },
      { label: "Growth hormone secretagogues", to: "/growth-hormone-secretagogues" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", to: "/about" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms & Conditions", to: "/terms-and-conditions" },
      { label: "Cookie Policy", to: "/cookie-policy" },
      { label: "Disclaimer", to: "/disclaimer" },
      { label: "Returns Policy", to: "/returns-policy" },
      { label: "Refund Policy", to: "/refund-policy" },
      { label: "Shipping Policy", to: "/shipping-policy" },
      { label: "Cancellation Policy", to: "/cancellation-policy" },
    ],
  },
];

function SitemapPage() {
  return (
    <div className="container-x py-16 md:py-20 max-w-4xl">
      <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Navigation</p>
      <h1 className="font-display text-4xl md:text-5xl text-ink mb-8"><span className="italic text-primary">Sitemap</span></h1>
      <p className="text-muted-foreground mb-10 max-w-2xl">An at-a-glance index of every public page on pondokpeptides.com. For the machine-readable version see <a className="text-primary hover:underline" href="/sitemap.xml">/sitemap.xml</a>.</p>
      <div className="grid gap-10 md:grid-cols-2">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="font-display text-xl text-ink mb-3">{s.title}</h2>
            <ul className="space-y-2 text-[15px]">
              {s.links.map((l) => (
                <li key={l.to}><Link to={l.to} className="text-foreground/85 hover:text-primary hover:underline">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
