import { FlaskConical, ShieldCheck, Truck, FileCheck2 } from "lucide-react";

const items = [
  { icon: FlaskConical, title: "Laboratory Research Use" },
  { icon: ShieldCheck, title: "HPLC & MS Verified" },
  { icon: Truck, title: "UK Dispatch, Tracked" },
  { icon: FileCheck2, title: "COA Available On Request" },
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
