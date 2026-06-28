# DEV-RELEASE — dxp-org

**AUTHORITY LEVEL: AL:1**
**Status:** Active — Phase 1 (Planning Coverage) in progress  
Created: 2026-06-09  
Authority: Owned by this repo. Sequencing and cross-repo dependencies defer to [`docs/DEV-RELEASE.md`](../docs/DEV-RELEASE.md).  
Relationship to DEV-PLAN: `DEV-PLAN.md` owns current execution state, active milestones, and project disposition. This file owns release contracts — what ships publicly, under what conditions, and what each release unlocks downstream.

---

## Current State Summary

**Active phase:** Phase 1 — Planning Coverage (in progress)  
**Completed:** Phase 0 — Repository Normalization (legacy `devtoolkit` removed, naming cleaned)  
**Planned next:** Phase 2 — OSS Release Readiness → Phase 3 — Pass6 Product Exploration

### Package Inventory (actual state)

| Package | Location | Status | Notes |
| --- | --- | --- | --- |
| dotgovernance | `dotgovernance/` | Functional — not yet hardened for public release | install.ps1 works; missing dry-run, manifest, checksums, test suite |
| devx-control-plane | `devx-control-plane/` | Functionally complete — not yet stranger-tested outside source repo | dcp.ps1, dev-status.ps1, projects.yaml, validate-pointers.ps1, template library all present |
| devxtoolkit-v1-x | `devxtoolkit-v1-x/` | Implementation absorbed — needs release stabilization | DevXToolkit.psd1/psm1, all Invoke-Mk*.ps1 commands, test suite present |
| devxtoolkit-v2-x | `devxtoolkit-v2-x/` | Scaffold only — reserved for Pass6 paid tier | No implementation yet; gates on v1 OSS proof |
| devx-toolkit | `devx-toolkit/` | Archive/reference — historical ancestor of devxtoolkit v1 and v2; not an active release target | TypeScript CLI that seeded the v1/v2 design; reference only |

### What is functionally complete (not open gaps — the gap is public release posture)

| Artifact | What exists | Gap |
| --- | --- | --- |
| dotgovernance `install.ps1` | Copies starter/template files; `-Mode`, `-Force`, `-Help` flags; clear next-step output | Dry-run, manifest log, checksums, overwrite safety, installer test suite, CI validation |
| dotgovernance starter kit | `starter/` — blank `.governance/` structure for existing projects | — |
| dotgovernance template kit | `template/` — pre-filled example files to edit down | — |
| dotgovernance README | 5-minute install, compatibility table (Claude/Copilot/Cursor/Codex), links to DCP and governancecommons.org | — |
| DCP `dcp.ps1` | Full control-plane: init, validate, status | Fresh scaffold not tested outside source repo |
| DCP `dev-status.ps1` | Portfolio dashboard — repo status, dirty state, branch, recent commit, plan health | — |
| DCP `projects.yaml` | Portfolio registry | Needs safe example data or obvious empty state for a stranger |
| DCP `validate-pointers.ps1` | Broken planning pointer detection | — |
| DCP agent-kit | Onboarding, handoff protocol, routing patterns, task template | — |
| DCP team-kit | Team onboarding, review routing | — |
| DCP planning templates | DEV-PATH, DEV-PLAN, TRACKS, PROJECT-STATUS templates | — |
| devxtoolkit-v1-x implementation | All `Invoke-Mk*.ps1` commands (CI, Config, Docs, License, Proj, Readme, Venv), DevXToolkit.psd1/psm1 | Needs release stabilization pass |
| devxtoolkit-v1-x test suite | `src/tests/Scaffolding.Commands.Tests.ps1` | Test suite presence confirmed; coverage unknown |
| devx-toolkit TypeScript CLI | eco-import, eco-upgrade, eco-validate, new-project commands; rule engine, scaffold generator, diff engine | Legacy origin of v1/v2 — reference only, not a release artifact |

### Prerequisite: Phase 1 completion (DEV-PLAN DXP.0-4)

These must complete before any public release target is accessible:

