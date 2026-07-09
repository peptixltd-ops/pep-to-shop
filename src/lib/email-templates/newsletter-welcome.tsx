import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface NewsletterWelcomeProps {
  code?: string
  expiresOn?: string
}

const ASSETS = 'https://www.pondokpeptides.com'
const WORDMARK = `${ASSETS}/__l5e/assets-v1/3f1cd303-1e6f-4141-a7f5-f26ab87eb118/pondok-wordmark.png`
const ICON = `${ASSETS}/__l5e/assets-v1/be789105-43ce-4e32-b340-4288bbbc8a1e/pondok-icon.png`
const HERO_PRODUCTS = `${ASSETS}/__l5e/assets-v1/f047b6c7-ca02-420e-90d5-57547a71fd91/hero-products.jpg`
const VIAL = `${ASSETS}/__l5e/assets-v1/56f17e33-8683-42f9-b276-4af3bc0a7e9e/vial-bpc-157.png`
const ICON_PREMIUM = `${ASSETS}/__l5e/assets-v1/01c11caf-5cbd-4f91-ba41-ff5bfee09c91/premium-t.png`
const ICON_TESTED = `${ASSETS}/__l5e/assets-v1/31a97ce1-2aa5-4a74-be7c-cc0e2672d4e5/tested-t.png`
const ICON_TRUCK = `${ASSETS}/__l5e/assets-v1/72fdd898-a0e0-437a-823b-57398ee28eb8/truck-uk-t.png`
const ICON_LOCK = `${ASSETS}/__l5e/assets-v1/4610936a-e1df-4ddf-9c96-d5fe703885a6/lock-t.png`

const INK = '#061D2B'
const PRIMARY = '#486748'
const ACCENT = '#98C598'
const MIST = '#E7F4F9'
const MINT = '#E3EFE3'
const MUTED = '#59656E'
const BORDER = '#DAE3E6'
const DARK = '#0E1B15'

const BEST_SELLERS = [
  { name: 'BPC-157', doses: '5mg | 10mg' },
  { name: 'TB-500', doses: '5mg | 10mg' },
  { name: 'CJC-1295', doses: 'Without DAC · 2mg | 5mg' },
  { name: 'Ipamorelin', doses: '5mg | 10mg' },
]

