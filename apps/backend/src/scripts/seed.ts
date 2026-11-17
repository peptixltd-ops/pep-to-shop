import { readFileSync, mkdirSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import type { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules, ProductStatus } from "@medusajs/framework/utils"
import {
  createApiKeysWorkflow,
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createStockLocationsWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
  updateStoresWorkflow,
} from "@medusajs/medusa/core-flows"

type CatalogueNode = {
  id: string
  title: string
  description: string
  handle: string
  vendor?: string
  images: { edges: Array<{ node: { url: string; altText: string | null } }> }
  options: Array<{ name: string; values: string[] }>
  variants: {
    edges: Array<{
      node: {
        id: string
        title: string
        sku?: string | null
        price: { amount: string; currencyCode: string }
        selectedOptions: Array<{ name: string; value: string }>
      }
    }>
  }
}

const PAYMENT_PROVIDERS = ["pp_system_default", "pp_sandbox_sandbox", "pp_wallid_wallid", "pp_niftipay_niftipay"]

export default async function seed({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const link = container.resolve(ContainerRegistrationKeys.LINK)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const fulfillment = container.resolve(Modules.FULFILLMENT)
  const salesChannels = container.resolve(Modules.SALES_CHANNEL)
  const storeModule = container.resolve(Modules.STORE)
  const auth = container.resolve(Modules.AUTH)
  const userModule = container.resolve(Modules.USER)

  const cataloguePath = resolve(process.cwd(), "../../packages/config/catalogue.json")
  const catalogue = JSON.parse(readFileSync(cataloguePath, "utf8")) as Array<{ node: CatalogueNode }>

  const [store] = await storeModule.listStores()
  let channels = await salesChannels.listSalesChannels({ name: "Default Sales Channel" })
  if (!channels.length) {
    const { result } = await createSalesChannelsWorkflow(container).run({
      input: { salesChannelsData: [{ name: "Default Sales Channel" }] },
    })
    channels = result
  }
  const salesChannel = channels[0]

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        name: "Pondok Peptides",
        default_sales_channel_id: salesChannel.id,
        supported_currencies: [{ currency_code: "gbp", is_default: true }],
      },
    },
  })

  const { data: existingRegions } = await query.graph({
    entity: "region",
    fields: ["id", "name", "currency_code"],
  })
  let region: any = existingRegions.find((entry) => entry.name === "United Kingdom")
  if (!region) {
    const { result } = await createRegionsWorkflow(container).run({
      input: {
        regions: [
          {
            name: "United Kingdom",
            currency_code: "gbp",
            countries: ["gb"],
            payment_providers: PAYMENT_PROVIDERS,
          },
        ],
      },
    })
    region = result[0]
    await createTaxRegionsWorkflow(container).run({
      input: [{ country_code: "gb", provider_id: "tp_system" }],
    })
  }

  const { data: existingLocations } = await query.graph({
    entity: "stock_location",
    fields: ["id", "name"],
  })
  let location: any = existingLocations.find((entry) => entry.name === "Barking")
  if (!location) {
    const { result } = await createStockLocationsWorkflow(container).run({
      input: {
        locations: [
          {
            name: "Barking",
            address: {
              address_1: "131A Movers Lane",
              city: "Barking",
              postal_code: "IG11 7UQ",
              country_code: "gb",
            },
          },
        ],
      },
    })
    location = result[0]
    await link.create({
      [Modules.STOCK_LOCATION]: { stock_location_id: location.id },
      [Modules.FULFILLMENT]: { fulfillment_provider_id: "manual_manual" },
    })
    await link.create({
      [Modules.STOCK_LOCATION]: { stock_location_id: location.id },
      [Modules.FULFILLMENT]: { fulfillment_provider_id: "pondok_pondok" },
    })
  }

  await updateStoresWorkflow(container).run({
    input: { selector: { id: store.id }, update: { default_location_id: location.id } },
  })

  const profiles = await fulfillment.listShippingProfiles({ type: "default" })
  const shippingProfile = profiles[0]
  if (!shippingProfile) throw new Error("Default shipping profile is missing.")

  const { data: existingOptions } = await query.graph({
    entity: "shipping_option",
    fields: ["id", "name"],
  })
  if (!existingOptions.some((option) => option.name === "Royal Mail Tracked 24")) {
    const fulfillmentSet = await fulfillment.createFulfillmentSets({
      name: "United Kingdom delivery",
      type: "shipping",
      service_zones: [
        { name: "United Kingdom", geo_zones: [{ country_code: "gb", type: "country" }] },
      ],
    })
    await link.create({
      [Modules.STOCK_LOCATION]: { stock_location_id: location.id },
      [Modules.FULFILLMENT]: { fulfillment_set_id: fulfillmentSet.id },
    })
    await createShippingOptionsWorkflow(container).run({
      input: [
        {
          name: "Royal Mail Tracked 24",
          price_type: "calculated",
          provider_id: "pondok_pondok",
          service_zone_id: fulfillmentSet.service_zones[0].id,
          shipping_profile_id: shippingProfile.id,
          type: {
            label: "Royal Mail Tracked 24",
            description: "£4.95, free over £75. Provisional until the Shopify shipping import.",
            code: "uk-tracked-24",
          },
          rules: [
            { attribute: "enabled_in_store", value: "true", operator: "eq" },
            { attribute: "is_return", value: "false", operator: "eq" },
          ],
        },
      ],
    })
  }

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: { id: location.id, add: [salesChannel.id] },
  })

  const { data: keys } = await query.graph({
    entity: "api_key",
    fields: ["id", "token", "type", "title"],
    filters: { type: "publishable" },
  })
  let publishable: any = keys[0]
  if (!publishable) {
    const { result } = await createApiKeysWorkflow(container).run({
      input: { api_keys: [{ title: "Pondok storefront", type: "publishable", created_by: "" }] },
    })
    publishable = result[0]
  }
  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: { id: publishable.id, add: [salesChannel.id] },
  })

  const { data: existingProducts } = await query.graph({
    entity: "product",
    fields: ["id", "handle"],
  })
  const existingHandles = new Set(existingProducts.map((product) => product.handle))
  const missing = catalogue.filter((entry) => !existingHandles.has(entry.node.handle))

  let categoryId: string | undefined
  const { data: categories } = await query.graph({
    entity: "product_category",
    fields: ["id", "name"],
  })
  const research = categories.find((category) => category.name === "Research peptides")
  if (research) categoryId = research.id
  else if (missing.length) {
    const { result } = await createProductCategoriesWorkflow(container).run({
      input: { product_categories: [{ name: "Research peptides", is_active: true }] },
    })
    categoryId = result[0].id
  }

  if (missing.length) {
    await createProductsWorkflow(container).run({
      input: {
        products: missing.map(({ node }) => {
          const optionName = node.options[0]?.name || "Strength"
          const values = node.variants.edges.map((edge) => edge.node.title)
          return {
            title: node.title,
            handle: node.handle,
            description: node.description,
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            category_ids: categoryId ? [categoryId] : [],
            metadata: {
              vendor: node.vendor || "Pondok Peptides",
              shopify_product_id: node.id,
              research_use_only: true,
            },
            images: node.images.edges.map((edge) => ({ url: edge.node.url })),
            options: [{ title: optionName, values: [...new Set(values)] }],
            variants: node.variants.edges.map((edge) => {
              const variant = edge.node
              const options: Record<string, string> = {}
              if (variant.selectedOptions?.length) {
                for (const option of variant.selectedOptions) options[option.name] = option.value
              } else {
                options[optionName] = variant.title
              }
              return {
                title: variant.title,
                sku: variant.sku || `pondok-${node.handle}-${variant.title}`.toLowerCase().replace(/\s+/g, "-"),
                options,
                manage_inventory: true,
                metadata: { shopify_variant_id: variant.id },
                prices: [{ amount: Number(variant.price.amount), currency_code: "gbp" }],
              }
            }),
          }
        }),
      },
    })
  }

  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id"],
  })
  const { data: levels } = await query.graph({
    entity: "inventory_level",
    fields: ["id", "inventory_item_id", "location_id"],
  })
  const haveLevel = new Set(levels.filter((level) => level.location_id === location.id).map((level) => level.inventory_item_id))
  const toLevel = inventoryItems.filter((item) => !haveLevel.has(item.id))
  if (toLevel.length) {
    await createInventoryLevelsWorkflow(container).run({
      input: {
        inventory_levels: toLevel.map((item) => ({
          inventory_item_id: item.id,
          location_id: location.id,
          stocked_quantity: 100,
        })),
      },
    })
  }

  const email = process.env.MEDUSA_ADMIN_EMAIL || "dev-admin@pondokpeptides.local"
  const password = process.env.MEDUSA_ADMIN_PASSWORD || "local-dev-only"
  const users = await userModule.listUsers({ email })
  if (!users.length) {
    const { authIdentity, error } = await auth.register("emailpass", { body: { email, password } })
    if (error || !authIdentity) throw new Error(error || "Could not register the admin user.")
    const user = await userModule.createUsers({ email, first_name: "Pondok", last_name: "Admin" })
    await auth.updateAuthIdentities({ id: authIdentity.id, app_metadata: { user_id: user.id } })
  }

  const seedDir = resolve(process.cwd(), "data")
  mkdirSync(seedDir, { recursive: true })
  const summary = {
    publishable_key: publishable.token || null,
    publishable_key_id: publishable.id,
    region_id: region.id,
    sales_channel_id: salesChannel.id,
    products: catalogue.length,
  }
  writeFileSync(resolve(seedDir, "seed-summary.json"), JSON.stringify(summary, null, 2))
  const storefrontDir = resolve(process.cwd(), "../storefront")
  mkdirSync(storefrontDir, { recursive: true })
  const storefrontEnv = [
    `MEDUSA_BACKEND_URL=http://127.0.0.1:9000`,
    `MEDUSA_PUBLISHABLE_KEY=${summary.publishable_key || ""}`,
    `MEDUSA_REGION_ID=${region.id}`,
    `NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://127.0.0.1:9000`,
    `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=${summary.publishable_key || ""}`,
    `NEXT_PUBLIC_MEDUSA_REGION_ID=${region.id}`,
    `NEXT_PUBLIC_STAGING=true`,
    `NEXT_PUBLIC_SITE_URL=http://localhost:3000`,
  ].join("\n")
  writeFileSync(resolve(process.cwd(), "../storefront/.env.local"), `${storefrontEnv}\n`)
  logger.info(`Seeded Pondok Peptides. Region ${region.id}. Publishable key written to the storefront env.`)
}
