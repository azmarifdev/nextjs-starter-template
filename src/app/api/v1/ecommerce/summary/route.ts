import { requireInternalBackend } from "@/lib/api/internal-backend";
import { withApiHandler } from "@/lib/api-handler";
import { apiError, apiSuccess, resolveRequestId } from "@/lib/api-response";
import { requirePermission, requireSession } from "@/lib/auth/session-guard";
import { isFeatureEnabled } from "@/lib/config/feature-flags";
import { ecommerceRepository } from "@/lib/repositories/ecommerce.repository";

async function ecommerceSummaryHandler(request: Request): Promise<Response> {
  const requestId = resolveRequestId(request.headers);
  const route = "/api/v1/ecommerce/summary";

  const backendError = requireInternalBackend({ requestId, route });
  if (backendError) {
    return backendError;
  }

  if (!isFeatureEnabled("ecommerce")) {
    return apiError(
      {
        code: "FEATURE_DISABLED",
        message: "Ecommerce feature is disabled"
      },
      { status: 404, requestId, route }
    );
  }

  const { session, response } = await requireSession({ request, requestId, route });
  if (!session) {
    return response;
  }

  const permissionError = requirePermission(session.role, "ecommerce:read", { requestId, route });
  if (permissionError) {
    return permissionError;
  }

  const summary = await ecommerceRepository.summary();
  return apiSuccess(summary, { requestId });
}

export const GET = withApiHandler("/api/v1/ecommerce/summary", ecommerceSummaryHandler);
