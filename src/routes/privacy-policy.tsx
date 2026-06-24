import { createFileRoute } from "@tanstack/react-router";
import { COMPANY, COMPANY_ADDRESS_ONELINE, CompanyInfoBlock } from "@/components/CompanyInfo";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy, Pondok Peptides" },
      { name: "description", content: "How Pondok Peptides (Oxford Research Syndicate Ltd) collects, uses and protects your personal data under UK GDPR." },
      { property: "og:title", content: "Privacy Policy, Pondok Peptides" },
      { property: "og:description", content: "Our UK GDPR-compliant privacy practices." },
      { property: "og:url", content: "https://pondokpeptides.com/privacy-policy" },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/privacy-policy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="container-x py-16 md:py-20 max-w-3xl">
      <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Legal</p>
      <h1 className="font-display text-4xl md:text-5xl text-ink mb-6">Privacy <span className="italic text-primary">Policy</span></h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long" })}</p>

      <div className="prose-style space-y-8 text-foreground/85 leading-relaxed text-[15px]">
        <section>
          <h2 className="font-display text-2xl text-ink mb-3">1. Who we are</h2>
          <p>Pondok Peptides is a storefront brand operated by <strong>{COMPANY.legalName}</strong> (Company No. {COMPANY.companyNumber}), registered in England &amp; Wales, with registered address {COMPANY_ADDRESS_ONELINE}. {COMPANY.legalName} is the data controller for personal data collected through pondokpeptides.com and at checkout on checkout.oxfordresearchsyndicate.com.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">2. Data we collect</h2>
          <p>We collect information you provide directly (name, email, billing and delivery address, phone number, order details) as well as technical data (IP address, browser, device, pages viewed, cookies) when you use the site or complete checkout.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">3. How we use your data</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To process and dispatch orders.</li>
            <li>To respond to enquiries and provide customer support.</li>
            <li>To send order updates and, where you have opted in, marketing communications.</li>
            <li>To maintain site security, prevent fraud and comply with legal obligations.</li>
            <li>To improve our products, content and user experience.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">4. Legal bases</h2>
          <p>We process data under the UK GDPR on the bases of contract performance, legitimate interests, legal obligation, and consent (for marketing and non-essential cookies).</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">5. Sharing</h2>
          <p>We share data only with trusted processors (payment providers, couriers, hosting, email, analytics) under written agreements, and with authorities where legally required. We do not sell personal data. Order data may be shared internally between Pondok Peptides and the shared checkout, fulfilment and customer-service operations of {COMPANY.legalName}.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">6. Retention</h2>
          <p>Order and accounting records are retained for at least 6 years to meet UK tax and consumer law. Marketing data is retained until you withdraw consent.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">7. Your rights</h2>
          <p>You have the right to access, rectify, erase, restrict, port or object to processing of your personal data, and to lodge a complaint with the Information Commissioner's Office (ico.org.uk).</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">8. Cookies</h2>
          <p>We use essential cookies to operate the site and analytics cookies (e.g. Google Analytics) to understand usage. You can manage cookies in your browser settings.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-3">9. Contact</h2>
          <p>Privacy queries: <a className="text-primary hover:underline" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> · Phone: <a className="text-primary hover:underline" href={`tel:${COMPANY.phone.replace(/\s+/g, "")}`}>{COMPANY.phone}</a></p>
          <div className="mt-4 bg-mist border border-border p-5">
            <CompanyInfoBlock />
          </div>
        </section>
      </div>
    </div>
  );
}
