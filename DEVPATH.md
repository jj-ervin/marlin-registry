# DEVPATH — DevX Control Plane (DCP)

**AUTHORITY LEVEL: AL:1**
**Status:** ACTIVE — single authoritative source for DCP development path
**Updated:** 2026-06-06
**Supersedes:** N/A — first canonical planning doc for DCP

---

## CANONICAL DOC RULE

`DEVPATH.md` owns: phase history, design decisions, origin story, agent onboarding.
`DEVPLAN.md` owns: current execution state, active milestones, release targets, SKU roadmap.

DCP *is* `C:\dev` — this file governs the portfolio control plane itself as a product.

---

## AGENT ONBOARDING

Before working on DCP as a product, read in order:

1. `DEV-CONTROL-PLANE.md` — boundary doctrine, the core architectural decision
2. `docs/planning-normalization.md` — planning standard (DCP enforces this for others)
3. **This file** — phase history, design rationale
4. `DEVPLAN.md` — current release targets and work queue
5. `README.md` — user-facing product description

DCP components are in `C:\dev` root. They are not in a child repo — they *are* the control plane.

---

## ORIGIN

DCP emerged from a governance session on 2026-06-05/06 during which the `C:\dev` portfolio was audited and the following were established in a single working session:

- Boundary doctrine (`DEV-CONTROL-PLANE.md`) — what lives in each layer and why
- Planning normalization standard (`docs/planning-normalization.md`)
- Pre-commit source protection (`protect-sources.ps1`)
- Planning pointer validator (`validate-pointers.ps1`)
- Portfolio dashboard enhancement (`dev-status.ps1` — status + plan health columns)
- Planning template kit (`docs/templates/`)
- Portfolio registry cleanup (`projects.yaml` — 27 pointers verified)

The session was reviewed by both Claude and Codex. Both agreed the thesis was sound. The architectural position (governance-commons / control plane / project repos / runtime) is the stable foundation DCP is built on.

---

## PHASE HISTORY

### Phase 0 — Foundation (2026-06-05 → 2026-06-06) ✅ COMPLETE

**Goal:** Establish `C:\dev` as a governed portfolio control plane.

**Key decisions:**
- `C:\dev` is a *control plane*, not a monorepo. This distinction prevents it from absorbing execution artifacts.
- Portability rule: portable across orgs → `governance-commons/`; local to this portfolio → `C:\dev`.
- Runtime state (live task queues, agent handoffs) must not be committed — it belongs in a workspace or database.
- `project-orchestrator-agent` holds the runtime *contract and schemas*, not live state.

**Completed:**
- DCP.00 — Boundary doctrine written and committed
- DCP.01 — Source corpus protection (pre-commit hook)
- DCP.02 — Planning pointer validator
- DCP.03 — Dashboard status + plan health columns
- DCP.04 — Planning template kit (4 templates)
- DCP.05 — projects.yaml pointer audit and normalization (27 verified)
- DCP.06 — README, --help, DEVPLAN, DEVPATH (this file)

---

### Phase 1 — Extraction & Packaging (2026-06-06 → ongoing)

**Goal:** Make DCP portable — extractable from `C:\dev` and replicable by others.

**Key decisions to make:**
- What is DCP-core vs eco-ecosystem-specific? The registry schema and tooling are generic; the PASS governance system is eco-specific.
- Where does the DCP template repo live? Options: `governance-commons/dcp`, new standalone GitHub repo, or npm/pip scaffold.
- What is the minimum viable DCP? (Core SKU definition)

**Planned:**
- DCP.10 — Extract DCP into a standalone template/scaffold repo
- DCP.11 — Define SKU boundaries (Core / Governance Kit / Agent Kit / Studio)
- DCP.12 — Write DCP onboarding doc (for new users, not agents)
- DCP.13 — Write consulting pitch one-pager

---

### Phase 2 — Agent Kit Module (future)

**Goal:** Package the AI-agent-specific layer of DCP as a separable module.

The Agent Kit includes:
- PASS template set (generalised from eco's PASS system)
- Model routing pattern library
- Agent onboarding doc template
- Multi-agent handoff protocol

This is DCP's primary market differentiator. Most competing tools solve the registry/dashboard problem. None solve the agent governance problem.

---

### Phase 3 — Distribution (future)

**Goal:** Make DCP findable, installable, and sellable.

- GitHub template repository
- Optional scaffold CLI (`dcp init`)
- Consulting offering (setup + training + custom config)
- Landing page / product positioning

---

## DESIGN PRINCIPLES

1. **Registry-driven** — `projects.yaml` is the single source of truth. Tools read from it; humans edit it.
2. **Agent-readable** — planning docs follow typed conventions so agents can parse intent without ambiguity.
3. **Boundary-strict** — governance, standards, execution, and runtime are hard-separated layers.
4. **Integrity-enforced** — broken pointers and bulk corpus rewrites are caught at commit time, not discovered later.
5. **Modular** — each component is independently useful. You don't need all of DCP to benefit from any part of it.
6. **No runtime in the repo** — ephemeral agent state does not belong in version control.

---

## TASK REGISTRY

| ID | Name | Status | Phase | Notes |
|----|------|--------|-------|-------|
| DCP.00 | Boundary doctrine | done | 0 | `DEV-CONTROL-PLANE.md` |
| DCP.01 | Source corpus protection | done | 0 | `protect-sources.ps1` + pre-commit hook |
| DCP.02 | Pointer validator | done | 0 | `validate-pointers.ps1` |
| DCP.03 | Dashboard status + plan health | done | 0 | `dev-status.ps1` |
| DCP.04 | Planning template kit | done | 0 | `docs/templates/` |
| DCP.05 | Registry audit and normalization | done | 0 | `projects.yaml` |
| DCP.06 | README + --help + planning docs | done | 0 | This file + `DEVPLAN.md` + `README.md` |
| DCP.10 | Extract into template repo | planned | 1 | — |
| DCP.11 | SKU boundary definition | planned | 1 | See `DEVPLAN.md` |
| DCP.12 | User onboarding doc | planned | 1 | — |
| DCP.13 | Consulting pitch one-pager | planned | 1 | — |
| DCP.20 | Agent Kit — PASS template set | planned | 2 | — |
| DCP.21 | Agent Kit — routing pattern library | planned | 2 | — |
| DCP.30 | GitHub template repo | planned | 3 | — |
| DCP.31 | Scaffold CLI (`dcp init`) | planned | 3 | — |
| DCP.32 | Consulting offering definition | planned | 3 | — |

---

## CHANGELOG

- `passchangelog.md` — session handoff log (if created)
