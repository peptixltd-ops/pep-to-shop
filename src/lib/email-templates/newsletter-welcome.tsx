import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface NewsletterWelcomeProps {
  code?: string
  expiresOn?: string
}

export function NewsletterWelcomeEmail({
  code = 'WELCOME20-XXXXXX',
  expiresOn = '',
}: NewsletterWelcomeProps) {
  return (
    <Html>
      <Head />
      <Preview>Your 20% welcome code from Pondok Peptides</Preview>
      <Body style={{ backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif', color: '#061D2B' }}>
        <Container style={{ maxWidth: '560px', margin: '0 auto', padding: '32px 24px' }}>
          <Text style={{ fontSize: '12px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#486748', margin: '0 0 8px' }}>
            Pondok Peptides
          </Text>
          <Heading style={{ fontSize: '24px', margin: '0 0 12px', color: '#061D2B', lineHeight: '32px' }}>
            Welcome. Here is your 20% code.
          </Heading>
          <Text style={{ fontSize: '15px', color: '#59656E', margin: '0 0 24px', lineHeight: '22px' }}>
            Thanks for joining the Pondok research list. Apply the code below at checkout for 20% off your first order.
          </Text>

          <Section style={{
            border: '1px solid #DAE3E6',
            borderRadius: '6px',
            padding: '20px',
            textAlign: 'center' as const,
            backgroundColor: '#E7F4F9',
            margin: '0 0 24px',
          }}>
            <Text style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#59656E', margin: '0 0 8px' }}>
              Your welcome code
            </Text>
            <Text style={{
              fontFamily: 'DM Mono, Menlo, monospace',
              fontSize: '22px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              margin: 0,
              color: '#061D2B',
            }}>
              {code}
            </Text>
            {expiresOn ? (
              <Text style={{ fontSize: '12px', color: '#59656E', margin: '10px 0 0' }}>
                Valid until {expiresOn}
              </Text>
            ) : null}
          </Section>

          <Section style={{ textAlign: 'center' as const, margin: '0 0 28px' }}>
            <Button
              href="https://www.pondokpeptides.com/shop"
              style={{
                backgroundColor: '#486748',
                color: '#ffffff',
                padding: '14px 28px',
                borderRadius: '4px',
                fontSize: '13px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Shop research peptides
            </Button>
          </Section>

          <Hr style={{ borderColor: '#DAE3E6' }} />
          <Text style={{ fontSize: '12px', color: '#59656E', margin: '16px 0 0', lineHeight: '18px' }}>
            For laboratory research use only. Not for human or veterinary use. One code per address. Cannot be combined with other offers.
          </Text>
          <Text style={{ fontSize: '11px', color: '#59656E', margin: '12px 0 0' }}>
            Oxford Research Syndicate Ltd, 131A Movers Lane, Barking, IG11 7UQ, United Kingdom
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: NewsletterWelcomeEmail,
  displayName: 'Newsletter welcome (20% off)',
  subject: 'Your 20% welcome code from Pondok Peptides',
  previewData: {
    code: 'WELCOME20-A7F3K9',
    expiresOn: '9 August 2026',
  },
} satisfies TemplateEntry