- [ ] DXP.01 — dxp-org DEV-PLAN.md and DEV-PATH.md canonical (in progress — these files now exist)
- [ ] DXP.02 — devxtoolkit-v1-x planning docs canonical (in progress)
- [ ] DXP.03 — devxtoolkit-v2-x planning docs canonical (in progress)
- [ ] DXP.04 — devx-control-plane existing planning docs confirmed canonical (in progress)
- [ ] DXP.05 — DCP registry updated to include all active workspace repos
- [x] DXP.07 — devtoolkit legacy disposition confirmed (devx-toolkit is the historical origin of v1/v2; reference only; old devtoolkit is cold archive)

---

## Release v0.1 — Stranger Test Passing

**Status:** Planned — begins after Phase 1 completion (DXP.0-4 items)  
**Primary gate:** The Stranger Test — not complete until tested on a clean machine outside the author's workspace

### The Stranger Test (required for v0.1 to ship)

> Can someone who has never heard of eco or governance-commons install `.governance`, run it in an empty project, get a visible result, and trust what was installed?

Passing means:

- Tested in a clean temp directory on a machine without the author's environment
- Every stumble found and fixed
- The result is automated and reproducible (script or CI fixture, not manual steps)

### dotgovernance installer hardening (v0.1 blockers)

The current `install.ps1` is functional but not stranger-safe:

- [ ] Dry-run mode — preview what will be created without writing files (`-WhatIf` or `-DryRun` flag)
- [ ] Manifest output — log of every file created or skipped, written to a manifest file
- [ ] Checksum/hash output — SHA-256 of each installed file for verification
- [ ] Safer overwrite behavior — current "exists" check skips silently; needs explicit prompt or `--force` confirmation
- [ ] Installer test suite: blank project, existing files, force mode, template mode, bad path, Windows path with spaces
- [ ] Automated readiness script — the 5-minute test as a runnable fixture (not a manual walkthrough)
- [ ] CI validation — `.governance` install works from a fresh clone in GitHub Actions

### DCP stranger-test hardening (v0.1 blockers)

- [ ] Fresh DCP scaffold works outside the source repo (test on a path with no dxp-org files)
- [ ] `projects.yaml` ships with safe example data or an explicit empty-state scaffold
- [ ] `dcp.ps1 validate` and `dcp.ps1 status` fail with clear error messages on a misconfigured or empty portfolio
- [ ] Windows path proven end-to-end; Mac/Linux path documented or explicitly marked not ready
- [ ] License, contribution notes, and support boundary explicit in both dotgovernance and DCP READMEs

### devxtoolkit-v1-x release stabilization (v0.1 blockers)

- [ ] Test suite coverage known and passing clean
- [ ] OSS release criteria defined for DevXToolkit v1

### Gap closures

- **Q7 DevEx:** Stranger can install `.governance`, run it in an empty project, see output in 5 minutes without asking anyone
- **Q5 Security:** Dry-run, manifest, checksum — installer is auditable and reversible
- **Q10 Docs:** README starts with install, result, value — not architecture

### v0.1 Admission criteria

- [ ] Phase 1 complete (DXP.0-4 items done)
- [ ] dotgovernance installer hardening checklist above complete
- [ ] Tested on a clean machine outside the author's workspace
- [ ] dotgovernance and DCP have license, contribution notes, and support boundary
- [ ] devxtoolkit-v1-x test suite green

---

## Release v0.2 — GC Integration

**Status:** Planned — begins after v0.1 ships  
**Blocked by:** governance-commons v1.2.0 published to PyPI/npm

### What v0.2 ships

- dotgovernance installer provisions real GC artifacts from PyPI/npm (not repo clones)
  - `pip install governance-commons-py` step in the 5-minute path
  - `gc-validate` runnable from the installed `.governance/` structure
- dotgovernance README: "which repo do I need?" fully answered — dotgovernance → DCP → GC
- AI tool integration templates: GitHub Actions template (references `gc-validate`), Codex/Claude/Copilot/Cursor updated to reference GC artifacts

### v0.2 Gap closures

- **Q3 De Facto:** GitHub Actions and editor/tool integration templates referencing real GC artifacts
- **Q8 Interop:** Codex, Claude, Copilot, Cursor templates all point at same GC source of truth
- **Q10 Docs:** README: install → first result → next step — complete funnel, no gaps

