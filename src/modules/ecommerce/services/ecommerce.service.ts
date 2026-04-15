import { appConfig } from "@/lib/config/app-config";
import { API_PREFIX } from "@/lib/config/constants";
import { demoEcommerceSummary } from "@/lib/demo/dataset";
import type { EcommerceSummary } from "@/modules/ecommerce/ecommerce.types";
import { apiClient } from "@/services/apiClient";

export const ecommerceService = {
  async summary(): Promise<EcommerceSummary> {
    if (appConfig.demoData) {
      return demoEcommerceSummary;
    }

    return apiClient.get<EcommerceSummary>(
      `${API_PREFIX}/ecommerce/summary`,
      `
      query EcommerceSummary {
        ecommerceSummary {
          orders
          revenue
        }
      }
      `
    );
  }
};
