import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";

export const Route = createFileRoute("/press")({
  head: () => ({
    meta: [
      { title: "Press & Brand Assets | Pondok Peptides" },
      { name: "description", content: "Download official Pondok Peptides logos, color palette, social templates and brand kit PDF." },
      { property: "og:title", content: "Press & Brand Assets | Pondok Peptides" },
      { property: "og:description", content: "Official logos, colors and ad templates for press, partners and affiliates." },
    ],
  }),
  component: PressPage,
});

const swatches = [
  { name: "Primary", hex: "#486748" },
  { name: "Hover", hex: "#3A5439" },
  { name: "Accent", hex: "#98C598" },
  { name: "Ink", hex: "#061D2B" },
  { name: "Muted", hex: "#59656E" },
  { name: "Surface", hex: "#E7F4F9" },
  { name: "Card", hex: "#E3EFE3" },
  { name: "Error", hex: "#DF2225" },
];

const assets = [
  { file: "01-ig-square-1080.png", label: "Instagram square", size: "1080×1080" },
  { file: "02-ig-story-1080x1920.png", label: "IG / Reels story", size: "1080×1920" },
  { file: "03-landscape-1200x630.png", label: "OG / FB / X landscape", size: "1200×630" },
  { file: "04-product-ad-retatrutide-1080.png", label: "Product ad, Retatrutide", size: "1080×1080" },
  { file: "06-cover-banner-1500x500.png", label: "Cover banner", size: "1500×500" },
  { file: "05-profile-avatar-1080.png", label: "Profile avatar, green", size: "1080×1080" },
  { file: "05b-profile-avatar-cream-1080.png", label: "Profile avatar, cream", size: "1080×1080" },
];

function DownloadLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      download
      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
    >
      <Download className="size-4" /> {children}
    </a>
  );
}

function PressPage() {
  return (
    <div className="bg-background">
      <section className="container-x py-16 md:py-24 border-b border-border">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">Press &amp; brand</p>
        <h1 className="font-display text-4xl md:text-6xl tracking-[-0.02em] text-foreground max-w-3xl">
          Brand assets for press, partners and affiliates.
        </h1>
        <p className="mt-6 max-w-2xl text-muted-foreground">
          Official logos, colors and ad templates. Please use as supplied. Do not recreate or restyle the wordmark.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/press/pondok-press-pack.zip"
            download
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 text-sm font-medium tracking-wide hover:bg-primary/90"
          >
            <Download className="size-4" /> Download full pack (.zip)
          </a>
          <a
            href="/press/pondok-brand-kit.pdf"
            download
            className="inline-flex items-center gap-2 border border-border px-5 py-3 text-sm font-medium tracking-wide hover:border-primary hover:text-primary"
          >
            <Download className="size-4" /> Brand kit PDF
          </a>
        </div>
      </section>

      <section className="container-x py-16 border-b border-border">
        <h2 className="font-display text-2xl mb-8">Logos</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="border border-border p-6 bg-background">
            <div className="aspect-[16/9] bg-[#F0E6D1] flex items-center justify-center mb-4">
              <img src="/press/pondok-wordmark.png" alt="Pondok wordmark" className="max-h-20" />
            </div>
            <p className="text-sm font-medium">Wordmark</p>
            <p className="text-xs text-muted-foreground mb-3">Primary mark, PNG</p>
            <DownloadLink href="/press/pondok-wordmark.png">PNG</DownloadLink>
          </div>
          <div className="border border-border p-6 bg-background">
            <div className="aspect-[16/9] bg-primary flex items-center justify-center mb-4">
              <img src="/press/pondok-icon.png" alt="Pondok icon" className="max-h-20 brightness-0 invert" />
            </div>
            <p className="text-sm font-medium">Icon, reverse</p>
            <p className="text-xs text-muted-foreground mb-3">App icon, favicon</p>
            <DownloadLink href="/press/pondok-icon.png">PNG</DownloadLink>
          </div>
          <div className="border border-border p-6 bg-background">
            <div className="aspect-[16/9] bg-[#F0E6D1] flex items-center justify-center mb-4">
              <img src="/press/pondok-icon.png" alt="Pondok icon green" className="max-h-20" />
            </div>
            <p className="text-sm font-medium">Icon, primary</p>
            <p className="text-xs text-muted-foreground mb-3">For light surfaces</p>
            <DownloadLink href="/press/pondok-icon.png">PNG</DownloadLink>
          </div>
        </div>
      </section>

      <section className="container-x py-16 border-b border-border">
        <h2 className="font-display text-2xl mb-8">Color system</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {swatches.map(s => (
            <div key={s.hex} className="border border-border">
              <div className="h-24" style={{ backgroundColor: s.hex }} />
              <div className="p-3">
                <p className="text-sm font-medium">{s.name}</p>
                <p className="text-xs font-mono text-muted-foreground">{s.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-16 border-b border-border">
        <h2 className="font-display text-2xl mb-2">Social &amp; ad templates</h2>
        <p className="text-sm text-muted-foreground mb-8">Right-click or tap Download. All assets use locked Pondok colors and the official wordmark.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map(a => (
            <div key={a.file} className="border border-border p-4 bg-background">
              <div className="bg-[hsl(var(--muted))]/30 flex items-center justify-center mb-4 aspect-square overflow-hidden">
                <img src={`/press/${a.file}`} alt={a.label} className="max-h-full max-w-full object-contain" />
              </div>
              <p className="text-sm font-medium">{a.label}</p>
              <p className="text-xs text-muted-foreground mb-3">{a.size}</p>
              <DownloadLink href={`/press/${a.file}`}>Download PNG</DownloadLink>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-16">
        <h2 className="font-display text-2xl mb-4">Usage rules</h2>
        <ul className="space-y-2 text-sm text-muted-foreground max-w-2xl">
          <li>• Always use the official wordmark and 'P' icon. Never recreate or restyle.</li>
          <li>• Use only the colors listed above. Do not invent new brand colors.</li>
          <li>• Headings set in Syne, body set in Inter.</li>
          <li>• Product imagery should carry a 'For research use only' chip.</li>
          <li>• For press queries, contact hello@pondokpeptides.com.</li>
        </ul>
      </section>
    </div>
  );
}