export function NewsletterWelcomeEmail({
  code = 'WELCOME20-XXXXXX',
  expiresOn = '',
}: NewsletterWelcomeProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Pondok Peptides — your 20% code is inside</Preview>
      <Body style={body}>
        <Container style={container}>

          {/* Header — centered wordmark with badge strip below */}
          <Section style={headerBand}>
            <Row>
              <Column style={{ textAlign: 'center' as const, paddingBottom: '14px' }}>
                <Img src={WORDMARK} alt="Pondok Peptides" width="280" style={{ display: 'inline-block', maxWidth: '100%' }} />
              </Column>
            </Row>
            <Row>
              <Column style={{ textAlign: 'center' as const }}>
                <span style={badge}>
                  <Img src={ICON_PREMIUM} alt="" width="12" height="12" style={badgeIcon} />
                  Research grade
                </span>
                <span style={badge}>
                  <Img src={ICON_TESTED} alt="" width="12" height="12" style={badgeIcon} />
                  Batch tested
                </span>
                <span style={badge}>
                  <Img src={ICON_TRUCK} alt="" width="14" height="12" style={badgeIcon} />
                  Fast UK dispatch
                </span>
              </Column>
            </Row>
          </Section>

          {/* Hero */}
          <Section style={hero}>
            <Row>
              <Column style={{ verticalAlign: 'top', width: '58%', paddingRight: '16px' }}>
                <Text style={eyebrow}>Welcome</Text>
                <Heading style={heroTitle}>Exclusive rewards.</Heading>
                <Text style={heroBody}>
                  Thanks for subscribing. As a welcome, we've unlocked 20% off your first order. Your exclusive code is waiting below.
                </Text>
              </Column>
              <Column style={{ verticalAlign: 'middle', width: '42%', textAlign: 'right' as const }}>
                <Img src={VIAL} alt="Pondok Peptides research vial" width="180" style={{ display: 'inline-block', maxWidth: '100%' }} />
              </Column>
            </Row>
          </Section>

          {/* Discount block */}
          <Section style={discountBand}>
            <Row>
              <Column style={{ width: '52%', verticalAlign: 'middle', paddingRight: '16px' }}>
                <Text style={{ ...eyebrowLight, margin: '0 0 6px' }}>Welcome offer</Text>
                <Heading as="h2" style={discountAmount}>20% off</Heading>
                <Text style={discountSub}>your first order</Text>
                <Hr style={{ borderColor: 'rgba(255,255,255,0.15)', margin: '14px 0' }} />
                <Text style={discountCopy}>
                  Enter the code at checkout to receive 20% off your first purchase.
                </Text>
              </Column>
              <Column style={{ width: '48%', verticalAlign: 'middle', textAlign: 'center' as const }}>
                <Text style={{ ...eyebrowLight, margin: '0 0 10px', color: ACCENT }}>Your discount code</Text>
                <div style={codeBox}>{code}</div>
                <Button href="https://www.pondokpeptides.com/shop" style={ctaLight}>
                  Shop now  →
                </Button>
                {expiresOn ? (
                  <Text style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)', margin: '10px 0 0' }}>
                    Valid until {expiresOn}
                  </Text>
                ) : null}
              </Column>
            </Row>
          </Section>

          {/* Feature row */}
          <Section style={{ padding: '28px 24px 8px' }}>
            <Row>
              {[
                { t: 'Premium quality', d: 'Carefully sourced research peptides of the highest standard.', icon: ICON_PREMIUM },
                { t: 'Batch tested', d: 'Independently tested for purity, identity and quality.', icon: ICON_TESTED },
                { t: 'Fast UK dispatch', d: 'Orders dispatched quickly and discreetly.', icon: ICON_TRUCK },
                { t: 'Secure checkout', d: 'Encrypted payments for total peace of mind.', icon: ICON_LOCK },
              ].map((f) => (
                <Column key={f.t} style={featureCell}>
                  <div style={featureDot}>
                    <Img src={f.icon} alt="" width="36" height="36" style={{ display: 'block', margin: '0 auto' }} />
                  </div>
                  <Text style={featureTitle}>{f.t}</Text>
                  <Text style={featureBody}>{f.d}</Text>
                </Column>
              ))}
            </Row>
          </Section>

          {/* What to expect */}
          <Section style={expectCard}>
            <Row>
              <Column style={{ width: '58%', verticalAlign: 'top', paddingRight: '12px' }}>
                <Text style={{ ...eyebrow, color: PRIMARY, margin: '0 0 6px' }}>What to expect</Text>
                <Heading as="h3" style={expectTitle}>Straight to your inbox</Heading>
                <Text style={expectSub}>As a subscriber, you'll be the first to know about:</Text>
                {[
                  'Exclusive subscriber-only offers',
                  'New product launches',
                  'Restock notifications',
                  'Research and product updates',
                ].map((li) => (
                  <Text key={li} style={bullet}>
                    <span style={bulletDot}>✓</span> {li}
                  </Text>
                ))}
              </Column>
              <Column style={{ width: '42%', verticalAlign: 'middle', textAlign: 'right' as const }}>
                <Img src={HERO_PRODUCTS} alt="Pondok Peptides product line" width="200" style={{ display: 'inline-block', maxWidth: '100%', borderRadius: '4px' }} />
              </Column>
            </Row>
          </Section>

          {/* Best sellers */}
          <Section style={{ padding: '32px 24px 8px' }}>
            <Text style={sectionHeading}>Our best sellers</Text>
            <Row>
              {BEST_SELLERS.map((p) => (
                <Column key={p.name} style={productCell}>
                  <div style={productCard}>
                    <Img src={VIAL} alt={p.name} width="80" style={{ display: 'block', margin: '0 auto 10px' }} />
                    <Text style={productName}>{p.name}</Text>
                    <Text style={productDoses}>{p.doses}</Text>
                    <Link href="https://www.pondokpeptides.com/shop" style={productBtn}>Shop now</Link>
                  </div>
                </Column>
              ))}
            </Row>
          </Section>

          {/* Bottom CTA band */}
          <Section style={bottomBand}>
            <Row>
              <Column style={{ verticalAlign: 'middle', width: '62%', paddingRight: '12px' }}>
                <Text style={{ fontSize: '14px', color: '#ffffff', margin: 0, lineHeight: '20px' }}>
                  Use code{' '}
                  <strong style={{ color: ACCENT, letterSpacing: '0.05em' }}>{code}</strong>
                  {' '}at checkout to get 20% off your first order.
                </Text>
              </Column>
              <Column style={{ verticalAlign: 'middle', width: '38%', textAlign: 'right' as const }}>
                <Button href="https://www.pondokpeptides.com/shop" style={ctaLight}>
                  Start shopping  →
                </Button>
              </Column>
            </Row>
          </Section>

          {/* Sign-off */}
          <Section style={{ padding: '28px 24px 8px' }}>
            <Row>
              <Column>
                <Text style={{ fontSize: '15px', color: INK, margin: '0 0 4px', fontWeight: 600 }}>
                  Thank you for choosing Pondok Peptides.
                </Text>
                <Text style={{ fontSize: '14px', color: MUTED, margin: '0 0 14px' }}>
                  We look forward to supporting your research.
                </Text>
                <Text style={{ fontSize: '14px', color: PRIMARY, margin: 0, fontStyle: 'italic' }}>
                  ♡ The Pondok Peptides Team
                </Text>
              </Column>
              <Column style={{ verticalAlign: 'top', textAlign: 'right' as const }}>
                <Text style={{ fontSize: '13px', color: INK, margin: '0 0 4px', fontWeight: 600 }}>Need help?</Text>
                <Text style={{ fontSize: '13px', color: MUTED, margin: 0 }}>
                  Reply to this email, we're here to help.
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Row>
              <Column style={{ width: '35%', verticalAlign: 'middle' }}>
                <Img src={WORDMARK} alt="Pondok Peptides" width="130" style={{ display: 'block', filter: 'brightness(0) invert(1)' }} />
              </Column>
              <Column style={{ width: '65%', verticalAlign: 'middle', textAlign: 'right' as const }}>
                <Text style={footerLinks}>
                  <Link href="https://www.pondokpeptides.com" style={footerLink}>pondokpeptides.com</Link>
                  <span style={footerDot}>·</span>
                  <Link href="mailto:info@pondokpeptides.com" style={footerLink}>info@pondokpeptides.com</Link>
                </Text>
              </Column>
            </Row>
            <Hr style={{ borderColor: 'rgba(255,255,255,0.12)', margin: '16px 0 12px' }} />
            <Text style={fineprint}>
              Research use only. Not for human or veterinary consumption. One code per address; cannot be combined with other offers.
            </Text>
            <Text style={fineprintAddr}>
              Oxford Research Syndicate Ltd, 131A Movers Lane, Barking, IG11 7UQ, United Kingdom
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

