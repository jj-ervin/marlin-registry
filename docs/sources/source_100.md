# Source 100

# === BEGIN SUMMARY BLOCK ===

## ONS v1.2.0 Gap Analysis: Publication Infrastructure, Spec Correctness, Tooling, Industry Alignment, and Ahead-of-Curve Opportunities

_Part of the Governance Commons gap analysis series (sources 97–101)._

### Summary
Comprehensive gap analysis of ONS (Object Naming Standard) v1.2.0 across five sections: publication infrastructure gaps (blocked on org), remaining spec correctness gaps, tooling gaps, industry alignment requirements, and five ahead-of-curve opportunities with no parallel in any existing naming standard. Third internal gap analysis document alongside source_97 (agent-dossier) and source_99 (project-orchestrator-agent).

**Section 1 — Publication Gaps (Infrastructure, Not Spec)**
v1.2.0 tag exists locally but not pushed — blocked on org creation. Remote is jj-ervin/ons; no governancecommons org yet. governancecommons.org not live. No GitHub Release for v1.2.0 — blocked on org. No spec changes required; these are pure infrastructure actions.

**Section 2 — Remaining Spec Gaps**
S1 (Low): File header comment in ons.yaml:2-3 still reads v1.1.0 / 2026-06-03 while spec body correctly says version: 1.2.0 / updated_at: 2026-06-04.
S2 (Medium): No casing rule for the qualification (colon) domain. Every other separator has a corresponding casing rule — a reader cannot determine whether AL:2 and al:2 are both canonical or whether the left-hand token must be UPPER.
S3 (High): No cluster registration protocol. governance_id_grammar.rules states clusters must be registered before use and must not collide with product roots, but defines no registration process, registry location, or authority — the rule is unenforceable for external adopters.
S4 (High): ons-conformance.schema.json diverges from conformance_profiles in ons.yaml — the spec requires token_registry and implementation_reference but the schema omits both, not even as optional properties. Conformance declarations won't be validated for these required fields.
S5 (Medium): No rule soft-deprecation mechanism. reserved_rules was emptied; there is now no path for retiring a rule gracefully (deprecated status, sunset timeline).
S6 (High): No RFC 2119 normative language. The spec uses plain lowercase "must", "should", "may" — ambiguous in specification practice. Without RFC 2119 uppercase terms (MUST, SHOULD, MAY, MUST NOT), ONS cannot be formally cited by another governance document.

**Section 3 — Tooling Gaps**
T1: FAST rules naming.dir.no_uppercase and naming.file.no_spaces are in the catalog but no validator implements them. Adopters have no reference implementation.
T2: No pytest test suite for tools/validate.py — tested only by running against the ONS repo itself.
T3: No rules.json export. Tooling authors (LSP developers, linter plugin authors) must parse ons.yaml to get the rule catalog.
T4: VALIDATOR_VERSION hardcoded to 1.0.0 with no changelog or versioning scheme — validator bug fixes have no traceable release identity.

**Section 4 — Industry Alignment**
A1 (Table stakes): RFC 2119 normative language — required for formal citation by any W3C, IETF, or OpenAPI-aligned governance document. Audit every "must/should/may" in ons.yaml, convert to uppercase, add RFC 2119 import statement.
A2 (Medium): Conformance test suite — JSON Schema, OpenAPI, and W3C all require test vectors before a spec can claim "standard" (not just "specification") status. Without test vectors, two validators can both claim ONS conformance while producing different results.
A3 (High): TypeScript reference implementation — required for VS Code extension (cannot shell out to Python portably), npm ecosystem adoption, and browser-side validation. Without TypeScript, VS Code extension path is blocked.
A4 (Low-medium): pip install ons-validator / npm package — pyproject.toml + GitHub Actions publish workflow. Adoption currently requires cloning a git repo and running a script.
A5 (Low): Formal ABNF grammar (RFC 5234) — the separator grammar is defined in prose and regex today. ABNF enables automatic parser generation and removes interpretation gaps between spec and implementation.
A6 (Very low): Conformance badge — "This project conforms to ONS v1.2.0" README shield via shields.io. Drives discovery and signals adoption.

