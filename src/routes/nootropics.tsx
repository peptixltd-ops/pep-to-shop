import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/nootropics")({
  beforeLoad: () => {
    throw redirect({ to: "/cognitive-neuropeptides", statusCode: 301 });
  },
  component: () => null,
});
