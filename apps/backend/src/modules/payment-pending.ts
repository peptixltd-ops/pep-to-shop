import { AbstractPaymentProvider, PaymentSessionStatus } from "@medusajs/framework/utils"
import type {
  AuthorizePaymentInput,
  AuthorizePaymentOutput,
  CancelPaymentInput,
  CancelPaymentOutput,
  CapturePaymentInput,
  CapturePaymentOutput,
  DeletePaymentInput,
  DeletePaymentOutput,
  GetPaymentStatusInput,
  GetPaymentStatusOutput,
  InitiatePaymentInput,
  InitiatePaymentOutput,
  ProviderWebhookPayload,
  RefundPaymentInput,
  RefundPaymentOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
  WebhookActionResult,
} from "@medusajs/framework/types"

type ProviderOptions = {
  apiKey?: string
  apiBase?: string
  webhookSecret?: string
  merchantId?: string
}

/**
 * Shared skeleton for external payment providers whose API docs are not in this repo.
 * Sessions stay pending. They are never authorized, so a missing integration cannot
 * mark an order paid. Checkout tests use the sandbox provider.
 */
export class PendingExternalPaymentProvider extends AbstractPaymentProvider {
  protected providerName_: string

  public constructor(cradle: Record<string, unknown>, options: ProviderOptions = {}, providerName = "external") {
    super(cradle, options)
    this.providerName_ = providerName
  }

  protected options(): ProviderOptions {
    return (this.config || {}) as ProviderOptions
  }

  protected configured(): boolean {
    const options = this.options()
    return Boolean(options.apiKey && options.apiBase && options.merchantId)
  }

  async initiatePayment(input: InitiatePaymentInput): Promise<InitiatePaymentOutput> {
    if (!this.configured()) {
      throw new Error(
        `${this.providerName_} is not configured. Set its API key, base URL and merchant id, or pay with the sandbox provider.`,
      )
    }
    // TODO(provider): create a hosted session against the provider API and return its id.
    // Do not mark the session authorized here.
    const id = `${this.providerName_.toLowerCase()}_${Date.now()}`
    return {
      id,
      status: PaymentSessionStatus.PENDING,
      data: {
        id,
        provider: this.providerName_,
        amount: input.amount,
        currency_code: input.currency_code,
        integration: "todo",
      },
    }
  }

  async authorizePayment(_input: AuthorizePaymentInput): Promise<AuthorizePaymentOutput> {
    // TODO(provider): authorize only after a verified webhook or a successful return URL.
    throw new Error(`${this.providerName_} authorization is not implemented.`)
  }

  async capturePayment(input: CapturePaymentInput): Promise<CapturePaymentOutput> {
    // TODO(provider): capture against the provider when their capture API is documented.
    return { data: { ...(input.data || {}), capture: "todo" } }
  }

  async cancelPayment(input: CancelPaymentInput): Promise<CancelPaymentOutput> {
    return { data: { ...(input.data || {}), canceled_at: new Date().toISOString() } }
  }

  async deletePayment(input: DeletePaymentInput): Promise<DeletePaymentOutput> {
    return { data: input.data || {} }
  }

  async getPaymentStatus(_input: GetPaymentStatusInput): Promise<GetPaymentStatusOutput> {
    return { status: PaymentSessionStatus.PENDING }
  }

  async refundPayment(input: RefundPaymentInput): Promise<RefundPaymentOutput> {
    // TODO(provider): call the provider refund endpoint.
    return { data: { ...(input.data || {}), refund: "todo", amount: input.amount } }
  }

  async retrievePayment(input: RetrievePaymentInput): Promise<RetrievePaymentOutput> {
    return input.data || {}
  }

  async updatePayment(input: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
    return { data: { ...(input.data || {}), amount: input.amount } }
  }

  async getWebhookActionAndData(payload: ProviderWebhookPayload["payload"]): Promise<WebhookActionResult> {
    const secret = this.options().webhookSecret
    if (!secret) return { action: "not_supported" }
    // TODO(provider): verify the signature with webhookSecret, then return captured/authorized.
    void payload
    return { action: "not_supported" }
  }
}
