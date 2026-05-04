import { Stethoscope, FlaskConical, Truck, Award } from "lucide-react";

const items = [
  { icon: Stethoscope, title: "Medical Grade" },
  { icon: FlaskConical, title: "3rd Party Tested" },
  { icon: Truck, title: "Fast & Discreet UK Delivery" },
  { icon: Award, title: "Trusted Since 2021" },
];

export function TrustStrip() {
  return (
    <section className="container-x py-3">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {items.map(({ icon: Icon, title }) => (
          <div
            key={title}
            className="bg-mist border border-border px-3 py-2.5 flex items-center justify-center gap-2 text-center"
          >
            <Icon className="size-4 text-primary shrink-0" />
            <h3 className="font-display text-xs md:text-sm text-ink leading-tight">{title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
