import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/growth-hormone-peptides")({
  beforeLoad: () => {
    throw redirect({ to: "/endocrine-research-peptides", statusCode: 301 });
  },
  component: () => null,
});
