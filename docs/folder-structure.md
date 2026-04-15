# Folder Structure

```txt
src/
  app/
    (auth)/
    (dashboard)/
    api/
      auth/
      v1/
        auth/
  components/
    common/
    layout/
    ui/
  hooks/
  i18n/
  lib/
    auth/
      providers/
      session/
      repository/
      policy/
    config/
    db/
      providers/
    errors/
    observability/
    security/
    utils/
  modules/
    auth/
      components/
      hooks/
      services/
      auth.types.ts
      auth.validation.ts
    user/
    project/
    task/
    ecommerce/
    billing/
  providers/
    index.tsx
    *.provider.tsx
  services/
    apiClient.ts
    rest/
    graphql/
  store/
  styles/
  tests/
```

## Conventions

- `*.service.ts` for services
- `*.hook.ts` for hooks
- `*.validation.ts` for schemas
- `*.types.ts` for types
- `*.provider.tsx` for react providers

## Boundary Summary

- `modules` call `services`
- `services` call transport clients
- `components` stay feature-agnostic
- `app/api` stays internal-only for auth/webhook concerns
- `lib` contains platform internals
