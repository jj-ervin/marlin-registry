# Agent Instructions

## What this project is

`dxp-org` is a local multi-repo workspace for Developer Experience Platform development.

## What agents are allowed to do

- Read and update `DEV-PLAN.md` and `DEV-PATH.md`.
- Read and update `.governance/` files.
- Inspect nested repos to determine status, planning coverage, and governance coverage.
- Update `devx-control-plane/projects.yaml` when portfolio registry state changes.
- Run DCP validation and dashboard scripts.
- Suggest repo disposition changes when names, status, or ownership are ambiguous.

## What agents are NOT allowed to do

- Treat `dxp-org` as a monorepo implementation surface.
- Move or delete nested repos without explicit user instruction.
- Recreate or reactivate legacy `devtoolkit`.
- Push commits to remotes without explicit instruction.
- Add portable standards directly here when they belong in Governance Commons.

## How agents should work

- Read `DEV-PLAN.md`, `DEV-PATH.md`, and `.governance/context.md` before portfolio-level work.
- Prefer small, scoped changes in the specific repo that owns the behavior.
- Keep `.governance` lightweight: context, agent rules, and log only unless a standard requires more.
- After meaningful workspace governance changes, update `.governance/log.md`.
- Use DCP validation after changing planning or governance pointers.

## Current focus

Governance rollout: make `.governance` visible to DCP and validate governance files alongside `DEV-PLAN.md` and `DEV-PATH.md`.

