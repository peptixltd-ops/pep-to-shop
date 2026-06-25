import { Link } from "@tanstack/react-router";
import { COMPANY, RELATIONSHIP_DISCLOSURE } from "@/components/CompanyInfo";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-background mt-24">
      <div className="bg-primary/10 border-y border-background/10">
        <div className="container-x py-4 text-center text-xs md:text-sm text-background/80 uppercase tracking-[0.2em]">
          For Laboratory Research Use Only · Not For Human Or Veterinary Use
        </div>
      </div>
      <div className="container-x py-16 grid gap-10 md:grid-cols-6">
        <div className="md:col-span-2">
          <div className="font-display text-2xl font-semibold mb-3">Pondok Peptides</div>
          <p className="text-sm text-background/70 leading-relaxed">
            Laboratory research peptides for in-vitro investigative use only. UK-dispatched. Not intended for human or veterinary use.
          </p>
          <div className="mt-5 text-sm text-background/80 space-y-1">
            <p className="font-semibold text-background">{COMPANY.legalName}</p>
            <p>Trading as {COMPANY.tradingAs}</p>
            <p>Company No. {COMPANY.companyNumber}</p>
            <p>{COMPANY.addressLine1}</p>
            <p>{COMPANY.addressLine2}, {COMPANY.postcode}</p>
            <p>{COMPANY.country}</p>
            <p className="pt-1">
              <a className="hover:text-accent" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            </p>
            <p>
              <a className="hover:text-accent" href={`tel:${COMPANY.phone.replace(/\s+/g, "")}`}>{COMPANY.phone}</a>
            </p>
            <p className="text-background/60">{COMPANY.vat}</p>
          </div>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] mb-4 text-background/60">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop" className="hover:text-accent">All peptides</Link></li>
            <li><Link to="/glp1-metabolic-peptides" className="hover:text-accent">GLP-1 &amp; metabolic peptides</Link></li>
            <li><Link to="/tissue-repair-peptides" className="hover:text-accent">Tissue research peptides</Link></li>
            <li><Link to="/senolytic-longevity-peptides" className="hover:text-accent">Senolytic research peptides</Link></li>
            <li><Link to="/cognitive-neuropeptides" className="hover:text-accent">Cognitive research peptides</Link></li>
            <li><Link to="/growth-hormone-secretagogues" className="hover:text-accent">Growth hormone research peptides</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] mb-4 text-background/60">Catalogue</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/product/$handle" params={{ handle: "retatrutide" }} className="hover:text-accent">Retatrutide (Research)</Link></li>
            <li><Link to="/product/$handle" params={{ handle: "tirzepatide" }} className="hover:text-accent">Tirzepatide (Research)</Link></li>
            <li><Link to="/product/$handle" params={{ handle: "semaglutide" }} className="hover:text-accent">Semaglutide (Research)</Link></li>
            <li><Link to="/product/$handle" params={{ handle: "bpc-157" }} className="hover:text-accent">BPC-157 (Research)</Link></li>
            <li><Link to="/product/$handle" params={{ handle: "tb-500" }} className="hover:text-accent">TB-500 (Research)</Link></li>
            <li><Link to="/product/$handle" params={{ handle: "bacteriostatic-water" }} className="hover:text-accent">Bacteriostatic Water</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] mb-4 text-background/60">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-accent">About us</Link></li>
            <li><Link to="/blog" className="hover:text-accent">Research blog</Link></li>
            <li><Link to="/reviews" className="hover:text-accent">Customer feedback</Link></li>
            <li><Link to="/faqs" className="hover:text-accent">FAQs</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact &amp; customer service</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] mb-4 text-background/60">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy-policy" className="hover:text-accent">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions" className="hover:text-accent">Terms &amp; Conditions</Link></li>
            <li><Link to="/cookie-policy" className="hover:text-accent">Cookie Policy</Link></li>
            <li><Link to="/disclaimer" className="hover:text-accent">Disclaimer</Link></li>
            <li><Link to="/returns-policy" className="hover:text-accent">Returns Policy</Link></li>
            <li><Link to="/refund-policy" className="hover:text-accent">Refund Policy</Link></li>
            <li><Link to="/shipping-policy" className="hover:text-accent">Shipping Policy</Link></li>
            <li><Link to="/cancellation-policy" className="hover:text-accent">Cancellation Policy</Link></li>
            <li><Link to="/faqs" className="hover:text-accent">FAQ</Link></li>
            <li><Link to="/sitemap" className="hover:text-accent">Sitemap</Link></li>
            <li><Link to="/about" className="hover:text-accent">About us</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="container-x py-6 text-xs text-background/70 leading-relaxed">
          <p className="mb-2"><span className="font-semibold text-background">Who operates this store: </span>{RELATIONSHIP_DISCLOSURE}</p>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="container-x py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-background/50">
          <p>© {new Date().getFullYear()} {COMPANY.legalName}. All Rights Reserved.</p>
          <p>All products are supplied strictly for in-vitro laboratory research purposes only. Not for human or veterinary consumption, injection, ingestion or use in food, drugs, cosmetics or household products. Products are not intended to diagnose, treat, cure or prevent any disease.</p>
        </div>
      </div>
    </footer>
  );
}
