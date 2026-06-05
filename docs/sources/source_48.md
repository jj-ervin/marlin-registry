# Source 48

# === BEGIN SUMMARY BLOCK ===

## Links
- https://learn.microsoft.com/en-us/entra/identity/
- https://www.workday.com/en-us/products/platform/agent-system-of-record.html
- https://www.anthropic.com/news/claude-api-tool-use

## Article Details

### Microsoft Entra Agent ID
- **Source:** learn.microsoft.com
- **Title:** Microsoft Entra Agent ID — Agent Identity and Credentialing
- **Summary:**
  Cryptographically verifiable agent identities integrated with Azure Active Directory.
  Provides role-based access control (RBAC), task-scoped permission grants, and audit
  trails for every agent action. Positions identity as the foundational governance
  primitive for multi-agent systems.
- **Conceptual Signals for eco:**
  - Agent identity as a runtime primitive (not a human-convention)
  - Task-scoped permissions: permissions tied to the task, not the agent class
  - Cryptographic verification as NEHI safety gate input
  - Audit trail per agent action → extends RunRecord

### Workday Agent System of Record (ASOR)
- **Source:** workday.com
- **Title:** Workday Agent System of Record
- **Summary:**
  Treats agents as organizational entities: registered, governed, lifecycle-managed.
  Defines agent lifecycle states (draft → active → suspended → archived) and policy
  inheritance (team → project → agent). Agents are treated like employees — they have
  records, roles, and accountability chains.
- **Conceptual Signals for eco:**
  - Agent Registry as a first-class governance component
  - Lifecycle state machine for agents (draft → active → suspended → archived)
  - Policy inheritance hierarchy for agent permissions
  - NEHI as natural home for an eco agent registry

### Anthropic / Microsoft Multi-Model Governance Collaboration
- **Source:** anthropic.com
- **Title:** Claude API Tool Use and Cross-Model Governance
- **Summary:**
  Multiple models coexisting under a shared governance boundary. Policy-enforced model
  selection rather than convention-based routing. Cross-model safety harmonization.
  Enterprise pricing signals what the market values: governance, security, control planes.
- **Conceptual Signals for eco:**
  - Policy-enforced model selection in LASSO (beyond documented convention in DEV-PATH)
  - Model-agnostic agent interface already present in eco; needs runtime enforcement layer
  - Cross-model safety harmonization as a NEHI concern

### Copilot Synthesis — Multi-Agent Governance Primitives for eco
- **Source:** Copilot (synthesized, no single URL)
- **Title:** Unified Control Plane and Agent Governance for AI Platforms
- **Summary:**
  Six-point synthesis covering unified control plane, agent identity and credentialing,
  agent system of record integration, governance-first architecture, model diversity with
  governance boundaries, and pricing/licensing awareness. Broad framing validates eco's
  existing design but identifies two genuine runtime gaps: agent identity layer and agent
  registry. Governance-first and audit trail concepts are already fully present in eco.
- **Conceptual Signals for eco:**
  - Agent identity and registry as the two genuine gaps in eco's control plane
  - Policy-enforced model selection as Phase 6 LASSO evolution
  - Modular licensing / tiered capabilities as Track B SKU input (not runtime architecture)

## Overall Summary
This source captures multi-agent governance research (Entra Agent ID, Workday ASOR,
cross-model governance) evaluated against eco's existing architecture. The evaluation
found that eco's governance foundation is solid: NEHI + LASSO + RunPolicy constitutes
a unified control plane; ACES.01 + PASS system + RunRecord constitutes governance-first
architecture; AuditTrailVerifier + state_history constitutes enterprise auditability.
Two genuine runtime gaps were identified. First, agent identity: eco currently identifies
agents by window/role convention (documented in DEV-PATH model routing table) but has no
cryptographic identity, per-agent RBAC, or task-scoped permissions enforced at runtime.
As eco.ai moves from human-at-a-window to autonomous agent spawning, agents need verifiable
identities that NEHI's safety gate can check. Second, agent registry: eco has registries for
events, artifacts, tools, and schemas — but not for agents. A registry with lifecycle states
(draft → active → suspended → archived) and policy inheritance is the natural complement to
agent identity, and NEHI is the natural home. A third gap is policy-enforced model selection
in LASSO: current model routing is a documented convention in DEV-PATH, not a programmatic
enforcement contract. When eco.ai operates autonomously, "only Claude for PASS writing, never
GPT" must be enforced at runtime, not just documented. These three gaps warrant a future
AGENT.00 cluster and LASSO evolution PASS. Modular licensing and tiered capability architecture
are inputs to REL.00 and Track B SKU definition, not runtime primitives.

## Inclusion Primitives (Suggested)
- agent identity layer: cryptographically verifiable, task-scoped, auditable
- agent registry: lifecycle states (draft → active → suspended → archived)
- policy inheritance for agent permissions (team → project → agent)
- NEHI as the natural home for agent identity + registry governance
- task-scoped permissions (permissions tied to task, not agent class)
- policy-enforced model selection in LASSO (Phase 6 LASSO evolution)
- agent identity as input to NEHI safety gate evaluation
- RunRecord extension: per-agent-identity audit trail entry
- AGENT.00 cluster as the governance home for identity + registry specs

## Exclusion Primitives (Suggested)
- Azure Active Directory / Entra as eco's identity provider (eco is provider-agnostic)
- Workday ASOR as a dependency (pattern only, not the system)
- convention-based model routing as sufficient for autonomous eco.ai agents
- treating governance-first, auditability, and control plane as gaps (already present)
- modular licensing as a runtime architecture primitive (business model input only)
- adopting agent identity or registry as current-phase (Phase 4) work

## Other Relevant Suggestions
- Register AGENT.00 cluster (Agent Identity + Registry) in DEV-PATH "Not Yet Written"
  PASS registry. Natural Phase 5 pre-work before eco.ai autonomous agent spawning begins.
- When writing AGENT.00, use Entra Agent ID and Workday ASOR as reference patterns —
  not as dependencies. eco's identity layer should be provider-agnostic.
- When writing LASSO.04+ (external tool routing), include policy-enforced model selection
  as a contract requirement: model routing rules declared in LASSO policy, not in DEV-PATH docs.
- When writing NEHI Phase 6 evolution PASSes, add agent identity verification as a step in
  the safety gate evaluation path (NEHI.01 submit_run_intent 8-step path → add identity check).
- When writing REL.00 and ENT.00 (Phase 5), draw on the modular licensing and tiered
  capability framing for Track B SKU definition.
- The agent lifecycle state machine (draft → active → suspended → archived) maps naturally
  onto eco's existing state machine pattern in the runtime layer.
- Revisit this source when writing AGENT.00 and when NEHI gets its Phase 6 evolution spec.

# === END SUMMARY BLOCK ===
