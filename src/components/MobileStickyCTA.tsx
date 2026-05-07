import { useEffect, useRef, useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";

type Props = {
  title: string;
  price: string;
  available: boolean;
  loading: boolean;
  onAdd: () => void;
  onBuy: () => void;
};

export function MobileStickyCTA({ title, price, available, loading, onAdd, onBuy }: Props) {
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Hide bar when the in-page Buy button area is visible.
    const sentinel = document.getElementById("pdp-buybox-sentinel");
    if (!sentinel) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        setVisible(!e.isIntersecting);
      },
      { threshold: 0 },
    );
    obs.observe(sentinel);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 bg-background border-t border-border shadow-[0_-4px_16px_rgba(0,0,0,0.06)] transition-transform duration-200 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0.5rem)" }}
    >
      <div className="px-3 pt-2 pb-2">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="min-w-0">
            <p className="font-display text-sm text-ink truncate">{title}</p>
            <p className="text-xs text-muted-foreground">{price}</p>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-primary border border-primary/30 bg-primary/5 px-2 py-1 rounded shrink-0">
            <ShieldCheck className="size-3" /> 3rd-party tested
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onAdd}
            disabled={!available || loading}
            className="bg-primary text-primary-foreground py-3 text-xs uppercase tracking-wider rounded inline-flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : available ? "Add to cart" : "Sold out"}
          </button>
          <button
            onClick={onBuy}
            disabled={!available || loading}
            className="bg-ink text-background py-3 text-xs uppercase tracking-wider rounded inline-flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : "Buy now"}
          </button>
        </div>
      </div>
    </div>
  );
}
