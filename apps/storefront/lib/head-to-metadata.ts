import type { Metadata } from "next";

type MetaItem = { title?: string; name?: string; property?: string; content?: string };
type HeadLink = { rel?: string; href?: string };
export type RouteHead = { meta?: MetaItem[]; links?: HeadLink[] };

export function headToMetadata(head: RouteHead | undefined): Metadata {
  const meta = head?.meta || [];
  const title = meta.find((item) => item.title)?.title;
  const description = meta.find((item) => item.name === "description")?.content;
  const robots = meta.find((item) => item.name === "robots")?.content;
  const ogTitle = meta.find((item) => item.property === "og:title")?.content;
  const ogDescription = meta.find((item) => item.property === "og:description")?.content;
  const ogUrl = meta.find((item) => item.property === "og:url")?.content;
  const ogType = meta.find((item) => item.property === "og:type")?.content;
  const ogImage = meta.find((item) => item.property === "og:image")?.content;
  const twitterCard = meta.find((item) => item.name === "twitter:card")?.content;
  const canonical = head?.links?.find((link) => link.rel === "canonical")?.href;

  const openGraph: Metadata["openGraph"] = {};
  if (ogTitle) openGraph.title = ogTitle;
  if (ogDescription) openGraph.description = ogDescription;
  if (ogUrl) openGraph.url = ogUrl;
  if (ogImage) openGraph.images = [ogImage];
  if (ogType === "article") openGraph.type = "article";
  else if (ogType && ogType !== "product") openGraph.type = "website";

  const metadata: Metadata = {};
  if (title) metadata.title = title;
  if (description) metadata.description = description;
  if (robots) metadata.robots = robots;
  if (canonical) metadata.alternates = { canonical };
  if (Object.keys(openGraph).length) metadata.openGraph = openGraph;
  if (twitterCard) {
    metadata.twitter = {
      card: twitterCard as "summary" | "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [ogImage] : undefined,
    };
  }
  return metadata;
}
