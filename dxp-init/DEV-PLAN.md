# DEV-PLAN — Marlin-DXP

**AUTHORITY LEVEL: AL:1**
**Status:** ARCHIVED — redirect-only legacy planning surface
**Updated:** 2026-07-01

---

## Purpose

> Active Marlin-DXP planning has moved to `../marlin/DEV-PLAN.md`.
> This file preserves Waves 0-4 history only; do not start new feature work here.

**Marlin-DXP** is the **five-minute governance adoption kit**.

```text
Install governance → Audit the repo → Emit evidence → Show status
```

A developer runs `marlin install`, answers the wizard, and gets a fully conformant
governance scaffold in under 5 minutes. Then it stays: the same tool audits the
repo, normalizes drift, emits signed machine-readable evidence bundles, and reports
portfolio health — for the entire life of the project.

**Honest claim:** Marlin-DXP makes a project audit-ready, evidence-ready, and
control-mapped. It does not make a project compliant. Compliance depends on
operations, controls, legal scope, and sometimes external audit. Marlin-DXP
produces the evidence that an auditor or automated compliance platform can trust.

---

## Current Phase

Phase 1 — Waves 1–4 complete. Archived; active Marlin work has moved to `../marlin/`.

**Wave 0 (CLOSED):** Charter, TypeScript scaffold, project registered
**Wave 1 (CLOSED):** Schema pair (gc-principal + gc-conformance + gc-evidence-bundle)
**Wave 2 (CLOSED):** Template library (7 templates), core provisioner, buildBundle()
**Wave 3 (CLOSED):** MVP CLI — `audit validate`, `status`, `install` (Marlin wizard)
**Wave 4 (CLOSED):** Ed25519 signed evidence bundles — signBundle(), verifyBundle(), keystore, `audit verify-bundle`
**Wave 5+:** Canonical planning lives in `../marlin/DEV-PLAN.md`. Do not start new feature work in this repo.

---

## Tracks

| Track | Name | Goal | Status |
| --- | --- | --- | --- |
| A | Core provisioning library | TypeScript library — wizard answers → governance files | shipped (Wave 2) |
| B | CLI wizard | `marlin` / `marlin-dxp` commands with Clack interactive prompts | shipped (Wave 3) |
| C | Cockpit governance panel | Marlin install/audit/status surfaces hosted in Cockpit; Cockpit calls Marlin-DXP core as a module; no standalone Marlin GUI | planned |
| D | Template library | All governance file templates with variable substitution | shipped (Wave 2) |
| E | Cockpit integration | Marlin-DXP core as a Cockpit first-run module | planned |
| F | AUDIT module | Full review grammar suite — validate shipped; normalize/verify/trace/adversarial/meta/authority/registry/close/destale pending | partial (Wave 3) |
| G | STATUS module | Portfolio health report — gap table, per-project detail, blocked items | shipped (Wave 3) |
| H | Evidence profiles | Signed machine-readable evidence bundles per audit run | shipped (Wave 4) |
| I | Compliance mapping | Evidence profiles mapped to SOC 2, ISO 27001, EU AI Act, NIST AI RMF, ISO 42001, HIPAA, PCI-DSS, FedRAMP | planned |
| J | Supply chain | SLSA provenance + SBOM (SPDX / CycloneDX) scaffolding | planned |
| K | Zero Trust architecture | ZTA design principle throughout — every action authenticated, least privilege, no implicit trust, short-lived credentials | planned |
| L | Identity v2 | W3C DID/VC for principal identity — Phase 2; Phase 1 ships signed local principal record first | planned |

---

## Work Items

| ID | Track | Work | Priority | Status |
| --- | --- | --- | --- | --- |
| INIT.00 | A | Charter — TypeScript scaffold, tsconfig, package.json, CLI entry | P0 | closed (Wave 0) |
| INIT.01 | A | Schema pair — gc-principal.schema.json + gc-evidence-bundle.schema.json | P0 | closed (Wave 1) |
| INIT.02 | H+L | gc-conformance.schema.json; scope + does_not_certify fields in principal schema | P0 | closed (Wave 1) |
| INIT.03 | D | Template library — 7 governance file templates with variable substitution | P0 | closed (Wave 2) |
| INIT.04 | A | Core provisioning library — provision(), principal, evidence, detector, validator, templates | P0 | closed (Wave 2) |
| INIT.05 | B+F+G | MVP CLI — `audit validate`, `status`, `install` (Marlin wizard); validator.ts, reporter.ts, marlin.ts | P0 | closed (Wave 3) |
| INIT.06 | H | Signed evidence bundles — Ed25519 keystore, signBundle(), verifyBundle(), `audit verify-bundle` | P0 | closed (Wave 4) |
| INIT.07 | B | `--reconfigure` brownfield install — re-run wizard against existing repo, diff-only overwrites | P1 | queued (Wave 5) |
| INIT.08 | B | Named presets: `--preset gc-standard`, `solo-dev`, `enterprise`, `gc-strict` | P1 | queued (Wave 5) |
| INIT.09 | F | AUDIT normalize — align names, scope, status, paths, registry pointers | P1 | queued |
| INIT.10 | F | AUDIT verify, trace, authority audit, registry audit | P2 | queued |
| INIT.11 | F | AUDIT adversarial, meta-audit, close-the-loop, de-stale | P2 | queued |
| INIT.12 | I | Compliance presets — SOC 2, ISO 27001, EU AI Act, NIST AI RMF (emit scaffolding only, never claim compliance) | P2 | queued |
| INIT.13 | I | Compliance presets — HIPAA, PCI-DSS, FedRAMP, ISO 42001 | P2 | queued |
| INIT.14 | C+E | Cockpit governance panel — define Marlin-DXP module API contract; implement install/audit/status panel in Cockpit repo | P2 | queued |
| INIT.15 | J | SBOM scaffolding — CycloneDX and SPDX; SLSA provenance via Sigstore/cosign | P2 | queued |
| INIT.16 | K | ZTA audit — review every identity/trust/permission decision against NIST SP 800-207 | P1 | queued |
| INIT.17 | L | W3C DID/VC for principal identity (Phase 2) — deferred; signed local record already shipped | P3 | queued |
| INIT.18 | E | Cockpit module interface — how Cockpit calls Marlin-DXP core as first-run module | P3 | queued |

