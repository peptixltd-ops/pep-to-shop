import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

/**
 * Order receipt for a checkout the customer just placed. One message, written
 * to the outbox. It is not used for imported historical orders.
 */
export default async function orderPlacedHandler({ event, container }: SubscriberArgs<{ id: string }>) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const notification = container.resolve(Modules.NOTIFICATION)
  const { data } = await query.graph({
    entity: "order",
    fields: ["id", "email", "display_id", "total", "metadata"],
    filters: { id: event.data.id },
  })
  const order = data[0]
  if (!order?.email) return
  if (order.metadata?.imported_from_shopify) return
  await notification.createNotifications({
    to: order.email,
    channel: "email",
    template: "order.placed",
    data: {
      order_id: order.id,
      display_id: order.display_id,
      total: order.total,
      allow_send: false,
    },
  })
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
