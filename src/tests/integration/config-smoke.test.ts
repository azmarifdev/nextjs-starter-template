// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from "vitest";

const ORIGINAL_ENV = {
  NEXT_PUBLIC_BACKEND_MODE: process.env.NEXT_PUBLIC_BACKEND_MODE,
  NEXT_PUBLIC_AUTH_PROVIDER: process.env.NEXT_PUBLIC_AUTH_PROVIDER,
  NEXT_PUBLIC_API_MODE: process.env.NEXT_PUBLIC_API_MODE,
  NEXT_PUBLIC_DB_PROVIDER: process.env.NEXT_PUBLIC_DB_PROVIDER,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  AUTH_SESSION_SECRET: process.env.AUTH_SESSION_SECRET,
  ALLOW_DEMO_AUTH: process.env.ALLOW_DEMO_AUTH,
  NODE_ENV: process.env.NODE_ENV
};
const mutableEnv = process.env as Record<string, string | undefined>;

function restoreValue(key: string, value: string | undefined): void {
  if (value === undefined) {
    delete mutableEnv[key];
    return;
  }

  mutableEnv[key] = value;
}

function restoreEnv(): void {
  restoreValue("NEXT_PUBLIC_BACKEND_MODE", ORIGINAL_ENV.NEXT_PUBLIC_BACKEND_MODE);
  restoreValue("NEXT_PUBLIC_AUTH_PROVIDER", ORIGINAL_ENV.NEXT_PUBLIC_AUTH_PROVIDER);
  restoreValue("NEXT_PUBLIC_API_MODE", ORIGINAL_ENV.NEXT_PUBLIC_API_MODE);
  restoreValue("NEXT_PUBLIC_DB_PROVIDER", ORIGINAL_ENV.NEXT_PUBLIC_DB_PROVIDER);
  restoreValue("NEXT_PUBLIC_API_BASE_URL", ORIGINAL_ENV.NEXT_PUBLIC_API_BASE_URL);
  restoreValue("AUTH_SESSION_SECRET", ORIGINAL_ENV.AUTH_SESSION_SECRET);
  restoreValue("ALLOW_DEMO_AUTH", ORIGINAL_ENV.ALLOW_DEMO_AUTH);
  restoreValue("NODE_ENV", ORIGINAL_ENV.NODE_ENV);
}

describe("supported config smoke", () => {
  beforeEach(() => {
    vi.resetModules();
    restoreEnv();
  });

  it("accepts beginner default profile", async () => {
    process.env.NEXT_PUBLIC_BACKEND_MODE = "external";
    process.env.NEXT_PUBLIC_AUTH_PROVIDER = "custom";
    process.env.NEXT_PUBLIC_API_MODE = "rest";
    process.env.NEXT_PUBLIC_DB_PROVIDER = "mongo";
    process.env.NEXT_PUBLIC_API_BASE_URL = "https://api.example.com";

    const { validateRuntimeConfig } = await import("@/lib/config/validate");
    expect(() => validateRuntimeConfig()).not.toThrow();
  });

  it("accepts external nextauth graphql profile", async () => {
    process.env.NEXT_PUBLIC_BACKEND_MODE = "external";
    process.env.NEXT_PUBLIC_AUTH_PROVIDER = "nextauth";
    process.env.NEXT_PUBLIC_API_MODE = "graphql";
    process.env.NEXT_PUBLIC_DB_PROVIDER = "postgres";
    process.env.NEXT_PUBLIC_API_BASE_URL = "https://api.example.com";

    const { validateRuntimeConfig } = await import("@/lib/config/validate");
    expect(() => validateRuntimeConfig()).not.toThrow();
  });

  it("accepts internal custom auth rest profile", async () => {
    process.env.NEXT_PUBLIC_BACKEND_MODE = "internal";
    process.env.NEXT_PUBLIC_AUTH_PROVIDER = "custom";
    process.env.NEXT_PUBLIC_API_MODE = "rest";
    process.env.NEXT_PUBLIC_DB_PROVIDER = "mongo";
    process.env.AUTH_SESSION_SECRET = "test-secret";
    process.env.ALLOW_DEMO_AUTH = "true";
    mutableEnv.NODE_ENV = "development";

    const { validateRuntimeConfig } = await import("@/lib/config/validate");
    expect(() => validateRuntimeConfig()).not.toThrow();
  });
});
