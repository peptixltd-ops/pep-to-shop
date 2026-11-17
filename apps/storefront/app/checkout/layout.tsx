import { metadataFor } from "@/lib/route-meta";

export async function generateMetadata() {
  return metadataFor("/checkout");
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
