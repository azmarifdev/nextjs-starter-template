import type { ApiMode, AuthProvider, BackendMode, DbProvider } from "@/lib/config/app-config";

export interface RuntimeCombination {
  backendMode: BackendMode;
  authProvider: AuthProvider;
  apiMode: ApiMode;
  dbProvider: DbProvider;
}

interface CombinationRule {
  id: string;
  profile: "beginner" | "intermediate" | "advanced";
  description: string;
  backendMode: BackendMode;
  authProvider: AuthProvider;
  apiModes: ApiMode[];
  dbProviders: DbProvider[];
}

export const supportedCombinationRules: CombinationRule[] = [
  {
    id: "beginner-default",
    profile: "beginner",
    description:
      "External backend with custom auth and REST transport. MongoDB is the default persistence option.",
    backendMode: "external",
    authProvider: "custom",
    apiModes: ["rest", "graphql"],
    dbProviders: ["mongo", "postgres"]
  },
  {
    id: "intermediate-nextauth",
    profile: "intermediate",
    description: "External backend with NextAuth for identity providers.",
    backendMode: "external",
    authProvider: "nextauth",
    apiModes: ["rest", "graphql"],
    dbProviders: ["mongo", "postgres"]
  },
  {
    id: "advanced-internal-custom-auth",
    profile: "advanced",
    description:
      "Internal auth route handlers with custom auth. REST-only because internal GraphQL routes are not provided.",
    backendMode: "internal",
    authProvider: "custom",
    apiModes: ["rest"],
    dbProviders: ["mongo", "postgres"]
  },
  {
    id: "advanced-internal-nextauth",
    profile: "advanced",
    description: "Internal auth route handlers with NextAuth for credential/OAuth-based sign-in.",
    backendMode: "internal",
    authProvider: "nextauth",
    apiModes: ["rest", "graphql"],
    dbProviders: ["mongo", "postgres"]
  }
];

export function findSupportedCombination(input: RuntimeCombination): CombinationRule | null {
  return (
    supportedCombinationRules.find(
      (rule) =>
        rule.backendMode === input.backendMode &&
        rule.authProvider === input.authProvider &&
        rule.apiModes.includes(input.apiMode) &&
        rule.dbProviders.includes(input.dbProvider)
    ) ?? null
  );
}
