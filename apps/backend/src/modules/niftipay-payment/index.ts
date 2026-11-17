import { ModuleProvider, Modules } from "@medusajs/framework/utils"
import { PendingExternalPaymentProvider } from "../payment-pending"

class NiftiPayPaymentProviderService extends PendingExternalPaymentProvider {
  static identifier = "niftipay"

  constructor(cradle: Record<string, unknown>, options?: Record<string, unknown>) {
    // TODO(niftipay): card payments. Confirm the hosted-fields or redirect contract
    // with NiftiPay before replacing PendingExternalPaymentProvider.
    super(cradle, options, "NiftiPay")
  }
}

export default ModuleProvider(Modules.PAYMENT, {
  services: [NiftiPayPaymentProviderService],
})
