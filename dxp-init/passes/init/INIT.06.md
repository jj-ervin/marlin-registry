# INIT.06 — Signed Evidence Bundle

**PASS ID:** INIT.06
**Status:** CLOSED
**Timestamp:** 2026-06-28T00:00:00Z
**Closed:** 2026-06-29T02:30:00Z
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

## Done when

- `signBundle()` implemented and produces a valid JWS compact serialization
- `verifyBundle()` confirms integrity and signer identity from public key alone
- `dxp-init audit validate --evidence out/` emits a signed bundle on the dxp-init
  repo itself and the bundle passes `verifyBundle()` — **self-validation gate**
- The signed bundle schema-validates against `gc-evidence-bundle.schema.json`
- A stranger (third party with only the bundle + public key) can verify without
  repo access (see Stranger test below)

**Standing Wave 4 acceptance criterion:** any PASS in Wave 4 or later that
produces audit output must pass `dxp-init audit validate` on its own source
before the PASS can be closed. A governance tool must pass its own checks on
its own source before shipping.

## Stranger test

A third party with only the evidence bundle file and the public key from
gc-principal.yaml can verify: who ran it, what version, what was found, when.
No repo access required.

## Depends on

INIT.05 (MVP operations), INIT.02 (schemas).

## Next

INIT.07 (compliance preset profiles) builds on the evidence bundle format.
