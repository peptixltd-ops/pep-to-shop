import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/longevity-peptides")({
  beforeLoad: () => {
    throw redirect({ to: "/senolytic-longevity-peptides", statusCode: 301 });
  },
  component: () => null,
});
