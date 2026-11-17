import { loadEnv, defineConfig } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

const redisUrl = process.env.REDIS_URL

module.exports = defineConfig({
  admin: process.env.MEDUSA_DISABLE_ADMIN === "true" ? { disable: true } : {},
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    },
  },
  modules: [
    { resolve: "@medusajs/medusa/cache-redis", options: { redisUrl } },
    { resolve: "@medusajs/medusa/event-bus-redis", options: { redisUrl } },
    {
      resolve: "@medusajs/medusa/workflow-engine-redis",
      options: { redis: { redisUrl } },
    },
    {
      resolve: "@medusajs/medusa/locking",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/locking-redis",
            id: "locking-redis",
            is_default: true,
            options: { redisUrl },
          },
        ],
      },
    },
    {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          {
            resolve: "./src/modules/sandbox-payment",
            id: "sandbox",
            options: { mode: "sandbox" },
          },
          {
            resolve: "./src/modules/wallid-payment",
            id: "wallid",
            options: {
              apiKey: process.env.WALLID_API_KEY,
              apiBase: process.env.WALLID_API_BASE,
              webhookSecret: process.env.WALLID_WEBHOOK_SECRET,
              merchantId: process.env.WALLID_MERCHANT_ID,
            },
          },
          {
            resolve: "./src/modules/niftipay-payment",
            id: "niftipay",
            options: {
              apiKey: process.env.NIFTIPAY_API_KEY,
              apiBase: process.env.NIFTIPAY_API_BASE,
              webhookSecret: process.env.NIFTIPAY_WEBHOOK_SECRET,
              merchantId: process.env.NIFTIPAY_MERCHANT_ID,
            },
          },
        ],
      },
    },
    {
      resolve: "@medusajs/medusa/fulfillment",
      options: {
        providers: [
          { resolve: "@medusajs/medusa/fulfillment-manual", id: "manual" },
          { resolve: "./src/modules/pondok-fulfillment", id: "pondok" },
        ],
      },
    },
    {
      resolve: "@medusajs/medusa/notification",
      options: {
        providers: [
          {
            resolve: "./src/modules/email-notification",
            id: "local",
            options: {
              channels: ["email"],
              outboxPath: process.env.EMAIL_OUTBOX,
              from: process.env.EMAIL_FROM || "info@pondokpeptides.com",
              fromName: process.env.EMAIL_FROM_NAME || "Pondok Peptides",
              transport: process.env.EMAIL_TRANSPORT || "log",
            },
          },
        ],
      },
    },
  ],
})
