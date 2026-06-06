# DEVPLAN — DevX Control Plane (DCP)

**AUTHORITY LEVEL: AL:1**
**Status:** ACTIVE
**Updated:** 2026-06-06

---

## CANONICAL DOC RULE

`DEVPLAN.md` owns: current execution state, active milestones, release targets, SKU roadmap.
`DEVPATH.md` owns: phase history, design decisions, origin story, task registry.

---

## CURRENT POSITION

**Active phase:** Phase 3 — Agent Kit
**Current version:** v0.4.0 (Agent Kit complete)
**Next release target:** v1.0.0 — Studio (all modules bundled)

**Phase 1 is complete.** DCP Core exists as a standalone template repo with a self-validating registry, portable dashboard, onboarding docs, and explicit SKU boundaries.

**P0 blockers before Phase 2 work begins:**

- None. Phase 2 work can start immediately.

---

## RELEASE TARGETS

| Version | Name | Description | Status |
|---------|------|-------------|--------|
| v0.1.0 | Foundation | Boundary doctrine, registry, tooling, templates, dashboard | ✅ Done |
| v0.2.0 | Core Portable | DCP extracted as standalone template; SKU boundaries defined | ✅ Done |
| v0.3.0 | Governance Kit | Governance Kit packaged and documented as separable module | ✅ Done |
| v0.4.0 | Agent Kit | Agent Kit module — task templates, routing patterns | ✅ Done |
| v0.5.0 | Team Kit | Team governance module — shared registry, review routing, team handoff | ⬜ Next |
| v1.0.0 | Studio | All modules; onboarding; consulting offering live | ⬜ |

---

## SKU ROADMAP

DCP is designed as a modular product. Each SKU is independently releaseable.

### DCP Core (free / open source)
**Target:** v0.2.0

The minimum viable DCP. Portable and replicable by any developer.

Includes:
- `projects.yaml` schema and conventions
- `dev-status.ps1` dashboard
- `validate-pointers.ps1` pointer checker
- `protect-sources.ps1` corpus guard
- `DEV-CONTROL-PLANE.md` boundary doctrine
- `README.md`
- `ONBOARDING.md`
- `docs/SKU-BOUNDARIES.md`

**Audience:** Any developer managing 3+ repos who wants a registry-driven portfolio view.

---

### DCP Governance Kit (paid or premium tier)
**Target:** v0.3.0

The planning and normalization layer. Separable from Core.

Includes:
- `docs/templates/` — DEV-PLAN, DEV-PATH, TRACKS, PROJECT-STATUS templates
- `docs/planning-normalization.md` — vocabulary, pointer shape, canonical patterns
- DEVPLAN + DEVPATH conventions
- Planning health tooling (already in dashboard)

**Audience:** Teams with multiple active projects who need consistent planning across repos.

---

### DCP Agent Kit (paid — primary differentiator)
**Target:** v0.4.0

The AI-agent governance layer. This is what separates DCP from generic service catalogs.

Includes:
- Generalised task template set (task-level governance with authority levels)
- Model routing pattern library (which agent/model for which task type)
- Agent onboarding doc template
- Multi-window / multi-agent handoff protocol
- Agent-readable planning doc conventions

**Audience:** Developers running multi-agent workflows who need routing, audit trails, and governance.

---

### DCP Studio (bundled)
**Target:** v1.0.0

All modules. Intended for solo developers or small teams running AI-augmented multi-repo development at scale.

Includes: Core + Governance Kit + Agent Kit + onboarding doc + setup guide.

---

### DCP Consulting (service)
**Target:** v1.0.0

Custom setup, workflow design, and training. Delivered as an engagement.

Deliverables: configured DCP instance, custom `projects.yaml` schema, agent routing table, team onboarding session.

**Audience:** Teams adopting AI-augmented development who want a proven starting point rather than building from scratch.

---

## TRACK PLAN

