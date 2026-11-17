"use client";
import { createFileRoute } from "@/shims/router";
import { CategoryPage, buildCategoryHead } from "@/components/CategoryPage";
import { categoriesBySlug } from "@/data/categories";

const cat = categoriesBySlug["neuro-research-peptides"];

export const Route = createFileRoute("/neuro-research-peptides")({
  head: () => buildCategoryHead(cat),
  component: () => <CategoryPage category={cat} />,
});
