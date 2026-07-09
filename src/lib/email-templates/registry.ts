import type { ComponentType } from 'react'
import { template as contactEnquiryTemplate } from './contact-enquiry'
import { template as newsletterWelcomeTemplate } from './newsletter-welcome'

export interface TemplateEntry {
  component: ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  displayName?: string
  previewData?: Record<string, any>
  /** Fixed recipient — overrides caller-provided recipientEmail when set. */
  to?: string
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'contact-enquiry': contactEnquiryTemplate,
  'newsletter-welcome': newsletterWelcomeTemplate,
}