| Track | Name | Goal | Status | Next |
|-------|------|------|--------|------|
| A | Extraction | DCP Core portable as standalone template repo | ✅ Done | v0.2.0 |
| B | Governance Kit | Planning normalization, templates, and audit workflow packaged | ✅ Done | — |
| C | Agent Kit | Task templates + routing patterns as separable module | ✅ Done | — |
| D | Distribution | GitHub template, scaffold CLI, consulting offering | 🔴 Not started | DCP.30 |
| E | Team Kit | Multi-person team governance module | 🔴 Not started | DCP.40 |

---

## PRIORITY WORK ITEMS

| ID | Task | Track | Priority | Status |
|----|------|-------|----------|--------|
| DCP.10 | Extract DCP into standalone template repo | A | P0 | ✅ |
| DCP.11 | Define SKU boundaries (what is Core vs Kit vs Studio) | A | P0 | ✅ |
| DCP.12 | Write user onboarding doc (non-agent audience) | B | P1 | ✅ |
| DCP.13 | Write consulting pitch one-pager | B | P1 | ✅ |
| DCP.14 | Package Governance Kit overview | B | P0 | ✅ |
| DCP.15 | Add planning audit checklist | B | P0 | ✅ |
| DCP.16 | Run adversarial normalization audit | B | P0 | ✅ |
| DCP.20 | Agent Kit — generalise task template set | C | P2 | ✅ |
| DCP.21 | Agent Kit — write routing pattern library | C | P2 | ✅ |
| DCP.30 | Create GitHub template repository | D | P2 | ✅ |
| DCP.31 | Define consulting engagement structure and pricing | D | P2 | ⬜ |
| DCP.40 | Team Kit — shared registry and domain ownership conventions | E | P3 | ⬜ |
| DCP.41 | Team Kit — role-based review routing and PR governance | E | P3 | ⬜ |
| DCP.42 | Team Kit — team onboarding and shift handoff templates | E | P3 | ⬜ |

---

## RECENTLY COMPLETED (Phase 0)

- DCP.00 — Boundary doctrine (`DEV-CONTROL-PLANE.md`)
- DCP.01 — Source corpus protection (pre-commit hook)
- DCP.02 — Planning pointer validator (58 pointers clean)
- DCP.03 — Dashboard status + plan health columns
- DCP.04 — Planning template kit (4 templates)
- DCP.05 — Registry audit and normalization (`projects.yaml`)
- DCP.06 — README + `--help` + DEVPLAN + DEVPATH

## RECENTLY COMPLETED (Phase 1)

- DCP.10 — Extracted DCP Core into this standalone template repo
- DCP.11 — Defined Core / Governance Kit / Agent Kit / Studio / Consulting boundaries
- DCP.12 — Added user onboarding doc for self-service setup
- DCP.13 — Added consulting pitch one-pager

## RECENTLY COMPLETED (Phase 2)

- DCP.14 — Added Governance Kit package overview
- DCP.15 — Added planning audit checklist
- DCP.16 — Ran adversarial normalization audit and recorded findings

## RECENTLY COMPLETED (Phase 3)

- DCP.20 — Agent Kit: task template, cluster header pattern, authority levels, naming conventions
- DCP.21 — Agent Kit: routing patterns, escalation levels, cost discipline, agent onboarding template, handoff protocol

---

## MARKET POSITION

**Problem:** AI-agent-assisted development is chaotic at scale. No standard tooling exists for governing multi-agent workflows across multi-repo portfolios.

**Solution:** DCP — a typed, registry-driven control plane with first-class agent governance. Borrows from enterprise service catalog patterns (Backstage) and applies them at individual and studio scale.

**Differentiation:**
- Agent Kit is the only module in this space addressing agent routing, authority levels, and audit trails at task granularity
- Boundary doctrine prevents the common failure mode of conflating governance, standards, execution, and runtime
- Modular — you can adopt any single layer without buying into the full stack

**Adjacent tools:** Backstage (enterprise only, no agent layer), Linear (project execution only), Notion (no integrity enforcement), GitHub Projects (no cross-repo registry, no agent support).

**Target customers:**
1. Solo developers running 3+ repos with AI agents
2. Small teams (2–8 people) adopting AI-augmented development
3. Studios and consultancies building AI-assisted products
