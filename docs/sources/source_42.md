# Source 42

# eco OG v0.2 — Governance Mapping Matrix  
### eco → International Standards, Protocols & Frameworks

## 0. Purpose
This matrix defines how **eco OG v0.2 governance primitives** align with the major global standards and frameworks that shape AI governance, safety, interoperability, and security.

Standards included:
- ISO/IEC 42001 (AIMS)
- NIST AI RMF
- ISO/IEC 23894 (AI Risk)
- ISO/IEC 27001 (Security)
- ISO/IEC 25010 (Quality)
- HL7 FHIR
- TEFCA
- SAE Autonomy Levels (adapted for agents)
- MITRE ATT&CK + DEFEND
- COBIT 2019

This matrix is the **crosswalk** that ensures eco’s governance layer is globally aligned and future‑proof.

---

# 1. Matrix Legend

| Symbol | Meaning |
|--------|---------|
| **✓** | Fully aligned / directly supported by eco primitive |
| **~** | Partially aligned / eco provides compatible structure |
| **Ø** | Not applicable or intentionally excluded |

---

# 2. Governance Mapping Matrix (eco → Standards)

## 2.1 Governance & Lifecycle

| eco Primitive | ISO 42001 | NIST AI RMF | ISO 23894 | COBIT 2019 |
|---------------|-----------|-------------|-----------|------------|
| Continuous governance | ✓ | ✓ | ✓ | ✓ |
| Defined roles & responsibilities | ✓ | ~ | ~ | ✓ |
| Lifecycle monitoring | ✓ | ✓ | ✓ | ✓ |
| Incident response | ✓ | ✓ | ~ | ✓ |
| Documentation & traceability | ✓ | ✓ | ~ | ✓ |
| Governance as ongoing discipline | ✓ | ✓ | ~ | ✓ |

---

## 2.2 Risk Management

| eco Primitive | ISO 42001 | NIST AI RMF | ISO 23894 | COBIT 2019 |
|---------------|-----------|-------------|-----------|------------|
| Risk identification | ✓ | ✓ | ✓ | ~ |
| Harm modeling | ~ | ✓ | ✓ | Ø |
| Risk mitigation | ✓ | ✓ | ✓ | ~ |
| Continuous risk monitoring | ✓ | ✓ | ✓ | ~ |
| Integration with enterprise risk | ~ | ~ | ✓ | ✓ |

---

## 2.3 Identity, Autonomy & Agent Governance

| eco Primitive | ISO 27001 | SAE Levels | MITRE | ISO 42001 |
|---------------|-----------|------------|--------|-----------|
| Identity for non‑human actors | ✓ | Ø | ✓ | ~ |
| Permissioning & access control | ✓ | Ø | ✓ | ~ |
| Scope‑bounded autonomy | Ø | ✓ | ~ | ~ |
| Override mechanisms | Ø | ✓ | ~ | ~ |
| Behavioral verification | ~ | ✓ | ✓ | ~ |
| Auditability of agent actions | ✓ | ~ | ✓ | ~ |

---

## 2.4 Interoperability & Data Foundations

| eco Primitive | HL7 FHIR | TEFCA | ISO 25010 | ISO 42001 |
|---------------|----------|--------|------------|-----------|
| Standardized data exchange | ✓ | ✓ | ~ | ~ |
| Provenance & attribution | ✓ | ✓ | ~ | ~ |
| AuditEvent patterns | ✓ | ~ | ~ | ~ |
| Longitudinal data | ~ | ✓ | ~ | ~ |
| Data quality requirements | ~ | ~ | ✓ | ✓ |
| Mapping proprietary → open | ~ | ~ | ~ | ~ |

---

## 2.5 Security & Threat Modeling

| eco Primitive | ISO 27001 | MITRE ATT&CK | MITRE DEFEND | NIST AI RMF |
|---------------|-----------|---------------|---------------|--------------|
| Zero‑trust alignment | ✓ | ~ | ~ | ~ |
| Identity verification | ✓ | ~ | ~ | ~ |
| Threat modeling | ~ | ✓ | ✓ | ~ |
| Attack surface mapping | ~ | ✓ | ✓ | Ø |
| Continuous security monitoring | ✓ | ~ | ~ | ✓ |
| Anomaly detection | ~ | ✓ | ✓ | ~ |

