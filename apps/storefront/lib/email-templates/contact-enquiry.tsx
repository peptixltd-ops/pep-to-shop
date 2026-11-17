import {
  Body,
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

interface ContactEnquiryProps {
  name?: string
  email?: string
  order?: string
  message?: string
  submittedAt?: string
}

export function ContactEnquiryEmail({
  name = 'Website visitor',
  email = 'unknown@example.com',
  order = '',
  message = '',
  submittedAt = new Date().toISOString(),
}: ContactEnquiryProps) {
  return (
    <Html>
      <Head />
      <Preview>New contact enquiry from {name}</Preview>
      <Body style={{ backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif', color: '#061D2B' }}>
        <Container style={{ maxWidth: '560px', margin: '0 auto', padding: '32px 24px' }}>
          <Heading style={{ fontSize: '20px', margin: '0 0 8px', color: '#486748' }}>
            New contact enquiry
          </Heading>
          <Text style={{ fontSize: '13px', color: '#59656E', margin: '0 0 24px' }}>
            Submitted {submittedAt} via pondokpeptides.com/contact
          </Text>
          <Hr style={{ borderColor: '#DAE3E6' }} />
          <Section style={{ padding: '16px 0' }}>
            <Text style={{ margin: '6px 0', fontSize: '14px' }}><strong>Name:</strong> {name}</Text>
            <Text style={{ margin: '6px 0', fontSize: '14px' }}><strong>Email:</strong> {email}</Text>
            <Text style={{ margin: '6px 0', fontSize: '14px' }}><strong>Order number:</strong> {order || 'n/a'}</Text>
          </Section>
          <Hr style={{ borderColor: '#DAE3E6' }} />
          <Section style={{ padding: '16px 0' }}>
            <Text style={{ margin: '0 0 8px', fontSize: '13px', color: '#59656E', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Message
            </Text>
            <Text style={{ margin: 0, fontSize: '14px', lineHeight: '22px', whiteSpace: 'pre-wrap' }}>
              {message}
            </Text>
          </Section>
          <Hr style={{ borderColor: '#DAE3E6' }} />
          <Text style={{ fontSize: '12px', color: '#59656E', margin: '16px 0 0' }}>
            Reply directly to this email to respond to {name} at {email}.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: ContactEnquiryEmail,
  displayName: 'Contact form enquiry',
  subject: (data: Record<string, any>) =>
    `Website enquiry from ${data?.name || 'visitor'}${data?.order ? ` (Order ${data.order})` : ''}`,
  to: 'info@pondokpeptides.com',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    order: 'PP-1042',
    message: 'Hello, could you confirm the COA batch for BPC-157?',
    submittedAt: new Date().toISOString(),
  },
} satisfies TemplateEntry
