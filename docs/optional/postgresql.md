# Optional: PostgreSQL Setup

Default database profile is MongoDB.
Use this guide only when your team decides to run PostgreSQL + Drizzle.

## Scripted Setup

```bash
pnpm setup:postgres
```

This script:

- updates `.env.local`
- sets `NEXT_PUBLIC_DB_PROVIDER=postgres`
- adds a `DATABASE_URL` placeholder
- copies `.env.optional.postgres.example`

Drizzle notes:

- Drizzle config/migrations are included in-repo as optional assets.
- Keeping them in the repository avoids re-scaffolding when teams opt into PostgreSQL later.

## Manual Setup

1. Configure:

```env
NEXT_PUBLIC_DB_PROVIDER=postgres
DATABASE_URL=postgres://postgres:postgres@localhost:5432/nextjs_starter_template
```

2. Run migrations:

```bash
pnpm db:migrate
```
