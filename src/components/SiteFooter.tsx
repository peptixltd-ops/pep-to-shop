import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-background mt-24">
      <div className="bg-primary/10 border-y border-background/10">
        <div className="container-x py-4 text-center text-xs md:text-sm text-background/80 uppercase tracking-[0.2em]">
          For Research Use Only · Not For Human Consumption
        </div>
      </div>
      <div className="container-x py-16 grid gap-10 md:grid-cols-6">
        <div className="md:col-span-2">
          <div className="font-display text-2xl font-semibold mb-3">Pondok Peptides</div>
          <p className="text-sm text-background/70 leading-relaxed">
            Advanced peptide research compounds for laboratory use only. UK-manufactured. Not intended for human or veterinary use.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] mb-4 text-background/60">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop" className="hover:text-accent">All peptides</Link></li>
            <li><Link to="/glp1-metabolic-peptides" className="hover:text-accent">GLP-1 &amp; metabolic peptides UK</Link></li>
            <li><Link to="/tissue-repair-peptides" className="hover:text-accent">Tissue repair peptides UK</Link></li>
            <li><Link to="/senolytic-longevity-peptides" className="hover:text-accent">Senolytic &amp; longevity peptides UK</Link></li>
            <li><Link to="/cognitive-neuropeptides" className="hover:text-accent">Cognitive &amp; neuropeptides UK</Link></li>
            <li><Link to="/growth-hormone-secretagogues" className="hover:text-accent">Growth hormone secretagogues UK</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] mb-4 text-background/60">Top Peptides</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/product/$handle" params={{ handle: "retatrutide" }} className="hover:text-accent">Buy Retatrutide UK</Link></li>
            <li><Link to="/product/$handle" params={{ handle: "tirzepatide" }} className="hover:text-accent">Buy Tirzepatide UK</Link></li>
            <li><Link to="/product/$handle" params={{ handle: "semaglutide" }} className="hover:text-accent">Buy Semaglutide UK</Link></li>
            <li><Link to="/product/$handle" params={{ handle: "bpc-157" }} className="hover:text-accent">Buy BPC-157 UK</Link></li>
            <li><Link to="/product/$handle" params={{ handle: "tb-500" }} className="hover:text-accent">Buy TB-500 UK</Link></li>
            <li><Link to="/product/$handle" params={{ handle: "bacteriostatic-water" }} className="hover:text-accent">Bacteriostatic Water</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] mb-4 text-background/60">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-accent">About us</Link></li>
            <li><Link to="/blog" className="hover:text-accent">Research blog</Link></li>
            <li><Link to="/reviews" className="hover:text-accent">Customer Feedback</Link></li>
            <li><Link to="/faqs" className="hover:text-accent">FAQs</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] mb-4 text-background/60">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy-policy" className="hover:text-accent">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions" className="hover:text-accent">Terms &amp; Conditions</Link></li>
            <li><Link to="/returns-policy" className="hover:text-accent">Returns Policy</Link></li>
            <li><Link to="/shipping-policy" className="hover:text-accent">Shipping Policy</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="container-x py-6 text-center text-xs text-background/60 leading-relaxed">
          Pondok Peptides is a trading name of Prapen Group Ltd · Company No. 17207898 · Registered in England &amp; Wales · Registered Address: 11 Bethell Avenue, Ilford, Essex, IG1 4UX
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="container-x py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-background/50">
          <p>© {new Date().getFullYear()} Prapen Group Ltd. All rights reserved.</p>
          <p>All products are sold strictly for in-vitro laboratory research purposes only. Not for human consumption, ingestion, injection, or use in food, drugs, cosmetics, or household products. Products are not intended to diagnose, treat, cure or prevent any disease.</p>
        </div>
      </div>
    </footer>
  );
}
