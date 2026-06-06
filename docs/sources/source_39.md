# Source 39
# === BEGIN SUMMARY BLOCK ===

## Links
(Eco-internal synthesis document. No external URLs — derived from publicly available standards summaries and crosswalks.)

# eco OG v0.2 — Standards Alignment (Global Governance, Safety, Interop)

## 0. Scope
This document defines the **international standards, protocols, and governance frameworks** that eco aligns with at the primitive level.  
It does **not** reproduce copyrighted text; it extracts the **governance shape**, **control primitives**, and **alignment expectations** from publicly available summaries and crosswalks.

Included frameworks:

- ISO/IEC 42001 (AI Management System)
- NIST AI RMF
- ISO/IEC 23894 (AI Risk Management)
- ISO/IEC 27001 (Information Security)
- ISO/IEC 25010 (Software Quality)
- HL7 FHIR
- TEFCA
- SAE Levels of Autonomy (adapted for agents)
- MITRE ATT&CK + DEFEND
- COBIT 2019

This alignment is used to generate eco’s **inclusion** and **exclusion** primitives.

---

# 1. ISO/IEC 42001 — AI Management System (AIMS)

## 1.1 Inclusion Primitives
- AI lifecycle governance as a continuous discipline  
- Defined roles and responsibilities for AI oversight  
- Documentation, traceability, and auditability  
- Monitoring and incident‑response patterns  
- Risk‑based controls for AI deployment  
- Transparency and explainability expectations  

## 1.2 Exclusion Primitives
- AI systems without lifecycle governance  
- Opaque systems with no traceability  
- Deployments without defined accountability  
- Governance as a one‑time compliance artifact  

---

# 2. NIST AI RMF — Risk Management Framework

## 2.1 Inclusion Primitives
- Governance functions: Map, Measure, Manage, Govern  
- Harm modeling and risk categorization  
- Trustworthiness characteristics (secure, explainable, reliable, fair, accountable)  
- Continuous monitoring and evaluation  
- Documentation of assumptions, limitations, and intended use  

## 2.2 Exclusion Primitives
- AI systems without risk modeling  
- Lack of monitoring or evaluation loops  
- Unverified assumptions or undefined intended use  
- Deployments without trustworthiness criteria  

---

# 3. ISO/IEC 23894 — AI Risk Management

## 3.1 Inclusion Primitives
- Structured AI risk identification  
- Mitigation strategies tied to lifecycle stages  
- Governance hooks for risk escalation  
- Integration with organizational risk frameworks  

## 3.2 Exclusion Primitives
- AI systems without explicit risk controls  
- Risk management performed only post‑deployment  
- Unbounded or unmitigated risk categories  

---

# 4. ISO/IEC 27001 — Information Security Management

## 4.1 Inclusion Primitives
- Identity and access control for human + non‑human actors  
- Audit logging and traceability  
- Zero‑trust alignment  
- Secure configuration and operational controls  
- Continuous security monitoring  

## 4.2 Exclusion Primitives
- Agents without identity  
- Systems without audit trails  
- Unsecured agent autonomy  
- Lack of access control boundaries  

---

# 5. ISO/IEC 25010 — Software Quality Model

## 5.1 Inclusion Primitives
- Reliability  
- Security  
- Maintainability  
- Interoperability  
- Performance efficiency  
- Usability  

## 5.2 Exclusion Primitives
- AI systems without quality attributes  
- Architectures that ignore maintainability or observability  
- Systems that cannot be evaluated or tested  

---

# 6. HL7 FHIR — Interoperability Framework

## 6.1 Inclusion Primitives
- Resource identity and provenance  
- AuditEvent patterns  
- Agent attribution  
- Workflow primitives (Task, Encounter, Observation)  
- Standardized data exchange  

## 6.2 Exclusion Primitives
- Proprietary data formats without mapping  
- AI systems that cannot attribute actions to agents  
- Workflows without provenance or traceability  

---

# 7. TEFCA — National Interoperability Framework

## 7.1 Inclusion Primitives
- Trust framework alignment  
- Identity and authentication rules  
- Exchange patterns for clinical data  
- Governance for data‑sharing networks  

## 7.2 Exclusion Primitives
- Systems that cannot interoperate across networks  
- Untrusted or unverifiable data exchange  
- Identity‑less data flows  

---

# 8. SAE Levels of Autonomy (Adapted for AI Agents)

## 8.1 Inclusion Primitives
- Autonomy levels L0–L5 for non‑human actors  
- Scope‑bounded autonomy  
- Conditional autonomy with override paths  
- Verification of agent behavior  

## 8.2 Exclusion Primitives
- Unbounded autonomy  
- Agents without defined scope  
- No override or human‑in‑the‑loop mechanisms  

---

# 9. MITRE ATT&CK + DEFEND — Security & Threat Modeling

## 9.1 Inclusion Primitives
- Threat modeling for agentic systems  
- Defensive patterns for identity spoofing  
- Behavioral anomaly detection  
- Attack surface mapping for non‑human actors  

## 9.2 Exclusion Primitives
- AI systems without threat modeling  
- Agents without defensive controls  
- Lack of monitoring for adversarial behavior  

---

# 10. COBIT 2019 — Enterprise Governance of IT

## 10.1 Inclusion Primitives
- Governance structures for AI  
- Performance and compliance objectives  
- Stakeholder alignment  
- Continuous improvement cycles  

## 10.2 Exclusion Primitives
- AI systems without enterprise governance  
- Lack of performance metrics  
- Governance treated as optional  

---

# 11. eco Alignment Summary

## 11.1 eco Inclusion Themes (Cross‑Standard)
- Continuous governance  
- Identity for human + non‑human actors  
- Auditability and traceability  
- Risk management as a lifecycle practice  
- Interoperability as a prerequisite  
- Scope‑bounded autonomy  
- Zero‑trust security  
- Quality and reliability as non‑negotiable  
- Human‑centered design and cognitive load reduction  

## 11.2 eco Exclusion Themes (Cross‑Standard)
- Opaque AI systems  
- Unbounded agent autonomy  
- Lack of identity or audit trails  
- Governance as afterthought  
- Proprietary lock‑in without mapping  
- AI without data/process modernization  
- Systems without monitoring or evaluation  
- Security‑blind deployments  

---

# 12. Placement
This file belongs in:

```
dev/eco/inclusion/og-v0.2/standards-alignment.md
```
