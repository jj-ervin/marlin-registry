# Source 50

# === BEGIN SUMMARY BLOCK ===

## Links
- https://www.telus.com/en/digital/blog/ai-safety-benchmark
- https://alephalpha.com/blog/formal-reasoning
- https://arxiv.org/abs/2405.15322

## Article Details

### TELUS Digital — Adversarial AI Safety Benchmark
- **Source:** telus.com/digital
- **Title:** Adversarial AI Safety Benchmark — Attack Success Rates and Defense Evaluation
- **Summary:**
  Large-scale adversarial evaluation of AI systems. Attack success rates range from 1.3%
  to 92.9% depending on target. Adaptive attacks bypass 90%+ of published defenses.
  Fine-tuning frequently reduces safety rather than improving it. Reasoning architectures
  (chain-of-thought, structured inference) are approximately 3× more resilient than
  non-reasoning architectures. Static defenses are unreliable; continuous adversarial
  probing is required.
- **Conceptual Signals for eco:**
  - CVL (Continuous Verification Loop) as a governance signal requirement: components
    must expose a verification status, not just pass a one-time safety gate
  - NEHI safety gate is a stub (explicitly marked must-replace before production) —
    this research defines what the replacement must include
  - Reasoning architectures are more resilient: validates eco's emphasis on explicit
    reasoning (ACES #2 requires reasoning evaluation on every state change)
  - Static defenses are unreliable: CVL concept feeds SEC.00 (Track B security layer)

### Aleph Alpha — Formal Reasoning at Scale
- **Source:** alephalpha.com
- **Title:** Formal Reasoning: 99.4% PutnamBench, 100% Verina, Ethereum zkEVM
- **Summary:**
  Formal proof generation at production scale. 99.4% success on PutnamBench mathematical
  reasoning, 100% on Verina verification benchmark. Used to formally verify Ethereum
  zkEVM smart contracts. Demonstrates that correctness guarantees are now practical at
  scale. Components can declare whether they are formally verifiable, probabilistic, or
  non-verifiable.
- **Conceptual Signals for eco:**
  - verification_class as a metadata field: formally_verifiable | probabilistic | non_verifiable
  - Routing and gating decisions conditioned on verification_class declaration
  - Formal verification tooling is out of eco's scope — eco declares and routes on
    verification_class, it does not perform formal proofs itself

### arXiv — Inductive-Deductive Synthesis (IDS)
- **Source:** arxiv.org
- **Title:** Inductive-Deductive Synthesis for Verified Systems
- **Summary:**
  IDS jointly synthesizes implementation, proof, and refinement strategy. 200× faster
  than human experts. 3× faster runtime than published verified systems. 100% success
  on distributed key-value store specs. Lifecycle pattern: spec → implementation →
  proof → refinement → telemetry → next iteration.
- **Conceptual Signals for eco:**
  - IDS lifecycle pattern validates eco's existing PASS workflow: spec (PASS doc) →
    implementation → governance (RunRecord) → refinement (new PASS revision)
  - The "formal proof" step is the gap — dependent on specific tooling, out of eco's scope
  - IDS provides vocabulary for describing the PASS lifecycle as a verification loop

## Overall Summary
This source captures adversarial AI safety, formal reasoning, and inductive-deductive
synthesis research evaluated against eco's current architecture. The central finding is
that correctness, verification, and adversarial resilience must be in the substrate, not
added later — a principle eco already holds but does not yet fully implement.

Two concrete, near-term adoptable items were identified. First, a `verification_class`
metadata field (formally_verifiable | probabilistic | non_verifiable) on PASS specs and
RunRecord. This is a natural, low-cost extension of the Stage 4.11 RT.01 metadata work,
registered as DP-4-11-06. It gives eco a routing/gating signal without requiring eco to
perform formal verification itself. Second, the CVL (Continuous Verification Loop) concept
feeds SEC.00 (the planned Track B security layer): components must expose a continuous
verification signal, not just pass a one-time static gate. The NEHI safety gate is
explicitly a stub marked "must be replaced before production" — this research defines
what the replacement must achieve.

The IDS lifecycle pattern validates eco's existing PASS workflow (spec → implement →
govern → refine) without requiring new systems. The formal proof generation tooling
(Aleph Alpha's system) is out of eco's scope. The negative primitives (don't fine-tune
for safety, don't trust static defenses, don't treat reasoning as optional, don't assume
open-source = safe) partially map to existing ACES invariants and should be encoded as
explicit exclusion primitives and governance constraints in SEC.00 and eco.ai PASSes.

## Inclusion Primitives (Suggested)
- verification_class metadata field: formally_verifiable | probabilistic | non_verifiable
- verification_class on RunRecord and PASS specs (extends RT.01 / Stage 4.11)
- routing and gating decisions conditioned on verification_class declaration
- CVL (Continuous Verification Loop) as a component requirement in SEC.00
- components must expose a continuous verification signal (not one-time gate)
- NEHI safety gate replacement must include continuous adversarial verification signal
- reasoning evaluation on every state change (already in ACES #2 — reinforced)
- IDS lifecycle vocabulary for PASS workflow documentation (spec → implement → verify → refine)
- verification_class as a boundary-governing signal in LASSO routing

## Exclusion Primitives (Suggested)
- eco implementing adversarial probing / red-teaming (security research function; belongs in SEC.00)
- eco performing formal proof generation (tooling-dependent; out of eco's scope)
- relying on fine-tuning for safety in eco.ai (encode as AI cluster exclusion primitive)
- trusting static safety gates as sufficient (static defenses are unreliable per benchmark)
- treating NEHI safety gate stub as production-ready
- assuming open-source modules are safe without verification (encode in module import governance)
- treating reasoning as optional in any eco component (ACES #2 already prohibits this)
- IDS automated synthesis loop as a current-phase (Phase 4/5) feature

## Other Relevant Suggestions
- Add DP-4-11-06 to Stage 4.11 in DEV-PATH: add `verification_class` field to RT.01
  scope (formally_verifiable | probabilistic | non_verifiable on RunRecord and PASS specs).
  Low-cost extension of already-planned metadata work.
- When writing SEC.00 (Track B, Phase 5.2), include CVL as a component requirement:
  all eco components must expose a continuous verification signal. Reference this source
  for the adversarial benchmark data (attack success 1.3%–92.9%, adaptive bypass 90%+).
- When replacing the NEHI safety gate stub (NEHI.01 explicitly marks it must-replace
  before production), use CVL principles: continuous, adversarial-aware, reasoning-based
  rather than static rule-based.
- Encode negative primitives as eco.ai cluster exclusion primitives when writing AI.02+:
  no fine-tuning for safety, no static defenses, reasoning is required not optional.
- The IDS lifecycle pattern (spec → implementation → proof → refinement → telemetry →
  next iteration) should be referenced when documenting the PASS workflow in REL.00
  and DEV.00 — it gives eco's governance cycle a formal methods vocabulary.
- ACES #2 (reasoning evaluation required on every state change) already captures
  "don't treat reasoning as optional" — cite the TELUS benchmark data when this
  invariant is explained in developer-facing documentation.
- Reasoning architectures are 3× more resilient per benchmark — use this to justify
  eco's reasoning-gate requirement in LASSO/NEHI when writing REL.00 positioning docs.

# === END SUMMARY BLOCK ===
