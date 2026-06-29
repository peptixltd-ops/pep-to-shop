import { Link } from "@tanstack/react-router";
import { COMPANY, RELATIONSHIP_DISCLOSURE } from "@/components/CompanyInfo";
import orsLogo from "@/assets/ors-logo.png.asset.json";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-background mt-24">
      <div className="bg-primary/10 border-y border-background/10">
        <div className="container-x py-4 text-center text-xs md:text-sm text-background/80 uppercase tracking-[0.2em]">
          For Laboratory Research Use Only · Not For Human Or Veterinary Use
        </div>
      </div>
      <div className="container-x py-16 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
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
              <a className="hover:text-accent focus-visible:text-accent focus-visible:outline-none focus-visible:underline" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            </p>
            <p>
              <a className="hover:text-accent focus-visible:text-accent focus-visible:outline-none focus-visible:underline" href={`tel:${COMPANY.phone.replace(/\s+/g, "")}`}>{COMPANY.phone}</a>
            </p>
            <p className="text-background/60">Registered in England &amp; Wales</p>
          </div>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] mb-4 text-background/60">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop" className="hover:text-accent focus-visible:text-accent focus-visible:outline-none focus-visible:underline">All peptides</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] mb-4 text-background/60">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-accent focus-visible:text-accent focus-visible:outline-none focus-visible:underline">About us</Link></li>
            <li><Link to="/blog" className="hover:text-accent focus-visible:text-accent focus-visible:outline-none focus-visible:underline">Research blog</Link></li>
            <li><Link to="/reviews" className="hover:text-accent focus-visible:text-accent focus-visible:outline-none focus-visible:underline">Customer feedback</Link></li>
            <li><Link to="/faqs" className="hover:text-accent focus-visible:text-accent focus-visible:outline-none focus-visible:underline">FAQs</Link></li>
            <li><Link to="/contact" className="hover:text-accent focus-visible:text-accent focus-visible:outline-none focus-visible:underline">Contact &amp; customer service</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] mb-4 text-background/60">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy-policy" className="hover:text-accent focus-visible:text-accent focus-visible:outline-none focus-visible:underline">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions" className="hover:text-accent focus-visible:text-accent focus-visible:outline-none focus-visible:underline">Terms &amp; Conditions</Link></li>
            <li><Link to="/cookie-policy" className="hover:text-accent focus-visible:text-accent focus-visible:outline-none focus-visible:underline">Cookie Policy</Link></li>
            <li><Link to="/disclaimer" className="hover:text-accent focus-visible:text-accent focus-visible:outline-none focus-visible:underline">Disclaimer</Link></li>
            <li><Link to="/returns-policy" className="hover:text-accent focus-visible:text-accent focus-visible:outline-none focus-visible:underline">Returns &amp; Refund Policy</Link></li>
            <li><Link to="/shipping-policy" className="hover:text-accent focus-visible:text-accent focus-visible:outline-none focus-visible:underline">Shipping Policy</Link></li>
            <li><Link to="/cancellation-policy" className="hover:text-accent focus-visible:text-accent focus-visible:outline-none focus-visible:underline">Cancellation Policy</Link></li>
            <li><Link to="/faqs" className="hover:text-accent focus-visible:text-accent focus-visible:outline-none focus-visible:underline">FAQ</Link></li>
            <li><Link to="/sitemap" className="hover:text-accent focus-visible:text-accent focus-visible:outline-none focus-visible:underline">Sitemap</Link></li>
            <li><Link to="/contact" className="hover:text-accent focus-visible:text-accent focus-visible:outline-none focus-visible:underline">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="container-x py-6 flex flex-col md:flex-row items-start md:items-center gap-4 text-xs text-background/70 leading-relaxed">
          <div className="shrink-0 rounded-md bg-background/95 p-3">
            <img src={orsLogo.url} alt="Oxford Research Syndicate Ltd" className="h-10 md:h-12 w-auto" loading="lazy" />
          </div>
          <p><span className="font-semibold text-background">Who operates this store: </span>{RELATIONSHIP_DISCLOSURE}</p>
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