### v0.2 Admission criteria

- [ ] governance-commons v1.2.0 published to PyPI/npm (upstream gate)
- [ ] `pip install governance-commons-py` works from the dotgovernance 5-minute path
- [ ] `gc-validate` runs successfully on the installed `.governance/` structure
- [ ] dotgovernance README explicitly routes users to GC and DCP (funnel complete)

---

## Release v1.0 — Governance Funnel

**Status:** Planned — portfolio coordination milestone  
**Purpose:** dxp-org as the governance starter kit adoption funnel; routes serious adopters to governance-commons and DCP; qualifies for OSS release claims

### What v1.0 ships

- Full OSS release for dotgovernance, DCP, and DevXToolkit v1
- SBOM generated for all three packages
- OSS release checklist complete per `OSS-5-MINUTE-READINESS.md` gates
- Repo disposition complete — every repo in the portfolio has unambiguous status (archive/active/scaffold)
- DCP registry covers all active repos (DXP.05)
- DCP validation clean across the full portfolio (DXP.04)
- devxtoolkit-v2-x Pass6 hypothesis documented (DXP.10)
- VS Code extension decision: OSS, paid, freemium, or deferred (DXP.11)

### v1.0 Gap closures

- **Q2 Standards:** OSS release checklist complete — license, SBOM, provenance for dotgovernance + DCP + DevXToolkit v1
- **Q9 Process:** Repo disposition table and archive policy complete
- **Q12 Category:** dxp-org as the smallest lovable entry point to the governance commons ecosystem — the funnel that routes users through dotgovernance → DCP → GC → eco

### v1.0 Admission criteria

- [ ] v0.1 and v0.2 both shipped
- [ ] SBOM generated for dotgovernance, DCP, and DevXToolkit v1
- [ ] All repos in dxp-org have unambiguous status in DCP registry
- [ ] `dcp.ps1 validate` clean across full portfolio
- [ ] VS Code extension decision documented
- [ ] devxtoolkit-v2-x Pass6 scope hypothesis documented

---

## Pass6 / Future (DXP.6)

**Status:** Planned — begins after v1.0 OSS baseline is stable  
**Rule:** Do not build Pass6 features to compensate for unclear OSS onboarding (per `OSS-5-MINUTE-READINESS.md`)

### Candidates

- DCP Pass6: advanced control-plane automation, intelligence, team/enterprise capabilities
- DevXToolkit v2: next-generation toolkit architecture and premium workflows (currently scaffold)
- Governance Commons Pass6: premium governance, evidence, automation, compliance features
- VS Code extension: governance-commons / DCP / DevXToolkit surfaced in editor

Pass6 features are paid-tier hypotheses. Each requires: an OSS baseline with real users + demonstrated demand before implementation.

---

## Cross-Repo Dependencies (incoming)

| Gate | Upstream | Required |
| --- | --- | --- |
| GC artifacts provisionable from installer | governance-commons | v1.2.0 PyPI/npm published |
| Installer can reference GC validator | governance-commons | `gc-validate` command available in published package |

---

## Gap Closure Verification

See [`docs/DEV-RELEASE.md`](../docs/DEV-RELEASE.md) for the shared four-condition verification principle.

The primary gap in dxp-org is not missing functionality — most pieces work. The gap is stranger-proof posture: each piece must be installable, runnable, and useful to someone who has never seen the project before. A gap is not closed until a stranger has actually closed it.

---

## Related Documents

- [`DEV-PLAN.md`](DEV-PLAN.md) — canonical execution plan; owns current phase state, project disposition
- [`DEV-PATH.md`](DEV-PATH.md) — phase history, key decisions, naming cleanup
- [`OSS-5-MINUTE-READINESS.md`](OSS-5-MINUTE-READINESS.md) — the readiness doctrine this repo implements
- [`dotgovernance/README.md`](dotgovernance/README.md) — dotgovernance user-facing entry point
- [`docs/DEV-RELEASE.md`](../docs/DEV-RELEASE.md) — portfolio master, priority order, dependency graph
- [`docs/gap-analysis-framework.md`](../docs/gap-analysis-framework.md) — 12-question gap framework
