# Source 99

# === BEGIN SUMMARY BLOCK ===

## project-orchestrator-agent Gap Analysis: Stale Planning Artifacts, Unreachable Escalation, Missing Runtime Enforcement, and Test Coverage Gaps

_Part of the Governance Commons gap analysis series (sources 97–101)._

### Summary
Post-PASS-2026-0002 gap analysis of project-orchestrator-agent following the Python rewrite. All 26 compiler tests pass, but nine gaps remain across governance enforcement, runtime wiring, test coverage, and spec compliance. Companion to source_97 (agent-dossier) and source_98 (agent-matrix) — together the three documents map the full implementation debt across the eco agent runtime stack.

**Gap 1 — Stale Planning Artifacts (Governance Risk, P0)**
DevPath-v1.0.md still marks PASS-1, PASS-2, PASS-3 as PENDING despite all three being substantially implemented. Tracks.md shows PENDING for A-002, A-003, B-002, B-003, C-003, C-004 — code for all exists. CHANGELOG.md has only a PASS-0 entry; the Python rewrite (PASS-2026-0002) has no CHANGELOG entry. Impact: compiled task-queue.json reflects stale statuses, so re-running `orchestrate compile tasks` will re-queue already-complete work.

**Gap 2 — Escalation Level 2 Is Unreachable (P0)**
In `orchestrator/escalation.py:27-31`, `resolve_level()` maps: attempt < retry_limit → level 0; attempt == retry_limit → level 1; attempt > retry_limit → level 3. Level 2 (operator_clarification) is never returned — the `handle()` branch at line 54 is dead code. The spec and governance/multi-agent.yaml both define level 2 as a valid escalation path.

**Gap 3 — Agents Don't Emit Their Own Telemetry (P1)**
`agents/base.py:73` log() is just print(). Agents never call telemetry.emit() directly — all trace events come from the dispatcher. No agent-level handshake event on boot, no task_acceptance with the agent's own trace perspective. P4.1 acceptance criterion ("every task execution produces a trace entry from the agent") is not met.

**Gap 4 — governance/multi-agent.yaml Has No Validation or Runtime Path (P3)**
governance/multi-agent.yaml defines per-agent dossiers, anti-stall rules, handoff protocol, threat model, and reproducibility — but nothing reads it at runtime. Agents don't load their individual dossiers from this file; identity is hardcoded. Anti-stall rules (max_idle_ms: 10000, heartbeat_interval_ms: 2000) are governance-only with no heartbeat mechanism in the orchestrator. No schemas/multi-agent.schema.json exists to validate it.

**Gap 5 — Handoff Envelopes Not Implemented (P2)**
governance/multi-agent.yaml:244-252 defines required handoff envelope fields (envelope_id, from_agent, to_agent, task_state, completed_work, assumptions, risks). Level-1 escalation in `orchestrator/escalation.py:48-51` only logs a warning — it never produces a structured handoff envelope.

**Gap 6 — Resource Budget Enforcement Incomplete (P3)**
`models/contract.py:31` RuntimeContract carries time_limit, token_limit, tool_call_limit, cost_limit from the dossier — but the orchestrator only reads retry_limit. Nothing enforces per-agent time limits, token caps, or tool call limits at runtime.

**Gap 7 — models/task.py Is Unused (P1)**
models/task.py defines Task and TaskQueue Pydantic models with proper validation. Both orchestrator and compiler work with raw dict instead. TaskStatus.IN_PROGRESS is never set — task-queue.json is read-only at runtime with no status persistence.

**Gap 8 — runtime-contract.yaml Is Non-Deterministic (P1)**
`compiler/compile_dossier.py:92` embeds a timestamp into trace.trace_id on every compile. File changes on every run even with no dossier changes, breaking the PASS-1 determinism acceptance criterion and creating noise in git diffs.

**Gap 9 — Zero Test Coverage for Agents and Orchestrator (P2)**
Compiler layer has 26 tests (all green). Agents, orchestrator, and cli.py have zero tests. Track E tasks E-003 (integration test orchestrator dispatch) and E-004 (synthetic stall test) remain BACKLOG. No test exercises the dispatcher retry loop, escalation trigger, or any agent's execute() path.

**Prioritized Fix List:**
- P0: Update DevPath + Tracks + CHANGELOG to reflect actual state (Low effort)
- P0: Fix unreachable level-2 escalation in resolve_level() (Low effort)
- P1: Add agent-level telemetry — handshake + task_acceptance events (Low effort)
- P1: Make runtime-contract.yaml compile deterministically — stable trace_id (Low effort)
- P1: Wire models/task.py into compiler and orchestrator — drop raw dicts (Medium effort)
- P2: Add integration tests for dispatcher + agents (Medium effort)
- P2: Implement handoff envelopes for level-1 escalation (Medium effort)
- P3: Enforce per-agent resource budgets — time_limit, tool_call_limit (High effort)
- P3: Validate + load governance/multi-agent.yaml at runtime (High effort)
- P3: Implement anti-stall heartbeat mechanism (High effort)

### Key Concepts
- project-orchestrator-agent, PASS-2026-0002, Python rewrite
- DevPath-v1.0.md, Tracks.md, CHANGELOG.md — stale planning artifact risk
- task-queue.json — compiled artifact, not hand-written; re-compile risk from stale Tracks
- orchestrator/escalation.py:27-31 — resolve_level() missing level-2 branch (operator_clarification dead code at line 54)
- agents/base.py:73 — log() as print(), no telemetry.emit() from agent layer
- P4.1 acceptance criterion — agent-level trace entry per task execution
- governance/multi-agent.yaml — per-agent dossiers, anti-stall rules, handoff protocol, threat model; no runtime reader
- Anti-stall rules: max_idle_ms: 10000, heartbeat_interval_ms: 2000 — governance-only, no enforcement
- schemas/multi-agent.schema.json — missing validator
- Handoff envelope fields: envelope_id, from_agent, to_agent, task_state, completed_work, assumptions, risks
- models/contract.py:31 RuntimeContract — time_limit, token_limit, tool_call_limit, cost_limit unused at runtime
- models/task.py Task + TaskQueue Pydantic models — unused; raw dict used instead
- TaskStatus.IN_PROGRESS — never set; no runtime status persistence
- compiler/compile_dossier.py:92 — timestamp in trace_id breaks determinism (PASS-1 criterion)
- Track E tasks E-003, E-004 — dispatcher integration test and synthetic stall test remain BACKLOG

### Cross-references
- See [[source_97]] — agent-dossier runtime gap analysis (P0 gaps overlap: schema wiring, handoff envelope, PASS ID enforcement)
- See [[source_98]] — agent-matrix strategic gap analysis (streaming/checkpoint schema, SLA/QoS, identity attestation gaps mirror these)
- See [[source_74]] — governance as architecture, formal specification, ACS guardrails
- See [[source_95]] — continuous adversarial verification, formal reasoning contracts

## Links
_(internal analysis — no external URLs)_

## Article Details
- **Publication:** Internal / eco
- **Date:** 2026-06-05
- **Topics:** platform-architecture, agent-runtime, ai-governance, devex
- **Relevance:** eco, agent-matrix, agent-dossier, governance-commons, eos

# === END SUMMARY BLOCK ===
