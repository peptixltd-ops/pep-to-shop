import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-background mt-24">
      <div className="bg-primary/10 border-y border-background/10">
        <div className="container-x py-4 text-center text-xs md:text-sm text-background/80 uppercase tracking-[0.2em]">
          For Research Use Only · Not For Human Consumption
        </div>
      </div>
      <div className="container-x py-16 grid gap-10 md:grid-cols-5">
        <div>
          <div className="font-display text-2xl font-semibold mb-3">Pondok Peptides</div>
          <p className="text-sm text-background/70 leading-relaxed">
            Advanced peptide research compounds for laboratory use only. UK-manufactured. Not intended for human or veterinary use.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] mb-4 text-background/60">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop" className="hover:text-accent">All peptides</Link></li>
            <li><Link to="/weight-loss-peptides" className="hover:text-accent">Weight loss peptides UK</Link></li>
            <li><Link to="/recovery-peptides" className="hover:text-accent">Recovery peptides UK</Link></li>
            <li><Link to="/longevity-peptides" className="hover:text-accent">Longevity peptides UK</Link></li>
            <li><Link to="/nootropics" className="hover:text-accent">Nootropic peptides UK</Link></li>
            <li><Link to="/growth-hormone-peptides" className="hover:text-accent">Growth hormone peptides UK</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] mb-4 text-background/60">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-accent">About us</Link></li>
            <li><Link to="/blog" className="hover:text-accent">Research blog</Link></li>
            <li><Link to="/reviews" className="hover:text-accent">Reviews</Link></li>
            <li><Link to="/faqs" className="hover:text-accent">FAQs</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] mb-4 text-background/60">Newsletter</h4>
          <p className="text-sm text-background/70 mb-3">Routines, restocks and member-only offers.</p>
          <form className="flex">
            <input type="email" placeholder="Email address" className="flex-1 bg-background/10 border border-background/20 px-3 py-2 text-sm placeholder:text-background/40 focus:outline-none focus:border-accent" />
            <button type="submit" className="bg-primary px-4 text-sm uppercase tracking-wide hover:bg-primary/80">Join</button>
          </form>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="container-x py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-background/50">
          <p>© {new Date().getFullYear()} Pondok Ltd. All rights reserved.</p>
          <p>All products are sold strictly for in-vitro laboratory research purposes only. Not for human consumption, ingestion, injection, or use in food, drugs, cosmetics, or household products. Products are not intended to diagnose, treat, cure or prevent any disease.</p>
        </div>
      </div>
    </footer>
  );
}
