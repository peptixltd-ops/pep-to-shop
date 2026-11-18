import { resolveHead } from "@/lib/route-meta";

/** Tags the Next metadata API cannot emit with the correct attribute. */
export async function RouteTags({ route, params = {} }: { route: string; params?: Record<string, string> }) {
  const head = await resolveHead(route, params);
  const meta = head.meta || [];
  const ogType = meta.find((item) => item.property === "og:type")?.content;
  const published = meta.find((item) => item.property === "article:published_time")?.content;
  return (
    <>
      {ogType === "product" ? <meta property="og:type" content="product" /> : null}
      {published ? <meta property="article:published_time" content={published} /> : null}
    </>
  );
}
