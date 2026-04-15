# GitHub Setup Checklist

## Default (Beginner-Friendly)

Required checks recommended for `main`:

- `CI / Quality (lint)`
- `CI / Quality (typecheck)`
- `CI / Quality (test)`
- `CI / Build`
- `Dependency Review / dependency-review`
- `CodeQL / Analyze (JavaScript/TypeScript)`

## Optional (Advanced Automation)

Advanced workflows are template-based and optional.

Use:

```bash
pnpm setup:ci -- --advanced
```

Or manually copy from:

- `docs/optional/workflows/advanced/`

## Baseline Alignment

- `.nvmrc` matches CI Node baseline
- `packageManager` uses pnpm
- `pnpm-lock.yaml` is committed and current
