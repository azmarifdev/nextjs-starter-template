# Optional: GraphQL Setup

## Scripted Setup

```bash
pnpm setup:graphql
```

This script:

- updates `.env.local`
- sets `NEXT_PUBLIC_API_MODE=graphql`
- keeps `NEXT_PUBLIC_BACKEND_MODE=external`
- copies `.env.optional.graphql.example`
- copies example query to `src/services/graphql/examples/query.example.ts`

## Manual Setup

1. Configure:

```env
NEXT_PUBLIC_API_MODE=graphql
NEXT_PUBLIC_BACKEND_MODE=external
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

2. Use `services/graphql/client.ts` for custom requests.
