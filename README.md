# Next.js Starter Boilerplate

Production-ready Next.js App Router boilerplate for SaaS dashboards and product frontends.

Core principle: **Simple by default, powerful when needed**.

## 5-Minute Quick Start

```bash
nvm use
pnpm install --frozen-lockfile
pnpm bootstrap
pnpm dev
```

Demo login (starter profile):

- `admin@example.com`
- `secret123`

Note: `pnpm setup` is a pnpm built-in command; use `pnpm bootstrap` or `pnpm run setup` for project setup.

## What Happens After Clone

1. `pnpm bootstrap` (or `pnpm run setup`) applies the `starter` profile and prepares demo artifacts.
2. You start with Mongo + REST + custom auth + demo data for instant exploration.
3. You can switch to `saas` or `enterprise` profile at any time.
4. Advanced tooling remains opt-in.

## Default Platform Boundaries

- External backend is the default integration target.
- `src/app/api/v1/auth/*` exists for internal auth mode, fallback, and demo/testing.
- `src/services/*` is a frontend transport layer (REST/GraphQL client communication), not backend business logic.

## Profile System

Use predefined profiles:

```bash
pnpm use:profile starter
pnpm use:profile saas
pnpm use:profile enterprise
```

Profiles:

- `starter`: internal auth mode + demo data for fast local onboarding
- `saas`: external REST backend + custom auth
- `enterprise`: external GraphQL + NextAuth + PostgreSQL profile

## Setup Commands

```bash
pnpm bootstrap
pnpm run setup
pnpm setup:ci
pnpm setup:ci -- --advanced
pnpm setup:postgres
pnpm setup:graphql
pnpm seed:demo
pnpm test:smoke
```

## CI/CD Strategy

- Default: minimal CI (`ci.yml`, `codeql.yml`, `dependency-review.yml`) for onboarding speed.
- Optional: advanced templates in `docs/optional/workflows/advanced/`.
- Enable with `pnpm setup:ci -- --advanced` or select specific templates.

## Documentation

- `docs/how-to-use.md`
- `docs/profiles.md`
- `docs/architecture.md`
- `docs/folder-structure.md`
- `docs/auth-flow.md`
- `docs/config-combinations.md`
- `docs/request-lifecycle.md`
- `docs/optional/README.md`
- `docs/adr/0001-simple-by-default.md`
- `docs/migrations/package-manager.md`
- `docs/guides/README.md`
