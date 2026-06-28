# DEV-PLAN — dxp-init

**AUTHORITY LEVEL: AL:1**
**Status:** active
**Updated:** 2026-06-27

---

## Purpose

`dxp-init` is the **five-minute governance adoption kit**.

```text
Install governance → Audit the repo → Emit evidence → Show status
```

A developer downloads it, runs the wizard, and gets a fully conformant governance
scaffold in under 5 minutes. Then it stays: the same tool audits the repo,
normalizes drift, emits signed machine-readable evidence bundles, and reports
portfolio health — for the entire life of the project.

**Honest claim:** dxp-init makes a project audit-ready, evidence-ready, and
control-mapped. It does not make a project compliant. Compliance depends on
operations, controls, legal scope, and sometimes external audit. dxp-init
produces the evidence that an auditor or automated compliance platform can trust.

---

## Current Phase

Phase 1 — Active build. Waves 1 and 2 complete. Wave 3 (MVP operations) is next.

**Wave 1 (CLOSED):** TypeScript scaffold, schema pair (gc-principal + gc-evidence-bundle)
**Wave 2 (CLOSED):** Template library (7 templates), core provisioner, buildBundle()
**Wave 3 (OPEN):** MVP CLI operations — `audit validate`, `status`, `install --dry-run`

---

## Tracks

| Track | Name | Goal | Status |
| --- | --- | --- | --- |
| A | Core provisioning library | TypeScript library — wizard answers → governance files | planned |
| B | CLI wizard | `dxp-init` command with Inquirer/Clack interactive prompts | planned |
| C | GUI frontend | Electron window wrapper over Track A library | planned |
| D | Template library | All governance file templates with variable substitution | planned |
| E | Cockpit integration | dxp-init core as a Cockpit first-run module | planned |
| F | AUDIT module | Full review grammar suite — validate, normalize, verify, adversarial, meta-audit, trace, authority audit, registry audit, close-the-loop, de-stale | planned |
| G | STATUS module | Portfolio health report — gap table, per-project detail, blocked items (ports dev-report.ps1) | planned |
| H | Evidence profiles | Signed machine-readable evidence bundles per audit run — the killer feature | planned |
| I | Compliance mapping | Evidence profiles mapped to SOC 2, ISO 27001, EU AI Act, NIST AI RMF, ISO 42001, HIPAA, PCI-DSS, FedRAMP | planned |
| J | Supply chain | SLSA provenance + SBOM (SPDX / CycloneDX) scaffolding | planned |
| K | Zero Trust architecture | ZTA design principle throughout — every action authenticated, least privilege, no implicit trust, short-lived credentials | planned |
| L | Identity v2 | W3C DID/VC for principal identity — Phase 2; Phase 1 ships signed local principal record first | planned |

---

## Work Items