/* ---------- styles ---------- */
const body = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif', color: INK, margin: 0 as const }
const container = { maxWidth: '640px', margin: '0 auto', padding: '0' }

const headerBand = { backgroundColor: '#ffffff', padding: '20px 24px', borderBottom: `1px solid ${BORDER}` }
const badgeRow = { margin: 0, fontSize: 0 }
const badge = {
  display: 'inline-block',
  fontSize: '10px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
  color: PRIMARY,
  background: MINT,
  padding: '6px 10px',
  margin: '0 3px',
  borderRadius: '2px',
  fontWeight: 600,
  lineHeight: '14px',
  verticalAlign: 'middle' as const,
}
const badgeIcon = {
  display: 'inline-block',
  verticalAlign: 'middle' as const,
  marginRight: '5px',
  marginTop: '-2px',
}

const hero = { padding: '32px 24px 20px', backgroundColor: '#ffffff' }
const eyebrow = { fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: PRIMARY, margin: '0 0 8px', fontWeight: 600 }
const eyebrowLight = { fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }
const heroTitle = { fontSize: '34px', lineHeight: '38px', margin: '0 0 14px', color: INK, fontWeight: 700, letterSpacing: '-0.01em' }
const heroBody = { fontSize: '14px', lineHeight: '22px', color: MUTED, margin: '0 0 10px' }

