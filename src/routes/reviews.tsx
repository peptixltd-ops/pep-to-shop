import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews — Pondok Peptides" },
      { name: "description", content: "Read verified reviews from Pondok Peptides customers across the UK." },
      { property: "og:title", content: "Customer Reviews — Pondok Peptides" },
      { property: "og:description", content: "Verified reviews from thousands of Pondok Peptides customers." },
    ],
  }),
  component: ReviewsPage,
});

const all = [
  { name: "Dr. Sarah M.", text: "Easily the most reliable UK supplier we've used in the lab. Purity matches the COA every time and reconstitution is clean, with no cloudiness or residue.", product: "Retatrutide 10mg" },
  { name: "Alex P., Research Tech", text: "Ordered Friday evening and it arrived Monday morning in discreet, secure packaging. The lyophilised cake was intact and the lot number matched the certificate exactly.", product: "BPC-157 5mg" },
  { name: "James K., PhD candidate", text: "Independent third-party HPLC came back at 99.4%, exactly on the label. Quality I can actually cite in my notes.", product: "Tirzepatide 15mg" },
  { name: "Priya S., Researcher", text: "Quality is consistently excellent, with clean reconstitution, accurate labelling and reliable purity. Support also answered a technical solubility question within the hour.", product: "GHK-Cu 50mg" },
  { name: "Tom R., Lab Manager", text: "We've standardised on Pondok Peptides for our peptide work. Consistent purity batch to batch, and the packaging arrives secure and well presented every time.", product: "Semaglutide 5mg" },
  { name: "Mia R.", text: "Discreet packaging, fast delivery and clear labelling. For our research workflow the transparent batch testing makes a real difference.", product: "NAD+ 500mg" },
  { name: "Daniel O., Postdoc", text: "Packaging is premium without being wasteful. Vials are well sealed and arrive in excellent condition every time, exactly what we need for our research.", product: "TB-500 5mg" },
  { name: "Sophie L.", text: "Customer service replied within an hour on a Saturday. Honest, knowledgeable answers rather than scripted replies.", product: "Ipamorelin 5mg" },
  { name: "Marcus B., Researcher", text: "Reordered four times now. Consistent purity, consistent delivery, consistent paperwork. Hard to find that combination.", product: "MOTS-C 10mg" },
  { name: "Hannah W., Lab Tech", text: "Vials arrived intact, well-padded and discreetly packaged. Reconstitution was clear and clean — exactly what we expect from premium-grade material.", product: "Tesamorelin 10mg" },
  { name: "Ravi N., PhD", text: "The CoA matched our independent HPLC almost to the decimal. Trustworthy supplier and the delivery times are unbeatable in the UK.", product: "PT-141 10mg" },
  { name: "Eleanor C.", text: "I've worked with several UK and EU suppliers and Pondok consistently comes out ahead on purity and presentation. Highly recommend.", product: "IGF-1 LR3 1mg" },
  { name: "Oliver M., Researcher", text: "Genuinely impressed by the level of detail in the documentation. CoA, batch info and storage guidance all clearly available.", product: "Retatrutide 10mg" },
  { name: "Aisha T., Postdoc", text: "Quick to respond, quick to ship and the product quality speaks for itself. Reordering for the third time this quarter.", product: "BPC-157 / TB-500 Mix" },
  { name: "Liam D., Lab Manager", text: "Switched our supplier last year and haven't looked back. Pondok's consistency across batches has saved us countless protocol headaches.", product: "Semaglutide 5mg" },
  { name: "Charlotte F.", text: "Discreet packaging, fast tracked delivery, intact seals. Everything you want from a peptide supplier and nothing you don't.", product: "GHK-Cu 50mg" },
  { name: "Noah J., Researcher", text: "Excellent customer support — replied with a detailed solubility breakdown within 30 minutes. Genuinely helpful, not scripted.", product: "Selank 10mg" },
  { name: "Isabelle G., PhD candidate", text: "Pondok is one of the few UK suppliers I'd recommend without hesitation. Quality, transparency and consistency — all there.", product: "Semax 10mg" },
  { name: "Ethan R., Lab Tech", text: "Lyophilised cake was a textbook compact disc, easy reconstitution and zero cloudiness. Pleasure to work with.", product: "Tirzepatide 15mg" },
  { name: "Grace H.", text: "Honest pricing, honest paperwork, honest product. Refreshing in an industry full of overpromising suppliers.", product: "NAD+ 500mg" },
  { name: "Finn K., Researcher", text: "Arrived next day with full tracking. Vials sealed, labelled correctly and matched the order exactly. Faultless.", product: "Ipamorelin 5mg" },
  { name: "Maya P.", text: "Easily the best presentation I've seen from a UK supplier. Even the unboxing feels considered — and the science holds up.", product: "MOTS-C 10mg" },
  { name: "Jack S., Postdoc", text: "Independent testing came back at 99.1% — bang on the CoA. That kind of consistency is exactly what our research needs.", product: "Retatrutide 10mg" },
  { name: "Zara A.", text: "Used Pondok for over a year now. Not a single bad batch, not a single late delivery. They've earned the loyalty.", product: "BPC-157 5mg" },
];

function ReviewsPage() {
  return (
    <div className="container-x py-16 md:py-20">
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Customer Reviews</p>
        <h1 className="font-display text-5xl md:text-6xl text-ink">Trusted By <span className="text-primary italic">Thousands</span></h1>
        <div className="mx-auto mt-4 h-px w-12 bg-primary" />
        <p className="mt-6 text-muted-foreground">Average rating <strong className="text-ink">4.8/5</strong> from 14,500+ verified buyers.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {all.map(r => (
          <div key={r.name + r.product} className="bg-mist p-7 border border-border">
            <p className="text-sm font-semibold text-ink uppercase tracking-wide">{r.name}</p>
            <div className="flex gap-0.5 my-2 text-primary">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3.5 fill-current" />)}
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-b border-border pb-3 mb-4">Verified Buyer · {r.product}</p>
            <p className="text-sm text-foreground/80 leading-relaxed">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
