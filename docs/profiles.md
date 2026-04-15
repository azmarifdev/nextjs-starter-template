# Profiles

Profiles provide opinionated environment presets for common delivery stages.

## Commands

```bash
pnpm use:profile starter
pnpm use:profile saas
pnpm use:profile enterprise
```

## starter

- Internal custom auth
- REST mode
- Mongo profile
- Demo data enabled
- Best for immediate local onboarding and demos

## saas

- External backend mode
- REST mode
- Mongo profile
- Demo data disabled
- Best for typical SaaS API integration

## enterprise

- External backend mode
- GraphQL mode
- PostgreSQL profile
- NextAuth enabled
- Best for enterprise-grade stack defaults
