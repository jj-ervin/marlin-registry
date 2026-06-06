# Source 101

# === BEGIN SUMMARY BLOCK ===

## Governance Commons Gap Analysis & Industry Positioning: Protocol Alignment, Security, Observability, Compliance Depth, and Ahead-of-Curve Opportunities

### Summary
Strategic gap analysis and industry positioning document for Governance Commons as a whole — covering all four specs (agent-dossier, agent-matrix, ONS, and the conformance layer) together. Identifies current strengths, seven gap categories, and a three-tier action ladder: unblocks adoption, industry-aligned, and ahead of the curve. Capstone document for the internal gap analysis series (sources 97–101).

**Current Strengths:** Four complementary independently versioned specs with machine-readable schemas, PASS-dated audit trails, multi-profile conformance, reference validators, EU AI Act / NIST AI RMF mappings, and a working web presence. Design philosophy (project-neutral, layered adoption, portable handshake) is correct. Genuinely ahead of most open-source efforts.

**Gap 1 — Protocol & Interoperability (Critical)**
A2A binding is a surface mention only — Google's A2A spec (April 2025) is gaining fast traction; full protocol conformance section needed covering task lifecycle states, streaming responses, push notification contracts, and authentication headers (Bearer/API key). MCP not a first-class governance primitive — spec needs explicit governance rules for tool exposure surface, per-tool permission scopes, MCP server trust levels, and resource URI governance. All specs are document-level and silent on transport — no binding to HTTP/2 SSE, WebSocket, gRPC, or message queues (NATS, Kafka). No conformance statements or adapter docs for AutoGen, CrewAI, LangGraph, LlamaIndex, or OpenAI Swarm.

**Gap 2 — Security (Critical)**
No cryptographic integrity — handoff envelopes have IDs and timestamps but no signatures; can be replayed, forged, or tampered in transit. Needs envelope_signature block with JWS/Ed25519 signing and key material references. No agent identity verification — agent_id is a string naming convention with no cryptographic binding; W3C DIDs or public-key anchoring needed. No zero-trust model — trust levels T0–T4 exist but how trust is established, verified, or revoked at runtime is fully deferred. No secrets/credential governance — no standard for agent API key/token receipt, rotation, or scoping. SLSA attestation deferred — needed before enterprise adoption.

**Gap 3 — Observability (High)**
OpenTelemetry listed in external-alignment.yaml but not specified — no defined span names, attribute keys, metric names, or log formats. GenAI semantic conventions (gen_ai.* namespace) actively being standardized in OTel project; a concrete observability-contract.yaml mapping governance events to OTEL traces/metrics/logs is missing. No structured event schema — agent lifecycle events (started, blocked, escalated, handed off, completed) have no canonical event envelope, making cross-system correlation impossible. No anomaly detection contract — no spec for what "unexpected behavior" looks like in telemetry.

**Gap 4 — Compliance Depth (High)**
NIST AI RMF: surface mapping only, no control evidence generation. EU AI Act: no risk classification workflow, no Article-specific traceability. ISO 42001 (AI Management Systems): missing entirely. SOC 2 Type II: no control mapping. GDPR: data-residency.yaml overlay exists but no data subject rights, processing basis, or retention governance. DORA (EU financial): not addressed. The compliance-evidence-export.yaml example is good marketing but the spec doesn't define how evidence is generated, structured, or signed — auditors need machine-readable attestations.

**Gap 5 — Tooling & SDK (High)**
Python-only (validate.py, agent_matrix_cli.py, orchestrator) — TypeScript, Go, and Rust adopters have no path without writing their own tooling; single biggest adoption barrier. Nothing on PyPI, npm, or pkg.go.dev — adoption requires cloning the repo. No CI/CD templates — no GitHub Actions workflows, GitLab CI templates, or pre-commit hooks published. No publishable conformance test suite with pass/fail reporting. No JSON Schema registry presence with widely advertised $schema canonical URIs.

