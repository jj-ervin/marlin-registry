# DEVPLAN - dxp-org

**AUTHORITY LEVEL: AL:1**
**Status:** ACTIVE
**Updated:** 2026-06-09

---

## CANONICAL DOC RULE

`DEVPLAN.md` owns: current execution state, active milestones, release targets, and project disposition.
`DEVPATH.md` owns: phase history, decisions, naming cleanup, and the task registry.

This file governs the `dxp-org` workspace as a portfolio root. Individual repos own their own execution details.

---

## CURRENT POSITION

**Active phase:** Phase 1 - Workspace normalization
**Current state:** Multi-repo workspace with DCP control-plane coverage emerging
**Next target:** Every active repo has canonical planning docs and an unambiguous status.

The immediate concern is reducing name ambiguity around DevToolkit. The old `devtoolkit` repo has been moved out of the active workspace, and `devxtoolkit-v1-x` is now the active v1 implementation.

---

## PROJECT DISPOSITION

| Project | Status | Role | Next |
|---------|--------|------|------|
| `devx-control-plane` | active | Portfolio governance and dashboard tooling | Keep canonical DCP docs current |
| `devxtoolkit-v1-x` | active | Current PowerShell DevToolkit implementation | Finish legacy absorption and release stabilization |
| `devxtoolkit-v2-x` | scaffold | Future v2 architecture/research track | Define scope after v1 is stable |
| `devx-toolkit` | needs audit | Separate TypeScript/toolkit repo | Determine relationship to DevToolkit naming family |
| `dotgovernance` | stable/wip | Governance template package | Register in control-plane once status is confirmed |

---

## RELEASE TARGETS

| Target | Name | Description | Status |
|--------|------|-------------|--------|
| DXP.0 | Baseline | Create portfolio planning docs | In progress |
| DXP.1 | Registry | Register active projects in the control-plane registry | Planned |
| DXP.2 | Naming cleanup | Remove ambiguous legacy toolkit folders from active workspace | In progress |
| DXP.3 | Repo disposition | Decide archive/active/scaffold status for every repo | Planned |
| DXP.4 | Validation | Dashboard and pointer validation clean across the portfolio | Planned |

---

## PRIORITY WORK ITEMS

| ID | Task | Priority | Status |
|----|------|----------|--------|
| DXP.01 | Add `DEVPLAN.md` and `DEVPATH.md` to `dxp-org` | P0 | In progress |
| DXP.02 | Add planning docs to `devxtoolkit-v1-x` | P0 | In progress |
| DXP.03 | Add planning docs to `devxtoolkit-v2-x` | P0 | In progress |
| DXP.04 | Confirm `devx-control-plane` existing planning docs are canonical | P0 | In progress |
| DXP.05 | Update DCP registry to include active workspace repos | P1 | Planned |
| DXP.06 | Audit `devx-toolkit` naming and relationship to DevToolkit | P1 | Planned |
| DXP.07 | Commit or archive legacy `devtoolkit` disposition cleanly | P1 | Planned |

---

## OPERATING RULES

- `dxp-org` is a workspace root, not a monolithic application.
- Project execution belongs inside individual project repos.
- DCP owns registry, dashboard, validation, and portfolio governance.
- Legacy repo names should not remain in the active workspace if they create ambiguity.
- A repo should not be deleted until its code, docs, tests, and history disposition are understood.

