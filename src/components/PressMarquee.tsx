import independent from "@/assets/press/independent.png";
import standard from "@/assets/press/standard.png";
import metro from "@/assets/press/metro.png";
import mirror from "@/assets/press/mirror.png";
import guardian from "@/assets/press/guardian.png";
import dailyrecord from "@/assets/press/dailyrecord.png";

const logos = [
  { src: independent, alt: "The Independent" },
  { src: standard, alt: "The Standard" },
  { src: metro, alt: "Metro" },
  { src: mirror, alt: "Daily Mirror" },
  { src: guardian, alt: "The Guardian" },
  { src: dailyrecord, alt: "Daily Record" },
];

export function PressMarquee() {
  return (
    <section className="bg-secondary/40 border-y border-border overflow-hidden py-6">
      <div className="max-w-[60%] mx-auto overflow-hidden">
        <div className="flex marquee whitespace-nowrap items-center">
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              className="h-7 md:h-9 w-auto mx-8 md:mx-12 object-contain opacity-70 hover:opacity-100 transition"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
