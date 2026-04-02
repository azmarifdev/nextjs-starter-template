import { requireInternalBackend } from "@/lib/api/internal-backend";
import { withApiHandler } from "@/lib/api-handler";
import { apiError, apiSuccess, resolveRequestId } from "@/lib/api-response";
import { requirePermission, requireSession } from "@/lib/auth/session-guard";
import { isFeatureEnabled } from "@/lib/config/feature-flags";
import { usersRepository } from "@/lib/repositories/users.repository";

async function usersHandler(request: Request): Promise<Response> {
  const requestId = resolveRequestId(request.headers);
  const route = "/api/v1/users";
  const backendError = requireInternalBackend({ requestId, route });
  if (backendError) {
    return backendError;
  }
  if (!isFeatureEnabled("admin")) {
    return apiError(
      {
        code: "FEATURE_DISABLED",
        message: "Admin feature is disabled"
      },
      { status: 404, requestId, route }
    );
  }

  const { session, response } = await requireSession({ request, requestId, route });
  if (!session) {
    return response;
  }

  const permissionError = requirePermission(session.role, "users:read", { requestId, route });
  if (permissionError) {
    return permissionError;
  }

  const users = await usersRepository.list();
  return apiSuccess(users, { requestId });
}

export const GET = withApiHandler("/api/v1/users", usersHandler);
