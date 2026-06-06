# Source 97

# === BEGIN SUMMARY BLOCK ===

## agent-dossier Runtime Gap Analysis: Spec-to-Implementation Audit — Critical Blockers, Architecture, Modularity, and SKU-ability

_Part of the Governance Commons gap analysis series (sources 97–101)._

### Summary
A rigorous multi-dimensional gap analysis of the agent-dossier project runtime, organized into five categories: critical blockers, industry alignment gaps, modularity/architecture gaps, portability gaps, and SKU-ability gaps. Also identifies five ahead-of-curve opportunities not yet first-class primitives in the industry.

Critical blockers (P0): no package.json (js-yaml undeclared), no .gitignore, JSON Schema validation exists but is never wired in, task-queue.json is hand-written rather than a compiled artifact, no environment abstraction (paths/IDs/timeouts are literals), hardcoded Windows paths in source comments.

Industry alignment gaps: telemetry is custom rather than OpenTelemetry; no SLSA build provenance; no SBOM (SPDX/CycloneDX); NIST AI RMF and EU AI Act compliance referenced in external-alignment.yaml but not wired; audit log is NDJSON but not aligned to CEF/OCSF/CloudTrail; handoff envelope defined in spec but never emitted in code; PASS ID format stated but not validated or generated.

Modularity gaps: orchestrator is a monolith (retry, telemetry, registry, dispatch, escalation in one file); agents are hardcoded require() calls with no plugin interface or auto-discovery; no middleware/hook system for pre/post task execution; compiler and orchestrator share implicit assumptions rather than a versioned format contract; synchronous single-threaded execution with no event bus.

Portability gaps: Node.js lock-in with no Python SDK, HTTP agent interface, or CLI wrapper; no Dockerfile or docker-compose; no cloud deployment targets; no .env/config layer.

SKU-ability gaps: agents have no semver; capability profiles.yaml exists in spec but unused; no feature flags; no tenant isolation/namespace; no installable SDK with main field; no metering or usage reporting.

Ahead-of-curve opportunities: cryptographically signed task assignments (zero-trust agent model); formal contract verification via constraint solver; agent capability marketplace with runtime discovery; differential telemetry with automatic PII/secret redaction; reproducible agent snapshots for cross-runtime resume; cross-organization agent federation with org-issued key signing.

Core diagnosis: the canonical spec in C:\dev\agent-dossier already defines schemas, profiles, external alignments, grammar, and validation tools — almost none of it is wired into the runtime yet. The spec repo is the gap-closer; the orchestrator just needs to consume it properly.

Prioritized fix list spans P0 (5-minute fixes: package.json, .gitignore, schema wiring, compile-task.js run) through P4 (large: Python SDK, cryptographic signing, tenant isolation).

### Key Concepts
- agent-dossier, PASS governance, runtime-contract.schema.json
- JSON Schema Draft 2020-12 validation wiring
- OpenTelemetry (CNCF) adapter for telemetry output
- SLSA Level 1–3 build provenance, SPDX/CycloneDX SBOM
- NIST AI RMF, EU AI Act, ISO 42001 compliance wiring
- Handoff envelope emission (handoff_protocol spec → code)
- PASS-YYYY-NNNN ID generation and enforcement
- Agent plugin manifest / auto-discovery (no hardcoded requires)
- Module split: lib/registry.js, lib/dispatcher.js, lib/telemetry.js, lib/escalation.js, lib/retry.js
- Capability profiles: lite / standard / enterprise (profiles.yaml)
- Feature flags, tenant isolation, namespace support
- Installable SDK (index.js + main field), CLI entrypoint (bin, npx-able)
- Cryptographically signed task dispatch (zero-trust agent model)
- Formal contract verification (constraint solver on runtime-contract.yaml)
- Agent capability marketplace with runtime discovery
- Differential telemetry with PII/secret redaction
- Reproducible agent snapshots (SLSA Level 3 provenance)
- Cross-organization agent federation with org-issued key signing

### Cross-references
- See [[source_98]] — agent-matrix strategic gap analysis (series companion: protocol, SKU, identity, SLA gaps)
- See [[source_99]] — project-orchestrator-agent gap analysis (series companion: escalation, telemetry, test coverage)
- See [[source_100]] — ONS v1.2.0 gap analysis (series companion: RFC 2119, LSP, cluster registry)
- See [[source_101]] — Governance Commons capstone gap analysis & industry positioning (series capstone)
- See [[source_74]] — governance as architecture, ACS guardrails, formal specification
- See [[source_80]] — chaos engineering as native eco primitive; fault injection
- See [[source_84]] — Sysdig autonomous AI attack chain; behavioral detection
- See [[source_95]] — continuous adversarial verification, formal reasoning contracts

## Links
_(internal analysis — no external URLs)_

## Article Details
- **Publication:** Internal / eco
- **Date:** 2026-06-05
- **Topics:** platform-architecture, agent-runtime, ai-governance, devex
- **Relevance:** eco, agent-dossier, governance-commons, eos

# === END SUMMARY BLOCK ===
