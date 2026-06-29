import { COMPANY } from "@/components/CompanyInfo";

export const POLICY_LAST_UPDATED = "24 June 2026";

export function PolicyHeader() {
  return (
    <div className="rounded-lg border border-border bg-surface/40 p-5 mb-10 text-[14px] leading-relaxed text-foreground/85">
      <p className="font-semibold text-ink mb-2">Who you are buying from</p>
      <p>
        Pondok Peptides is a storefront brand operated by <strong>{COMPANY.legalName}</strong> (Company
        No. {COMPANY.companyNumber}), a company registered in England &amp; Wales at {COMPANY.addressLine1}, {COMPANY.addressLine2}, {COMPANY.postcode}, {COMPANY.country}. Payments are processed by Oxford Research Syndicate Ltd, the parent company that operates this storefront.
      </p>
      <p className="mt-3">
        Contact: <a className="text-primary hover:underline" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> · <a className="text-primary hover:underline" href={`tel:${COMPANY.phone.replace(/\s+/g, "")}`}>{COMPANY.phone}</a> (Mon–Fri 09:00–17:00 UK)
      </p>
      <p className="mt-1 text-muted-foreground">Last updated: {POLICY_LAST_UPDATED}</p>
    </div>
  );
}
