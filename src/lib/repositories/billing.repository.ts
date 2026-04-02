import { getDemoBillingSummary } from "@/lib/demo-data";
import type { BillingSummary } from "@/modules/billing/types";

export const billingRepository = {
  async summary(): Promise<BillingSummary> {
    return getDemoBillingSummary();
  }
};
