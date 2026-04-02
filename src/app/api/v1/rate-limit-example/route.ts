import { requireInternalBackend } from "@/lib/api/internal-backend";
import { withApiHandler } from "@/lib/api-handler";
import { apiError, apiSuccess, resolveRequestId } from "@/lib/api-response";
import { attachRateLimitHeaders, consumeRateLimit } from "@/lib/rate-limit";

const RATE_LIMIT = {
  limit: 5,
  windowMs: 60_000
};
const RATE_LIMIT_COOKIE = "rl_example_id";

function getCookieValue(header: string | null, key: string): string | null {
  if (!header) {
    return null;
  }

  const cookie = header
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${key}=`));

  if (!cookie) {
    return null;
  }

  return cookie.slice(key.length + 1);
}

async function rateLimitExampleHandler(request: Request): Promise<Response> {
  const requestId = resolveRequestId(request.headers);
  const route = "/api/v1/rate-limit-example";
  const backendError = requireInternalBackend({ requestId, route });
  if (backendError) {
    return backendError;
  }

  const existingId = getCookieValue(request.headers.get("cookie"), RATE_LIMIT_COOKIE);
  const limiterId = existingId ?? crypto.randomUUID();
  const result = consumeRateLimit(`example:${limiterId}`, RATE_LIMIT);

  if (!result.allowed) {
    const response = apiError(
      { code: "RATE_LIMITED", message: "Rate limit exceeded for this endpoint" },
      { status: 429, requestId, route }
    );
    if (!existingId) {
      response.headers.append(
        "set-cookie",
        `${RATE_LIMIT_COOKIE}=${limiterId}; Path=/; HttpOnly; SameSite=Strict${
          process.env.NODE_ENV === "production" ? "; Secure" : ""
        }; Max-Age=604800`
      );
    }
    attachRateLimitHeaders(response, result, RATE_LIMIT.limit);
    return response;
  }

  const response = apiSuccess(
    {
      message: "Request accepted",
      remaining: result.remaining
    },
    { requestId }
  );
  if (!existingId) {
    response.headers.append(
      "set-cookie",
      `${RATE_LIMIT_COOKIE}=${limiterId}; Path=/; HttpOnly; SameSite=Strict${
        process.env.NODE_ENV === "production" ? "; Secure" : ""
      }; Max-Age=604800`
    );
  }
  attachRateLimitHeaders(response, result, RATE_LIMIT.limit);
  return response;
}

export const GET = withApiHandler("/api/v1/rate-limit-example", rateLimitExampleHandler);
