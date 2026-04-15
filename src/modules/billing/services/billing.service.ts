import { appConfig } from "@/lib/config/app-config";
import { API_PREFIX } from "@/lib/config/constants";
import { demoBillingSummary } from "@/lib/demo/dataset";
import type { BillingSummary } from "@/modules/billing/billing.types";
import { apiClient } from "@/services/apiClient";

export const billingService = {
  async summary(): Promise<BillingSummary> {
    if (appConfig.demoData) {
      return demoBillingSummary;
    }

    return apiClient.get<BillingSummary>(
      `${API_PREFIX}/billing/summary`,
      `
      query BillingSummary {
        billingSummary {
          activePlans
          mrr
        }
      }
      `
    );
  }
};
