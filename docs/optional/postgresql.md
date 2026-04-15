# Optional: PostgreSQL Setup

## Scripted Setup

```bash
pnpm setup:postgres
```

This script:

- updates `.env.local`
- sets `NEXT_PUBLIC_DB_PROVIDER=postgres`
- adds a `DATABASE_URL` placeholder
- copies `.env.optional.postgres.example`

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
