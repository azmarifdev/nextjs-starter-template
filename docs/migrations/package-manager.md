# Package Manager Policy and Migration Guide

## Default Policy

This template is pnpm-first.

- `packageManager` is set to pnpm in `package.json`.
- `pnpm-lock.yaml` is the canonical lockfile.
- Default CI uses pnpm.

## Why This Policy

Using one default manager reduces onboarding friction and lockfile drift.

## Migration Paths (Optional)

If your team requires a different manager, migrate in a dedicated PR.

### Target: npm

1. Update `packageManager` in `package.json`.
2. Generate `package-lock.json`.
3. Update CI install/build commands.
4. Update docs and onboarding commands.

### Target: yarn

1. Update `packageManager` in `package.json`.
2. Generate `yarn.lock`.
3. Update CI install/build commands.
4. Update docs and onboarding commands.

## Safety Checklist

- Keep lockfile + workflow + docs updates in one PR.
- Verify clean install and build in CI.
- Align `.nvmrc`, `engines.node`, and CI Node version.
