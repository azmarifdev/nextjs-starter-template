# How To Use

## Fast Start (Recommended)

```bash
nvm use
pnpm install --frozen-lockfile
pnpm bootstrap
pnpm dev
```

Starter demo login:

- `admin@example.com`
- `secret123`

## Profiles

Switch platform profile at any time:

```bash
pnpm use:profile starter
pnpm use:profile saas
pnpm use:profile enterprise
```

Profile behavior:

- `starter`: local-ready demo mode (internal auth + demo data)
- `saas`: external backend + REST + custom auth
- `enterprise`: external backend + GraphQL + NextAuth + PostgreSQL

## Feature Enable Flow

1. Pick a profile.
2. Enable optional features as needed.
3. Run smoke checks.
4. Commit only required changes.

## Optional Feature Commands

```bash
pnpm setup:postgres
pnpm setup:graphql
pnpm setup:ci
pnpm setup:ci -- --advanced
```

Selected CI templates only:

```bash
pnpm setup:ci -- --base-files=ci.yml,codeql.yml
pnpm setup:ci -- --advanced --advanced-files=release-please.yml,pr-title.yml
```

## Validation Commands

```bash
pnpm test:smoke
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```
