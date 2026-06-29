import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { COMPANY, CompanyInfoBlock } from "@/components/CompanyInfo";

const SUPPORT_EMAIL = COMPANY.email;
const SUPPORT_PHONE = COMPANY.phone;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Customer Service, Pondok Peptides" },
      { name: "description", content: "Contact Pondok Peptides customer service. UK research peptide supplier operated by Oxford Research Syndicate Ltd. We respond within 4 working hours." },
      { property: "og:title", content: "Contact & Customer Service, Pondok Peptides" },
      { property: "og:description", content: "Contact Pondok Peptides customer service. We respond within 4 working hours." },
      { property: "og:url", content: "https://pondokpeptides.com/contact" },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({ name: "", email: "", order: "", message: "", website: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        setStatus("error");
        setErrorMsg(json.error || "We couldn't send your message. Please email us directly.");
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again or email us directly.");
    }
  };

  return (
    <div className="container-x py-16 md:py-20">
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Customer Service</p>
        <h1 className="font-display text-5xl md:text-6xl text-ink">Contact <span className="text-primary italic">Us</span></h1>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Questions about a product, order, batch certificate or invoice? Our team replies within 4 working hours, Monday to Friday.</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
        <div className="space-y-6">
          {[
            { icon: Mail, t: "Email", d: SUPPORT_EMAIL, href: `mailto:${SUPPORT_EMAIL}` },
            { icon: Phone, t: "Phone", d: SUPPORT_PHONE, href: `tel:${SUPPORT_PHONE.replace(/\s+/g, "")}` },
            { icon: MessageCircle, t: "Hours", d: "Mon to Fri, 9am to 6pm GMT" },
          ].map(({ icon: Icon, t, d, href }) => (
            <div key={t} className="flex gap-4">
              <div className="size-10 rounded-full bg-accent/40 flex items-center justify-center shrink-0"><Icon className="size-4 text-primary" /></div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t}</p>
                {href ? (
                  <a href={href} className="text-ink mt-0.5 hover:text-primary">{d}</a>
                ) : (
                  <p className="text-ink mt-0.5">{d}</p>
                )}
              </div>
            </div>
          ))}
          <div className="border-t border-border pt-6">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Registered Company</p>
            <CompanyInfoBlock className="text-foreground/80" />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="lg:col-span-2 bg-mist p-8 space-y-4 border border-border">
          {status === "sent" ? (
            <div className="py-12 text-center">
              <p className="font-display text-2xl text-ink">Thank you.</p>
              <p className="mt-2 text-muted-foreground">We've received your enquiry. A member of our team will reply within 4 working hours.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary" />
                <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary" />
              </div>
              <input placeholder="Order number (optional)" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary" />
              <textarea required rows={6} placeholder="How can we help?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary" />
              <input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="hidden" aria-hidden="true" />
              {status === "error" && (
                <p className="text-sm text-error">{errorMsg} <a href={`mailto:${SUPPORT_EMAIL}`} className="underline">{SUPPORT_EMAIL}</a></p>
              )}
              <button type="submit" disabled={status === "sending"} className="bg-primary text-primary-foreground px-7 py-3.5 text-sm uppercase tracking-wider hover:bg-primary/90 disabled:opacity-60">
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
