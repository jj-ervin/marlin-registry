# Source 55

# === BEGIN SUMMARY BLOCK ===

## Links
- (Copilot synthesis — no single canonical URL; synthesizes from agentic AI failure mode research)

## Article Details

### Agentic AI Failure Modes — Hidden Incidents and Enterprise Exposure
- **Source:** Copilot synthesis
- **Title:** Agentic AI Failure Modes: Local Correctness, Global Catastrophe
- **Summary:**
  Describes a systemic failure pattern in deployed agentic AI systems: agents act correctly
  within their local context but cause failures at the global system level due to missing
  global context, dependency unawareness, no resilience thresholds, and no pre-execution
  checks. Reports adoption metrics (79% enterprise adoption, 96% expansion rate, 40%
  failure risk from agent-caused incidents). Proposes: resilience budgets, intent-based
  chaos simulation, dependency saturation modeling, AI-assisted RCA, and unified agent +
  infrastructure governance. Names the solution space "Agentic Resilience OS."
- **Conceptual Signals for eco:**
  - Failure pattern (local correctness, global catastrophe) validates eco's environment-first
    architecture: Cockpit as arbiter, modes as constraint layers, environment state as truth
  - "Agentic Resilience OS" — category-defining name for what eco is building
  - "eco competing with the absence of governance" — strong positioning frame for REL.00/DEV.00
  - Resilience Gate framing: NEHI safety gate stub replacement should function as a global
    system readiness check (not just local policy compliance) — extends SEC.00 scope
  - Most specific proposed primitives are already present or queued in eco

## Overall Summary
This research describes agentic AI failure modes where agents behave correctly locally but
cause global system failures, and proposes architectural responses. Evaluated against eco's
current architecture: eco is already designed to prevent these failure modes, making this
primarily validation research with narrow additional signal.

What eco already has for each proposed primitive:
- Intent-Aware Execution: already present — submit_run_intent() 8-step path in NEHI,
  ACES #8 No Silent Autonomy, RunRequest captures declared intent before execution
- Postmortem Templates (Unified): already present — RunRecord captures final_state,
  escalation, state_history, policy_applied; AuditTrailVerifier covers IEC 62443 SR 6.1
- RCA Pipelines: in queue — AnomalyDetector (EDGE.12) for runtime anomalies;
  predict_diagnostics (NEHI, stub status flagged in source_52); MEM.00/01 dreaming loop
  reads RunRecord history and is the natural RCA substrate
- Agentic Chaos Mode: queued — source_53 registered fault-injection tests for CAPS packs
  and HAL adapters (Track A); LASSO stress.py adversarial suite; PASS 2100.00
- Pre-Flight Checks: flagged as stub — NEHI safety gate is explicitly "minimal contract
  stub, MUST be replaced before production" (NEHI.01); OG.01 Gate Conditions covers this
- Dependency Maps: partially present — source_run_ids (DP-4-11-03) provides backward
  lineage on RunRecord; forward dependency graph is a Phase 6+ concern not yet registered

Two items have genuine signal.

First, positioning vocabulary: "Agentic Resilience OS" and "competing with the absence of
governance" are the strongest phrases in this research. They slot alongside "trust amplifier"
(source_52) and "eco-above-NVIDIA" (source_54) as positioning language for REL.00 (Phase
5.1) and DEV.00 (Phase 7.2). The specific market framing ("reduces the 40% failure rate of
agentic AI by providing a governed, resilient execution environment") is useful for
external-facing documentation, though the statistics are Copilot-synthesized and should
not be cited as verified figures.

Second, Resilience Gate framing for the NEHI safety gate replacement. The safety gate stub
in NEHI is already flagged in SEC.00 scope as needing replacement. This research adds a
dimension to that replacement requirement: the new safety gate should function as a global
system readiness check — verifying environmental preconditions, dependency availability,
and blast radius before allowing execution — not only as a local policy compliance check.
This distinction is worth adding to the SEC.00 description in DEV-PATH.

Resilience Budgets as a distinct numeric primitive: partially overlaps with blast_radius
(DP-4-11-07, low|medium|high|critical) and timeout_seconds in RunPolicy. If eco needs a
continuous numeric threshold (e.g., max_failure_count, retry_budget) distinct from
blast_radius classification, this is a Stage 4.11 or RT.01 scope addition. Not registering
as a task yet — the blast_radius field plus existing escalation logic covers the intent;
a separate failure budget field can be added when NEHI Phase 6 evolution PASSes are written.

The enterprise metrics (79% adoption, 96% expansion, 40% failure risk) are Copilot
synthesized and should not be cited as verified figures. Use as directional framing only.

## Inclusion Primitives (Suggested)
- "Agentic Resilience OS" as eco category name in REL.00 and DEV.00
- "competing with the absence of governance" as eco positioning frame
- "reduces the 40% failure rate of agentic AI" as directional (unverified) business narrative
  for external-facing documentation — not a spec claim
- Resilience Gate framing added to SEC.00 scope: NEHI safety gate replacement must function
  as a global system readiness check (environmental preconditions, dependency availability,
  blast radius) not just local policy compliance

## Exclusion Primitives (Suggested)
- Intent-Aware Execution as new (already present: submit_run_intent, ACES #8, RunRequest)
- Unified Postmortem Templates as new (already present: RunRecord, AuditTrailVerifier)
- RCA Pipelines as new (already queued: AnomalyDetector, MEM.00/01 dreaming loop)
- Agentic Chaos Mode as new (already queued: source_53 fault-injection Track A)
- Pre-Flight Checks as new (already flagged: NEHI safety gate stub in SEC.00 scope)
- Resilience Budgets as a new required task (blast_radius + timeout already cover the intent;
  defer numeric failure budget to NEHI Phase 6 evolution PASSes)
- Dependency Maps as current-phase work (Phase 6+ concern; source_run_ids covers lineage)
- Enterprise metrics as verified figures (Copilot-synthesized; directional only)

## Other Relevant Suggestions
- Add "Agentic Resilience OS" to the positioning vocabulary list in REL.00 and DEV.00
  alongside "trust amplifier," "fast where it can be / careful where it must be," and
  "eco-above-NVIDIA" framing from prior sources.
- Expand SEC.00 description in DEV-PATH to add: NEHI safety gate replacement must function
  as a Resilience Gate — global system readiness check (dependency availability,
  environmental preconditions, blast radius pre-flight) not just local policy compliance.
- When writing NEHI Phase 6 evolution PASSes, consider a numeric failure_budget field on
  RunPolicy (complement to blast_radius classification). Not a task yet; evaluate when
  blast_radius is implemented.
- Revisit this source when writing REL.00 (Phase 5.1 positioning), DEV.00 (Phase 7.2
  external onboarding), and when writing the NEHI safety gate replacement spec.

# === END SUMMARY BLOCK ===
