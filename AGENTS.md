# Project architecture rules

- Fire OpenAI `order_created` only from Shopify's `checkout_completed` Customer Event, because payment completes on Shopify's hosted checkout rather than the storefront `/thank-you` route.