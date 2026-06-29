import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/weight-loss-peptides")({
  beforeLoad: () => {
    throw redirect({ to: "/glp1-research-peptides", statusCode: 301 });
  },
  component: () => null,
});
