import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, buildCategoryHead } from "@/components/CategoryPage";
import { categoriesBySlug } from "@/data/categories";

const cat = categoriesBySlug["senolytic-longevity-peptides"];

export const Route = createFileRoute("/senolytic-longevity-peptides")({
  head: () => buildCategoryHead(cat),
  component: () => <CategoryPage category={cat} />,
});
