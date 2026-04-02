import { requireInternalBackend } from "@/lib/api/internal-backend";
import { withApiHandler } from "@/lib/api-handler";
import { apiError, apiSuccess, resolveRequestId } from "@/lib/api-response";
import { requirePermission, requireSession } from "@/lib/auth/session-guard";
import { isFeatureEnabled } from "@/lib/config/feature-flags";
import { billingRepository } from "@/lib/repositories/billing.repository";

async function billingSummaryHandler(request: Request): Promise<Response> {
  const requestId = resolveRequestId(request.headers);
  const route = "/api/v1/billing/summary";

  const backendError = requireInternalBackend({ requestId, route });
  if (backendError) {
    return backendError;
  }

  if (!isFeatureEnabled("billing")) {
    return apiError(
      {
        code: "FEATURE_DISABLED",
        message: "Billing feature is disabled"
      },
      { status: 404, requestId, route }
    );
  }

  const { session, response } = await requireSession({ request, requestId, route });
  if (!session) {
    return response;
  }

  const permissionError = requirePermission(session.role, "billing:read", { requestId, route });
  if (permissionError) {
    return permissionError;
  }

  const summary = await billingRepository.summary();
  return apiSuccess(summary, { requestId });
}

export const GET = withApiHandler("/api/v1/billing/summary", billingSummaryHandler);
