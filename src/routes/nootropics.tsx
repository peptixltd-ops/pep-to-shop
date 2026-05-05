import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, buildCategoryHead } from "@/components/CategoryPage";
import { categoriesBySlug } from "@/data/categories";

const cat = categoriesBySlug["nootropics"];

export const Route = createFileRoute("/nootropics")({
  head: () => buildCategoryHead(cat),
  component: () => <CategoryPage category={cat} />,
});
