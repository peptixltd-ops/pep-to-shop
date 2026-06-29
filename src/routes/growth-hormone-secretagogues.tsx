import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/growth-hormone-secretagogues")({
  beforeLoad: () => {
    throw redirect({ to: "/endocrine-research-peptides", statusCode: 301 });
  },
  component: () => null,
});
