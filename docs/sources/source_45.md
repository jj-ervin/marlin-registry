# Source 45

# === BEGIN SUMMARY BLOCK ===

## Links
- https://artificialintelligenceact.eu/the-act/
- https://www.nist.gov/artificial-intelligence/ai-risk-management-framework
- https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai

## Article Details

### EU AI Act — Full Text Reference
- **Source:** artificialintelligenceact.eu
- **Title:** EU Artificial Intelligence Act
- **Summary:**
  Four-tier risk classification (unacceptable, high, limited, minimal). High-risk systems require
  conformity assessments, documentation, human oversight, and lifecycle monitoring. Article 16(l)
  mandates accessibility requirements for high-risk systems. Distinguishes providers, deployers,
  importers, and distributors — with deployers who substantially modify a model becoming providers.
  Enforcement deadlines are phased: GPAI rules August 2025, high-risk employment AI December 2027.
- **Conceptual Signals for eco:**
  - Risk-tier classification as a routing/labeling primitive
  - Conformity assessment as a pipeline stage (validates existing PASS + run-record design)
  - Human oversight requirements (validates locked `human_escalation=True`)
  - Audit trail requirements (validates RunRecord + state_history design)

### NIST AI Risk Management Framework (AI RMF 1.0)
- **Source:** nist.gov
- **Title:** NIST AI Risk Management Framework
- **Summary:**
  Voluntary, jurisdiction-neutral framework structured around four functions: Govern, Map, Measure,
  Manage. Designed as a governance foundation layer adaptable to any industry or region. Analysts
  recommend using NIST AI RMF as a base layer, EU AI Act as a ceiling, and local laws as adapters.
- **Conceptual Signals for eco:**
  - Govern / Map / Measure / Manage vocabulary maps naturally onto eco's PASS + health + runtime layers
  - Jurisdiction-neutral framing suitable for eco's portability goals
  - NIST alignment strengthens enterprise credibility without coupling to a single regulation

### Copilot Synthesis — EU AI Act Compliance Features for AI Platforms
- **Source:** Copilot (synthesized, no single URL)
- **Title:** EU AI Act Compliance Architecture for AI Platforms
- **Summary:**
  Twelve-point synthesis covering risk-tier architecture, conformity-first design, accessibility
  requirements, role-aware compliance modeling (provider/deployer/importer), modification-triggered
  provider status detection, bias-detection legal basis handling, deadline-adaptive compliance
  engines, jurisdictional override layers, NIST-as-foundation governance, cross-legislation
  dependency graphs, harmonization-gap awareness, and agent-behavior compliance simulation.
- **Conceptual Signals for eco:**
  - Risk-tier as a generic internal classification primitive (stripped of EU-specific taxonomy)
  - Pre-deployment agent behavior validation (generalized, not EU-specific)
  - Conformity-first pipeline design (already present in eco)
  - NIST AI RMF as governance vocabulary for eco documentation and enterprise positioning

## Overall Summary
This source captures Copilot-synthesized research on EU AI Act compliance applied to AI platform
architecture, evaluated against eco's current design. The evaluation found that the research
conflates eco-as-compliance-tool with eco-as-compliance-infrastructure. Most points describe
features for a compliance management layer to be built on top of eco, not features for eco core.
Two concepts have genuine eco-level applicability: (1) a generic risk-tier classification primitive
suitable as a labeling/routing field — independent of EU taxonomy — which could feed into RT.01;
(2) NIST AI RMF vocabulary alignment, which is jurisdiction-neutral and maps naturally onto eco's
existing governance model (PASS = Govern, health scoring = Measure, RunRecord = Manage). A third
concept — pre-deployment agent behavior simulation — is conditionally useful for eco.ai Phase 6,
but only if reframed as general safety/correctness validation rather than EU compliance checking.
The remaining nine points are premature, wrong-layer, or couple eco to a single jurisdiction's
regulatory taxonomy.

## Inclusion Primitives (Suggested)
- generic risk-tier classification field (routing and labeling primitive)
- risk-tier as RunRecord or PASS label — not EU-specific
- NIST AI RMF vocabulary alignment (Govern / Map / Measure / Manage)
- NIST framing for eco governance documentation and enterprise positioning
- pre-deployment agent behavior validation (eco.ai Phase 6 — generalized)
- conformity-first pipeline design (already implemented via PASS + RunRecord)
- human oversight as a locked runtime primitive (already implemented)
- audit trail completeness as a governance invariant (already implemented)

## Exclusion Primitives (Suggested)
- EU AI Act four-tier risk labels as eco-native taxonomy
- provider / deployer / importer / distributor role-resolution module in eco core
- modification-threshold provider-status detection
- special category data legal-basis selector
- dynamic compliance deadline calendar
- jurisdictional override layer in eco core
- cross-legislation dependency graph in eco core
- per-region compliance modules as eco core features
- accessibility requirements as a runtime governance primitive (surface concern, not runtime)
- eco acting as a compliance management platform
- coupling eco governance vocabulary to any single jurisdiction's regulatory framework

## Other Relevant Suggestions
- eco's existing PASS + RunRecord + escalation architecture is already regulation-compatible;
  this research confirms that design direction rather than requiring new systems.
- NIST AI RMF alignment is the one actionable output: use its vocabulary (Govern, Map, Measure,
  Manage) when writing REL.00 and ENT.00 PASSes in Phase 5 to strengthen enterprise positioning.
- A generic `risk_tier` label on RunRecord and PASS specs could be considered as part of RT.01
  (Stage 4.11) — jurisdiction-neutral, useful for routing and escalation decisions.
- Pre-deployment agent simulation should be scoped to eco.ai Phase 6 as a general
  correctness/safety gate, not specifically as EU compliance checking.
- EU AI Act-specific compliance features (role resolution, legal basis selectors, deadline engines,
  jurisdictional layers) belong in a compliance adapter built on top of eco, not in eco itself.
- Revisit this source when writing REL.00 (Phase 5.1) and ENT.00 (Phase 5.2).

# === END SUMMARY BLOCK ===
