# DEV-PLAN - dxp-org

**AUTHORITY LEVEL: AL:1**
**Status:** ACTIVE
**Updated:** 2026-06-09

---

## CANONICAL DOC RULE

`DEV-PLAN.md` owns: current execution state, active milestones, release targets, and project disposition.
`DEV-PATH.md` owns: phase history, decisions, naming cleanup, and the task registry.

This file governs the `dxp-org` workspace as a portfolio root. Individual repos own their own execution details.

---

## CURRENT POSITION

**Active phase:** Phase 1 - Workspace normalization
**Current state:** Multi-repo workspace with DCP control-plane coverage emerging
**Next target:** Every active repo has canonical planning docs, an unambiguous status, and a clear OSS-versus-paid-tier disposition.

The immediate concern is reducing name ambiguity around DevToolkit. The old `devtoolkit` repo has been moved out of the active workspace, and `devxtoolkit-v1-x` is now the active v1 implementation.

The larger product direction is to get DevX Control Plane and DevXToolkit to credible OSS release quality first. Paid-tier work should be treated as a later Pass6 track: differentiated, ahead-of-industry features that build on proven OSS adoption rather than distracting from release readiness.

---

## PROJECT DISPOSITION

| Project | Status | Role | Next |
| --- | --- | --- | --- |
| `devx-control-plane` | active | Portfolio governance and dashboard tooling; OSS baseline before paid Pass6 tier | Keep canonical DCP docs current and define OSS release criteria |
| `devxtoolkit-v1-x` | active | Current PowerShell DevXToolkit implementation; OSS release candidate path | Finish legacy absorption and release stabilization |
| `devxtoolkit-v2-x` | scaffold | Future paid-tier DevXToolkit architecture/research track | Define Pass6 scope after v1 OSS baseline is stable |
| `devx-toolkit` | needs audit | Separate TypeScript/toolkit repo | Determine relationship to DevToolkit naming family |
| `dotgovernance` | stable/wip | Governance Commons OSS release surface, with Pass6 and VS Code extension possibilities | Register in control-plane once status is confirmed |

---

## RELEASE TARGETS

| Target | Name | Description | Status |
| --- | --- | --- | --- |
| DXP.0 | Baseline | Create portfolio planning docs | In progress |
| DXP.1 | Registry | Register active projects in the control-plane registry | Planned |
| DXP.2 | Naming cleanup | Remove ambiguous legacy toolkit folders from active workspace | In progress |
| DXP.3 | Repo disposition | Decide archive/active/scaffold status for every repo | Planned |
| DXP.4 | Validation | Dashboard and pointer validation clean across the portfolio | Planned |
| DXP.5 | OSS readiness | Prepare DCP, DevXToolkit v1, and Governance Commons for public OSS release expectations | Planned |
| DXP.6 | Pass6 paid-tier futures | Define ahead-of-industry capabilities for DCP paid tier, DevXToolkit v2 paid tier, Governance Commons Pass6, and possible VS Code extension | Planned |

---

## PRODUCT LADDER

| Layer | Intended availability | Purpose | Notes |
| --- | --- | --- | --- |
| Governance Commons OSS | OSS | Shared governance structure, templates, and agent-readable project context | Currently closest to OSS release posture |
| DevX Control Plane OSS | OSS | Portfolio registry, planning visibility, validation, and dashboard tooling | Must be useful without paid features |
| DevXToolkit v1 | OSS | Practical developer workflow tooling and PowerShell implementation | Stabilize before v2 expansion |
| DCP Pass6 | Paid tier candidate | Advanced control-plane automation, intelligence, and team/enterprise capabilities | Validate demand before overbuilding |
| DevXToolkit v2 | Paid tier candidate | Next-generation toolkit architecture and premium developer workflows | Keep as scaffold/research until OSS base proves value |
| Governance Commons Pass6 | Paid tier candidate | Ahead-of-industry governance capabilities beyond the OSS template layer | May include deeper evidence, automation, or compliance features |
| VS Code extension | Undecided | Developer-facing adoption surface for Governance Commons, DCP, or DevXToolkit | Pricing depends on whether users value it as workflow-critical |

---

## PRIORITY WORK ITEMS

| ID | Task | Priority | Status |
| --- | --- | --- | --- |
| DXP.01 | Add `DEV-PLAN.md` and `DEV-PATH.md` to `dxp-org` | P0 | In progress |
| DXP.02 | Add planning docs to `devxtoolkit-v1-x` | P0 | In progress |
| DXP.03 | Add planning docs to `devxtoolkit-v2-x` | P0 | In progress |
| DXP.04 | Confirm `devx-control-plane` existing planning docs are canonical | P0 | In progress |
| DXP.05 | Update DCP registry to include active workspace repos | P1 | Planned |
| DXP.06 | Audit `devx-toolkit` naming and relationship to DevToolkit | P1 | Planned |
| DXP.07 | Commit or archive legacy `devtoolkit` disposition cleanly | P1 | Planned |
| DXP.08 | Define OSS release criteria for DCP and DevXToolkit v1 | P1 | Planned |
| DXP.09 | Define Governance Commons OSS release checklist | P1 | Planned |
| DXP.10 | Draft Pass6 paid-tier hypothesis for DCP, DevXToolkit v2, and Governance Commons | P2 | Planned |
| DXP.11 | Decide whether the VS Code extension is OSS, paid, freemium, or deferred | P2 | Planned |

