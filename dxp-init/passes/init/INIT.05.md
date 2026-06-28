# INIT.05 — MVP CLI Operations

**PASS ID:** INIT.05
**Status:** PLANNED
**Timestamp:** 2026-06-28T00:00:00Z
**Authority:** AL:1
**Author:** jj-ervin
**Wave:** 3 — depends on INIT.04

---

## Goal

Three shippable CLI operations that make dxp-init useful with no GUI.
This is the minimum viable product.

## Scope

### `dxp-init install --dry-run`

Full wizard (Clack prompts) → renders all templates → prints what would be
written, with a diff view. Does not touch the filesystem. Emits a dry-run
evidence bundle.

### `dxp-init audit validate`

Ports validate-planning.ps1 logic to TypeScript. Scans target directory for
DEV-PATH.md, DEV-PLAN.md, DEV-TRACKS.md, DEV-RELEASE.md. Checks DEV-ACCORD.00
rules (H1 format, AUTHORITY LEVEL, Status header). Emits a signed evidence bundle.

### `dxp-init status`

Ports dev-report.ps1 logic to TypeScript. Reads projects.yaml (if present) or
scans for planning docs. Renders the portfolio health table (gap analysis +
per-project detail). Outputs to terminal or `--out report.md`.

## Done when

All three commands produce useful output on a real repo.
`dxp-init audit validate` passes on the dxp-init repo itself (dogfood).
Evidence bundle is emitted and schema-validates for all three operations.

## Depends on

INIT.04 (core library).

## Next

INIT.06 (evidence bundle signing), INIT.07 (compliance presets).
