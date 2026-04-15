# Optional Features

Use optional features when you need more than the default beginner profile.

## 1) PostgreSQL

Run:

```bash
pnpm setup:postgres
```

Manual path:

- Read `docs/optional/postgresql.md`
- Copy template values from `docs/optional/templates/postgres.env.example`

## 2) GraphQL

Run:

```bash
pnpm setup:graphql
```

Manual path:

- Read `docs/optional/graphql.md`
- Copy template values from `docs/optional/templates/graphql.env.example`
- Example query: `docs/optional/templates/graphql-query.example.ts`

## 3) CI/CD

Run minimal workflow setup:

```bash
pnpm setup:ci
```

Enable advanced automation:

```bash
pnpm setup:ci -- --advanced
```

Copy selected workflow templates only:

```bash
pnpm setup:ci -- --base-files=ci.yml,codeql.yml
pnpm setup:ci -- --advanced --advanced-files=release-please.yml,pr-title.yml
```

Manual path:

- Copy files from `docs/optional/workflows/base/` and `docs/optional/workflows/advanced/` to `.github/workflows/`
- Read `docs/optional/cicd.md`
