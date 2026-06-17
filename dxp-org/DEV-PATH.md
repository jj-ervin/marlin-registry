# DEV-PATH - dxp-org

**AUTHORITY LEVEL: AL:1**
**Status:** ACTIVE
**Updated:** 2026-06-09
**Supersedes:** N/A

---

## CANONICAL DOC RULE

`DEV-PATH.md` owns: phase history, decisions, naming cleanup, and the task registry.
`DEV-PLAN.md` owns: current execution state, active milestones, release targets, and project disposition.

---

## ORIGIN

`dxp-org` is a local multi-repo workspace for DevX/DXP projects. It contains active projects, scaffold repos, governance packages, and a control-plane repo.

The workspace recently exposed a naming problem: the legacy `devtoolkit` repo, the normalized `devxtoolkit-v1-x` repo, and the scaffold `devxtoolkit-v2-x` repo were all present together. That made it unclear which implementation was canonical.

The portfolio now has a product direction beyond normalization: make the core work OSS-ready first, then reserve Pass6 for differentiated paid-tier capabilities if real users prove they want the extra power badly enough to pay for it.

---

## PHASE HISTORY

### Phase 0 - Repository Normalization

**Goal:** Normalize directory names and separate active projects from legacy sources.

**Completed:**
- Adopted normalized ONS-style names for `devxtoolkit-v1-x` and `devxtoolkit-v2-x`.
- Verified `devxtoolkit-v1-x` absorbed nearly all tracked legacy `devtoolkit` content.
- Verified `devxtoolkit-v2-x` is currently a scaffold, not an implementation.
- Removed the active `devtoolkit` folder from `dxp-org`.
- Preserved legacy history at `C:\dev\_archive\devtoolkit-legacy-archived`.

### Phase 1 - Planning Coverage

**Goal:** Give every active or scaffold repo a canonical `DEV-PLAN.md` and `DEV-PATH.md`.

**In progress:**
- `dxp-org` planning docs.
- `devxtoolkit-v1-x` planning docs.
- `devxtoolkit-v2-x` planning docs.
- Confirmed `devx-control-plane` already has canonical planning docs.

### Phase 2 - OSS Release Readiness

**Goal:** Move the public-facing baseline projects from local/workspace status to credible OSS release posture.

**Planned:**
- Prepare DevX Control Plane for an OSS baseline release.
- Prepare DevXToolkit v1 for an OSS baseline release.
- Treat Governance Commons as the current OSS-leading surface and confirm its release checklist.
- Keep paid-tier design out of the critical path until the OSS value proposition is legible.

### Phase 3 - Pass6 Product Exploration

**Goal:** Define the ahead-of-industry features and capabilities that could justify paid tiers.

**Planned:**
- DCP Pass6: paid-tier control-plane capabilities above the OSS dashboard/registry/validation baseline.
- DevXToolkit v2: paid-tier next-generation toolkit architecture and workflows.
- Governance Commons Pass6: premium governance, evidence, automation, or compliance capabilities beyond the OSS release.
- VS Code extension: evaluate as OSS, paid, freemium, or deferred based on whether the workflow becomes valuable enough.

---

## KEY DECISIONS

| Decision | Date | Rationale |
|----------|------|-----------|
| Treat `dxp-org` as a workspace root | 2026-06-09 | Avoids pretending nested repos are one monorepo |
| Make `devxtoolkit-v1-x` the active v1 implementation | 2026-06-09 | It absorbed the legacy implementation and now passes tests |
| Move `devtoolkit` out of the active workspace | 2026-06-09 | The old name caused too much ambiguity |
| Keep `devxtoolkit-v2-x` as scaffold only | 2026-06-09 | It has not absorbed implementation code yet |
| Use DCP docs as the planning standard | 2026-06-09 | Keeps portfolio governance consistent |
| Prioritize OSS readiness before paid-tier implementation | 2026-06-09 | Trust, adoption, and proof of value should come before monetized Pass6 features |
| Treat Pass6 as a paid-tier hypothesis | 2026-06-09 | Ahead-of-industry features should be scoped, but not overbuilt before demand is validated |

---

## TASK REGISTRY

