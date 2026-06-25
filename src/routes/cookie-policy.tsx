import { createFileRoute } from "@tanstack/react-router";
import { PolicyHeader } from "@/components/PolicyHeader";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy, Pondok Peptides" },
      { name: "description", content: "How Oxford Research Syndicate Ltd (trading as Pondok Peptides) uses cookies and similar technologies on pondokpeptides.com." },
      { property: "og:title", content: "Cookie Policy, Pondok Peptides" },
      { property: "og:description", content: "Cookie categories, durations and how to manage your preferences." },
      { property: "og:url", content: "https://pondokpeptides.com/cookie-policy" },
    ],
    links: [{ rel: "canonical", href: "https://pondokpeptides.com/cookie-policy" }],
  }),
  component: CookiePolicyPage,
});

function CookiePolicyPage() {
  return (
    <div className="container-x py-16 md:py-20 max-w-3xl">
      <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Legal</p>
      <h1 className="font-display text-4xl md:text-5xl text-ink mb-6">Cookie <span className="italic text-primary">Policy</span></h1>

      <PolicyHeader />

      <div className="space-y-7 text-foreground/85 leading-relaxed text-[15px]">
        <section>
          <h2 className="font-display text-2xl text-ink mb-2">1. What cookies are</h2>
          <p>Cookies are small text files that a website places on your device when you visit. They are widely used to make websites work, to make them work more efficiently, and to provide information to the website operator. Similar technologies such as pixels, local storage and tags work in comparable ways and are covered by this policy.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">2. Essential cookies</h2>
          <p>Strictly necessary for the website to function. They keep your shopping cart, maintain your checkout session, remember your cookie consent choice and protect against cross-site request forgery. These cookies cannot be switched off in our systems.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">3. Functional cookies</h2>
          <p>Remember non-essential preferences such as recently viewed products, region and display settings. They help personalise your experience but the site will still work without them.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">4. Analytics cookies</h2>
          <p>Set by Google Analytics 4 (with your consent) to help us understand which pages are viewed, traffic sources and aggregated user journeys. Data is processed in pseudonymised form. We use this information to improve the website.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">5. Marketing cookies</h2>
          <p>Set by Google Ads and Meta (with your consent) to measure advertising performance and to show relevant ads on third-party platforms. If you do not consent, you will still see ads but they will not be personalised to your activity on this site.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">6. Third-party cookies</h2>
          <p>Some cookies are set by third parties whose services appear on our pages, including Shopify (checkout and fraud prevention), Stripe / Shopify Payments (payment processing), Google (analytics and advertising) and Meta (advertising). These providers operate under their own privacy policies.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">7. Cookie duration</h2>
          <p>Session cookies are deleted when you close your browser. Persistent cookies remain on your device for a defined period (typically up to 24 months) or until you delete them. Specific durations are listed in each provider's documentation.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">8. Managing your preferences</h2>
          <p>You can accept, reject or change your non-essential cookie choices at any time via the cookie banner. You can also delete cookies and block future cookies in your browser settings. Disabling essential cookies may break the cart and checkout.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">9. Cookie consent wording</h2>
          <p className="italic text-muted-foreground">"We use cookies to operate this website, analyse traffic and improve your experience. Strictly necessary cookies are always on. With your consent we also set analytics and advertising cookies. You can accept, reject or change your preferences at any time."</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-ink mb-2">10. Contact</h2>
          <p>Questions about cookies: <a className="text-primary hover:underline" href="mailto:info@pondokpeptides.com">info@pondokpeptides.com</a>.</p>
        </section>
      </div>
    </div>
  );
}
