import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, buildCategoryHead } from "@/components/CategoryPage";
import { categoriesBySlug } from "@/data/categories";

const cat = categoriesBySlug["growth-hormone-secretagogues"];

export const Route = createFileRoute("/growth-hormone-secretagogues")({
  head: () => buildCategoryHead(cat),
  component: () => <CategoryPage category={cat} />,
});
