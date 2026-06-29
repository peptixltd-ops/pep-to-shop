import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/recovery-peptides")({
  beforeLoad: () => {
    throw redirect({ to: "/structural-research-peptides", statusCode: 301 });
  },
  component: () => null,
});
