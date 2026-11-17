"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BackToTop } from "@/components/BackToTop";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { NewsletterPopup } from "@/components/NewsletterPopup";
import { Toaster } from "@/components/ui/sonner";
import { useCartSync } from "@/hooks/useCartSync";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  useCartSync();
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;
    window.gtag("config", "G-FWN8D6ZQZ4", { page_path: pathname });
  }, [pathname]);
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <BackToTop />
      <WhatsAppFloat />
      <NewsletterPopup />
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