---

## SYNTHESIS-DERIVED QUEUED WORK

Registered 2026-06-09 from 2-agent synthesis (Claude + ChatGPT, 102 sources). Items G1–G9 are the synthesis adoption recommendations for DCP. Items H1–H6 are documented anti-patterns that must not enter the codebase. Full rationale in `docs/sessions/2026-06-09-combined-synthesis.md`.

### Phase 2 — DCP Capability Items (G1–G9, after OSS baseline is stable)

| ID | Item | Synthesis Ref | Priority | Phase |
| --- | --- | --- | --- | --- |
| DXP-SYN-G1 | eco.runtime.sovereign profile — local execution as baseline; graceful degradation cloud → edge → offline; never fails silently when offline | G1 | P1 | Phase 2 |
| DXP-SYN-G2 | Long-running agent lifecycle management — checkpointing, self-healing, thermal/load-aware scheduling | G2 | P1 | Phase 2 |
| DXP-SYN-G3 | Event-driven execution substrate — serverless-local semantics; agents spawned on demand, contexts dissolved after completion | G3 | P1 | Phase 2 |
| DXP-SYN-G4 | Steady-state contracts as module admission requirement — every module declares latency, throughput, and memory bounds before being admitted | G4 | P1 | Phase 2 |
| DXP-SYN-G5 | Fault injection as native DCP capability — node crashes, message delays/drops, memory pressure, storage unavailability, network partitions | G5 | P1 | Phase 2 |
| DXP-SYN-G6 | eco.compute.profile — hardware capability introspection advertised to governance layer; used for routing decisions and CAPS pack selection | G6 | P2 | Phase 2/3 |
| DXP-SYN-G7 | Deterministic compiled artifacts — content-addressed, not timestamp-addressed; fix PASS-1 determinism (compiler currently embeds timestamps, breaking audit trail) | G7 | **P0 — fix now** | Phase 1 |
| DXP-SYN-G8 | Locality-first memory islands — multiple small domain-specific clusters; portable, encrypted, policy-access-controlled memory per Walrus Memory pattern | G8 | P3 | Phase 3/Pass6 |
| DXP-SYN-G9 | Edge/offline governance profile — local policy cache + reconnection reconciliation protocol + conflict resolution spec | G9 | P2 | Phase 2 |

> **DXP-SYN-G7 is a Phase 1 fix, not Phase 2.** The compiler timestamp embedding breaks PASS determinism today — audit replay against content-addressed artifacts is impossible until this is fixed. Add to DXP.0 baseline work.

### Anti-Patterns (from synthesis Section H — what DCP must not become)

These are documented as constraints, not roadmap items. Any work that introduces these patterns MUST be flagged at planning time:

| Anti-Pattern | Risk | Synthesis Ref |
| --- | --- | --- |
| Cloud-first execution defaults ("requires network to start") | Breaks offline-first constitutional doctrine; fails in field environments | H |
| Monolithic daemon architecture | Separate registry, dispatcher, telemetry, escalation, retry — monolith cannot be independently scaled or replaced | H |
| Hardcoded paths, IDs, and timeouts | All environment-specific values go through a config layer; hardcoding breaks portability | H |
| Governance files with no runtime enforcement path | Anti-stall rules with no heartbeat mechanism are documentation-theater | H |
| Unbounded memory growth without dreaming-loop consolidation | Memory grows without bound; dreaming loop (DXP-SYN-G8) is the required mechanism | H |
| Synchronous blocking execution for long-running tasks | Heartbeat contracts required; no long-running task may block without a checkpoint protocol | H |

### Regulatory Context for DCP

| Regulation | Deadline | Relevant DCP Work |
| --- | --- | --- |
| EU AI Act — general applicability | August 2, 2026 | ADM transparency output in DCP governance records |
| Colorado SB26-189 ADMT regime | January 1, 2027 | DCP governance records must support jurisdiction-adaptive output |

---

## OPERATING RULES

- `dxp-org` is a workspace root, not a monolithic application.
- Project execution belongs inside individual project repos.
- DCP owns registry, dashboard, validation, and portfolio governance.
- Legacy repo names should not remain in the active workspace if they create ambiguity.
- A repo should not be deleted until its code, docs, tests, and history disposition are understood.
- OSS release readiness comes before paid-tier implementation.
- Pass6 is a product hypothesis until user demand and willingness to pay are validated.
