import { AbstractNotificationProviderService } from "@medusajs/framework/utils"
import type { NotificationTypes } from "@medusajs/framework/types"
import { appendFileSync, mkdirSync } from "node:fs"
import { dirname } from "node:path"

type Options = {
  outboxPath?: string
  from?: string
  fromName?: string
  transport?: string
}

/**
 * Transactional email. Default transport is "log": the message is appended to
 * a local outbox and is not delivered. SMTP runs only when EMAIL_TRANSPORT=smtp,
 * SMTP_URL is set, and the notification data sets allow_send. Import scripts
 * never set allow_send.
 */
class EmailNotificationProviderService extends AbstractNotificationProviderService {
  static identifier = "pondok-email"
  protected options_: Options

  constructor(_: Record<string, unknown>, options: Options = {}) {
    super()
    this.options_ = options
  }

  async send(notification: NotificationTypes.ProviderSendNotificationDTO) {
    const from = this.options_.from || process.env.EMAIL_FROM || "info@pondokpeptides.com"
    const fromName = this.options_.fromName || process.env.EMAIL_FROM_NAME || "Pondok Peptides"
    const transport = this.options_.transport || process.env.EMAIL_TRANSPORT || "log"
    const data = (notification.data || {}) as { allow_send?: boolean }
    const outbox = this.options_.outboxPath || process.env.EMAIL_OUTBOX || `${process.cwd()}/data/email-outbox.jsonl`
    mkdirSync(dirname(outbox), { recursive: true })
    const row = {
      at: new Date().toISOString(),
      from: `${fromName} <${from}>`,
      to: notification.to,
      channel: notification.channel,
      template: notification.template,
      data: notification.data || {},
      delivered: false,
      transport,
    }
    const allowSend = data.allow_send === true && transport === "smtp" && Boolean(process.env.SMTP_URL)
    if (allowSend) {
      // TODO(email): deliver with SMTP_URL. One recipient per call. Never loop a customer list here.
      row.delivered = false
      row.transport = "smtp-todo"
    }
    appendFileSync(outbox, `${JSON.stringify(row)}\n`)
    return { id: `${notification.template}:${notification.to}:${row.at}` }
  }
}

export default EmailNotificationProviderService
