import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, buildCategoryHead } from "@/components/CategoryPage";
import { categoriesBySlug } from "@/data/categories";

const cat = categoriesBySlug["endocrine-research-peptides"];

export const Route = createFileRoute("/endocrine-research-peptides")({
  head: () => buildCategoryHead(cat),
  component: () => <CategoryPage category={cat} />,
});