**Gap 6 — Community & Process (Medium)**
No RFC/proposal process — changes happen internally; no public RFC template, numbered proposals, or discussion forum. No conformance certification mechanism — no badge, no registry of conformant implementations. No ADOPTERS.md, no case studies, no third-party reference implementations. No steering committee or WG structure (procurement blocker for enterprise).

**Gap 7 — Agent Dossier Specific (Medium)**
No revocation/expiry model — dossier has created_at/updated_at but no expires_at or revocation; compromised agents linger indefinitely. No versioned capability claims — no mechanism to version capability assertions or prove they were true at a point in time (required for audit replay). No multi-principal authority — authority is declared by the agent with no co-signing or delegation model where a human principal or orchestrator countersigns.

**Industry-Aligned Tier (Table Stakes for Enterprise Adoption):**
TypeScript and Go SDKs with schema validation, envelope signing, and OTEL emission. Full OTEL integration spec with gc.agent.* semantic conventions (span names for task start/handoff/completion, metric names for escalation rates, log body schema for PASS entries). Cryptographic envelope signing — JWS with Ed25519, one-spec change with massive compliance impact. A2A full conformance binding spec (a2a-binding-spec.yaml). ISO 42001 control mapping YAML. PyPI governance-commons-py and npm governance-commons-js. GitHub Actions validate-dossier.yml workflow template.

**Industry Best Practice Tier:**
Verifiable agent credentials — bind agent_id to public key at registration; cryptographic non-repudiation of agent actions. Policy-as-Code — OPA/Rego policies enforcing matrix rules; Cedar policy profile. Conformance certification program modeled on CNCF conformance (public registry, test suite with published results format, badge system). Published STRIDE threat model for multi-agent systems. Reference deployment patterns — architecture diagrams and Kubernetes manifests with governance sidecar pattern. Graduated conformance profiles: Advisory (self-declaration) → Standard (CI-validated) → Strict (third-party audit-ready). Evidence API — standard REST endpoint (GET /governance/evidence) returning signed machine-readable compliance artifact.

**Ahead-of-Curve Tier (Category-Defining Moves):**
Federated Agent Trust Network — federation protocol for inter-org trust between agent matrices without sharing internal policy (analogous to SAML federation for identity applied to agent capability claims; no one has built this). Economic Governance as First-Class Primitive — budget_governance spec tying cost overruns directly to escalation level triggers; connects AI governance to FinOps. Constitutional Governance Layer — constitution.yaml artifact with inviolable rules sitting above matrix and dossier, cryptographically committed at project inception; maps to Constitutional AI research. Temporal Governance — authority_window with absolute start/end, renewable intervals, quorum-required renewal for high-trust agents; no current framework has this. Human-Agent Teaming Protocol — spec for how human principals enter/exit agentic loops: handoff envelopes with human_in_the_loop states, decision authority tokens, escalation-to-human SLAs. Governance Diff / Audit Replay — standard format for diffing two governance states (matrix v1.3 → v1.4) and replaying past decisions against new policy; enables retroactive compliance checking. Edge/Offline Governance — governance profile for disconnected environments (IoT, air-gapped, edge inference): local policy cache, reconnection reconciliation protocol, conflict resolution spec. Regulatory Sandbox Participation — proactive engagement with EU AI Act regulatory sandbox programs and NIST AI Safety Institute to become the reference framework regulators cite.

**Prioritized Action List:**
- Do now: PyPI + npm publish; cryptographic envelope signing; OTEL semantic conventions spec; GitHub Actions workflow template
- Do next: TypeScript SDK; ISO 42001 control mapping; A2A full protocol binding; OPA/Rego policy package
- Do to lead: Constitutional governance layer spec; federated agent trust protocol; temporal authority windows; Evidence API; EU AI Act regulatory sandbox engagement

