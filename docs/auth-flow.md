# Auth Flow

## Default (Custom Auth)

1. User submits auth form.
2. `modules/auth` calls `authService`.
3. `authService` resolves provider from `lib/auth/providers/auth.provider.ts`.
4. `custom-auth.provider.ts` uses API transport to call auth endpoints.
5. Session is validated through `lib/auth/session/*`.

## Optional (NextAuth)

1. Set `NEXT_PUBLIC_AUTH_PROVIDER=nextauth`.
2. Auth requests route through `src/app/api/auth/[...nextauth]/route.ts`.
3. NextAuth server config is in `src/lib/auth/providers/nextauth.ts`.

## Demo Auth Security Rule

Demo fallback is only allowed when:

```env
ALLOW_DEMO_AUTH=true
```

Otherwise authentication fallback is denied.
