import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle } from "lucide-react";
import { useState } from "react";

const SUPPORT_EMAIL = "peptixltd@gmail.com";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact, Pondok Peptides" },
      { name: "description", content: "Get in touch with the Pondok Peptides team. We respond within 4 working hours." },
      { property: "og:title", content: "Contact Pondok Peptides" },
      { property: "og:description", content: "Get in touch, we respond within 4 working hours." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", order: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Website enquiry from ${form.name}${form.order ? ` (Order ${form.order})` : ""}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\nOrder number: ${form.order || "n/a"}\n\n${form.message}`;
    const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <div className="container-x py-16 md:py-20">
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Get In Touch</p>
        <h1 className="font-display text-5xl md:text-6xl text-ink">Contact <span className="text-primary italic">Us</span></h1>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Questions about a product, order or batch certificate? Our team replies within 4 working hours.</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
        <div className="space-y-6">
          {[
            { icon: Mail, t: "Email", d: SUPPORT_EMAIL, href: `mailto:${SUPPORT_EMAIL}` },
            { icon: MessageCircle, t: "Live chat", d: "Mon–Fri, 9am–6pm GMT" },
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
        </div>
        <form onSubmit={handleSubmit} className="lg:col-span-2 bg-mist p-8 space-y-4 border border-border">
          {sent ? (
            <div className="py-12 text-center">
              <p className="font-display text-2xl text-ink">Thank you.</p>
              <p className="mt-2 text-muted-foreground">We've received your enquiry and a member of our team will review it shortly.</p>
              <p className="mt-2 text-muted-foreground text-sm">If your email client didn't open, please email us directly at <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary underline">{SUPPORT_EMAIL}</a>.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary" />
                <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary" />
              </div>
              <input placeholder="Order number (optional)" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary" />
              <textarea required rows={6} placeholder="How can we help?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary" />
              <button type="submit" className="bg-primary text-primary-foreground px-7 py-3.5 text-sm uppercase tracking-wider hover:bg-primary/90">Send message</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
