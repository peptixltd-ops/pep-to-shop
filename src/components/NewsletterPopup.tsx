import { useEffect, useRef, useState } from "react";
import { X, Loader2, Copy, Check } from "lucide-react";

const STORAGE_KEY = "pp_newsletter_prompt";
const DELAY_MS = 8000;
const REPROMPT_DAYS = 7;

type State = "form" | "loading" | "success" | "error";

function shouldShow(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return true;
    if (raw === "subscribed") return false;
    const ts = parseInt(raw, 10);
    if (Number.isNaN(ts)) return true;
    return Date.now() - ts > REPROMPT_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return true;
  }
}

function trackEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...a: unknown[]) => void };
  try {
    if (typeof w.gtag === "function") w.gtag("event", event, params);
  } catch { /* ignore */ }
}

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<State>("form");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!shouldShow()) return;
    timerRef.current = window.setTimeout(() => {
      setOpen(true);
      trackEvent("newsletter_popup_view");
    }, DELAY_MS);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function dismiss() {
    setOpen(false);
    if (state !== "success") {
      try { localStorage.setItem(STORAGE_KEY, String(Date.now())); } catch { /* ignore */ }
      trackEvent("newsletter_popup_dismiss");
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setState("loading");
    try {
      const res = await fetch("/api/public/newsletter-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        setError(data?.error || "Something went wrong. Please try again.");
        setState("error");
        return;
      }
      setCode(data.code);
      setState("success");
      try { localStorage.setItem(STORAGE_KEY, "subscribed"); } catch { /* ignore */ }
      trackEvent("newsletter_signup", { source: "popup" });
    } catch {
      setError("Network error. Please try again.");
      setState("error");
    }
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-popup-title"
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm"
      onClick={dismiss}
    >
      <div
        className="relative w-full max-w-md bg-background border border-border shadow-2xl rounded-sm overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-3 right-3 p-2 text-muted-foreground hover:text-ink transition-colors"
        >
          <X className="size-4" />
        </button>

        <div className="bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.25em] px-6 py-2 text-center">
          Research list · One-time offer
        </div>

        <div className="px-6 pt-6 pb-7">
          {state !== "success" ? (
            <>
              <h2
                id="newsletter-popup-title"
                className="font-display text-2xl md:text-[1.6rem] leading-tight text-ink"
              >
                Get 20% off your first order.
              </h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Join our mailing list to receive your exclusive welcome code.
              </p>

              <form onSubmit={submit} className="mt-5 space-y-3" noValidate>
                {/* Honeypot */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="hidden"
                  aria-hidden="true"
                />
                <input
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 text-sm border border-border rounded-sm bg-background focus:outline-none focus:border-primary transition-colors"
                  disabled={state === "loading"}
                />
                {state === "error" && error ? (
                  <p className="text-xs text-error" role="alert">{error}</p>
                ) : null}
                <button
                  type="submit"
                  disabled={state === "loading" || !email}
                  className="w-full bg-primary text-primary-foreground py-3 text-xs uppercase tracking-[0.15em] rounded-sm inline-flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-60 transition-colors"
                >
                  {state === "loading" ? <Loader2 className="size-4 animate-spin" /> : "Send my code"}
                </button>
                <p className="text-[11px] text-muted-foreground leading-relaxed pt-1">
                  For laboratory research use only. One code per address, valid 30 days. Unsubscribe anytime.
                </p>
              </form>
            </>
          ) : (
            <>
              <h2 id="newsletter-popup-title" className="font-display text-2xl leading-tight text-ink">
                Your code is ready.
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                We've also sent it to <span className="text-ink">{email}</span>. Apply at checkout for 20% off.
              </p>

              <div className="mt-5 border border-border rounded-sm bg-surface p-4 text-center">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                  Your welcome code
                </p>
                <p className="font-mono text-xl font-semibold tracking-[0.1em] text-ink">
                  {code}
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={copyCode}
                  className="border border-border py-3 text-xs uppercase tracking-[0.15em] rounded-sm inline-flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors"
                >
                  {copied ? <><Check className="size-4" /> Copied</> : <><Copy className="size-4" /> Copy code</>}
                </button>
                <a
                  href="/shop"
                  onClick={() => setOpen(false)}
                  className="bg-primary text-primary-foreground py-3 text-xs uppercase tracking-[0.15em] rounded-sm inline-flex items-center justify-center hover:bg-primary/90 transition-colors"
                >
                  Shop now
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
