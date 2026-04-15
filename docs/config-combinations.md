# Supported Configuration Combinations

The runtime rejects unsupported combinations with:

`Unsupported configuration`

| Profile      | backendMode | authProvider | apiMode   | dbProvider | demoData |
| ------------ | ----------- | ------------ | --------- | ---------- | -------- |
| `starter`    | `internal`  | `custom`     | `rest`    | `mongo`    | `true`   |
| `saas`       | `external`  | `custom`     | `rest`    | `mongo`    | `false`  |
| `enterprise` | `external`  | `nextauth`   | `graphql` | `postgres` | `false`  |

Additional supported permutations are still validated by runtime rules in `src/lib/config/supported-combinations.ts`.

Notes:

- Internal custom auth is REST-only.
- External mode requires `NEXT_PUBLIC_API_BASE_URL`.
- MongoDB is default; PostgreSQL/Drizzle is optional and opt-in.
