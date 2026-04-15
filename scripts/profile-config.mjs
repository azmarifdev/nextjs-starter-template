import { ensureEnvLocal, setEnvValue } from "./setup-shared.mjs";

export const profileConfig = {
  starter: {
    NEXT_PUBLIC_PROFILE: "starter",
    NEXT_PUBLIC_BACKEND_MODE: "internal",
    NEXT_PUBLIC_API_MODE: "rest",
    NEXT_PUBLIC_DB_PROVIDER: "mongo",
    NEXT_PUBLIC_AUTH_PROVIDER: "custom",
    NEXT_PUBLIC_DEMO_DATA: "true",
    NEXT_PUBLIC_FEATURE_ECOMMERCE: "true",
    NEXT_PUBLIC_FEATURE_BILLING: "true",
    NEXT_PUBLIC_FEATURE_ADMIN: "true",
    ALLOW_DEMO_AUTH: "true",
    ALLOW_INSECURE_DEV_AUTH: "true",
    AUTH_SESSION_SECRET: "starter-local-secret",
    NEXT_PUBLIC_API_BASE_URL: ""
  },
  saas: {
    NEXT_PUBLIC_PROFILE: "saas",
    NEXT_PUBLIC_BACKEND_MODE: "external",
    NEXT_PUBLIC_API_MODE: "rest",
    NEXT_PUBLIC_DB_PROVIDER: "mongo",
    NEXT_PUBLIC_AUTH_PROVIDER: "custom",
    NEXT_PUBLIC_DEMO_DATA: "false",
    NEXT_PUBLIC_FEATURE_ECOMMERCE: "true",
    NEXT_PUBLIC_FEATURE_BILLING: "true",
    NEXT_PUBLIC_FEATURE_ADMIN: "true",
    ALLOW_DEMO_AUTH: "false",
    ALLOW_INSECURE_DEV_AUTH: "false",
    NEXT_PUBLIC_API_BASE_URL: "http://localhost:4000"
  },
  enterprise: {
    NEXT_PUBLIC_PROFILE: "enterprise",
    NEXT_PUBLIC_BACKEND_MODE: "external",
    NEXT_PUBLIC_API_MODE: "graphql",
    NEXT_PUBLIC_DB_PROVIDER: "postgres",
    NEXT_PUBLIC_AUTH_PROVIDER: "nextauth",
    NEXT_PUBLIC_DEMO_DATA: "false",
    NEXT_PUBLIC_FEATURE_ECOMMERCE: "true",
    NEXT_PUBLIC_FEATURE_BILLING: "true",
    NEXT_PUBLIC_FEATURE_ADMIN: "true",
    ALLOW_DEMO_AUTH: "false",
    ALLOW_INSECURE_DEV_AUTH: "false",
    NEXT_PUBLIC_API_BASE_URL: "http://localhost:4000"
  }
};

export async function applyProfile(rootDir, profileName) {
  const selected = profileConfig[profileName];
  if (!selected) {
    throw new Error(`Unknown profile: ${profileName}. Expected one of starter, saas, enterprise.`);
  }

  const envLocalPath = await ensureEnvLocal(rootDir);
  for (const [key, value] of Object.entries(selected)) {
    await setEnvValue(envLocalPath, key, value);
  }

  return {
    profileName,
    envLocalPath,
    keys: Object.keys(selected)
  };
}
