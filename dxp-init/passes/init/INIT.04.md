# INIT.04 — Core Provisioning Library

**PASS ID:** INIT.04
**Status:** CLOSED
**Timestamp:** 2026-06-28T00:00:00Z
**Authority:** AL:1
**Author:** jj-ervin
**Wave:** 2 — depends on INIT.01 + INIT.02 + INIT.03

---

## Goal

The TypeScript library that accepts a `WizardAnswers` object, renders templates,
validates output, and writes files. This is the product. CLI and GUI are shells.

## Scope

- `src/core/provisioner.ts` — `provision(answers, opts)` → writes governance files
- `src/core/principal.ts` — collect, validate, sign gc-principal record
- `src/core/evidence.ts` — build and sign evidence bundle after any operation
- `src/core/detector.ts` — mode detection (new vs existing repo)
- `src/core/validator.ts` — run DEV-ACCORD conformance check on emitted files
- `src/templates/index.ts` — template registry and renderer

## Zero Trust requirements (INIT-D11)

- Principal must be loaded and validated before any write operation
- Every write is logged to the evidence bundle
- Dry-run mode is not a flag shortcut — it is a separate code path that never
  touches the filesystem
- Installer role expiry checked on every run; blocks if expired without re-auth

## Done when

`provision({ mode: 'install', answers, principal })` emits all files to a temp
directory and returns an evidence bundle. Dry-run returns the same bundle with
no files written.

## Depends on

INIT.01, INIT.02, INIT.03.

## Next

INIT.05 (MVP operations) wires the CLI commands to this library.
