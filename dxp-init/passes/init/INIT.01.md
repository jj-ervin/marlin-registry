# INIT.01 — TypeScript Project Scaffold

**PASS ID:** INIT.01
**Status:** CLOSED
**Track:** A — Core provisioning library
**Wave:** 1 — no dependencies
**Timestamp:** 2026-06-28T00:00:00Z
**Authority:** AL:1
**Author:** jj-ervin

---

## Goal

Stand up the TypeScript project with full CLI routing. No business logic yet —
just the skeleton that all later PASSes build into.

## Scope

- `package.json` — dependencies, bin entry, scripts
- `tsconfig.json` — ESM, strict, Node 22 target
- `src/index.ts` — CLI entry point, Commander routing, mode auto-detection stub
- `src/cli/install.ts` — install command stub
- `src/cli/audit.ts` — audit command with all 10 subcommands stubbed
- `src/cli/status.ts` — status command stub
- `src/core/provisioner.ts` — core provisioning library interface (types only)
- `src/core/principal.ts` — gc-principal loading / validation interface
- `src/core/evidence.ts` — evidence bundle interface

## Done when

`npx tsx src/index.ts --help` prints the full command tree.
`npx tsx src/index.ts audit validate` prints "not yet implemented."
`npx tsx src/index.ts status` prints "not yet implemented."

## Depends on

INIT.00 (charter).

## Next

INIT.02 (schemas) can run in parallel.
INIT.03 (template library) and INIT.04 (core library) unblock after this and INIT.02.
