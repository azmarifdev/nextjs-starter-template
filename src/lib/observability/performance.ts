import { logger } from "@/lib/observability/logger";

export async function measureAsync<T>(
  metric: string,
  operation: () => Promise<T>,
  context?: Record<string, unknown>
): Promise<T> {
  const startedAt = performance.now();

  try {
    const result = await operation();
    logger.debug("perf:success", {
      metric,
      durationMs: Number((performance.now() - startedAt).toFixed(2)),
      ...context
    });
    return result;
  } catch (error) {
    logger.warn("perf:error", {
      metric,
      durationMs: Number((performance.now() - startedAt).toFixed(2)),
      error: error instanceof Error ? error.message : "Unknown error",
      ...context
    });
    throw error;
  }
}
