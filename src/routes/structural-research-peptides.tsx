import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, buildCategoryHead } from "@/components/CategoryPage";
import { categoriesBySlug } from "@/data/categories";

const cat = categoriesBySlug["structural-research-peptides"];

export const Route = createFileRoute("/structural-research-peptides")({
  head: () => buildCategoryHead(cat),
  component: () => <CategoryPage category={cat} />,
});
