# INIT.02 — Schema Pair: gc-principal + gc-evidence-bundle

**PASS ID:** INIT.02
**Status:** CLOSED
**Timestamp:** 2026-06-28T00:00:00Z
**Authority:** AL:1
**Author:** jj-ervin
**Wave:** 1 — no dependencies

---

## Goal

Define the two foundational schemas before any implementation builds on them.
These schemas are the contract that all governance files and evidence bundles
must satisfy.

## Scope

- `schemas/gc-principal.schema.json` — canonical identity record; authority anchor
- `schemas/gc-evidence-bundle.schema.json` — signed audit evidence bundle;
  aligned to GEE envelope, time.loc v1.2, and SLSA provenance structure

## Claude responsibility (Wave 1 stub)

Write structurally correct JSON Schema drafts with all fields, types, and
descriptions. Include `signing` block (Ed25519 Phase 1, DID/VC Phase 2 note),
`installer_expiry` pattern, GEE envelope reference, time.loc field.

## ChatGPT responsibility (refinement)

- Align `gc-evidence-bundle` signature block to current SLSA v1.0 provenance spec
- Validate `gc-principal` entity/jurisdiction fields against W3C DID core spec for
  smooth Phase 2 upgrade path
- Recommend CycloneDX vs SPDX for SBOM reference in the evidence bundle
- Confirm EU AI Act article numbers that map to evidence bundle fields

## Done when

Both schemas validate against JSON Schema draft 2020-12.
A sample `gc-principal.yaml` passes schema validation.
A sample evidence bundle JSON passes schema validation.

## Depends on

INIT.00 (charter).

## Next

INIT.03 (template library) uses `gc-principal.schema.json` to generate sample records.
INIT.04 (core library) uses both schemas for validation.
