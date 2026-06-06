# Source 41
# === BEGIN SUMMARY BLOCK ===

## Links
(Eco-internal synthesis document. No external URLs — merged from sources 38 and 39.)

# eco OG v0.2 — Exclusion Set (Merged: HIMSS26 + Global Standards)

## 0. Purpose
This file defines the **canonical exclusion primitives** for eco OG v0.2.  
These represent the **architectural anti‑patterns, governance failures, safety violations, and interoperability dead‑ends** that eco must reject.

Derived from:
- HIMSS26 cross‑article exclusion signals  
- ISO/IEC 42001  
- NIST AI RMF  
- ISO/IEC 23894  
- ISO/IEC 27001  
- ISO/IEC 25010  
- HL7 FHIR  
- TEFCA  
- SAE autonomy levels  
- MITRE ATT&CK + DEFEND  
- COBIT 2019  

---

# 1. Governance & Lifecycle Exclusions

## 1.1 Governance as Afterthought
eco excludes:
- governance added post‑deployment  
- one‑time compliance artifacts  
- undocumented assumptions or limitations  
- lack of defined accountability  
- absence of monitoring or evaluation loops  

## 1.2 Risk‑Blind AI Deployment
eco excludes:
- systems without risk identification  
- unmitigated or unbounded risks  
- deployments without harm modeling  
- lack of lifecycle risk controls  
- “deploy first, govern later” patterns  

## 1.3 Governance Without Stakeholder Alignment
eco excludes:
- governance structures with no ownership  
- performance metrics that cannot be measured  
- governance that does not integrate with enterprise frameworks  

---

# 2. Identity, Autonomy & Agent Governance Exclusions

## 2.1 Unbounded Autonomy
eco excludes:
- agents without defined scope  
- agents operating beyond intended boundaries  
- autonomy without override mechanisms  
- escalation paths that do not exist or cannot be invoked  

## 2.2 Identity‑less Agents
eco excludes:
- agents without unique identity  
- shared credentials across agents  
- actions that cannot be attributed  
- systems without audit trails  

## 2.3 Unverified Agent Behavior
eco excludes:
- agents without behavioral monitoring  
- no anomaly detection  
- no verification of outputs or decisions  
- opaque agent decision pathways  

---

# 3. Interoperability, Data Quality & Infrastructure Exclusions

## 3.1 Proprietary Lock‑In Without Mapping
eco excludes:
- closed ecosystems with no interoperability  
- proprietary formats without FHIR mapping  
- systems that cannot exchange data across networks  

## 3.2 Data Fragmentation as Default
eco excludes:
- architectures that assume fragmented data is acceptable  
- AI systems built on incomplete or ungoverned data  
- lack of longitudinal data access  

## 3.3 Infrastructure Without Reliability or Observability
eco excludes:
- systems without monitoring  
- no logging or traceability  
- architectures that cannot scale or be maintained  
- deployments without rollback or versioning  

---

# 4. Security & Threat Modeling Exclusions

## 4.1 Zero‑Trust Violations
eco excludes:
- agents without identity verification  
- implicit trust between components  
- unrestricted agent‑to‑agent communication  
- lack of access control boundaries  

## 4.2 No Threat Modeling
eco excludes:
- systems without adversarial analysis  
- no mapping of attack surfaces  
- no defensive patterns for agent ecosystems  

## 4.3 Security‑Blind Deployments
eco excludes:
- lack of continuous security monitoring  
- no anomaly detection  
- no audit log analysis  
- agents capable of acting without verification  

---

# 5. Human‑Centered & Workflow Exclusions (HIMSS26)

## 5.1 AI That Increases Cognitive Load
eco excludes:
- systems that add steps to clinician workflows  
- AI that requires manual verification for every action  
- tools that increase documentation burden  

## 5.2 Burnout‑Inducing Automation
eco excludes:
- automation that shifts work to clinicians  
- AI that creates new administrative tasks  
- systems that require constant human correction  

## 5.3 Opaque or Untrustworthy AI
eco excludes:
- no transparency of agent actions  
- no explanation of limitations  
- no human override  
- black‑box systems in clinical workflows  

---

# 6. Operational AI & Multi‑Agent Ecosystem Exclusions

## 6.1 Pilot‑Only AI
eco excludes:
- systems that cannot scale to enterprise deployment  
- AI that cannot operate reliably in production  
- tools without lifecycle management  

## 6.2 Multi‑Agent Chaos
eco excludes:
- agents without coordination  
- no orchestration or task boundaries  
- emergent behavior without governance hooks  

## 6.3 Workflow‑Detached AI
eco excludes:
- AI that operates outside clinical or operational workflows  
- tools that require clinicians to adapt to the AI  
- systems that do not integrate with EHRs or operational systems  

---

# 7. Quality, Reliability & Evaluation Exclusions (ISO 25010)

## 7.1 Quality‑Blind Systems
eco excludes:
- systems without reliability guarantees  
- no performance metrics  
- no maintainability or observability  
- architectures that cannot be tested  

## 7.2 No Evaluation Loops
eco excludes:
- deployments without evaluation  
- no quality gates  
- no structured testing or validation  

---

# 8. eco Cross‑Standard Exclusion Themes

eco OG v0.2 excludes:

- opaque AI systems  
- unbounded agent autonomy  
- identity‑less agents  
- governance as afterthought  
- proprietary lock‑in without mapping  
- AI without data/process modernization  
- systems without monitoring or evaluation  
- security‑blind deployments  
- workflow‑detached AI  
- burnout‑inducing automation  
- pilot‑only AI  
- multi‑agent chaos  
- architectures without auditability  
- lack of longitudinal data foundations  
- lack of transparency or explainability  

---

# 9. Placement
This file belongs in:

```
dev/eco/exclusion/og-v0.2/og-v0.2.exclusion.md
```
