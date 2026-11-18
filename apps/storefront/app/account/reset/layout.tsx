import { metadataFor } from "@/lib/route-meta";

export async function generateMetadata() {
  return metadataFor("/account/reset");
}

export default function ResetLayout({ children }: { children: React.ReactNode }) {
  return children;
}
