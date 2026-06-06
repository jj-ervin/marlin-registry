# DEVPATH — {{Project Name}}

**AUTHORITY LEVEL: AL:{{1|2|3}}**
**Status:** ACTIVE — single authoritative source for {{project}} development path
**Updated:** {{YYYY-MM-DD}}
**Supersedes:** {{list any prior files this replaces, or "N/A"}}

---

## CANONICAL DOC RULE

`DEVPATH.md` owns: phase history, design decisions, PASS registry, model routing, agent onboarding.
`DEVPLAN.md` owns: current execution state, active milestones, release targets.

Do not create or revive alternate root files named `devpath`, `DEV-PATH`, etc.

---

## AGENT ONBOARDING — Read this first

Before starting any task in this repo, read in order:

1. {{link to global invariants or governance doc, if applicable}}
2. {{link to PASS index or task registry, if applicable}}
3. **This file** — current phase, your task ID, model suggestion
4. The relevant implementation PASS or task file

---

## MODEL ROUTING

{{Optional — remove if not using multi-agent workflow.}}

| Task type | Assigned window | Model |
|-----------|----------------|-------|
| Architecture / governance | Window 1 — Claude Code | Claude |
| Structured code generation | Window 2 — Codex | GPT |
| In-editor edits | Window 3 — Copilot | Copilot |

---

## PHASE HISTORY

### Phase 1 — {{Name}} ({{start date}} → {{end date or "ongoing"}})

**Goal:** {{what this phase was trying to achieve}}

**Key decisions:**
- {{decision and rationale}}

**Completed:**
- {{PROJ.00}} — {{description}}

**Carried forward:**
- {{PROJ.01}} — {{description}}

---

### Phase 2 — {{Name}} ({{start date}} → ongoing)

*(Add phases as the project progresses.)*

---

## PASS / TASK REGISTRY

| ID | Name | Status | Phase | Notes |
|----|------|--------|-------|-------|
| {{PROJ.00}} | {{name}} | done | 1 | {{notes}} |
| {{PROJ.01}} | {{name}} | in_progress | 2 | {{notes}} |

Status values: `planned` · `in_progress` · `blocked` · `done` · `deferred` · `unknown_needs_audit`

---

## CHANGELOG LINKS

- `{{path/to/passchangelog.md}}` — session handoff log
- `{{path/to/CHANGELOG.md}}` — public-facing release changelog
