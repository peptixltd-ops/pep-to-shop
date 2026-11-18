import { ModuleProvider, Modules } from "@medusajs/framework/utils"
import PondokFulfillmentProviderService from "./service"

export default ModuleProvider(Modules.FULFILLMENT, {
  services: [PondokFulfillmentProviderService],
})
