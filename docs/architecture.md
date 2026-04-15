# Architecture

## Principle

Simple by default, powerful when needed.

## Core Boundaries

- `src/app/api/*`: internal route handlers only (auth/webhooks/platform concerns)
- `src/services/rest/*`: REST transport client implementation
- `src/services/graphql/*`: GraphQL transport client implementation
- `src/modules/*`: feature/domain orchestration
- `src/lib/*`: platform internals (config, auth, security, observability)

This starter is external-backend-first. Internal `src/app/api/v1/auth/*` routes are intentionally scoped to:

- internal auth flows
- local fallback mode
- demo/testing scenarios

## Data Flow

`Page -> Module -> Service -> API -> Backend`

UI does not call transport clients directly.

## Profile System

Runtime profiles are environment-driven:

- `starter`
- `saas`
- `enterprise`

Switch with:

```bash
pnpm use:profile <starter|saas|enterprise>
```

## Auth Strategy

- Default: custom auth provider
- Optional: NextAuth provider
- Provider abstraction: `src/lib/auth/providers/auth.provider.ts`

## Security & Guardrails

- Runtime config validation fails fast for unsupported combinations.
- Rate-limit, origin checks, secure cookies, and auth session guards are enforced in auth routes.
- Demo auth is available only when `ALLOW_DEMO_AUTH=true`.

## Observability

- Structured logs: `src/lib/observability/logger.ts`
- Request tracing: `src/lib/observability/tracing.ts`
- Performance metrics helper: `src/lib/observability/performance.ts`

## Provider Composition

- Global providers are composed once in `src/providers/index.tsx`.
- Root layout uses only `AppProviders` as the single entry wrapper.
