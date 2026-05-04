import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

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
      { title: "Pondok - Premium UK Research Peptides, High Quality & Purity" },
      { name: "description", content: "Pondok Peptides High Quality 3rd Party Tested Research Peptides. UK Based. Fast, Free,  Direct Delivery. Established since 2021. Over 10,000 customers." },
      { property: "og:title", content: "Pondok - Premium UK Research Peptides, High Quality & Purity" },
      { property: "og:description", content: "Pondok Peptides High Quality 3rd Party Tested Research Peptides. UK Based. Fast, Free,  Direct Delivery. Established since 2021. Over 10,000 customers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Pondok - Premium UK Research Peptides, High Quality & Purity" },
      { name: "twitter:description", content: "Pondok Peptides High Quality 3rd Party Tested Research Peptides. UK Based. Fast, Free,  Direct Delivery. Established since 2021. Over 10,000 customers." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fdfd8a2a-a515-43c1-bc56-908bfb106983/id-preview-57306d87--addea2de-6ec5-46c9-a6a5-e7ce68c2a6d6.lovable.app-1777560549763.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fdfd8a2a-a515-43c1-bc56-908bfb106983/id-preview-57306d87--addea2de-6ec5-46c9-a6a5-e7ce68c2a6d6.lovable.app-1777560549763.png" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=Inter:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap" },
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
import { Toaster } from "@/components/ui/sonner";
import { useCartSync } from "@/hooks/useCartSync";

function RootComponent() {
  useCartSync();
  return (
    <>
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
      <BackToTop />
      <Toaster position="top-center" />
    </>
  );
}
