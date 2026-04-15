# How To Use

## Beginner (Default)

1. Install and run:

```bash
nvm use
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

2. Keep these defaults:

```env
NEXT_PUBLIC_BACKEND_MODE=external
NEXT_PUBLIC_API_MODE=rest
NEXT_PUBLIC_DB_PROVIDER=mongo
NEXT_PUBLIC_AUTH_PROVIDER=custom
ALLOW_DEMO_AUTH=false
```

3. Run checks:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Intermediate

Enable one optional feature at a time:

```bash
pnpm setup:postgres
pnpm setup:graphql
pnpm setup:ci
```

## Advanced

Enable advanced CI/CD templates:

```bash
pnpm setup:ci -- --advanced
```

Or choose specific workflow templates only:

```bash
pnpm setup:ci -- --base-files=ci.yml,codeql.yml
pnpm setup:ci -- --advanced --advanced-files=release-please.yml,pr-title.yml
```

Then customize profiles and automation documented in `docs/optional/README.md`.
