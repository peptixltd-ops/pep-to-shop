import { createFileRoute, Link } from "@tanstack/react-router";
import { blogPosts } from "@/data/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Peptide Research Blog UK | Guides & Lab Protocols | Pondok Peptides" },
      { name: "description", content: "Peptide research guides and laboratory protocols. BPC-157, TB-500, Retatrutide, GHK-Cu, MOTS-C and reconstitution and storage protocols from Pondok Peptides UK." },
      { property: "og:title", content: "Peptide Research Blog UK | Pondok Peptides" },
      { property: "og:description", content: "Peptide research guides and lab protocols from Pondok Peptides UK." },
      { property: "og:url", content: "https://pondokpeptides.com/blog" },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/blog" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Pondok Peptides Research Blog",
          url: "https://pondokpeptides.com/blog",
          blogPost: blogPosts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `https://pondokpeptides.com/blog/${p.slug}`,
            datePublished: p.date,
            description: p.excerpt,
          })),
        }),
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <div className="container-x py-14 md:py-20">
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Research Blog</p>
        <h1 className="font-display text-5xl md:text-6xl text-ink">Peptide <span className="italic text-primary">Research</span> Guides</h1>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">In-depth compound guides and laboratory protocols for UK researchers.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {blogPosts.map((p) => (
          <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group block bg-mist border border-border p-6 hover:border-primary transition rounded-md">
            <p className="text-[10px] uppercase tracking-[0.2em] text-primary mb-2">{p.category} · {p.readingMinutes} min read</p>
            <h2 className="font-display text-xl text-ink leading-snug group-hover:text-primary transition">{p.title}</h2>
            <p className="mt-3 text-sm text-foreground/75 leading-relaxed line-clamp-3">{p.excerpt}</p>
            <p className="mt-4 text-xs uppercase tracking-wider text-primary">Read guide →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
