import { API_PREFIX } from "@/lib/constants";
import type { BillingSummary } from "@/modules/billing/types";
import { apiClient } from "@/services/apiClient";

export const billingService = {
  async summary(): Promise<BillingSummary> {
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
