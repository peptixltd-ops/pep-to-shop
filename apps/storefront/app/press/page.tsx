import type { Metadata } from "next";
import { metadataFor } from "@/lib/route-meta";
import { RouteTags } from "@/components/route-tags";
import Client from "./client";

export async function generateMetadata({
  params,
}: {
  params: Promise<Record<string, string>>;
}): Promise<Metadata> {
  const resolved = params ? await params : {};
  return metadataFor('/press', resolved);
}

export default async function Page({
  params,
}: {
  params: Promise<Record<string, string>>;
}) {
  const resolved = params ? await params : {};
  return (
    <>
      <RouteTags route='/press' params={resolved} />
      <Client />
    </>
  );
}
