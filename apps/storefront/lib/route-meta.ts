import type { Metadata } from "next";
import { blogBySlug } from "@/data/blog";
import { getBundleBySlug } from "@/data/bundles";
import { categoriesBySlug } from "@/data/categories";
import { headToMetadata, type RouteHead } from "@/lib/head-to-metadata";
import { getShopifyProductByHandle } from "@/lib/shopify";

const STATIC: Record<string, RouteHead> = {
  "/": {
    meta: [
      { title: "Research Peptides UK | Laboratory Research Use Only | Pondok Peptides" },
      { name: "description", content: "Pondok Peptides supplies laboratory research peptides in the UK with HPLC and MS verification and Certificate of Analysis on request. For laboratory research use only, not for human or veterinary use." },
      { property: "og:title", content: "Research Peptides UK | Laboratory Research Use Only | Pondok Peptides" },
      { property: "og:description", content: "UK laboratory research peptides with HPLC and MS verification and COA on request. Operated by Oxford Research Syndicate Ltd." },
      { property: "og:url", content: "https://pondokpeptides.com/" },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/" }],
  },
  "/shop": {
    meta: [
      { title: "Research Peptide Catalogue | Laboratory Research Use Only | Pondok Peptides" },
      { name: "description", content: "Browse the Pondok Peptides research catalogue: retatrutide, tirzepatide, BPC-157, TB-500, GHK-Cu and more. Supplied for in-vitro laboratory research use only. UK dispatch." },
      { property: "og:title", content: "Research Peptide Catalogue | Pondok Peptides" },
      { property: "og:description", content: "Laboratory research peptide catalogue. HPLC and MS verified, COA on request. UK dispatch." },
      { property: "og:url", content: "https://pondokpeptides.com/shop" },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/shop" }],
  },
  "/about": {
    meta: [
      { title: "About Pondok Peptides | Operated by Oxford Research Syndicate Ltd" },
      { name: "description", content: "Pondok Peptides is a UK laboratory research peptide brand operated by Oxford Research Syndicate Ltd (Company No. 17207898)." },
      { property: "og:title", content: "About Pondok Peptides" },
      { property: "og:description", content: "UK laboratory research peptides operated by Oxford Research Syndicate Ltd." },
      { property: "og:url", content: "https://pondokpeptides.com/about" },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/about" }],
  },
  "/blog": {
    meta: [
      { title: "Peptide Research Blog UK | Guides & Lab Protocols | Pondok Peptides" },
      { name: "description", content: "Peptide research guides and laboratory protocols. BPC-157, TB-500, Retatrutide, GHK-Cu, MOTS-C and reconstitution and storage protocols from Pondok Peptides UK." },
      { property: "og:title", content: "Peptide Research Blog UK | Pondok Peptides" },
      { property: "og:description", content: "Peptide research guides and lab protocols from Pondok Peptides UK." },
      { property: "og:url", content: "https://pondokpeptides.com/blog" },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/blog" }],
  },
  "/bundles": {
    meta: [
      { title: "Research Peptide Bundles | Pondok Peptides" },
      { name: "description", content: "Curated research peptide stacks for in-vitro laboratory comparison studies. HPLC-verified purity with batch-specific Certificates of Analysis." },
      { property: "og:title", content: "Research Peptide Bundles | Pondok Peptides" },
      { property: "og:description", content: "Curated research peptide stacks for in-vitro laboratory comparison studies. HPLC-verified, COA on every batch." },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/bundles" }],
  },
  "/cancellation-policy": {
    meta: [
      { title: "Cancellation Policy, Pondok Peptides" },
      { name: "description", content: "How to cancel an order placed with Oxford Research Syndicate Ltd, trading as Pondok Peptides." },
      { property: "og:title", content: "Cancellation Policy, Pondok Peptides" },
      { property: "og:description", content: "See our FAQ for complete order-cancellation information." },
      { property: "og:url", content: "https://pondokpeptides.com/cancellation-policy" },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/cancellation-policy" }],
  },
  "/contact": {
    meta: [
      { title: "Contact & Customer Service, Pondok Peptides" },
      { name: "description", content: "Contact Pondok Peptides customer service. UK research peptide supplier operated by Oxford Research Syndicate Ltd. We respond within 4 working hours." },
      { property: "og:title", content: "Contact & Customer Service, Pondok Peptides" },
      { property: "og:description", content: "Contact Pondok Peptides customer service. We respond within 4 working hours." },
      { property: "og:url", content: "https://pondokpeptides.com/contact" },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/contact" }],
  },
  "/cookie-policy": {
    meta: [
      { title: "Cookie Policy, Pondok Peptides" },
      { name: "description", content: "How Oxford Research Syndicate Ltd (trading as Pondok Peptides) uses cookies and similar technologies on pondokpeptides.com." },
      { property: "og:title", content: "Cookie Policy, Pondok Peptides" },
      { property: "og:description", content: "Cookie categories, durations and how to manage your preferences." },
      { property: "og:url", content: "https://pondokpeptides.com/cookie-policy" },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/cookie-policy" }],
  },
  "/disclaimer": {
    meta: [
      { title: "Disclaimer, Pondok Peptides" },
      { name: "description", content: "Research-use-only disclaimer for products supplied by Oxford Research Syndicate Ltd, trading as Pondok Peptides." },
      { property: "og:title", content: "Disclaimer, Pondok Peptides" },
      { property: "og:description", content: "Research-use-only notice and limitation of liability." },
      { property: "og:url", content: "https://pondokpeptides.com/disclaimer" },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/disclaimer" }],
  },
  "/faqs": {
    meta: [
      { title: "FAQs, Pondok Peptides" },
      { name: "description", content: "Answers to common questions about Pondok Peptides orders, products, payments and compliance." },
      { property: "og:title", content: "FAQs, Pondok Peptides" },
      { property: "og:description", content: "Common questions about orders, products, payments and compliance." },
    ],
  },
  "/press": {
    meta: [
      { title: "Press & Brand Assets | Pondok Peptides" },
      { name: "description", content: "Download official Pondok Peptides logos, color palette, social templates and brand kit PDF." },
      { property: "og:title", content: "Press & Brand Assets | Pondok Peptides" },
      { property: "og:description", content: "Official logos, colors and ad templates for press, partners and affiliates." },
    ],
  },
  "/privacy-policy": {
    meta: [
      { title: "Privacy Policy, Pondok Peptides" },
      { name: "description", content: "How Oxford Research Syndicate Ltd (trading as Pondok Peptides) collects, uses and protects your personal data under UK GDPR." },
      { property: "og:title", content: "Privacy Policy, Pondok Peptides" },
      { property: "og:description", content: "Our UK GDPR-compliant privacy practices." },
      { property: "og:url", content: "https://pondokpeptides.com/privacy-policy" },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/privacy-policy" }],
  },
  "/refund-policy": {
    meta: [
      { title: "Refund Policy, Pondok Peptides" },
      { name: "description", content: "Refunds and returns information for orders placed with Oxford Research Syndicate Ltd, trading as Pondok Peptides." },
      { property: "og:title", content: "Refund Policy, Pondok Peptides" },
      { property: "og:description", content: "See our FAQ for full refund and return details." },
      { property: "og:url", content: "https://pondokpeptides.com/refund-policy" },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/refund-policy" }],
  },
  "/returns-policy": {
    meta: [
      { title: "Returns Policy, Pondok Peptides" },
      { name: "description", content: "14-day returns window for unopened, sealed laboratory research peptides. Oxford Research Syndicate Ltd, trading as Pondok Peptides." },
      { property: "og:title", content: "Returns Policy, Pondok Peptides" },
      { property: "og:description", content: "How to return an unopened research peptide order within 14 days." },
      { property: "og:url", content: "https://pondokpeptides.com/returns-policy" },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/returns-policy" }],
  },
  "/reviews": {
    meta: [
      { title: "Customer Feedback, Pondok Peptides" },
      { name: "description", content: "Read customer feedback from Pondok Peptides researchers across the UK." },
      { property: "og:title", content: "Customer Feedback, Pondok Peptides" },
      { property: "og:description", content: "Customer feedback from Pondok Peptides researchers." },
    ],
  },
  "/shipping-policy": {
    meta: [
      { title: "Shipping Policy, Pondok Peptides" },
      { name: "description", content: "UK-only Royal Mail Tracked 24 dispatch. £4.95 flat, free over £75. Oxford Research Syndicate Ltd, trading as Pondok Peptides." },
      { property: "og:title", content: "Shipping Policy, Pondok Peptides" },
      { property: "og:description", content: "Royal Mail Tracked 24 dispatch within the UK." },
      { property: "og:url", content: "https://pondokpeptides.com/shipping-policy" },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/shipping-policy" }],
  },
  "/sitemap": {
    meta: [
      { title: "Sitemap, Pondok Peptides" },
      { name: "description", content: "Browse every section of pondokpeptides.com — catalogue, research collections, company information and legal policies." },
      { property: "og:title", content: "Sitemap, Pondok Peptides" },
      { property: "og:description", content: "All pages on pondokpeptides.com in one place." },
      { property: "og:url", content: "https://pondokpeptides.com/sitemap" },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/sitemap" }],
  },
  "/terms-and-conditions": {
    meta: [
      { title: "Terms & Conditions, Pondok Peptides" },
      { name: "description", content: "Terms and conditions of sale for Oxford Research Syndicate Ltd, trading as Pondok Peptides. Research-use-only laboratory peptides." },
      { property: "og:title", content: "Terms & Conditions, Pondok Peptides" },
      { property: "og:description", content: "UK terms of sale for laboratory research peptides." },
      { property: "og:url", content: "https://pondokpeptides.com/terms-and-conditions" },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/terms-and-conditions" }],
  },
  "/thank-you": {
    meta: [
      { title: "Thank you for your order | Pondok Peptides" },
      { name: "description", content: "Your order has been received. Thank you for shopping with Pondok Peptides." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  },
  "/unsubscribe": {
    meta: [
      { title: "Unsubscribe — Pondok Peptides" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  },
  "/coa/reta-egb-0426-rt30": {
    meta: [
      { title: "Certificate of Analysis - Retatrutide Batch EGB-0426-RT30 | Pondok Peptides" },
      { name: "description", content: "Third-party Certificate of Analysis for Retatrutide research batch EGB-0426-RT30. Independently tested by Janoshik Analytical. Purity 99.710% ; 99.456%." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "COA - Retatrutide EGB-0426-RT30" },
      { property: "og:description", content: "Independently tested by Janoshik Analytical. Purity 99.710% ; 99.456%." },
      { property: "og:url", content: "https://pondokpeptides.com/coa/reta-egb-0426-rt30" },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/coa/reta-egb-0426-rt30" }],
  },
  "/checkout": {
    meta: [
      { title: "Checkout, Pondok Peptides" },
      { name: "description", content: "Checkout for laboratory research peptides from Pondok Peptides. For laboratory research use only." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  },
  "/account": {
    meta: [
      { title: "Account, Pondok Peptides" },
      { name: "description", content: "Sign in to your Pondok Peptides account." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  },
  "/account/reset": {
    meta: [
      { title: "Set a new password, Pondok Peptides" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  },
};

function categoryHead(slug: string): RouteHead {
  const category = categoriesBySlug[slug];
  if (!category) return { meta: [{ title: "Pondok Peptides" }] };
  const url = `https://pondokpeptides.com/${category.slug}`;
  return {
    meta: [
      { title: category.metaTitle },
      { name: "description", content: category.metaDescription },
      { property: "og:title", content: category.metaTitle },
      { property: "og:description", content: category.metaDescription },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

async function productHead(handle: string): Promise<RouteHead> {
  const product = await getShopifyProductByHandle(handle);
  const url = `https://pondokpeptides.com/product/${handle}`;
  const name = product?.title || handle.replace(/-/g, " ");
  const fallbackTitle = `${name} - Research Peptide (Lyophilised, HPLC ≥99%)`;
  const fallbackDesc = `${name} laboratory research peptide. Lyophilised powder, HPLC ≥99%, Certificate of Analysis available on request. For in-vitro laboratory research use only.`;
  const title = product?.seo?.title?.trim() || fallbackTitle;
  const description = product?.seo?.description?.trim() || fallbackDesc;
  const image = product?.images?.edges?.[0]?.node?.url;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "product" },
      { property: "og:url", content: url },
      ...(image ? [{ property: "og:image", content: image }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export async function resolveHead(route: string, params: Record<string, string> = {}): Promise<RouteHead> {
  if (route === "/product/[handle]") return productHead(params.handle || "");
  if (route === "/blog/[slug]") {
    const post = blogBySlug[params.slug || ""];
    if (!post) return { meta: [{ title: "Article not found | Pondok Peptides" }] };
    const url = `https://pondokpeptides.com/blog/${post.slug}`;
    return {
      meta: [
        { title: post.metaTitle },
        { name: "description", content: post.metaDescription },
        { property: "og:title", content: post.metaTitle },
        { property: "og:description", content: post.metaDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "article:published_time", content: post.date },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  }
  if (route === "/bundles/[slug]") {
    const bundle = getBundleBySlug(params.slug || "");
    if (!bundle) return { meta: [{ title: "Bundle not found" }] };
    const url = `https://pondokpeptides.com/bundles/${bundle.slug}`;
    return {
      meta: [
        { title: `${bundle.title} | Save ${bundle.discountPercent}% | Pondok Peptides` },
        { name: "description", content: bundle.description },
        { property: "og:title", content: `${bundle.title} | Pondok Peptides` },
        { property: "og:description", content: bundle.description },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  }
  if (STATIC[route]) return STATIC[route];
  const slug = route.replace(/^\//, "");
  if (categoriesBySlug[slug]) return categoryHead(slug);
  return { meta: [{ title: "Pondok Peptides" }] };
}

export async function metadataFor(route: string, params: Record<string, string> = {}): Promise<Metadata> {
  return headToMetadata(await resolveHead(route, params));
}
