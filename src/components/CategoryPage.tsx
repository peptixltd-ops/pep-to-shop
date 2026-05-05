import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { storefrontApiRequest, formatPrice, getPrimaryProductImage, type ShopifyProduct } from "@/lib/shopify";
import bottle from "@/assets/product-bottle.jpg";
import { TrustStrip } from "@/components/TrustStrip";
import type { Category } from "@/data/categories";
import { getProductImageOverride } from "@/data/variantImages";

const PRODUCT_BY_HANDLE_LITE = `
  query GetProductLite($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      priceRange { minVariantPrice { amount currencyCode } }
      images(first: 5) { edges { node { url altText } } }
    }
  }
`;

type LiteProduct = {
  id: string;
  title: string;
  handle: string;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: ShopifyProduct["node"]["images"];
};

export function CategoryPage({ category }: { category: Category }) {
  const [items, setItems] = useState<LiteProduct[]>([]);

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      category.productHandles.map((h) =>
        storefrontApiRequest(PRODUCT_BY_HANDLE_LITE, { handle: h })
          .then((d) => d?.data?.product as LiteProduct | null)
          .catch(() => null),
      ),
    ).then((results) => {
      if (!cancelled) setItems(results.filter((p): p is LiteProduct => !!p));
    });
    return () => { cancelled = true; };
  }, [category.slug]);

  return (
    <div>
      <section className="container-x py-14 md:py-20 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Category</p>
        <h1 className="font-display text-4xl md:text-6xl text-ink leading-tight max-w-3xl mx-auto">{category.h1}</h1>
        <p className="mt-5 text-muted-foreground max-w-2xl mx-auto leading-relaxed">{category.intro}</p>
        <nav className="text-xs text-muted-foreground mt-4">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-primary">Shop</Link>
          <span className="mx-2">/</span>
          <span>{category.title}</span>
        </nav>
      </section>

      <TrustStrip />

      {items.length > 0 && (
        <section className="container-x py-14">
          <h2 className="font-display text-2xl md:text-3xl text-ink mb-6">Shop {category.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {items.map((p) => {
              const overrideImage = getProductImageOverride(p.handle);
              const img = overrideImage ? null : getPrimaryProductImage(p as unknown as ShopifyProduct["node"]);
              const price = p.priceRange.minVariantPrice;
              return (
                <Link key={p.id} to="/product/$handle" params={{ handle: p.handle }} className="group block">
                  <div className="bg-mist aspect-square overflow-hidden rounded-md">
                    <img src={overrideImage || img?.url || bottle} alt={overrideImage ? `${p.title} vial` : img?.altText || p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="pt-3">
                    <h3 className="font-display text-sm text-ink line-clamp-2">{p.title}</h3>
                    <p className="mt-1 text-sm font-medium text-ink">{formatPrice(price.amount, price.currencyCode)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section className="container-x py-10 md:py-16 max-w-4xl mx-auto space-y-10">
        {category.sections.map((s) => (
          <div key={s.h2}>
            <h2 className="font-display text-2xl md:text-3xl text-ink mb-4">{s.h2}</h2>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              {s.body.map((p, i) => (<p key={i}>{p}</p>))}
            </div>
          </div>
        ))}
      </section>

      <section className="bg-mist py-16">
        <div className="container-x max-w-3xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl text-ink mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {category.faqs.map((f) => (
              <details key={f.q} className="group bg-background border border-border rounded-md p-5">
                <summary className="cursor-pointer font-medium text-ink list-none flex justify-between items-center">
                  <span>{f.q}</span>
                  <span className="text-primary group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-sm text-foreground/75 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-16 text-center">
        <h2 className="font-display text-2xl md:text-3xl text-ink mb-6">Explore other categories</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/weight-loss-peptides" className="text-xs uppercase tracking-wider border border-border px-4 py-2 hover:border-primary hover:text-primary transition">Weight Loss</Link>
          <Link to="/recovery-peptides" className="text-xs uppercase tracking-wider border border-border px-4 py-2 hover:border-primary hover:text-primary transition">Recovery</Link>
          <Link to="/longevity-peptides" className="text-xs uppercase tracking-wider border border-border px-4 py-2 hover:border-primary hover:text-primary transition">Longevity</Link>
          <Link to="/nootropics" className="text-xs uppercase tracking-wider border border-border px-4 py-2 hover:border-primary hover:text-primary transition">Nootropics</Link>
          <Link to="/growth-hormone-peptides" className="text-xs uppercase tracking-wider border border-border px-4 py-2 hover:border-primary hover:text-primary transition">Growth Hormone</Link>
          <Link to="/blog" className="text-xs uppercase tracking-wider border border-border px-4 py-2 hover:border-primary hover:text-primary transition">Research Guides</Link>
        </div>
      </section>
    </div>
  );
}

export function buildCategoryHead(category: Category) {
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
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              name: category.h1,
              description: category.metaDescription,
              url,
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://pondokpeptides.com/" },
                { "@type": "ListItem", position: 2, name: "Shop", item: "https://pondokpeptides.com/shop" },
                { "@type": "ListItem", position: 3, name: category.title, item: url },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: category.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }),
      },
    ],
  };
}
