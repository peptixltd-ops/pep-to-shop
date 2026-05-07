// Brand-styled trust seals. Inline SVG, brand green, Syne display font.
// Used on homepage, product pages, cart drawer, footer.

type BadgeProps = { className?: string };

function Sunburst({ teeth = 24 }: { teeth?: number }) {
  const points: string[] = [];
  const cx = 50;
  const cy = 50;
  const rOuter = 48;
  const rInner = 42;
  const total = teeth * 2;
  for (let i = 0; i < total; i++) {
    const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 === 0 ? rOuter : rInner;
    points.push(`${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`);
  }
  return <polygon points={points.join(" ")} fill="#486748" />;
}

export function SatisfactionBadge({ className = "" }: BadgeProps) {
  // Circular text "SATISFACTION ★ GUARANTEE ★"
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <Sunburst teeth={20} />
      <circle cx="50" cy="50" r="34" fill="#FFFFFF" />
      <circle cx="50" cy="50" r="32" fill="none" stroke="#486748" strokeWidth="0.6" />
      <defs>
        <path id="sat-top" d="M 50,50 m -27,0 a 27,27 0 1,1 54,0" />
        <path id="sat-bot" d="M 50,50 m -27,0 a 27,27 0 1,0 54,0" />
      </defs>
      <text fill="#486748" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "8px", letterSpacing: "1.5px" }}>
        <textPath href="#sat-top" startOffset="50%" textAnchor="middle">SATISFACTION</textPath>
      </text>
      <text fill="#486748" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "8px", letterSpacing: "1.5px" }}>
        <textPath href="#sat-bot" startOffset="50%" textAnchor="middle">GUARANTEE</textPath>
      </text>
      <text x="50" y="54" textAnchor="middle" fill="#486748" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "14px" }}>100%</text>
      <text x="22" y="55" fill="#486748" fontSize="10">★</text>
      <text x="74" y="55" fill="#486748" fontSize="10">★</text>
    </svg>
  );
}

export function CertifiedBadge({ className = "" }: BadgeProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <Sunburst teeth={26} />
      <circle cx="50" cy="50" r="34" fill="#FFFFFF" />
      <path d="M 41 30 L 47 36 L 60 23" stroke="#486748" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="50" y="50" textAnchor="middle" fill="#486748" style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "6.5px", letterSpacing: "0.5px" }}>GUARANTEE</text>
      <text x="50" y="61" textAnchor="middle" fill="#486748" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "10px" }}>CERTIFIED</text>
      <text x="50" y="72" textAnchor="middle" fill="#486748" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "8px" }}>PRODUCT</text>
    </svg>
  );
}

export function TrustedBadge({ className = "" }: BadgeProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <Sunburst teeth={22} />
      <circle cx="50" cy="50" r="34" fill="#486748" />
      <rect x="28" y="40" width="44" height="14" fill="#FFFFFF" />
      <text x="50" y="51" textAnchor="middle" fill="#486748" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "8px", letterSpacing: "1px" }}>TRUSTED</text>
      <path d="M 38 58 L 50 72 L 62 58 Z" fill="#FFFFFF" />
      <path d="M 44 60 L 48 64 L 56 56" stroke="#486748" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SecureBadge({ className = "" }: BadgeProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <Sunburst teeth={24} />
      <circle cx="50" cy="50" r="34" fill="#FFFFFF" />
      <rect x="42" y="32" width="16" height="14" rx="2" fill="none" stroke="#486748" strokeWidth="2" />
      <path d="M 46 32 V 28 a 4 4 0 0 1 8 0 V 32" fill="none" stroke="#486748" strokeWidth="2" />
      <rect x="38" y="42" width="24" height="16" rx="1.5" fill="#486748" />
      <line x1="30" y1="63" x2="70" y2="63" stroke="#486748" strokeWidth="1" />
      <text x="50" y="73" textAnchor="middle" fill="#486748" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "8px" }}>SECURE</text>
      <text x="50" y="82" textAnchor="middle" fill="#486748" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "7px" }}>ORDERING</text>
    </svg>
  );
}

export function TrustBadgeRow({ size = 88 }: { size?: number }) {
  const cls = "shrink-0";
  const style = { width: size, height: size };
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
      <SatisfactionBadge className={cls} />
      <CertifiedBadge className={cls} />
      <TrustedBadge className={cls} />
      <SecureBadge className={cls} />
      <style>{`.${cls.split(" ").join(".")} { width: ${style.width}px; height: ${style.height}px; }`}</style>
    </div>
  );
}

export function TrustBadgeStrip() {
  return (
    <section className="container-x py-6">
      <div className="bg-background border border-border rounded-md px-6 py-5">
        <div className="grid grid-cols-4 gap-2 md:gap-6 items-center justify-items-center">
          <SatisfactionBadge className="w-16 h-16 md:w-20 md:h-20" />
          <CertifiedBadge className="w-16 h-16 md:w-20 md:h-20" />
          <TrustedBadge className="w-16 h-16 md:w-20 md:h-20" />
          <SecureBadge className="w-16 h-16 md:w-20 md:h-20" />
        </div>
      </div>
    </section>
  );
}
