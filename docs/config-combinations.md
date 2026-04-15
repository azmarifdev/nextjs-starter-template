# Supported Configuration Combinations

The runtime rejects unsupported combinations with:

`Unsupported configuration`

| Profile          | backendMode | authProvider | apiMode             | dbProvider            |
| ---------------- | ----------- | ------------ | ------------------- | --------------------- |
| Beginner default | `external`  | `custom`     | `rest` or `graphql` | `mongo` or `postgres` |
| Intermediate     | `external`  | `nextauth`   | `rest` or `graphql` | `mongo` or `postgres` |
| Advanced         | `internal`  | `custom`     | `rest`              | `mongo` or `postgres` |
| Advanced         | `internal`  | `nextauth`   | `rest` or `graphql` | `mongo` or `postgres` |

Notes:

- Internal custom auth is REST-only.
- External mode requires `NEXT_PUBLIC_API_BASE_URL`.
