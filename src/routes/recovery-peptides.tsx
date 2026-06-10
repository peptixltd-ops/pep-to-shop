import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/recovery-peptides")({
  beforeLoad: () => {
    throw redirect({ to: "/tissue-repair-peptides", statusCode: 301 });
  },
  component: () => null,
});
