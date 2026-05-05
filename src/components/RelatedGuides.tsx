import { Link } from "@tanstack/react-router";
import { blogPosts, type BlogPost } from "@/data/blog";

export function RelatedGuides({ handle }: { handle: string }) {
  const matches: BlogPost[] = blogPosts.filter((p) => p.productLinks.includes(handle)).slice(0, 4);
  if (matches.length === 0) return null;
  return (
    <section className="mt-12 max-w-5xl mx-auto">
      <h2 className="font-display text-2xl text-ink mb-6">Related research guides</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {matches.map((p) => (
          <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="block bg-mist border border-border p-5 hover:border-primary transition rounded-md">
            <p className="text-[10px] uppercase tracking-[0.2em] text-primary mb-2">{p.category} · {p.readingMinutes} min</p>
            <h3 className="font-display text-base text-ink">{p.title}</h3>
            <p className="mt-2 text-sm text-foreground/70 line-clamp-2">{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
