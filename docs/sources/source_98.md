# Source 98

# === BEGIN SUMMARY BLOCK ===

## agent-matrix Strategic Gap Analysis: Protocol Alignment, SKU Architecture, Modularity, Identity, and Federated Orchestration

### Summary
A comprehensive strategic gap analysis of agent-matrix across twelve dimensions, identifying critical blockers, high-severity architectural gaps, and medium-term risks. Companion to source_97 (agent-dossier runtime gap analysis); together they map the full spec-to-implementation debt across both projects.

**Gap 1 — Protocol & Industry Standard Alignment (Critical)**
agent-matrix has no MCP (Model Context Protocol) server/client model — missing MCP server registry, resource URI schema (`resource://`), and prompt template declarations, blocking plug-in to the growing MCP ecosystem. No A2A (Agent-to-Agent) protocol binding for cross-vendor agent discovery and negotiation. No CloudEvents (CNCF) envelope binding, isolating the matrix from standard event buses (Kafka, EventBridge, Pub/Sub). No compliance framework mapping section (analogous to agent-dossier's external-alignment.yaml) for NIST AI RMF or EU AI Act obligations at the orchestration layer.

**Gap 2 — SKU Architecture: Four Missing Dimensions (Critical)**
Current SKU model is Anthropic-only and static. Missing: provider field for multi-provider routing (GPT-4o, Gemini, Mistral, Llama); custom/enterprise SKU definition format for fine-tuned or self-hosted models and dedicated throughput agreements; dynamic SKU selection policy for real-time cost arbitrage; benchmark profile schema so routing can optimize for quality (code generation, reasoning accuracy) not just cost/latency.

**Gap 3 — Modularity: Monolithic Spec (High)**
The entire matrix is one YAML file with no compose mechanism. Missing: matrix overlays/fragments (base + overlay → merged effective matrix, Kustomize-style); named profiles (profile: minimal, profile: data-engineering); matrix inheritance (extends: ./base-matrix.yaml with override semantics); section-level imports ($ref: ./shared/capabilities.yaml). Without this, every team copies the whole file and diverges — no "inherit the standard and extend it."

**Gap 4 — Agent Registry & Discovery (High)**
No runtime agent discovery. Missing: agent registry spec (queryable catalog of live instances with declared capabilities and health); health/readiness endpoints; runtime capability advertisement protocol (vs. static matrix declaration); agent warm-standby pool spec with scaling policy.

**Gap 5 — Identity & Authentication (High)**
Matrix assumes agents are who they claim to be — no cryptographic identity layer. Missing: agent identity attestation (JWT/OIDC-style verification); key management spec for HMAC-SHA256 signing (issuance, rotation, revocation); identity federation for cross-org trust (Org 1 Agent ↔ Org 2 Agent); agent credential lifecycle management.

**Gap 6 — Formal SLA / QoS Model (High)**
SLA references are scattered. Missing: formal SLO/SLI definitions per agent profile and critical path; error budgets; P50/P95/P99 latency targets (not just P99); throughput contracts (tasks/sec per profile); SLA breach event schema.

**Gap 7 — CloudEvents Binding (Medium)**
Task routing and observability signals are internal and proprietary. Missing: CloudEvents binding spec for portable cloud-agnostic event envelope.

**Gap 8 — Streaming & Long-Running Tasks (Medium)**
State model assumes atomic task completion. Missing: streaming output schema for partial result emission; long-running task heartbeat protocol (formal liveness contract for tasks >30 min); partial result handoff between agents mid-stream; checkpoint format schema (current spec says "write checkpoint every 30s" but defines no format).

**Gap 9 — Prompt & Context Governance (Medium)**
No governance layer for prompts and context flowing through the matrix. Missing: system prompt versioning; prompt injection defense spec with structural rules and context boundary markers; canonical context schema for inter-agent handoff (context_snapshot lacks inner schema); RAG/knowledge base interface spec; prompt caching governance (PII, time-sensitive, user-specific content must not be cached).

**Gap 10 — Audit, Tamper-Evidence & Immutability (Medium)**
Audit trail declared append-only but not enforced. Missing: formal audit log schema; hash-chaining for tamper-evidence (each entry hashes previous); audit export format for external compliance systems; retention enforcement mechanism.

**Gap 11 — Workflow Patterns Library (Medium)**
No canonical workflow patterns — every orchestrator re-invents: sequential pipeline, parallel fan-out/fan-in, map-reduce, consensus (multi-agent review), tournament (multi-coder + reviewer picks best), retry-with-escalation. Missing: named workflow pattern library referenceable by orchestrators.

**Gap 12 — Distributed / Federated Orchestration (Medium)**
Single-orchestrator assumption breaks at scale. Missing: multi-orchestrator topology spec with authority division; geographic distribution model with data residency routing (EU data cannot touch US agents); cross-cluster handoff spec; orchestrator leadership election protocol.

**Recommended Scoping Order:**
- v1.2.0 (Immediate): multi-provider SKUs, matrix overlay/profile system, MCP alignment stub, formal SLA schema, checkpoint schema
- v1.3.0 (Near-term): CloudEvents binding, agent registry spec, cryptographic identity spec, workflow pattern library, prompt/context governance
- v2.0.0 (Strategic): A2A protocol alignment, federated orchestration topology, EU AI Act mapping, tamper-evident audit, full SDK binding spec

### Key Concepts
- agent-matrix, agent-dossier, PASS governance
- MCP (Model Context Protocol) — server registry, resource URI schema, prompt template declarations
- A2A (Agent-to-Agent) protocol — cross-vendor agent discovery and negotiation
- CloudEvents (CNCF) — portable cloud-agnostic event envelope
- NIST AI RMF, EU AI Act — compliance mapping at orchestration layer
- Multi-provider SKU routing (Anthropic, GPT-4o, Gemini, Mistral, Llama)
- Custom/enterprise SKU format — fine-tuned, self-hosted, dedicated throughput
- Dynamic SKU selection — real-time cost arbitrage, benchmark-based quality routing
- Matrix overlays/fragments — Kustomize-style compose; extends/override semantics
- Named profiles — minimal, data-engineering, enterprise activation subsets
- Agent registry spec — queryable live catalog with capabilities and health status
- Agent identity attestation — JWT/OIDC-style cryptographic verification
- HMAC-SHA256 key management — issuance, rotation, revocation lifecycle
- Identity federation — cross-organization agent trust
- SLO/SLI definitions — P50/P95/P99 latency, throughput contracts, error budgets
- SLA breach event schema
- Streaming output schema, long-running task heartbeat protocol
- Checkpoint format schema
- Prompt injection defense spec, context boundary markers
- System prompt versioning
- RAG/knowledge base interface spec
- Prompt caching governance — PII, time-sensitive, user-specific exclusions
- Hash-chaining tamper-evident audit log
- Named workflow pattern library — sequential, fan-out/fan-in, map-reduce, consensus, tournament, retry-with-escalation
- Multi-orchestrator topology, orchestrator leadership election
- Geographic distribution with data residency routing
- Cross-cluster handoff spec

### Cross-references
- See [[source_97]] — agent-dossier runtime gap analysis (companion document; together map full spec-to-implementation debt)
- See [[source_74]] — governance as architecture, formal specification, ACS guardrails
- See [[source_92]] — serverless MCP, protocol-native execution, eco as meta-framework
- See [[source_93]] — multi-agent governance convergence, unified control plane
- See [[source_95]] — continuous adversarial verification, formal reasoning contracts

## Links
_(internal analysis — no external URLs)_

## Article Details
- **Publication:** Internal / eco
- **Date:** 2026-06-05
- **Topics:** platform-architecture, agent-runtime, ai-governance, identity-trust, devex
- **Relevance:** eco, agent-matrix, agent-dossier, governance-commons, eos

# === END SUMMARY BLOCK ===
