import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import {
  addShippingMethodToCartWorkflow,
  createCartWorkflow,
  listShippingOptionsForCartWithPricingWorkflow,
  updateCartPromotionsWorkflow,
} from "@medusajs/medusa/core-flows"
import { ContainerRegistrationKeys, Modules, PromotionActions } from "@medusajs/framework/utils"

type QuoteItem = { variant_id?: string; quantity?: number }

type QuoteBody = {
  items?: QuoteItem[]
  country_code?: string
  postal_code?: string
  city?: string
  address_1?: string
}

async function discardQuoteCart(scope: MedusaRequest["scope"], cartId: string) {
  const knex = scope.resolve(ContainerRegistrationKeys.PG_CONNECTION)
  const cart = await knex("cart").where({ id: cartId }).first()
  if (!cart) return
  const addressIds = [cart.shipping_address_id, cart.billing_address_id].filter(Boolean)
  await knex("cart_promotion").where({ cart_id: cartId }).delete()
  await knex("cart_payment_collection").where({ cart_id: cartId }).delete()
  await knex("cart").where({ id: cartId }).delete()
  if (addressIds.length) await knex("cart_address").whereIn("id", addressIds).delete()
}

async function cartTotals(scope: MedusaRequest["scope"], cartId: string) {
  const query = scope.resolve(ContainerRegistrationKeys.QUERY)
  const { data } = await query.graph({
    entity: "cart",
    fields: ["id", "total", "shipping_total", "currency_code"],
    filters: { id: cartId },
  })
  return data[0]
}

export async function POST(req: MedusaRequest<QuoteBody>, res: MedusaResponse) {
  const items = (req.body?.items || []).filter((item) => item.variant_id && Number(item.quantity) > 0)
  if (!items.length) {
    res.status(400).json({ message: "A cart needs at least one item to quote shipping." })
    return
  }
  const country = String(req.body?.country_code || "gb").toLowerCase()
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const { data: regions } = await query.graph({
    entity: "region",
    fields: ["id", "currency_code", "countries.iso_2"],
  })
  const region = regions.find((entry) => entry.countries?.some((countryRow) => countryRow?.iso_2 === country)) || regions[0]
  if (!region) {
    res.status(400).json({ message: "No region is configured for this destination." })
    return
  }
  const { data: stores } = await query.graph({
    entity: "store",
    fields: ["default_sales_channel_id"],
  })

  const { result: cart } = await createCartWorkflow(req.scope).run({
    input: {
      region_id: region.id,
      sales_channel_id: stores[0]?.default_sales_channel_id || undefined,
      items: items.map((item) => ({ variant_id: item.variant_id, quantity: Number(item.quantity) })),
      shipping_address: {
        first_name: "Quote",
        last_name: "Quote",
        address_1: req.body?.address_1 || "Quote",
        city: req.body?.city || "Barking",
        postal_code: req.body?.postal_code || "IG11 7UQ",
        country_code: country,
      },
    },
  })

  try {
    let freeship = false
    const { result: shippingOptions } = await listShippingOptionsForCartWithPricingWorkflow(req.scope).run({
      input: { cart_id: cart.id },
    })
    const cartModule = req.scope.resolve(Modules.CART)
    const priced: Array<{ id: string; name: string; amount: number; total: number; currency_code: string }> = []
    for (const option of shippingOptions || []) {
      await addShippingMethodToCartWorkflow(req.scope).run({
        input: { cart_id: cart.id, options: [{ id: option.id }] },
      })
      try {
        await updateCartPromotionsWorkflow(req.scope).run({
          input: {
            cart_id: cart.id,
            promo_codes: ["FREESHIP"],
            action: PromotionActions.ADD,
          },
        })
        freeship = true
      } catch (error) {
        const message = error instanceof Error ? error.message : ""
        if (!/invalid|not found|does not exist/i.test(message)) throw error
      }
      const totals = await cartTotals(req.scope, cart.id)
      priced.push({
        id: option.id,
        name: option.name || "Shipping",
        amount: Number(totals?.shipping_total ?? 0),
        total: Number(totals?.total ?? 0),
        currency_code: totals?.currency_code || region.currency_code || "gbp",
      })
      const methods = await cartModule.listShippingMethods({ cart_id: cart.id }, { select: ["id"] })
      if (methods.length) await cartModule.deleteShippingMethods(methods.map((method) => method.id))
    }

    res.json({ options: priced, freeship, currency_code: region.currency_code || "gbp" })
  } finally {
    await discardQuoteCart(req.scope, cart.id)
  }
}