**Section 5 — Ahead-of-Curve Opportunities (No Parallel in Any Existing Naming Standard)**
N1 (High effort, highest leverage): Language Server Protocol implementation — no naming governance standard ships an LSP. One TypeScript LSP implementation serves all editors (VS Code, JetBrains, Neovim, Emacs) permanently with real-time ONS violation feedback. Genuinely unprecedented for a naming standard. Requires A3 first.
N2 (Low→medium): Global cluster registry as governed service — currently the spec promises collision prevention but has no registry. A flat registry/clusters.yaml with PR-review process would be a genuine first for naming standards. Graduatable to an API.
N3 (Medium): Machine-readable governance record schema — ONS defines CLUSTER.SEQ governance IDs but not what a governance record (PASS file) must contain. A schemas/governance-record.schema.json with required fields, title line format, and lifecycle states would enable AI agents to author, validate, and audit governance records against a machine-checkable contract. eco already does this informally in validator.py.
N4 (Medium): Agentic identity naming contract — the agentic namespace domain exists but its naming_contract is circular ("ONS-compatible names following the separator grammar"). A concrete contract defining canonical agent ID form, handoff artifact naming, and task ID namespacing would be new territory — no existing naming standard addresses live agent identity. Requires coordination with Agent Dossier.
N5 (Low spec / medium ecosystem): ons_conformance.yaml as dependency manifest — treat conformance declaration like package.json: declares ONS version dependency, enforced rule modes, registered clusters. GitHub dependency graph integration would surface "depends on ONS v1.2.0" automatically; Dependabot-style alerts on new ONS versions. File format already exists in ons-conformance.schema.json.

**Priority Order:**
1. Fix stale header comment S1 (5-minute fix)
2. Add casing rule for colon domain S2
3. Fix ons-conformance.schema.json divergence S4
4. RFC 2119 normative language A1 (table stakes for citation)
5. Cluster registry file N2/S3 (solves broken "registered before use" promise)
6. Conformance test suite A2 (upgrades ONS from spec to standard)
7. TypeScript implementation A3 (unblocks VS Code extension)
8. PyPI / npm packages A4 (zero-friction adoption)
9. Governance record schema N3 (formalizes eco's existing practice)
10. LSP implementation N1 (highest-leverage long-term move)

### Key Concepts
- ONS (Object Naming Standard) v1.2.0, governancecommons, jj-ervin/ons
- ons.yaml — stale header comment v1.1.0/2026-06-03 vs body v1.2.0/2026-06-04
- Qualification (colon) domain — missing casing rule; AL:2 vs al:2 ambiguity
- Cluster registration protocol — "registered before use" rule with no registry or authority
- ons-conformance.schema.json — missing token_registry and implementation_reference fields
- Rule soft-deprecation mechanism — reserved_rules emptied, no deprecated/sunset path
- RFC 2119 normative language — MUST/SHOULD/MAY/MUST NOT (table stakes for spec citation)
- FAST rules naming.dir.no_uppercase, naming.file.no_spaces — in catalog, not implemented
- tools/validate.py — no pytest test suite; VALIDATOR_VERSION hardcoded 1.0.0
- rules.json export — missing machine-readable rule catalog for LSP/linter authors
- Conformance test suite — test vectors required to claim "standard" vs "specification" status
- TypeScript reference implementation — prerequisite for VS Code extension and npm adoption
- pip install ons-validator, npm package — PyPI + GitHub Actions publish workflow
- ABNF grammar (RFC 5234) — formal machine-readable separator grammar for parser generation
- Conformance badge — shields.io "conforms to ONS v1.2.0"
- Language Server Protocol — real-time ONS violation feedback across all editors; no naming standard has ever shipped an LSP
- Global cluster registry — registry/clusters.yaml with PR review; first live collision-prevention registry for any naming standard
- schemas/governance-record.schema.json — PASS file format, lifecycle states, machine-checkable contract
- Agentic identity naming contract — canonical agent ID form, handoff artifact naming, task ID namespacing
- ons_conformance.yaml as dependency manifest — GitHub dependency graph + Dependabot-style ONS version alerts

### Cross-references
- See [[source_97]] — agent-dossier runtime gap analysis (schema wiring, PASS ID enforcement gaps mirror S3/S4 here)
- See [[source_98]] — agent-matrix strategic gap analysis (A2A protocol, identity attestation, registry gaps parallel N2/N4)
- See [[source_99]] — project-orchestrator-agent gap analysis (governance/multi-agent.yaml runtime path mirrors S3 enforcement gap)
- See [[source_74]] — governance as architecture, formal specification, ACS guardrails
- See [[source_93]] — multi-agent governance convergence, unified control plane

## Links
_(internal analysis — no external URLs)_

## Article Details
- **Publication:** Internal / eco
- **Date:** 2026-06-05
- **Topics:** ai-governance, platform-architecture, devex, open-source
- **Relevance:** eco, ons, governance-commons, agent-dossier, eos

# === END SUMMARY BLOCK ===
