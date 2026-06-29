# INIT.05 — MVP CLI Operations

**PASS ID:** INIT.05
**Status:** CLOSED
**Track:** B — CLI wizard (primary); F — AUDIT module; G — STATUS module
**Wave:** 3 — depends on INIT.04
**Timestamp:** 2026-06-28T00:00:00Z
**Closed:** 2026-06-28T18:30:00Z
**Authority:** AL:1
**Author:** jj-ervin
**Note:** Spans B+F+G because all three CLI operations shipped in one wave. Per INIT-D17
  doctrine this would be sub-PASSes (INIT.05.01=B, INIT.05.02=F, INIT.05.03=G)
  if the operations had different dependencies or needed to ship independently.

---

## Goal

Three shippable CLI operations that make dxp-init useful with no GUI.
This is the minimum viable product.

## Scope

### `dxp-init install [--dry-run]`

Marlin wizard (named after Merlin the Wizard) collects principal identity,
project shape, and scaffold options via Clack interactive prompts. Calls
`provision()` from INIT.04. With `--dry-run`, prints what would be written
without touching the filesystem.

### `dxp-init audit validate`

TypeScript port of validate-planning.ps1. Scans for DEV-PATH.md, DEV-PLAN.md,
DEV-TRACKS.md, DEV-RELEASE.md. Checks DEV-ACCORD.00 rules:

- E1: H1 is first non-empty line
- E2: H1 doc type is registered and matches filename
- E3: H1 separator is em dash (U+2014)
- E4: H1 scope not empty after em dash
- E5: No collision (same H1 across same doc type)
- W1: AUTHORITY LEVEL in first 15 lines
- W2: Status in first 15 lines
- W3: TRACKS.md legacy name

Optionally writes evidence bundle to `--evidence <dir>`.

### `dxp-init status`

TypeScript port of dev-report.ps1. Scans for DEV-PLAN.md files, extracts
status/AL/phase/work-item counts/next-step/blockers. Renders portfolio gap
table + per-project detail. Optionally writes to `--out <file>` or emits
evidence bundle to `--evidence <dir>`.

## Files created

- `src/core/validator.ts` — port of validate-planning.ps1
- `src/core/reporter.ts` — port of dev-report.ps1
- `src/core/marlin.ts` — Clack wizard (Marlin)
- `src/cli/audit.ts` — wired `audit validate` action
- `src/cli/status.ts` — wired `status` action
- `src/cli/install.ts` — wired `install` action via Marlin
- `src/core/evidence.ts` — `writeBundle()` implemented

## Done when

All three commands produce useful output on a real repo.
`dxp-init audit validate` passes on the dxp-init repo itself (dogfood).
Evidence bundle is emitted and schema-validates for all three operations.

**Verification:** `npx tsc --noEmit` passes with zero errors.

## Depends on

INIT.04 (core library).

## Next

INIT.06 (evidence bundle signing), INIT.07 (compliance presets).
