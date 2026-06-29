import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/tissue-repair-peptides")({
  beforeLoad: () => {
    throw redirect({ to: "/structural-research-peptides", statusCode: 301 });
  },
  component: () => null,
});
