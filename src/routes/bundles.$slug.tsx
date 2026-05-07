import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { BundleCard } from "@/components/BundleCard";
import { getBundleBySlug } from "@/data/bundles";

export const Route = createFileRoute("/bundles/$slug")({
  loader: ({ params }) => {
    const bundle = getBundleBySlug(params.slug);
    if (!bundle) throw notFound();
    return { bundle };
  },
  head: ({ loaderData }) => {
    const b = loaderData?.bundle;
    if (!b) return { meta: [{ title: "Bundle not found" }] };
    const url = `https://pondokpeptides.com/bundles/${b.slug}`;
    return {
      meta: [
        { title: `${b.title} | Save ${b.discountPercent}% | Pondok Peptides` },
        { name: "description", content: b.description },
        { property: "og:title", content: `${b.title} | Pondok Peptides` },
        { property: "og:description", content: b.description },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: BundleDetail,
  notFoundComponent: () => (
    <div className="container-x py-32 text-center">
      <p className="text-muted-foreground mb-4">Bundle not found.</p>
      <Link to="/bundles" className="text-primary underline">Back to bundles</Link>
    </div>
  ),
});

function BundleDetail() {
  const { bundle } = Route.useLoaderData();
  return (
    <div className="container-x py-10 md:py-14">
      <Link to="/bundles" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="size-4" /> All bundles
      </Link>
      <h1 className="font-display text-3xl md:text-4xl text-ink text-center">{bundle.title}</h1>
      <p className="text-center text-foreground/70 mt-3 max-w-2xl mx-auto">{bundle.description}</p>
      <BundleCard bundle={bundle} />
    </div>
  );
}
