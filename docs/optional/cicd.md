# Optional: CI/CD Setup

## Default (Beginner-Friendly)

Keep only these workflows in `.github/workflows/`:

- `ci.yml`
- `codeql.yml`
- `dependency-review.yml`

## Scripted Setup

1. Minimal setup:

```bash
pnpm setup:ci
```

2. Advanced setup:

```bash
pnpm setup:ci -- --advanced
```

3. Selected templates only:

```bash
pnpm setup:ci -- --base-files=ci.yml,codeql.yml
pnpm setup:ci -- --advanced --advanced-files=release-please.yml,pr-title.yml
```

## Manual Setup

- Base templates: `docs/optional/workflows/base/`
- Advanced templates: `docs/optional/workflows/advanced/`

Copy selected files into `.github/workflows/`.
