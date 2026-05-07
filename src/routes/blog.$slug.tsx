import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { blogBySlug, blogPosts, type BlogPost, type BlogFAQ } from "@/data/blog";
import { categoriesBySlug, type Category } from "@/data/categories";
import { RelatedProducts } from "@/components/RelatedProducts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = blogBySlug[params.slug];
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const post = loaderData.post;
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
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                headline: post.title,
                description: post.metaDescription,
                datePublished: post.date,
                dateModified: post.date,
                author: { "@type": "Organization", name: "Pondok Peptides" },
                publisher: {
                  "@type": "Organization",
                  name: "Pondok Peptides",
                  logo: { "@type": "ImageObject", url: "https://pondokpeptides.com/favicon.png" },
                },
                mainEntityOfPage: { "@type": "WebPage", "@id": url },
                url,
              },
              {
                "@type": "FAQPage",
                mainEntity: post.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://pondokpeptides.com/" },
                  { "@type": "ListItem", position: 2, name: "Blog", item: "https://pondokpeptides.com/blog" },
                  { "@type": "ListItem", position: 3, name: post.title, item: url },
                ],
              },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-x py-32 text-center">
      <p className="text-muted-foreground mb-4">Article not found.</p>
      <Link to="/blog" className="text-primary underline">Back to blog</Link>
    </div>
  ),
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData() as { post: typeof blogPosts[number] };
  const related = post.relatedSlugs
    .map((s: string) => blogBySlug[s])
    .filter(Boolean);
  const linkedCategories = post.categoryLinks
    .map((s: string) => categoriesBySlug[s])
    .filter(Boolean);

  return (
    <article className="container-x py-12 md:py-16 max-w-3xl mx-auto">
      <nav className="text-xs text-muted-foreground mb-6">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/blog" className="hover:text-primary">Blog</Link>
        {linkedCategories[0] && (
          <>
            <span className="mx-2">/</span>
            <Link to={`/${linkedCategories[0].slug}` as "/weight-loss-peptides"} className="hover:text-primary">{linkedCategories[0].title}</Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span>{post.title}</span>
      </nav>
      <p className="text-[10px] uppercase tracking-[0.25em] text-primary mb-3">{post.category} · {post.readingMinutes} min read</p>
      <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight">{post.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>

      <div className="mt-10 space-y-10">
        {post.sections.map((s: BlogPost["sections"][number]) => (
          <section key={s.h2}>
            <h2 className="font-display text-2xl md:text-3xl text-ink mb-4">{s.h2}</h2>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              {s.body.map((p: string, i: number) => (<p key={i}>{p}</p>))}
            </div>
          </section>
        ))}
      </div>

      {/* Related products */}
      {post.productLinks.length > 0 && (
        <RelatedProducts handles={post.productLinks} heading="Products mentioned in this guide" />
      )}

      {/* FAQs */}
      <section className="mt-12">
        <h2 className="font-display text-2xl md:text-3xl text-ink mb-6">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {post.faqs.map((f: BlogFAQ) => (
            <details key={f.q} className="group bg-mist border border-border rounded-md p-5">
              <summary className="cursor-pointer font-medium text-ink list-none flex justify-between items-center">
                <span>{f.q}</span>
                <span className="text-primary group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm text-foreground/75 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Categories */}
      {linkedCategories.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-xl text-ink mb-4">Browse related categories</h2>
          <div className="flex flex-wrap gap-2">
            {linkedCategories.map((c: Category) => (
              <Link key={c.slug} to={`/${c.slug}` as "/weight-loss-peptides"} className="text-xs uppercase tracking-wider border border-border px-4 py-2 hover:border-primary hover:text-primary transition">
                {c.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related guides */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-xl text-ink mb-4">Related guides</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {related.map((r: BlogPost) => (
              <Link key={r.slug} to="/blog/$slug" params={{ slug: r.slug }} className="block bg-mist border border-border p-5 hover:border-primary transition rounded-md">
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary mb-2">{r.category}</p>
                <h3 className="font-display text-base text-ink">{r.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-12 text-center">
        <Link to="/blog" className="text-sm uppercase tracking-wider text-primary hover:underline">← Back to all guides</Link>
      </section>
    </article>
  );
}

// Force inclusion of the full posts list so related blocks work in any environment.
void blogPosts;
