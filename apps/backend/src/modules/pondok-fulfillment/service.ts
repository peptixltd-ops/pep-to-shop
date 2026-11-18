import { AbstractFulfillmentProviderService } from "@medusajs/framework/utils"
import { quoteShipping } from "../../lib/shipping"

class PondokFulfillmentProviderService extends AbstractFulfillmentProviderService {
  static identifier = "pondok"

  async getFulfillmentOptions() {
    return [{ id: "uk-tracked-24", method: "tracked-24" }]
  }

  async validateOption(data: Record<string, unknown>) {
    return String(data?.method || data?.id || "tracked-24").includes("tracked")
  }

  async validateFulfillmentData(optionData: Record<string, unknown>, data: Record<string, unknown>) {
    return { ...optionData, ...data }
  }

  async canCalculate() {
    return true
  }

  async calculatePrice(
    optionData: Record<string, unknown>,
    data: Record<string, unknown>,
    context: Record<string, unknown>,
  ) {
    const address = (context?.shipping_address || data || {}) as { country_code?: string }
    const items = (context?.items || []) as Array<{ unit_price?: unknown; quantity?: unknown }>
    const subtotal = items.reduce((sum, item) => {
      const unit = Number(item.unit_price ?? 0)
      const qty = Number(item.quantity ?? 0)
      return sum + (Number.isFinite(unit) ? unit : 0) * (Number.isFinite(qty) ? qty : 0)
    }, 0)
    const quote = quoteShipping(subtotal, address.country_code || "gb")
    void optionData
    return { calculated_amount: quote.amount, is_calculated_price_tax_inclusive: true }
  }

  async createFulfillment() {
    return { data: {}, labels: [] }
  }

  async cancelFulfillment() {
    return {}
  }
}

export default PondokFulfillmentProviderService
