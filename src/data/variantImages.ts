// Maps product handle + variant title to a local mockup image.
// Used so the product page image swaps when the variant chip is clicked,
// independent of Shopify image_id wiring.
import reta10 from "@/assets/variant-mockups/retatrutide-10mg-mockup.png";
import reta20 from "@/assets/variant-mockups/retatrutide-20mg-mockup.png";
import reta30 from "@/assets/variant-mockups/retatrutide-30mg-mockup.png";
import reta40 from "@/assets/variant-mockups/retatrutide-40mg-mockup.png";
import tirz10 from "@/assets/variant-mockups/tirzepatide-10mg-mockup.png";
import tirz20 from "@/assets/variant-mockups/tirzepatide-20mg-mockup.png";
import tirz40 from "@/assets/variant-mockups/tirzepatide-40mg-mockup.png";

export const VARIANT_IMAGES: Record<string, Record<string, string>> = {
  retatrutide: {
    "10mg": reta10,
    "20mg": reta20,
    "30mg": reta30,
    "40mg": reta40,
  },
  tirzepatide: {
    "10mg": tirz10,
    "20mg": tirz20,
    "40mg": tirz40,
  },
};

export function getVariantImage(handle: string, variantTitle: string | undefined): string | null {
  if (!variantTitle) return null;
  const key = variantTitle.trim().toLowerCase();
  return VARIANT_IMAGES[handle]?.[key] ?? null;
}
