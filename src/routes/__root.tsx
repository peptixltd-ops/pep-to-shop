import { Outlet, Link, createRootRoute, HeadContent, Scripts, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";

const GA_MEASUREMENT_ID = "G-FWN8D6ZQZ4";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Research Peptides UK | Laboratory Research Use Only | Pondok Peptides" },
      { name: "description", content: "Pondok Peptides supplies laboratory research peptides in the UK with HPLC and MS verification and Certificate of Analysis on request. For laboratory research use only — not for human or veterinary use." },
      { name: "keywords", content: "research peptides uk, laboratory research peptides, peptide reference standards uk, HPLC verified peptides, certificate of analysis peptides" },
      { name: "author", content: "Oxford Research Syndicate Ltd" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { name: "googlebot", content: "index, follow" },
      { property: "og:title", content: "Research Peptides UK | Laboratory Research Use Only | Pondok Peptides" },
      { property: "og:description", content: "UK laboratory research peptides with HPLC and MS verification and COA on request. Operated by Oxford Research Syndicate Ltd." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Pondok Peptides" },
      { property: "og:locale", content: "en_GB" },
      { property: "og:url", content: "https://pondokpeptides.com" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Research Peptides UK | Laboratory Research Use Only | Pondok Peptides" },
      { name: "twitter:description", content: "UK laboratory research peptides with HPLC and MS verification and COA on request." },
      { property: "og:image", content: "https://pondokpeptides.com/og-image.png" },
      { name: "twitter:image", content: "https://pondokpeptides.com/og-image.png" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=Inter:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap" },
      { rel: "canonical", href: "https://pondokpeptides.com" },
    ],
    scripts: [
      // Google tag (gtag.js) - GA4
        { src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`, async: true },
      {
          children: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}window.gtag = gtag;gtag('js', new Date());gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });`,
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://pondokpeptides.com/#org",
              name: "Pondok Peptides",
              url: "https://pondokpeptides.com",
              logo: "https://pondokpeptides.com/favicon.png",
              sameAs: [],
              contactPoint: [{
                "@type": "ContactPoint",
                email: "hello@pondok.co",
                contactType: "customer support",
                areaServed: "GB",
                availableLanguage: "en",
              }],
            },
            {
              "@type": "WebSite",
              "@id": "https://pondokpeptides.com/#website",
              url: "https://pondokpeptides.com",
              name: "Pondok Peptides",
              publisher: { "@id": "https://pondokpeptides.com/#org" },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://pondokpeptides.com/shop?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            },
            {
              "@type": "Store",
              name: "Pondok Peptides",
              image: "https://pondokpeptides.com/favicon.png",
              url: "https://pondokpeptides.com",
              priceRange: "££",
              areaServed: "GB",
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BackToTop } from "@/components/BackToTop";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Toaster } from "@/components/ui/sonner";
import { useCartSync } from "@/hooks/useCartSync";

function RootComponent() {
  const location = useLocation();
  const browserSearch = typeof window !== "undefined" ? window.location.search : "";
  useCartSync();

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;

    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: window.location.pathname + window.location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location.pathname, browserSearch]);

  return (
    <>
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
      <BackToTop />
      <WhatsAppFloat />
      <Toaster position="top-center" />
    </>
  );
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
