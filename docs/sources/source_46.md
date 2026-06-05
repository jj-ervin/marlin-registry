# Source 46

# === BEGIN SUMMARY BLOCK ===

## Links
- https://arxiv.org/abs/2407.06886
- https://www.agibot.com
- https://www.hkstp.org

## Article Details

### arXiv — Embodied AI with LLMs: Mental-World Modeling and Theory-of-Mind Survey
- **Source:** arXiv (academic survey)
- **Title:** Embodied AI, LLM Convergence, and Theory-of-Mind Reasoning (survey)
- **Summary:**
  Survey of how LLMs are being integrated with embodied AI systems. Covers mental-world
  modeling (belief, intent, emotion state representation), Theory-of-Mind (ToM) reasoning
  for inferring intent from ambiguous instructions, and a three-layer embodied framework
  (DP-TA: Dynamic Perception → Task Adaptation) covering perception, causal/semantic modeling,
  and decision/strategy. Introduces F-CMA (Feature-Conditioned Modal Alignment) for cross-modal
  signal unification. References 26 ToM evaluation benchmarks. Identifies social-intelligence
  interfaces (healthcare, education, customer service) as primary application domains.
- **Conceptual Signals for eco:**
  - DP-TA three-layer loop (Perception → Modeling → Decision) as eco.edge architecture vocabulary
  - Embodied–LLM dual-stack (semantic layer + sensorimotor layer) validates eco.edge + LASSO design
  - Mental-world modeling as a Phase 6 NEHI/eco.ai concern
  - ToM reasoning as a Phase 6 LASSO multi-agent coordination concern
  - ToM evaluation benchmarks as eco.ai evaluation suite reference

### AGIBOT — Embodied AI Robotics Platform
- **Source:** agibot.com
- **Title:** AGIBOT Ecosystem and Deployment Roadmap
- **Summary:**
  AGIBOT's multi-industry deployment roadmap for embodied AI robots. Framed around
  ecosystem-level integration across manufacturing, logistics, and service sectors.
  Hong Kong positioned as a "super-connector" for APAC embodied AI deployment.
- **Conceptual Signals for eco:**
  - Ecosystem-scale multi-industry deployment as a macro-level pattern
  - No direct technical primitives applicable to eco core at current phase

### Copilot Synthesis — Embodied AI Primitives for eco
- **Source:** Copilot (synthesized, no single URL)
- **Title:** Embodied AI / LLM Convergence Primitives for eco Architecture
- **Summary:**
  Ten-point synthesis extracting mental-world modeling, ToM reasoning, LLM-as-scaffold,
  embodied-LLM dual-stack, social-intelligence templates, DP-TA three-layer framework,
  F-CMA cross-modal alignment, neuro-symbolic hybridization, ToM evaluation benchmarks,
  and ecosystem-level deployment thinking as eco adoption candidates.
- **Conceptual Signals for eco:**
  - DP-TA vocabulary (Perception → Modeling → Decision) for eco.edge architecture documentation
  - Dual-stack framing (semantic / embodied) for eco.edge + eco.ai documentation
  - Neuro-symbolic hybridization validates ACES + eco.ai design (already present)
  - Mental-world modeling and ToM reasoning as Phase 6 eco.ai/NEHI reference material

## Overall Summary
This source captures embodied AI / LLM convergence research evaluated against eco's current
and planned architecture. The research is directionally correct for eco but approximately
one to two phases ahead of current work. Several concepts are already implicit in eco's
architecture: LLM-as-scaffold is eco's foundational assumption; neuro-symbolic hybridization
is ACES (symbolic) + eco.ai (learned); the embodied-LLM dual-stack is already eco.edge's
structure (HAL adapters as sensorimotor layer, LASSO/NEHI as semantic layer). The DP-TA
three-layer framework (Perception → Modeling → Decision) is useful vocabulary for future
eco.edge architecture documentation — it maps to HAL adapters → CAPS packs → EdgeKernel/LASSO
without requiring new systems. Mental-world modeling and ToM reasoning are Phase 6 eco.ai
and NEHI concerns: relevant when eco.ai moves beyond supervised autonomy (v0.1) toward intent
inference and when LASSO needs to coordinate ambiguous multi-agent outputs. The 26 ToM
benchmarks are reference material for eco.ai Phase 6 evaluation suite design. Social-intelligence
templates and F-CMA cross-modal alignment are not applicable to eco's current deployment
domains (agriculture, drones, ROVs) or maturity level. Ecosystem-level deployment observations
are market-level, not technical primitives.

## Inclusion Primitives (Suggested)
- DP-TA three-layer vocabulary: Perception → Modeling → Decision
- dual-stack framing: semantic layer (LASSO/NEHI) + embodied layer (HAL adapters)
- neuro-symbolic hybridization (already present: ACES + eco.ai)
- LLM-as-scaffold (already present: eco's foundational assumption)
- mental-world modeling as Phase 6 NEHI evolution concern
- ToM-driven intent inference as Phase 6 LASSO multi-agent coordination concern
- ToM evaluation benchmarks as eco.ai Phase 6 evaluation suite reference
- embodied–LLM convergence as eco.edge + eco.ai architectural framing

## Exclusion Primitives (Suggested)
- social-intelligence interaction templates (healthcare, education, customer service)
- F-CMA cross-modal alignment mechanism (research-stage, premature for eco)
- ecosystem-scale deployment strategy as a technical primitive
- mental-world modeling as a current-phase (Phase 4) eco feature
- ToM reasoning as a current-phase LASSO feature
- eco implementing ToM benchmarks before eco.ai v0.1 implementation is complete
- emotion-state modeling as an eco core primitive at current stage

## Other Relevant Suggestions
- Use DP-TA (Perception → Modeling → Decision) vocabulary when writing eco.edge
  architecture documentation and future EDGE PASSes — it describes what eco.edge
  already does and gives it a clean external vocabulary.
- Use dual-stack framing (semantic / embodied) in eco.edge + eco.ai positioning
  documentation when Track B platform definition work begins.
- Revisit mental-world modeling and ToM reasoning when writing eco.ai Phase 6 PASSes
  (AI.02+) and NEHI evolution PASSes. At that stage, this source provides grounding
  for belief/intent representation in NEHI's reasoning kernel.
- ToM evaluation benchmarks (26 referenced in survey) are a useful starting point
  for designing eco.ai's evaluation suite — file under Phase 6 evaluation planning.
- Neuro-symbolic and LLM-as-scaffold concepts confirm existing design direction;
  cite this source when documenting eco's constitutional + learned architecture.
- Do not adopt F-CMA or social-intelligence templates until eco.ai has a deployed
  multi-modal sensor fusion layer and a social/conversational deployment domain.
- Revisit AGIBOT ecosystem framing when eco reaches Phase 7 (Product, Market,
  Distribution) and is considering multi-industry integration strategy.

# === END SUMMARY BLOCK ===