| ID | Task | Status | Notes |
|----|------|--------|-------|
| DXP.01 | Create `dxp-org` planning docs | in progress | This file and `DEV-PLAN.md` |
| DXP.02 | Create `devxtoolkit-v1-x` planning docs | in progress | Active v1 implementation |
| DXP.03 | Create `devxtoolkit-v2-x` planning docs | in progress | Future/scaffold repo |
| DXP.04 | Confirm `devx-control-plane` docs | in progress | Existing docs are canonical |
| DXP.05 | Add all active repos to DCP registry | planned | Use relative paths from control-plane context carefully |
| DXP.06 | Audit `devx-toolkit` | done | Historical TypeScript origin; reference/archive only |
| DXP.07 | Decide whether legacy archive remains local only or gets GitHub archival treatment | planned | Preserve history without active workspace confusion |
| DXP.08 | Define OSS release criteria for DCP and DevXToolkit v1 | planned | README, license, install path, examples, tests, release notes, support boundaries |
| DXP.09 | Define Governance Commons OSS release checklist | planned | Confirm package shape, docs, templates, and public positioning |
| DXP.10 | Draft Pass6 paid-tier hypothesis | planned | Cover DCP, DevXToolkit v2, Governance Commons, and user willingness to pay |
| DXP.11 | Decide VS Code extension disposition | planned | OSS, paid, freemium, or deferred |

---

## INDUSTRY GAP ANALYSIS — dxp-org (Portfolio Control Plane)

**Framework:** 12-question gap analysis (c:\dev\docs\gap-analysis-framework.md v1.1)
**Applied:** 2026-06-16
**Scope:** dxp-org as the portfolio control plane and workspace normalization layer
**Gap states:** `open` | `spec-complete` | `release-complete` | `runtime-complete`

Source: Claude + ChatGPT synthesis 2026-06-09. See gap-analysis-framework.md Q1-Q12 dxp-org matrix.

| Q | Area | Priority | Gap | Status | Suggested Action |
| --- | --- | --- | --- | --- | --- |
| Q1 | Regulatory | Medium | Not a regulated AI system but governs repos that may be; no template fields for data class, regulated domain, AI/ADM use, retention owner | open | Add template fields for data class and regulated domain to `.governance/` scaffold |
| Q2 | Standards | Medium | ONS naming thinking exists; no SLSA provenance or SBOM for dxp-org itself; no conformance release posture | open | Add OSS release checklist: license, SBOM, provenance, security policy for dxp-org artifacts |
| Q3 | De Facto | High | `.governance/` installer must work cleanly from a fresh clone; GitHub Actions, package managers, shell portability, editor/tool integration all missing | open | Make `.governance/` installer work from clean clone; add CI validation GitHub Action |
| Q4 | Best Practice | High | Good 5-minute readiness doctrine defined; no automated proof that it passes on a stranger's machine | open | Turn readiness test into a runnable script/fixture; automate it in CI |
| Q5 | Security | Medium | Installer copies governance files; lacks dry-run, manifest output, overwrite safety, checksum verification | open | Add dry-run flag, manifest of created files, checksum output, safer overwrite behavior |
| Q6 | Ops | Medium | Workspace state being normalized; registry/status proof incomplete; validate-pointers.ps1 exists but no CI gate | open | Finish DCP registry coverage and status validation across all active repos; add CI gate |
| Q7 | DevEx | Critical | Core value proposition is stranger-proof onboarding; not yet proven outside author's machine | open | Run 5-minute test in empty temp project on clean machine; fix every stumble before any public claim |
| Q8 | Interop | High | Should integrate with Codex, Claude, Copilot, Cursor, GitHub Actions, VS Code; `.governance/` templates exist but not tested per tool | open | Add tested templates for each AI coding tool; keep `.governance/` minimal |
| Q9 | Process | Medium | Active/scaffold/archive repo dispositions still in progress; no public contribution process | open | Complete repo disposition table and archive policy; define contribution path |
| Q10 | Docs | High | Root README explains naming normalization, not product value; no "what is dxp-org, why does it exist, what do I get in 5 minutes" | open | Replace root README: what it is, install, first result, next step |
| Q11 | Testing | High | No visible systematic test suite for installer or readiness; no tests for blank project, existing files, force mode, bad path | open | Add installer tests: blank project, existing files, force mode, template mode, bad path |
| Q12 | Ahead | Medium | dxp-org could become the governance starter kit adoption funnel — smallest lovable entry point routing serious users to GC/DCP/DVP | open | Make `.governance/` the minimum viable entry point; clear path from dxp-org → GC → DCP or DVP |
