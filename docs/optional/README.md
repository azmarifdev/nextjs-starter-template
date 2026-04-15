# Optional Features

Use optional features when you need more than the default starter experience.

Defaults:

- MongoDB is the default data profile.
- External backend is the default integration model.
- Minimal CI is the default pipeline model.

## PostgreSQL (Drizzle)

```bash
pnpm setup:postgres
```

- Updates `.env.local`
- Enables postgres profile keys
- Copies template examples

Guide: `docs/optional/postgresql.md`

## GraphQL

```bash
pnpm setup:graphql
```

- Updates `.env.local`
- Enables GraphQL client mode
- Copies GraphQL template and example query

Guide: `docs/optional/graphql.md`

## CI/CD

```bash
pnpm setup:ci
pnpm setup:ci -- --advanced
```

Selected templates:

```bash
pnpm setup:ci -- --base-files=ci.yml,codeql.yml
pnpm setup:ci -- --advanced --advanced-files=release-please.yml,pr-title.yml
```

Guide: `docs/optional/cicd.md`