### Key Concepts
- Governance Commons, agent-matrix, agent-dossier, ONS, conformance layer
- A2A (Agent-to-Agent Protocol, Google April 2025) — full protocol conformance: task lifecycle, streaming, push notifications, auth headers
- MCP as first-class governance primitive — tool exposure surface, per-tool permission scopes, server trust levels, resource URI governance
- Transport binding gaps — HTTP/2 SSE, WebSocket, gRPC, NATS, Kafka
- Framework adapter gaps — AutoGen, CrewAI, LangGraph, LlamaIndex, OpenAI Swarm
- Envelope cryptographic signing — JWS/Ed25519, envelope_signature block, key material references
- W3C DIDs / public-key anchoring for agent identity verification
- Zero-trust establishment, verification, and revocation spec (T0–T4 trust levels currently undefined at runtime)
- Agent secrets/credential governance — receipt, rotation, scoping
- SLSA attestation (deferred, required for enterprise)
- observability-contract.yaml — gc.agent.* OTEL semantic conventions
- GenAI semantic conventions gen_ai.* namespace (OTel active standardization)
- Structured agent lifecycle event schema — started, blocked, escalated, handed off, completed
- Anomaly detection contract for compliance telemetry
- ISO 42001 (AI Management Systems) — missing entirely from compliance mapping
- SOC 2 Type II, DORA (EU financial) — not addressed
- GDPR data subject rights, processing basis, retention governance
- Machine-readable compliance evidence generation and signing
- TypeScript SDK, Go SDK — prerequisite for VS Code extension, npm/pkg.go.dev adoption
- governance-commons-py (PyPI), governance-commons-js (npm)
- GitHub Actions validate-dossier.yml workflow template
- Conformance test suite with structured pass/fail reporting
- RFC/proposal process for external contributors
- Conformance certification program modeled on CNCF
- ADOPTERS.md, steering committee, WG structure
- Agent dossier revocation/expiry — expires_at, revocation mechanism
- Versioned capability claims for audit replay
- Multi-principal authority — co-signing, delegation model
- OPA/Rego matrix enforcement policies; Cedar policy profile
- Evidence API — GET /governance/evidence signed machine-readable compliance artifact
- Federated Agent Trust Network — inter-org trust without internal policy sharing (SAML analogy for agent capabilities)
- budget_governance spec — FinOps integration, cost-overrun-to-escalation triggers
- constitution.yaml — inviolable rules, cryptographically committed at inception, Constitutional AI provenance
- authority_window — temporal governance with start/end, renewable intervals, quorum renewal
- Human-Agent Teaming Protocol — human_in_the_loop handoff states, decision authority tokens
- Governance Diff / Audit Replay — retroactive compliance checking across matrix versions
- Edge/Offline Governance — local policy cache, reconnection reconciliation, conflict resolution
- Regulatory sandbox participation — EU AI Act, NIST AI Safety Institute

### Cross-references
- See [[source_97]] — agent-dossier runtime gap analysis (revocation, multi-principal authority, schema wiring)
- See [[source_98]] — agent-matrix strategic gap analysis (A2A, MCP, SKU, identity, SLA gaps)
- See [[source_99]] — project-orchestrator-agent gap analysis (handoff envelope, telemetry, resource budget enforcement)
- See [[source_100]] — ONS v1.2.0 gap analysis (RFC 2119, LSP, cluster registry, ABNF grammar, TypeScript SDK)
- See [[source_74]] — governance as architecture, formal specification, ACS guardrails
- See [[source_90]] — EU AI Act global compliance architecture
- See [[source_93]] — multi-agent governance convergence, unified control plane
- See [[source_95]] — continuous adversarial verification, formal reasoning contracts

## Links
_(internal analysis — no external URLs)_

## Article Details
- **Publication:** Internal / eco
- **Date:** 2026-06-05
- **Topics:** ai-governance, platform-architecture, identity-trust, devex, open-source, regulations
- **Relevance:** eco, governance-commons, agent-matrix, agent-dossier, ons, eos, .eco

# === END SUMMARY BLOCK ===
