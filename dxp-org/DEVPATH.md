# DEVPATH - dxp-org

**AUTHORITY LEVEL: AL:1**
**Status:** ACTIVE
**Updated:** 2026-06-09
**Supersedes:** N/A

---

## CANONICAL DOC RULE

`DEVPATH.md` owns: phase history, decisions, naming cleanup, and the task registry.
`DEVPLAN.md` owns: current execution state, active milestones, release targets, and project disposition.

---

## ORIGIN

`dxp-org` is a local multi-repo workspace for DevX/DXP projects. It contains active projects, scaffold repos, governance packages, and a control-plane repo.

The workspace recently exposed a naming problem: the legacy `devtoolkit` repo, the normalized `devxtoolkit-v1-x` repo, and the scaffold `devxtoolkit-v2-x` repo were all present together. That made it unclear which implementation was canonical.

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

**Goal:** Give every active or scaffold repo a canonical `DEVPLAN.md` and `DEVPATH.md`.

**In progress:**
- `dxp-org` planning docs.
- `devxtoolkit-v1-x` planning docs.
- `devxtoolkit-v2-x` planning docs.
- Confirmed `devx-control-plane` already has canonical planning docs.

---

## KEY DECISIONS

| Decision | Date | Rationale |
|----------|------|-----------|
| Treat `dxp-org` as a workspace root | 2026-06-09 | Avoids pretending nested repos are one monorepo |
| Make `devxtoolkit-v1-x` the active v1 implementation | 2026-06-09 | It absorbed the legacy implementation and now passes tests |
| Move `devtoolkit` out of the active workspace | 2026-06-09 | The old name caused too much ambiguity |
| Keep `devxtoolkit-v2-x` as scaffold only | 2026-06-09 | It has not absorbed implementation code yet |
| Use DCP docs as the planning standard | 2026-06-09 | Keeps portfolio governance consistent |

---

## TASK REGISTRY

| ID | Task | Status | Notes |
|----|------|--------|-------|
| DXP.01 | Create `dxp-org` planning docs | in progress | This file and `DEVPLAN.md` |
| DXP.02 | Create `devxtoolkit-v1-x` planning docs | in progress | Active v1 implementation |
| DXP.03 | Create `devxtoolkit-v2-x` planning docs | in progress | Future/scaffold repo |
| DXP.04 | Confirm `devx-control-plane` docs | in progress | Existing docs are canonical |
| DXP.05 | Add all active repos to DCP registry | planned | Use relative paths from control-plane context carefully |
| DXP.06 | Audit `devx-toolkit` | planned | Determine whether it is separate or part of toolkit naming family |
| DXP.07 | Decide whether legacy archive remains local only or gets GitHub archival treatment | planned | Preserve history without active workspace confusion |

