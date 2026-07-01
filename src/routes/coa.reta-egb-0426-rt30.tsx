import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, FileCheck2, Download, ExternalLink } from "lucide-react";
import coaAsset from "@/assets/coa/coa-reta-egb-0426-rt30.png.asset.json";
import { COMPANY } from "@/components/CompanyInfo";

const PAGE_URL = "https://pondokpeptides.com/coa/reta-egb-0426-rt30";

const COA = {
  product: "Retatrutide 30 mg (Research)",
  batch: "EGB-0426-RT30",
  taskNumber: "148596",
  lab: "Janoshik Analytical",
  testOrdered: "16 April 2026",
  sampleReceived: "21 April 2026",
  analysisConducted: "23 April 2026",
  test: "Common GLP-1 peptide blind test (Semaglutide, Tirzepatide, Retatrutide)",
  identified: "Retatrutide",
  content: "32.61 mg; 33.63 mg",
  purity: "99.710% ; 99.456%",
  verifyKey: "9BE85LPHGX18",
  verifyUrl: "https://www.janoshik.com/verify/",
} as const;

export const Route = createFileRoute("/coa/reta-egb-0426-rt30")({
  head: () => ({
    meta: [
      { title: `Certificate of Analysis - Retatrutide Batch ${COA.batch} | Pondok Peptides` },
      {
        name: "description",
        content: `Third-party Certificate of Analysis for Retatrutide research batch ${COA.batch}. Independently tested by ${COA.lab}. Purity ${COA.purity}.`,
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: `COA - Retatrutide ${COA.batch}` },
      { property: "og:description", content: `Independently tested by ${COA.lab}. Purity ${COA.purity}.` },
      { property: "og:url", content: PAGE_URL },
      { property: "og:image", content: `https://pondokpeptides.com${coaAsset.url}` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
  }),
  component: CoaPage,
});

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-3 gap-4 py-3 border-b border-border last:border-0">
      <dt className="text-sm text-muted-foreground col-span-1">{label}</dt>
      <dd className="text-sm text-ink col-span-2 font-medium">{value}</dd>
    </div>
  );
}

function CoaPage() {
  return (
    <div className="bg-mist/40 min-h-screen">
      <div className="container-x py-10 md:py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-2 inline-flex items-center gap-2">
            <ShieldCheck className="size-4" /> Verified Certificate of Analysis
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-ink">
            {COA.product}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Batch <span className="font-mono text-ink">{COA.batch}</span> · Independently tested by {COA.lab}
          </p>
        </div>

        {/* Summary card */}
        <div className="bg-background border border-border rounded-lg p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <FileCheck2 className="size-5 text-primary" />
            <h2 className="font-display text-xl text-ink">Test Summary</h2>
          </div>
          <dl>
            <Row label="Product" value={COA.product} />
            <Row label="Batch number" value={COA.batch} />
            <Row label="Testing laboratory" value={COA.lab} />
            <Row label="Task number" value={`#${COA.taskNumber}`} />
            <Row label="Test ordered" value={COA.testOrdered} />
            <Row label="Sample received" value={COA.sampleReceived} />
            <Row label="Analysis conducted" value={COA.analysisConducted} />
            <Row label="Test performed" value={COA.test} />
            <Row label="Peptide identified" value={COA.identified} />
            <Row label="Content (mass by HPLC)" value={COA.content} />
            <Row label="Purity" value={COA.purity} />
          </dl>

          <div className="mt-6 p-4 bg-mist rounded border border-border">
            <p className="text-xs uppercase tracking-wider text-primary mb-1">Independent verification</p>
            <p className="text-sm text-ink">
              Verify this report directly with {COA.lab} using key{" "}
              <span className="font-mono bg-background px-2 py-0.5 border border-border rounded">
                {COA.verifyKey}
              </span>
            </p>
            <a
              href={COA.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              Open verification page <ExternalLink className="size-3.5" />
            </a>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center mt-6">
          <a
            href={coaAsset.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded text-sm uppercase tracking-wider hover:bg-primary/90 transition"
          >
            <ExternalLink className="size-4" /> View full report
          </a>
          <a
            href={coaAsset.url}
            download="Pondok-Peptides-COA-Retatrutide-EGB-0426-RT30.png"
            className="inline-flex items-center gap-2 bg-ink text-background px-5 py-2.5 rounded text-sm uppercase tracking-wider hover:opacity-90 transition"
          >
            <Download className="size-4" /> Download PNG
          </a>
        </div>

        {/* COA image */}
        <div className="mt-10">
          <h2 className="font-display text-xl text-ink mb-4">Original laboratory report</h2>
          <div className="bg-background border border-border rounded-lg overflow-hidden shadow-sm">
            <img
              src={coaAsset.url}
              alt={`Janoshik Analytical Certificate of Analysis for Retatrutide batch ${COA.batch}`}
              className="w-full h-auto"
              loading="eager"
            />
          </div>
        </div>

        {/* Footer disclosure */}
        <div className="mt-10 text-xs text-muted-foreground text-center leading-relaxed max-w-2xl mx-auto">
          <p>
            Issued by {COMPANY.tradingAs}, a storefront operated by {COMPANY.legalName} (Company
            No. {COMPANY.companyNumber}). Products are supplied strictly for in-vitro laboratory
            research use. Not for human or veterinary use.
          </p>
          <p className="mt-2">
            For questions about this certificate, contact{" "}
            <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">
              {COMPANY.email}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
