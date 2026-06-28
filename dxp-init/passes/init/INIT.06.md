# INIT.06 — Signed Evidence Bundle

**PASS ID:** INIT.06
**Status:** PLANNED
**Timestamp:** 2026-06-28T00:00:00Z
**Authority:** AL:1
**Author:** jj-ervin
**Wave:** 4 — depends on INIT.05

---

## Goal

Every audit run produces a signed, machine-readable evidence bundle that external
auditors and automated compliance platforms can trust without accessing the repo.

## Scope

- Ed25519 key pair generation on first run (stored in user config, not repo)
- `sign(bundle, privateKey)` → JWS compact serialization over bundle JSON
- `verify(bundle, publicKey)` → confirms integrity and signer identity
- `--evidence out/` flag on all audit commands
- Evidence bundle includes: validator version, input files, findings, principal,
  time.loc timestamp, optional GEE envelope
- Public key embedded in `gc-principal.yaml` for independent verification

## Stranger test

A third party with only the evidence bundle file and the public key from
gc-principal.yaml can verify: who ran it, what version, what was found, when.
No repo access required.

## Depends on

INIT.05 (MVP operations), INIT.02 (schemas).

## Next

INIT.07 (compliance preset profiles) builds on the evidence bundle format.
