# Next.js Starter Boilerplate

Production-ready Next.js App Router boilerplate for SaaS dashboards and product frontends.

Core principle: **Simple by default, powerful when needed**.

## 5-Minute Quick Start

```bash
nvm use
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

Default profile:

- `NEXT_PUBLIC_BACKEND_MODE=external`
- `NEXT_PUBLIC_API_MODE=rest`
- `NEXT_PUBLIC_DB_PROVIDER=mongo`
- `NEXT_PUBLIC_AUTH_PROVIDER=custom`

## Optional Setup Scripts

```bash
pnpm setup:ci
pnpm setup:ci -- --advanced
pnpm setup:postgres
pnpm setup:graphql
```

## Architecture Rules

- `src/modules/*`: business features
- `src/components/*`: reusable UI
- `src/services/rest/*`: REST transport
- `src/services/graphql/*`: GraphQL transport
- `src/app/api/*`: internal handlers only (auth/webhooks)
- `src/lib/*`: platform internals

Data flow:

`Page -> Module -> Service -> API -> Backend`

## Profiles

- Beginner: minimal setup, custom auth, REST, Mongo defaults, minimal CI
- Intermediate: enable optional features with setup scripts
- Advanced: full customization with optional workflows and provider switches

## Documentation

- `docs/how-to-use.md`
- `docs/architecture.md`
- `docs/folder-structure.md`
- `docs/auth-flow.md`
- `docs/config-combinations.md`
- `docs/request-lifecycle.md`
- `docs/optional/README.md`
- `docs/adr/0001-simple-by-default.md`
- `docs/migrations/package-manager.md`
- `docs/guides/README.md`
