import { Link, useNavigate } from "@tanstack/react-router";
import { User, Menu, Search, X } from "lucide-react";
import { useState } from "react";

import { CartDrawer } from "@/components/CartDrawer";
import { SHOPIFY_ACCOUNT_URL } from "@/lib/shopify";

const nav = [
  { to: "/blog", label: "Blog" },
  { to: "/reviews", label: "Customer Feedback" },
  { to: "/about", label: "About" },
  { to: "/faqs", label: "FAQs" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    navigate({ to: "/shop", search: { q } });
    setSearchOpen(false);
  };
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
      <div className="bg-primary text-primary-foreground text-xs md:text-sm py-2 tracking-wide text-center">
        For Laboratory Research Use Only · Not For Human Or Veterinary Use
      </div>
      <div className="container-x flex items-center justify-between py-4">
        <Link to="/" aria-label="Pondok Peptides home" className="flex items-baseline gap-2">
          <span className="font-display font-semibold text-primary text-2xl md:text-[1.6rem] lg:text-[1.8rem] tracking-[-0.03em] leading-none">
            Pondok
          </span>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-foreground/50">
            Peptides
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium uppercase tracking-wider">
          {nav.map(n => (
            <Link
              key={n.to}
              to={n.to}
              className="text-foreground/80 hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Search products"
            onClick={() => setSearchOpen(v => !v)}
            className="p-2 text-foreground/70 hover:text-primary"
          >
            <Search className="size-5" />
          </button>
          <Link to="/shop" className="hidden md:inline-flex items-center justify-center bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium tracking-wide hover:bg-primary/90 transition-colors">
            Shop All
          </Link>
          <a
            href={SHOPIFY_ACCOUNT_URL}
            aria-label="Sign in to your account"
            title="Sign in / My account"
            className="hidden sm:inline-flex items-center gap-1.5 p-2 text-foreground/70 hover:text-primary text-xs font-medium uppercase tracking-wider"
          >
            <User className="size-5" />
            <span className="hidden md:inline">Account</span>
          </a>
          <CartDrawer />
          <button aria-label="Menu" onClick={() => setOpen(!open)} className="lg:hidden p-2"><Menu className="size-5" /></button>
        </div>
      </div>
      {searchOpen && (
        <div className="border-t border-border bg-background">
          <form onSubmit={submitSearch} className="container-x py-4 flex items-center gap-2">
            <Search className="size-4 text-muted-foreground" />
            <input
              autoFocus
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search peptides (e.g. Retatrutide, BPC-157)"
              className="flex-1 bg-transparent border-0 focus:outline-none text-sm py-2"
            />
            <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search" className="p-1 text-muted-foreground hover:text-primary">
              <X className="size-4" />
            </button>
          </form>
        </div>
      )}
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container-x py-4 flex flex-col gap-3 text-sm uppercase tracking-wider">
            {nav.map(n => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-1.5">{n.label}</Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
