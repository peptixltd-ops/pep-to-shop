import { ModuleProvider, Modules } from "@medusajs/framework/utils"
import { PendingExternalPaymentProvider } from "../payment-pending"

class WallidPaymentProviderService extends PendingExternalPaymentProvider {
  static identifier = "wallid"

  constructor(cradle: Record<string, unknown>, options?: Record<string, unknown>) {
    // TODO(wallid): pay-by-bank. Confirm the create-session, return URL and webhook contract
    // with Wallid before replacing PendingExternalPaymentProvider.
    super(cradle, options, "Wallid")
  }
}

export default ModuleProvider(Modules.PAYMENT, {
  services: [WallidPaymentProviderService],
})