---

## 2.6 Human‑Centered AI (HIMSS26)

| eco Primitive | ISO 42001 | NIST AI RMF | ISO 25010 | HIMSS26 |
|---------------|-----------|-------------|------------|----------|
| Cognitive load reduction | Ø | ~ | ✓ (usability) | ✓ |
| Burnout mitigation | Ø | ~ | ~ | ✓ |
| Workflow alignment | ~ | ~ | ✓ | ✓ |
| Transparency & explainability | ✓ | ✓ | ~ | ✓ |
| Human override | ✓ | ~ | Ø | ✓ |

---

## 2.7 Operational AI & Multi‑Agent Ecosystems

| eco Primitive | ISO 42001 | ISO 25010 | SAE Levels | MITRE |
|---------------|-----------|------------|------------|--------|
| Multi‑agent orchestration | Ø | ~ | ✓ | ~ |
| Enterprise‑grade reliability | ~ | ✓ | Ø | Ø |
| Lifecycle management | ✓ | ✓ | Ø | Ø |
| Versioning & rollback | ~ | ✓ | Ø | Ø |
| Workflow‑integrated agents | ~ | ~ | ~ | Ø |

---

# 3. eco → Standards Alignment Summary

## 3.1 Strongest Alignments
eco OG v0.2 is **fully aligned** with:
- ISO/IEC 42001  
- NIST AI RMF  
- ISO/IEC 27001  
- ISO/IEC 25010  
- HIMSS26 operational and clinical workflow patterns  

## 3.2 High‑Value Partial Alignments
eco aligns structurally with:
- ISO/IEC 23894 (risk)  
- TEFCA (trust + identity)  
- HL7 FHIR (provenance + attribution)  
- SAE autonomy levels (agent governance)  
- MITRE ATT&CK/DEFEND (threat modeling)  

## 3.3 Intentional Non‑Alignments (Exclusions)
eco intentionally does **not** align with:
- unbounded autonomy  
- identity‑less agents  
- proprietary lock‑in without mapping  
- governance‑as‑afterthought patterns  
- pilot‑only AI  
- workflow‑detached AI  

These are codified in the OG v0.2 exclusion file.

---

# 4. Placement

```
dev/eco/governance/og-v0.2/og-v0.2.governance-mapping-matrix.md
```
# 4. Placement, Versioning & Integration

## 4.1 File Placement
This governance mapping matrix belongs in:

```
dev/eco/governance/og-v0.2/og-v0.2.governance-mapping-matrix.md
```

## 4.2 Versioning
- **Version:** OG v0.2  
- **Status:** Stable  
- **Upstream sources:** HIMSS26 corpus, global standards alignment  
- **Downstream dependencies:**  
  - OG v0.2 inclusion set  
  - OG v0.2 exclusion set  
  - OG v0.2 invariants  
  - eco governance README  
  - eco boundary map  

## 4.3 Integration Notes
- This matrix acts as the **crosswalk spine** for eco’s governance layer.  
- All future governance artifacts must reference this matrix for alignment.  
- Any new domain (aviation, maritime, enterprise ops, etc.) must map its primitives to this matrix before inclusion.  
- Updates to standards (e.g., ISO revisions, NIST RMF updates, TEFCA expansions) require a **minor version bump** (v0.2.x).  
- Structural changes to eco’s governance model require a **major version bump** (v0.3+).  

## 4.4 Canonical Upstream/Downstream Flow

```
[HIMSS26 Corpus]  
        ↓  
[Standards Alignment]  
        ↓  
[Governance Mapping Matrix ← (this file)]  
        ↓  
[Inclusion Set] + [Exclusion Set]  
        ↓  
[Invariants]  
        ↓  
[eco Governance Layer]  
        ↓  
[eco OS Subsystems & Domain Strains]
```

## 4.5 Compliance Notes
- This matrix does **not** reproduce copyrighted standards.  
- It encodes only the **governance shape**, **control primitives**, and **alignment expectations**.  
- eco’s governance layer remains fully compatible with ISO, NIST, HL7, TEFCA, MITRE, and COBIT frameworks without embedding proprietary text.

---

# End of File