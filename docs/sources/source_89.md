# Source 89
# === BEGIN SUMMARY BLOCK ===

## Links
- https://privacymatters.dlapiper.com/2026/03/u-s-privacy-laws-legislative-update/
- https://www.ncsl.org/technology-and-communication/artificial-intelligence-2025-legislation
- https://novumstrategy.com/state-level-ai-governance-bills-across-the-u-s-as-of-04-22-2025/

## Article Details

### U.S. State Privacy and AI Governance 2025-2026: Rights-Centric Architecture Primitives for eco

**Sources:**
- DLA Piper Privacy Matters — *U.S. Privacy Laws Legislative Update 2026*
- NCSL — *Artificial Intelligence 2025 Legislation*
- Novum Strategy — *State-Level AI Governance Bills Across the U.S.*

**Summary:**
Multiple U.S. states (California, Illinois, Colorado, Delaware, Louisiana, New York) are
advancing privacy and AI governance legislation that collectively define a rights-centric,
jurisdiction-aware compliance architecture. Key bills: California SB 923 (deletion cascade
including third-party brokered data), Illinois SB 2875 (data inventories and profiling
contestation), Illinois SB 3890 (centralized broker deletion mechanism), Delaware (sensitive
data expansion to neural data and inferences; lower threshold 75k → 15k consumers),
Louisiana (adjusted applicability thresholds), Colorado SB 24-205 (bias mitigation and
impact assessments for high-risk AI), California/Colorado/New York (ADM transparency and
impact assessment requirements). States are merging privacy governance and AI governance
into unified frameworks. Core architectural implication for eco: rights execution must be
a kernel-level primitive, not a plugin; eco needs a jurisdiction-adaptive policy compiler;
privacy and AI governance should be unified in eco's governance layer.

**Key legislative signals by state:**
- California SB 923 — deletion of all personal data including third-party brokered data; multi-source deletion propagation required
- Illinois SB 2875 — data inventories required; right to contest profiling decisions
- Illinois SB 3890 — centralized deletion mechanism for data brokers (broker hub mandate)
- Delaware — sensitive data expanded to include neural data and inferences; threshold lowered 75k → 15k consumers
- Louisiana — adjusted applicability thresholds
- Colorado SB 24-205 — bias mitigation and impact assessments for high-risk AI
- California, Colorado, New York — ADM (Automated Decision-Making) transparency disclosures and impact assessments

**Conceptual Signals for eco:**

1. **Unified Data Rights Surface as a kernel-level primitive** — all four states reinforce the
   same core rights: access, correction, deletion, opt-out of sale/ads/profiling; eco should
   expose these as a single normalized rights API regardless of jurisdiction; rights execution
   is not an extension or plugin, it is a kernel-level OS service; the rights surface is the
   user-facing expression of eco's constitutional governance layer

2. **Deletion Cascade Engine for multi-source propagation** — California SB 923 requires
   deletion of all personal data including third-party brokered data; eco must support multi-
   source deletion propagation: when a deletion is requested, eco traces lineage to all
   downstream copies, derivative uses, and brokered instances and cascades the deletion through
   the full provenance graph; this is the deletion equivalent of eco's compile-anywhere
   governance pattern (source_79)

3. **Data inventory and lineage tracking as compliance prerequisites** — Illinois SB 2875
   explicitly requires data inventories and the ability to contest profiling decisions; eco
   must treat lineage as a first-class primitive and maintain a continuously updated data
   inventory as a runtime artifact, not a manual compliance document; automated lineage
   discovery (source_88) is the mechanism; the inventory is the output

4. **Neural data and inference as sensitive data tier** — Delaware expands sensitive data to
   include neural data and inferences; eco should update its sensitivity taxonomy to include
   neural signals, biometric derivatives, and model-generated inferences as a distinct highest-
   sensitivity tier with corresponding access controls, retention limits, and deletion
   requirements; this is particularly relevant to Jäger-Modus (biological-cybernetic layer)

5. **Jurisdiction-adaptive policy compiler** — thresholds, definitions, and obligations differ
   by state and will continue to diverge; eco should compile policies into executable rules per
   module per jurisdiction; the policy compiler takes a declarative compliance specification
   and generates the enforcement rules for the current operational context; same principle as
   MetaKarta's write-once compile-anywhere model (source_79) applied to regulatory compliance

6. **ADM transparency schema as a universal output format** — multiple states require
   disclosures, impact assessments, and transparency for AI-driven decisions; eco should
   include a universal ADM (Automated Decision-Making) transparency schema that every
   eco-governed agent must emit when making decisions that affect individuals; the schema
   covers: decision type, model or agent used, inputs considered, confidence level, alternatives
   evaluated, and right to contest; this becomes eco's legal compliance output surface

7. **Bias and impact assessment pipeline as a pluggable module** — Colorado SB 24-205 and
   others require bias mitigation and impact assessments for high-risk AI; eco should integrate
   a pluggable assessment pipeline that runs before high-risk agent deployments; assessment
   results are logged as governance artifacts, not just internal checks; the pipeline is a
   promotion gate (same pattern as chaos engineering gates in source_80)

8. **Broker deletion hub connectors** — Illinois SB 3890 mandates a centralized deletion
   mechanism for data brokers; eco should support broker-hub connectors as first-class
   integration targets; eco's deletion cascade engine routes to broker hubs as part of the
   standard deletion propagation flow

9. **Ownership-gap abstraction layer** — no state grants data ownership, but rights pressure
   is building; eco can differentiate by modeling data stewardship, provenance, and value-flow
   even where law does not yet require it; consent-as-license, stewardship records, and
   value-attribution are the ownership-like constructs eco can implement today; eco gets ahead
   of the legal curve rather than reacting to it

**eco immediate adoption list:**
- Cross-source deletion propagation with lineage-traced cascade (CA SB 923)
- Data inventory + lineage as runtime artifacts, not manual documents (IL SB 2875)
- Neural/inference sensitivity tier in eco's data taxonomy (Delaware)
- ADM transparency schema emitted by all high-stakes eco agents (CA/CO/NY)
- Bias mitigation and impact assessment pipeline as a promotion gate (CO SB 24-205)
- Broker deletion hub connectors (IL SB 3890)
- Jurisdiction-adaptive policy compiler for threshold-aware compliance (LA/DE)
- Ownership-gap abstraction: stewardship, provenance, consent-as-license

**Relationship to prior sources:**
- AI Legal and Regulatory Landscape 2026 (source_58): complements EU AI Act and U.S. federal
  framing with state-level specificity; state laws are operationalizing what source_58 frames
- ISO/IEC 42001 and EU AI Act compliance (source_34): state ADM transparency and bias assessment
  requirements align with EU AI Act high-risk AI obligations
- AIBOM and lifecycle governance (source_75): data inventory and lineage tracking are the
  privacy-compliance instantiation of AIBOM at the data-asset level
- Metadata maturity (source_88): data inventories required by IL SB 2875 are a compliance
  mandate for the same lineage infrastructure metadata maturity research recommends

# === END SUMMARY BLOCK ===