| ID | Track | Work | Priority | Status |
| --- | --- | --- | --- | --- |
| INIT.01 | D | Define wizard question schema — YAML/JSON structure mapping answers to artifacts | P0 | planned |
| INIT.02 | D | Write governance file templates: ons-profile.yaml, gc-conformance.yaml, GEE config | P0 | planned |
| INIT.03 | D | Write planning doc templates: DEV-PATH.md and DEV-PLAN.md with correct H1s and AUTHORITY LEVEL | P0 | planned |
| INIT.04 | A | Core provisioning library — accepts answer object, renders templates, writes files | P0 | planned |
| INIT.05 | A | Dry-run mode — show diff of what would be written without touching the filesystem | P1 | planned |
| INIT.06 | A | Reconfigure mode — re-run wizard against existing project, diff-only overwrites | P1 | planned |
| INIT.07 | A | Validation step — run validate-planning.ps1 and gc-validate after emission | P1 | planned |
| INIT.08 | B | CLI wizard — Inquirer/Clack prompts covering all decision surfaces | P1 | planned |
| INIT.09 | B | Named presets: gc-standard, gc-strict, solo-dev, enterprise, gc-only | P1 | planned |
| INIT.10 | B | `--preset` flag, `--dry-run` flag, `--reconfigure` flag | P1 | planned |
| INIT.11 | C | Electron window wrapper — web UI shell calling Track A library | P2 | planned |
| INIT.12 | C | Tauri packaging evaluation — lighter binary, same web UI | P2 | planned |
| INIT.13 | E | Define Cockpit module interface — how Cockpit calls dxp-init core | P3 | planned |
| INIT.14 | A | Mode detection — auto-detect INSTALL vs AUDIT from repo state; surface mode choice on first run | P0 | planned |
| INIT.15 | F | AUDIT module — validate operation (ports validate-planning.ps1 logic) | P1 | planned |
| INIT.16 | F | AUDIT module — normalize operation (align names, scope, status, paths, registry pointers) | P1 | planned |
| INIT.17 | F | AUDIT module — verify, trace, authority audit, registry audit operations | P2 | planned |
| INIT.18 | F | AUDIT module — adversarial audit and meta-audit operations | P2 | planned |
| INIT.19 | F | AUDIT module — close-the-loop and de-stale operations | P2 | planned |
| INIT.20 | G | STATUS module — portfolio health report (ports dev-report.ps1 logic) | P1 | planned |
| INIT.21 | C | GUI three-tab layout — Install / Audit / Status as first-class panels | P2 | planned |
| INIT.22 | A | Principal identity collection — name, handle, email, role, entity type, succession, attestation | P0 | planned |
| INIT.23 | D | `gc-principal.yaml` template — canonical identity record; authority anchor for all emitted files | P0 | planned |
| INIT.24 | A | CI/headless principal detection — no-TTY mode prompts for service account / bot config | P1 | planned |
| INIT.25 | A | Installer role expiry — flag `installer` role as one-time in `gc-principal.yaml`; prompt for ongoing role after first validated run | P1 | planned |
| INIT.26 | D | `gc-principal.yaml` schema — define schema with validation, sample records, and redaction rules before adding more identity theory | P0 | planned |
| INIT.27 | H | Evidence bundle format — `dxp-init audit --evidence out/` emits JSON/YAML with validator version, input files, findings, principal, time.loc, optional GEE envelope | P1 | planned |
| INIT.28 | H | Signed evidence bundle — sign evidence bundle with principal's key (Ed25519 / JWS); GC already has gc-compliance-evidence.schema.json | P1 | planned |
| INIT.29 | I | Evidence profiles for SOC 2, ISO 27001, NIST AI RMF, ISO 42001 — emit controls/evidence scaffolding only, never claim compliance | P2 | planned |
| INIT.30 | I | Evidence profiles for EU AI Act readiness, HIPAA, PCI-DSS, FedRAMP | P2 | planned |
| INIT.31 | I | --preset flag maps to evidence profile: gc-standard, soc2, iso27001, eu-ai-act-readiness, nist-ai-rmf, hipaa, pci, fedramp | P2 | planned |
| INIT.32 | J | SBOM scaffolding — CycloneDX and SPDX output; scaffold generation pipeline in CI | P2 | planned |
| INIT.33 | J | SLSA provenance — scaffold Sigstore/cosign signing; emit SLSA provenance attestation for dxp-init runs themselves | P2 | planned |
| INIT.34 | K | Zero Trust design audit — review every identity, trust, and permission decision in dxp-init against NIST SP 800-207 | P1 | planned |
| INIT.35 | K | ZTA principal hardening — short-lived session tokens, no long-lived implicit trust, role scope boundaries enforced at runtime | P1 | planned |
| INIT.36 | L | Signed local principal record (Phase 1) — Ed25519 key pair, local signing, before any DID/VC work | P1 | planned |
| INIT.37 | L | W3C DID/VC for principal identity (Phase 2) — deferred; ship signed local record first | P3 | planned |

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
dxp-init                        auto-detect mode; new repo → install, existing → audit
dxp-init install                forced install wizard (new or reconfigure)
dxp-init install --reconfigure  re-run wizard against existing repo, diff-only overwrites
dxp-init install --preset <name> skip wizard; apply named preset (gc-standard, solo-dev, enterprise, gc-strict)
dxp-init install --dry-run      show what would be written without touching the filesystem

dxp-init audit                  full audit menu — shows all 10 review grammar operations
dxp-init audit validate         DEV-ACCORD + ONS conformance check
dxp-init audit normalize        align names, scope, status, paths, registry entries
dxp-init audit verify           inspect code/tests to confirm contracts are implemented
dxp-init audit trace            lineage chain from origin → authority → plan → implementation
dxp-init audit adversarial      try to disprove claims; find contradictions and drift paths
dxp-init audit meta             audit the tracker/registry/gap list, not just the thing itself
dxp-init audit authority        identify which document has the right to define each claim
dxp-init audit registry         check projects.yaml and indexes for truth
dxp-init audit close            fix issue, validate fix, update trackers
dxp-init audit destale          remove outdated claims after corrections land

dxp-init status                 portfolio health report — gap table, per-project detail, blocked items
dxp-init status --project <name> single-project status
```

---

## Open Questions

| Question | Why It Matters |
| --- | --- |
| What's the right question order for minimal cognitive load? | Preset-then-customize vs linear wizard vs category grouping |
| Should VS Code extension naming be one choice or per-repo? | An org might have one style; a solo dev might want to choose per project |
| Does dxp-init provision the GEE namespace or just the config? | Namespace registration may require a live service later |
| Electron vs Tauri vs browser-based (local server + open browser)? | Browser-based is zero-install for the GUI shell |
| Should presets be community-extensible? | A GC "official" preset vs org-defined presets vs personal presets |

---

## Non-Goals

- `dxp-init` does not build or scaffold application code — only governance and developer experience artifacts.
- `dxp-init` does not require the developer to have eco installed.
- `dxp-init` does not replace Cockpit — it becomes Cockpit's first-run module when Cockpit ships.
- `dxp-init` does not define GC standards — it adopts and applies them.
