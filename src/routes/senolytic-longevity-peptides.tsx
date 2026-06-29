import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/senolytic-longevity-peptides")({
  beforeLoad: () => {
    throw redirect({ to: "/senescence-research-peptides", statusCode: 301 });
  },
  component: () => null,
});
