import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/growth-hormone-peptides")({
  beforeLoad: () => {
    throw redirect({ to: "/growth-hormone-secretagogues", statusCode: 301 });
  },
  component: () => null,
});
