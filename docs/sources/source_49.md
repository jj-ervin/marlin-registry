# Source 49

# === BEGIN SUMMARY BLOCK ===

## Links
- https://www.anthropic.com/research/memory-and-new-tools
- https://www.manageengine.com/products/servicedesk/zia-agents.html
- https://modelcontextprotocol.io

## Article Details

### Anthropic — Memory Consolidation and Dreaming
- **Source:** anthropic.com
- **Title:** Memory, New Tools, and Dreaming for AI Agents
- **Summary:**
  Describes an offline memory consolidation loop ("dreaming") that runs between active
  sessions. Four phases: Orient (review past sessions and memory stores) → Gather Signal
  (surface recurring mistakes, patterns, workflow gaps) → Consolidate (write structured
  notes and playbooks) → Prune & Index (resolve contradictions, remove outdated info,
  update index). Canonical memory snapshots stored as structured JSON. Contradiction
  resolution uses recency + protected-file lists. Enables agents to "write skills for
  their future selves" without modifying model weights.
- **Conceptual Signals for eco:**
  - Dreaming loop as a NEHI function: reads RunRecord history, consolidates into
    structured PASS-like notes, prunes stale governance artifacts
  - Orient → Gather Signal → Consolidate → Prune & Index maps onto eco's existing
    primitives (RunRecords, PASS records, health scoring, escalation history)
  - Canonical memory snapshots as structured JSON — compatible with eco's RunRecord format
  - Contradiction resolution using recency + protected-file lists mirrors eco's PASS
    immutability model (sealed PASSes = protected files; newer PASSes supersede older)
  - Enables eco agents to accumulate operational playbooks from real run history

### ManageEngine — Zia Agents Multi-Agent Orchestration
- **Source:** manageengine.com
- **Title:** Zia Agents — Multi-Agent IT Orchestration with Guardrails
- **Summary:**
  Multi-agent orchestration where specialized sub-agents (investigator, fixer, planner,
  documenter) are coordinated by a primary agent. A governor agent enforces boundaries
  and escalations across the pipeline. All actions are logged with full audit trails.
  Strict guardrails define what each agent can touch. Declarative agent-builder layer
  (Zia Agent Studio) for composing agent pipelines without code. No customer data used
  for model training. Full audit logs. Privacy-first.
- **Conceptual Signals for eco:**
  - Governor agent role as a meta-agent within running pipelines (distinct from NEHI's
    static policy gate — the governor is an active participant, not a pre-run check)
  - Specialized agent role taxonomy: investigator, fixer, planner, documenter, governor
    — useful pattern for structuring eco.ai agent pipelines
  - Self-heal mode label already exists in LASSO runtime — implementation is absent;
    governed auto-remediation layer (try auto-fix → escalate to human if fails) is the gap
  - Privacy and auditability already fully present in eco (RunRecord, AuditTrailVerifier,
    locked record_required=True) — validated, not new

### Model Context Protocol (MCP)
- **Source:** modelcontextprotocol.io
- **Summary:** See source_47.md — already captured. Cross-reference only.
- **Conceptual Signals for eco:** See source_47.md.

## Overall Summary
This source captures dreaming-style memory consolidation (Anthropic) and multi-agent
orchestration with self-healing patterns (ManageEngine) evaluated against eco's current
architecture. Three genuinely new concepts were identified. First, the dreaming loop
(MEM.00 cluster): eco logs every run in RunRecord but never reads those logs back to
improve future agent behavior. A four-phase offline consolidation loop (Orient → Gather
Signal → Consolidate → Prune & Index) applied to RunRecord history would turn eco's
write-only audit trail into a learning substrate. NEHI is the natural home; this is
Phase 6 work requiring eco.ai to be operational. Second, the governor agent role: distinct
from NEHI's static policy gate (a pre-run check), the governor agent is an active
participant inside a running multi-agent pipeline, enforcing boundaries in real time.
This is additive to AGENT.01 scope (not a new cluster). Third, governed auto-remediation:
`self_heal` is already declared as a mode label in LASSO's runtime and trace modules but
has no implementation. The current escalation model terminates at human hand-off
(EXECUTING → ESCALATED → human). A governed middle layer (EXECUTING → ESCALATED →
auto-remediation attempt under strict guardrails → escalate to human if fails) is the
natural Phase 6 evolution, tied to RT.10 (Runtime v2.0). Privacy/auditability (Point 4)
and MCP interoperability (Point 5) are already fully present in eco or captured in
source_47.md respectively.

## Inclusion Primitives (Suggested)
- dreaming loop: Orient → Gather Signal → Consolidate → Prune & Index
- NEHI as home for the offline memory consolidation loop
- RunRecord history as input to the dreaming loop
- canonical memory snapshots as structured JSON (MEM cluster output)
- contradiction resolution using recency + protected-file lists
- structured operational playbooks generated from real run history
- governor agent role: active pipeline boundary enforcer (distinct from static NEHI policy gate)
- specialized agent role taxonomy: investigator, fixer, planner, documenter, governor
- governed auto-remediation layer: try auto-fix → escalate to human if fails
- `self_heal` mode in LASSO runtime as the implementation target for auto-remediation
- MEM.00 cluster as the governance home for memory consolidation + dreaming loop

## Exclusion Primitives (Suggested)
- modifying model weights as a memory consolidation mechanism
- dreaming loop running during active execution (offline only, between sessions)
- unguarded auto-remediation (auto-remediation must be bounded by strict guardrails)
- dreaming loop as current-phase (Phase 4/5) work — requires eco.ai operational
- declarative agent-builder surface (Zia Agent Studio equivalent) as a current priority
- privacy and auditability as new primitives (already fully present in eco)
- MCP as a new concept in this source (see source_47.md)

## Other Relevant Suggestions
- Register MEM.00 cluster (Memory Consolidation / Dreaming Loop) in DEV-PATH "Not Yet
  Written" PASS registry. Phase 6 work, natural NEHI evolution. Cluster should cover:
  MEM.00 (cluster header), MEM.01 (dreaming loop spec: four phases, RunRecord input,
  canonical snapshot output), MEM.02 (contradiction resolution and pruning rules).
- Add governed auto-remediation path to RT.10 scope (Runtime v2.0): the `self_heal`
  mode label in LASSO already declares intent; RT.10 should implement it as a governed
  escalation alternative with strict action boundaries and full audit trail.
- Add governor agent role to AGENT.01 scope when that spec is written — the governor
  is an active pipeline participant, not a static pre-run policy check.
- The dreaming loop's contradiction resolution mechanism (recency + protected-file lists)
  maps directly onto eco's PASS immutability model: sealed PASSes are protected files;
  newer PASSes that supersede older ones represent the recency-wins resolution rule.
  This connection should be made explicit in MEM.01 when it is written.
- Revisit this source when writing NEHI Phase 6 evolution PASSes and RT.10.
- The agent role taxonomy (investigator, fixer, planner, documenter, governor) is a
  useful design pattern for eco.ai Phase 6 pipeline composition — reference when writing
  eco.ai use-case PASSes.

# === END SUMMARY BLOCK ===
