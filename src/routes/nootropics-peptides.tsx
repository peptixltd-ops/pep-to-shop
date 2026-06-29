import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/nootropics-peptides")({
  beforeLoad: () => {
    throw redirect({ to: "/neuro-research-peptides", statusCode: 301 });
  },
  component: () => null,
});
