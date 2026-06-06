# Source 73
# === BEGIN SUMMARY BLOCK ===

## Links
- https://arxiv.org/abs/2605.02789
- https://www.aimodels.fyi/papers/arxiv/funfuzz-llm-powered-evolutionary-fuzzing-framework

## Article Details

### FunFuzz: Multi-Island Evolution, Adaptive Prompting, and Evolutionary Exploration as eco Primitives

**Sources:**
- arXiv — *FunFuzz: LLM-Powered Evolutionary Fuzzing Framework*
- aimodels.fyi — *FunFuzz: LLM-Powered Evolutionary Fuzzing Framework*

**Summary:**
FunFuzz is an LLM-guided evolutionary fuzzing framework with two core innovations: a
multi-island model (parallel populations with different priors, periodic high-value artifact
migration, diversity preservation) and feedback-adaptive prompting (dynamic prompt rewriting
based on compiler/runtime feedback to avoid stagnation). Also introduces coverage-driven
prioritization using incremental coverage metrics and internal failure signals, plus
distillation of LLM-learned strategies into lightweight fast-runtime executors. Benchmarks
show deeper bug discovery than traditional fuzzers. Core insight for eco: exploration should
be an evolutionary, multi-population, feedback-driven process — not a single-agent reasoning
loop. Every mechanism in FunFuzz maps to a generalizable eco primitive.

**Key mechanisms referenced:**
- Multi-island model — parallel evolving populations with different starting conditions; periodic migration of high-value artifacts only; diversity preserved as a first-class metric
- Feedback-adaptive prompting — dynamic prompt rewriting based on outcome signals; topic-specific initialization; feedback-weighted sampling
- Incremental coverage metrics — coverage maps, failure-signal harvesting, novelty scoring
- Strategy distillation — LLMs generate heuristics, small models execute them as runtime micro-agents
- Adversarial stress testing — evolutionary + LLM guidance uncovers deeper failures than traditional methods

**Conceptual Signals for eco:**

1. **Multi-island evolution as a core architectural primitive** — parallel agent populations with
   different priors, heuristics, or worldviews; periodic migration shares only high-value
   artifacts, not full state, preventing convergence collapse; diversity treated as a first-class
   metric, not a side effect; applies directly to eco's exploration, search, and creativity
   engines; any problem eco needs to solve across a broad space benefits from multi-island
   population dynamics rather than single-thread reasoning

2. **Feedback-adaptive prompting as a self-modification primitive** — prompts rewrite themselves
   based on measurable outcome signals: coverage, novelty, failure modes; each eco module starts
   with a different instruction genome; agents shift generation strategies based on measurable
   progress; this becomes a general-purpose adaptive exploration engine inside eco; replaces
   static instruction sets with living, feedback-tuned behavior

3. **Coverage-driven prioritization as domain-agnostic exploration maps** — incremental coverage
   metrics generalize beyond code to any domain: knowledge, behavior, environment, strategy;
   failure-signal harvesting treats errors, contradictions, and dead ends as valuable signals
   rather than noise; novelty scoring rewards exploration of unvisited conceptual or operational
   regions; gives eco a principled way to measure how much of any space has been explored

4. **Strategy distillation into lightweight runtime executors** — large models generate heuristics;
   small models execute them continuously at low cost; runtime micro-agents are tiny, specialized,
   and fast; supports eco's modular scalable saleable design; separates the expensive reasoning
   layer from the cheap execution layer; maps onto eco's existing distinction between governance
   reasoning (HELM) and fast execution (agent-matrix)

5. **Continuous adversarial self-testing as a resilience primitive** — eco agents stress-test each
   other's assumptions continuously; failures are fuel for improvement, not exceptions to handle;
   resilience scoring measures how robust eco modules are under perturbation; aligns with eco as
   a constitutional self-correcting OS; fault-tolerant evolution means the system improves under
   pressure rather than degrading

**eco primitive map (FunFuzz → eco):**
| FunFuzz Concept | eco Primitive | eco Application |
|---|---|---|
| Multi-island evolution | Parallel agent populations | Exploration, search, creativity engines |
| Adaptive prompting | Feedback-driven instruction genomes | Self-modifying module behavior |
| Coverage metrics + failure signals | Domain-agnostic exploration maps | Knowledge/behavior/strategy coverage |
| Strategy distillation | LLM → micro-agent | Lightweight continuous eco executors |
| Crash-inducing input discovery | Adversarial self-testing | Constitutional resilience scoring |

**Non-obvious insight:**
Evolutionary fuzzing works because it treats the search space as unknown and adversarial,
not as a known problem to be solved. Eco inherits the same architectural challenge: the
space of agent behavior, human intent, and cross-domain coordination is unknown and
adversarial by nature. FunFuzz proves that multi-population diversity + feedback adaptation
+ distillation outperforms any single reasoning loop. Eco should encode this as a
foundational design principle, not an optimization.

# === END SUMMARY BLOCK ===