---

## Decision Surfaces (full list)

### Principal identity (collected first, before all other questions)

- Name and handle
- Email
- GitHub / GitLab username
- Role: owner / maintainer / installer / auditor
- Entity type: individual / LLC / corporation (+ entity name if org)
- Succession principal (optional)
- Attestation confirmation
- CI/headless mode: service account / bot principal config

### Governance tier

- GC conformance level (advisory / standard / strict)
- Authority level default (AL:1 / AL:2 / AL:3)
- Governance record style (PASS cluster name, or none)
- Business entity type (personal / LLC / corporation)

### Naming (ONS)

- ONS validation tier (FAST / STANDARD / STRICT)
- Namespace and product root
- Separator preference
- VS Code extension naming: `{product}-vscode` vs `vscode-{product}` vs `{product}.vscode`
- Token prefix pattern
- Governance cluster name

### Project shape

- Project type (library / app / CLI / VS Code extension / backend / full-stack / multi-repo)
- Team tier (solo / small team / enterprise)
- Developer experience level (beginner / intermediate / expert — controls wizard verbosity)

### Stack and tooling

- Frontend framework (React / Vue / Svelte / None)
- Backend language (TypeScript / Python / Go / Rust / other)
- CI/CD target (GitHub Actions / GitLab / Azure DevOps / Bitbucket / none)
- Package registry targets (PyPI / npm / both / internal / none)
- License
- Agentic governance (yes → GEE config + ONS agentic domain registration)

### Scaffold options

- Emit DEV-PATH.md and DEV-PLAN.md (yes / no)
- Emit GEE namespace config (yes / no)
- Register in projects.yaml (yes / no)
- Add CI validation workflow (yes / no)
- Append README governance section (yes / no)

---

## CLI Command Surface

```text
marlin                          auto-detect mode; new repo → install, existing → audit
marlin install                  forced install wizard (new or reconfigure)
marlin install --reconfigure    re-run wizard against existing repo, diff-only overwrites
marlin install --preset <name>  skip wizard; apply named preset (gc-standard, solo-dev, enterprise, gc-strict)
marlin install --dry-run        show what would be written without touching the filesystem

marlin audit                    full audit menu — shows all 10 review grammar operations
marlin audit validate           DEV-ACCORD + ONS conformance check
marlin audit normalize          align names, scope, status, paths, registry entries
marlin audit verify             inspect code/tests to confirm contracts are implemented
marlin audit trace              lineage chain from origin → authority → plan → implementation
marlin audit adversarial        try to disprove claims; find contradictions and drift paths
marlin audit meta               audit the tracker/registry/gap list, not just the thing itself
marlin audit authority          identify which document has the right to define each claim
marlin audit registry           check projects.yaml and indexes for truth
marlin audit close              fix issue, validate fix, update trackers
marlin audit destale            remove outdated claims after corrections land

marlin status                   portfolio health report — gap table, per-project detail, blocked items
marlin status --project <name>  single-project status
```

---

## Open Questions

| Question | Why It Matters |
| --- | --- |
| What's the right question order for minimal cognitive load? | Preset-then-customize vs linear wizard vs category grouping |
| Should VS Code extension naming be one choice or per-repo? | An org might have one style; a solo dev might want to choose per project |
| Does Marlin-DXP provision the GEE namespace or just the config? | Namespace registration may require a live service later |
| Electron vs Tauri vs browser-based (local server + open browser)? | Browser-based is zero-install for the GUI shell |
| Should presets be community-extensible? | A GC "official" preset vs org-defined presets vs personal presets |

---

## Non-Goals

- Marlin-DXP does not ship a standalone GUI. The GUI surface is a Cockpit governance panel. Marlin-DXP exports a core module; Cockpit calls it.
- Marlin-DXP does not build or scaffold application code — only governance and developer experience artifacts.
- Marlin-DXP does not require the developer to have eco installed.
- Marlin-DXP does not replace Cockpit — it becomes Cockpit's first-run module when Cockpit ships.
- Marlin-DXP does not define GC standards — it adopts and applies them.
- Marlin-DXP does not own the control lifecycle. Its scope ceiling is Tier 2 (signed
  evidence bundles, CI validation, mapping presets). Continuous control monitoring,
  evidence vaults with retention, exception tracking, risk registers, audit
  workflows, and certification-support integrations (Tiers 3–5) belong to a separate
  runtime product — a Cockpit compliance module that consumes Marlin-DXP's schemas and
  core library. See INIT-D15 in DEV-PATH.md.
- Marlin-DXP never claims a project "is compliant." It produces audit-ready,
  evidence-ready, control-mapped artifacts. Certification comes from external
  auditors, notified bodies, or accredited certifiers.
