import { createFileRoute } from "@tanstack/react-router";
import bottles from "@/assets/bottles-desk.jpg";
import { COMPANY, CompanyInfoBlock, RELATIONSHIP_DISCLOSURE } from "@/components/CompanyInfo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Pondok Peptides | Operated by Oxford Research Syndicate Ltd" },
      { name: "description", content: "Pondok Peptides is a UK laboratory research peptide brand operated by Oxford Research Syndicate Ltd (Company No. 17207898)." },
      { property: "og:title", content: "About Pondok Peptides" },
      { property: "og:description", content: "UK laboratory research peptides operated by Oxford Research Syndicate Ltd." },
      { property: "og:url", content: "https://pondokpeptides.com/about" },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <section className="container-x py-16 md:py-24 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">About Pondok Peptides</p>
        <h1 className="font-display text-5xl md:text-6xl text-ink max-w-3xl mx-auto leading-tight">Laboratory-Grade Research Peptides. Built On Trust.</h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">UK-dispatched research peptides supplied with consistency, traceability and documented purity testing — for in-vitro laboratory research use only.</p>
      </section>

      <section className="grid lg:grid-cols-2">
        <img src={bottles} alt="Laboratory research peptide vials on a stainless steel bench" loading="lazy" width={1280} height={896} className="w-full h-full object-cover aspect-[4/3] lg:aspect-auto" />
        <div className="bg-mist p-10 lg:p-20 flex flex-col justify-center space-y-5 text-foreground/80">
          <h2 className="font-display text-3xl text-ink">Our Mission</h2>
          <p>Pondok Peptides supplies laboratory research peptides with honest labelling, documented purity testing, and reliable UK dispatch. All products are intended strictly for in-vitro investigative work by qualified researchers.</p>
          <p>We work with manufacturing partners operating to recognised pharmaceutical and research standards. A Certificate of Analysis is available for every batch, with independent third-party verification on request.</p>
        </div>
      </section>

      <section className="container-x py-20 md:py-28">
        <h2 className="font-display text-3xl md:text-4xl text-ink text-center mb-14">Our Standards</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { t: "Sourcing", d: "Material sourced from established manufacturing partners with documented traceability." },
            { t: "Manufacturing", d: "Produced in audited facilities operating to recognised pharmaceutical and research standards." },
            { t: "Testing", d: "Batches verified by HPLC and MS for identity and purity; independent third-party testing available on request." },
          ].map(s => (
            <div key={s.t} className="border border-border p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">{s.t}</p>
              <p className="text-foreground/80 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-mist border-y border-border py-20">
        <div className="container-x max-w-4xl">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Who Operates This Store</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-6">Operator &amp; Brand Relationship</h2>
          <p className="text-foreground/85 leading-relaxed mb-4">{RELATIONSHIP_DISCLOSURE}</p>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-background border border-border p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Store ownership</p>
              <p className="text-foreground/85 text-sm leading-relaxed">pondokpeptides.com is owned and operated by {COMPANY.legalName} (Company No. {COMPANY.companyNumber}), registered in England &amp; Wales.</p>
            </div>
            <div className="bg-background border border-border p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Order fulfilment</p>
              <p className="text-foreground/85 text-sm leading-relaxed">All orders placed on pondokpeptides.com are picked, packed and dispatched from the UK by {COMPANY.legalName}.</p>
            </div>
            <div className="bg-background border border-border p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Payment processing &amp; checkout</p>
              <p className="text-foreground/85 text-sm leading-relaxed">Payments are processed by Oxford Research Syndicate Ltd, the parent company that operates this storefront, through PCI-compliant payment providers.</p>
            </div>
            <div className="bg-background border border-border p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Customer service</p>
              <p className="text-foreground/85 text-sm leading-relaxed">Customer service for all Pondok Peptides orders is provided by {COMPANY.legalName} at {COMPANY.email} and {COMPANY.phone}, Monday–Friday 9am–6pm GMT.</p>
            </div>
          </div>
          <div className="mt-10 bg-background border border-border p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Registered Company Information</p>
            <CompanyInfoBlock className="text-foreground/85" />
          </div>
        </div>
      </section>
    </div>
  );
}