const discountBand = { backgroundColor: DARK, padding: '28px 24px', margin: '8px 0 0' }
const discountAmount = { fontSize: '42px', lineHeight: '44px', margin: 0, color: ACCENT, fontWeight: 700, letterSpacing: '-0.02em' }
const discountSub = { fontSize: '14px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: '#ffffff', margin: '6px 0 0', fontWeight: 600 }
const discountCopy = { fontSize: '13px', color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: '20px' }
const codeBox = {
  border: `2px dashed ${ACCENT}`,
  padding: '14px 12px',
  color: '#ffffff',
  fontFamily: 'DM Mono, Menlo, monospace',
  fontSize: '20px',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textAlign: 'center' as const,
  margin: '0 0 12px',
  borderRadius: '3px',
  background: 'rgba(255,255,255,0.03)',
}
const ctaLight = {
  backgroundColor: ACCENT,
  color: INK,
  padding: '12px 22px',
  fontSize: '12px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase' as const,
  textDecoration: 'none',
  display: 'inline-block',
  fontWeight: 700,
  borderRadius: '2px',
}

const featureCell = { width: '25%', padding: '4px 8px', verticalAlign: 'top' as const, textAlign: 'center' as const }
const featureDot = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  background: MINT,
  border: `1px solid ${ACCENT}`,
  margin: '0 auto 10px',
  padding: '12px 0 0',
  boxSizing: 'border-box' as const,
}
const featureTitle = { fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: INK, fontWeight: 700, margin: '0 0 6px' }
const featureBody = { fontSize: '12px', color: MUTED, lineHeight: '17px', margin: 0 }

const expectCard = { margin: '24px 24px', padding: '24px', background: MINT, borderRadius: '6px' }
const expectTitle = { fontSize: '20px', margin: '0 0 10px', color: INK, fontWeight: 700 }
const expectSub = { fontSize: '13px', color: MUTED, margin: '0 0 12px' }
const bullet = { fontSize: '13px', color: INK, margin: '0 0 6px', lineHeight: '20px' }
const bulletDot = {
  display: 'inline-block',
  width: '18px',
  height: '18px',
  lineHeight: '18px',
  textAlign: 'center' as const,
  background: PRIMARY,
  color: '#ffffff',
  borderRadius: '50%',
  fontSize: '11px',
  marginRight: '8px',
  fontWeight: 700,
}

const sectionHeading = {
  fontSize: '14px',
  letterSpacing: '0.25em',
  textTransform: 'uppercase' as const,
  color: INK,
  fontWeight: 700,
  textAlign: 'center' as const,
  margin: '0 0 18px',
  borderTop: `1px solid ${BORDER}`,
  paddingTop: '20px',
}
const productCell = { width: '25%', padding: '4px', verticalAlign: 'top' as const }
const productCard = {
  border: `1px solid ${BORDER}`,
  borderRadius: '6px',
  padding: '14px 8px 12px',
  textAlign: 'center' as const,
  background: '#ffffff',
}
const productName = { fontSize: '13px', fontWeight: 700, color: INK, margin: '0 0 4px', letterSpacing: '0.05em' }
const productDoses = { fontSize: '11px', color: MUTED, margin: '0 0 10px', lineHeight: '14px' }
const productBtn = {
  display: 'inline-block',
  background: ACCENT,
  color: INK,
  padding: '7px 12px',
  fontSize: '10px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
  fontWeight: 700,
  textDecoration: 'none',
  borderRadius: '2px',
}

const bottomBand = { backgroundColor: DARK, padding: '20px 24px', margin: '24px 0 0' }

const footer = { backgroundColor: INK, padding: '22px 24px', color: '#ffffff' }
const footerLinks = { margin: 0, fontSize: '12px', color: '#ffffff' }
const footerLink = { color: '#ffffff', textDecoration: 'none' }
const footerDot = { color: 'rgba(255,255,255,0.4)', margin: '0 8px' }
const fineprint = { fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: ACCENT, margin: '0 0 6px', textAlign: 'center' as const, fontWeight: 600 }
const fineprintAddr = { fontSize: '11px', color: 'rgba(255,255,255,0.55)', margin: 0, textAlign: 'center' as const }

export const template = {
  component: NewsletterWelcomeEmail,
  displayName: 'Newsletter welcome (20% off)',
  subject: 'Welcome to Pondok Peptides — your 20% code is inside',
  previewData: {
    code: 'WELCOME20-A7F3K9',
    expiresOn: '9 August 2026',
  },
} satisfies TemplateEntry
