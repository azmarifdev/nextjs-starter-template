import { getDemoEcommerceSummary } from "@/lib/demo-data";
import type { EcommerceSummary } from "@/modules/ecommerce/types";

export const ecommerceRepository = {
  async summary(): Promise<EcommerceSummary> {
    return getDemoEcommerceSummary();
  }
};
