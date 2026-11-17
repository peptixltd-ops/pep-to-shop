// Maps product handle + variant title to a local mockup image.
// Used so the product page image swaps when the variant chip is clicked,
// independent of Shopify image_id wiring.
import bacWater from "@/assets/variant-mockups/bacteriostatic-water-3mL-mockup.png";
import bpcMix from "@/assets/variant-mockups/bpc-157-tb-500-mix-20mg-blend-mockup.png";
import bpc10 from "@/assets/variant-mockups/bpc-157-10mg-mockup.png";
import cagri10 from "@/assets/variant-mockups/cagrilintide-10mg-mockup.png";
import ghkcu50 from "@/assets/variant-mockups/ghk-cu-50mg-mockup.png";
import igf1 from "@/assets/variant-mockups/igf-lr3-1mg-mockup.png";
import ipa10 from "@/assets/variant-mockups/ipamorelin-10mg-mockup.png";
import klow80 from "@/assets/variant-mockups/klow-80mg-blend-mockup.png";
import motsc40 from "@/assets/variant-mockups/mots-c-40mg-mockup.png";
import nad500 from "@/assets/variant-mockups/nad-500mg-mockup.png";
import pt14110 from "@/assets/variant-mockups/pt-141-10mg-mockup.png";
import reta10 from "@/assets/variant-mockups/retatrutide-10mg-mockup.png";
import reta20 from "@/assets/variant-mockups/retatrutide-20mg-mockup.png";
import reta30 from "@/assets/variant-mockups/retatrutide-30mg-mockup.png";
import reta40 from "@/assets/variant-mockups/retatrutide-40mg-mockup.png";
import selank10 from "@/assets/variant-mockups/selank-10mg-mockup.png";
import sema15 from "@/assets/variant-mockups/semaglutide-15mg-mockup.png";
import semax30 from "@/assets/variant-mockups/semax-30mg-mockup.png";
import ss3150 from "@/assets/variant-mockups/ss-31-50mg-mockup.png";
import tb50010 from "@/assets/variant-mockups/tb-500-10mg-mockup.png";
import tesa10 from "@/assets/variant-mockups/tesamorelin-10mg-mockup.png";
import tirz10 from "@/assets/variant-mockups/tirzepatide-10mg-mockup.png";
import tirz20 from "@/assets/variant-mockups/tirzepatide-20mg-mockup.png";
import tirz40 from "@/assets/variant-mockups/tirzepatide-40mg-mockup.png";

export const DEFAULT_PRODUCT_IMAGES: Record<string, string> = {
  "bacteriostatic-water": bacWater,
  "bpc-157-tb-500-mix": bpcMix,
  "bpc-157-10mg": bpc10,
  "cagrilintide": cagri10,
  "ghk-cu": ghkcu50,
  "igf-lr3": igf1,
  "ipamorelin": ipa10,
  "klow": klow80,
  "mots-c": motsc40,
  "nad": nad500,
  "pt-141": pt14110,
  "retatrutide": reta10,
  "selank": selank10,
  "semaglutide": sema15,
  "semax": semax30,
  "ss-31": ss3150,
  "tb-500": tb50010,
  "tesamorelin": tesa10,
  "tirzepatide": tirz10,
};

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

export function getProductImageOverride(handle: string, variantTitle?: string): string | null {
  return getVariantImage(handle, variantTitle) ?? DEFAULT_PRODUCT_IMAGES[handle] ?? null;
}
