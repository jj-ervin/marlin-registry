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

**Active phase:** Phase 1 — Extraction & Packaging
**Current version:** v0.1.0 (Phase 0 complete — foundation established)
**Next release target:** v0.2.0 — DCP Core portable and replicable

**Phase 0 is complete.** All foundation work is committed. DCP exists and functions as the `C:\dev` portfolio control plane.

**P0 blockers before Phase 1 work begins:**

- None. Phase 1 work can start immediately.

---

## RELEASE TARGETS

| Version | Name | Description | Status |
|---------|------|-------------|--------|
| v0.1.0 | Foundation | Boundary doctrine, registry, tooling, templates, dashboard | ✅ Done |
| v0.2.0 | Core Portable | DCP extracted as standalone template; SKU boundaries defined | ⬜ Next |
| v0.3.0 | Governance Kit | Governance Kit packaged and documented as separable module | ⬜ |
| v0.4.0 | Agent Kit | Agent Kit module — PASS templates, routing patterns | ⬜ |
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
- Generalised PASS template set (task-level governance with authority levels)
- Model routing pattern library (which agent/model for which task type)
- Agent onboarding doc template
- Multi-window / multi-agent handoff protocol
- Agent-readable planning doc conventions

**Audience:** Developers running multi-agent workflows (Claude + Codex + Copilot or similar) who need routing, audit trails, and governance.

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
| A | Extraction | DCP Core portable as standalone template repo | 🔴 Not started | DCP.10 |
| B | Documentation | Onboarding doc, consulting pitch, feature list | 🔵 Active | DCP.12 README done |
| C | Agent Kit | PASS templates + routing patterns as separable module | 🔴 Not started | DCP.20 |
| D | Distribution | GitHub template, scaffold CLI, consulting offering | 🔴 Not started | DCP.30 |

---

## PRIORITY WORK ITEMS

| ID | Task | Track | Priority | Status |
|----|------|-------|----------|--------|
| DCP.10 | Extract DCP into standalone template repo | A | P0 | ⬜ |
| DCP.11 | Define SKU boundaries (what is Core vs Kit vs Studio) | A | P0 | ⬜ |
| DCP.12 | Write user onboarding doc (non-agent audience) | B | P1 | ⬜ |
| DCP.13 | Write consulting pitch one-pager | B | P1 | ⬜ |
| DCP.20 | Agent Kit — generalise PASS template set | C | P2 | ⬜ |
| DCP.21 | Agent Kit — write routing pattern library | C | P2 | ⬜ |
| DCP.30 | Create GitHub template repository | D | P2 | ⬜ |
| DCP.31 | Define consulting engagement structure and pricing | D | P2 | ⬜ |

---

## RECENTLY COMPLETED (Phase 0)

- DCP.00 — Boundary doctrine (`DEV-CONTROL-PLANE.md`)
- DCP.01 — Source corpus protection (pre-commit hook)
- DCP.02 — Planning pointer validator (58 pointers clean)
- DCP.03 — Dashboard status + plan health columns
- DCP.04 — Planning template kit (4 templates)
- DCP.05 — Registry audit and normalization (`projects.yaml`)
- DCP.06 — README + `--help` + DEVPLAN + DEVPATH

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
