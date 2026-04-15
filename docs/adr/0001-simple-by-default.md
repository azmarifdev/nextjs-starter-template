# ADR 0001: Simple By Default, Powerful When Needed

## Status

Accepted

## Context

The template offered many capabilities but overloaded onboarding and decision-making for new users.

## Decision

- Keep a minimal default profile for quick startup.
- Move advanced automation/workflows into optional templates.
- Provide setup scripts for opt-in features.
- Enforce supported runtime combinations with fail-fast validation.

## Consequences

Positive:

- Faster onboarding and clearer defaults.
- Fewer accidental misconfigurations.
- Advanced teams still keep full control.

Tradeoff:

- Users who want everything enabled must run setup scripts or manually copy optional templates.
