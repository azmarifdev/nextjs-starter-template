# Architecture

## Principle

Simple by default, powerful when needed.

## Boundaries

- `src/app/api/*`: internal route handlers only (auth and webhook-style endpoints)
- `src/services/rest/*`: REST transport client implementation
- `src/services/graphql/*`: GraphQL transport client implementation
- `src/modules/*`: domain features and orchestration
- `src/lib/auth/*`: auth internals (providers/session/repository/policy)

## Data Flow

`Page -> Module -> Service -> API -> Backend`

UI does not call transport clients directly.

## Auth Strategy

- Default: custom auth provider
- Optional: NextAuth provider
- Runtime provider switch uses `src/lib/auth/providers/auth.provider.ts`

## API Strategy

- Default mode is external backend.
- Internal handlers are intentionally limited to auth flows.
- REST/GraphQL selection is done by `NEXT_PUBLIC_API_MODE`.

## Runtime Guardrails

Unsupported combinations fail fast in runtime config validation.

See `docs/config-combinations.md`.
