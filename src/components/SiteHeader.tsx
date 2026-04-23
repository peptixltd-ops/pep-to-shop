import { Link } from "@tanstack/react-router";
import { ShoppingBag, User, Menu } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/shop", label: "Shop All" },
  { to: "/reviews", label: "Reviews" },
  { to: "/about", label: "About Us" },
  { to: "/routine", label: "Routine Builder" },
  { to: "/faqs", label: "FAQs" },
  { to: "/contact", label: "Contact Us" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
      <div className="bg-primary text-primary-foreground text-center text-xs md:text-sm py-2 tracking-wide">
        14,500+ satisfied customers · Free UK shipping over £60
      </div>
      <div className="container-x flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-semibold text-primary leading-none">peptiX</span>
          <span className="hidden sm:inline text-[10px] tracking-[0.25em] text-muted-foreground uppercase">Unlock More</span>
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
          <Link to="/shop" className="hidden md:inline-flex items-center justify-center bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium tracking-wide hover:bg-primary/90 transition-colors">
            SHOP NOW
          </Link>
          <button aria-label="Account" className="p-2 text-foreground/70 hover:text-primary"><User className="size-5" /></button>
          <button aria-label="Cart" className="p-2 text-foreground/70 hover:text-primary relative">
            <ShoppingBag className="size-5" />
            <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] rounded-full size-4 flex items-center justify-center">0</span>
          </button>
          <button aria-label="Menu" onClick={() => setOpen(!open)} className="lg:hidden p-2"><Menu className="size-5" /></button>
        </div>
      </div>
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
