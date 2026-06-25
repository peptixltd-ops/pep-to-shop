// Single source of truth for company/legal identity used across
// footer, contact, about and all policy pages.

export const COMPANY = {
  legalName: "Oxford Research Syndicate Ltd",
  tradingAs: "Pondok Peptides",
  companyNumber: "17207898",
  addressLine1: "131A Movers Lane",
  addressLine2: "Barking",
  postcode: "IG11 7UQ",
  country: "United Kingdom",
  email: "info@pondokpeptides.com",
  phone: "07457 404317",
} as const;

export const COMPANY_ADDRESS_ONELINE = `${COMPANY.addressLine1}, ${COMPANY.addressLine2}, ${COMPANY.postcode}, ${COMPANY.country}`;

export const RELATIONSHIP_DISCLOSURE =
  "Pondok Peptides is a storefront brand operated by Oxford Research Syndicate Ltd (Company No. 17207898), which also operates BuyRetaUK, UK Peptide Labs and Oxford Research Peptides. Orders placed through pondokpeptides.com are processed, fulfilled and supported by Oxford Research Syndicate Ltd. Checkout is handled on shared Oxford Research Syndicate infrastructure at checkout.oxfordresearchsyndicate.com.";

export function CompanyInfoBlock({ className = "" }: { className?: string }) {
  return (
    <div className={`text-sm leading-relaxed ${className}`}>
      <p className="font-semibold text-ink">{COMPANY.legalName}</p>
      <p>Trading as {COMPANY.tradingAs}</p>
      <p>Company No. {COMPANY.companyNumber} — Registered in England &amp; Wales</p>
      <p>{COMPANY.addressLine1}</p>
      <p>{COMPANY.addressLine2}, {COMPANY.postcode}</p>
      <p>{COMPANY.country}</p>
      <p className="mt-2">
        Email: <a className="text-primary hover:underline" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
      </p>
      <p>
        Phone: <a className="text-primary hover:underline" href={`tel:${COMPANY.phone.replace(/\s+/g, "")}`}>{COMPANY.phone}</a>
      </p>
      <p>VAT: {COMPANY.vat}</p>
    </div>
  );
}
