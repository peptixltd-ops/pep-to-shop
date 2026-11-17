import { metadataFor } from "@/lib/route-meta";

export async function generateMetadata() {
  return metadataFor("/account");
}

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
