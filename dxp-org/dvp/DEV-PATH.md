# DEV-PATH — Doc Vault Plane (DVP)

**Status:** PROPOSED — repo does not exist yet
**time.loc:** 2026-06-16T00:00:00Z
**Planned by:** Jess Ervin (jj-ervin)
**Depends on:** gc.profile.doc-vault (committed 2026-06-15), GC PASS-6

---

## What DVP Is

DVP (Doc Vault Plane) is the control plane for business document repositories.
It is the business-facing counterpart to DCP (DevX Control Plane).

```text
DCP   DevX Control Plane     code repos        developer audience
DVP   Doc Vault Plane        business docs     founder / operator audience
```

Both sit on top of Governance Commons. Both read GC profiles. Separate tools, same standard.

See `c:\dev\governance-commons\DEV-PLAN.md` PASS-6 Track VI for the full DVP scope definition.

---

## What DVP Does

- Business vault installer: generates folder scaffold + `.governance/` from plain questions
- Business type templates: Holding Company, Creative Studio, Solo Consultant, etc.
- Audit scanner: reads `.governance/profile.yml`, scans folder, reports gaps and misfiles
- Cleanup report generator
- `agents.yml` refresh: keeps `current_state` accurate as the vault evolves
- MCP config generator ("Connect to Claude Desktop")
- Agent context prompt generator ("Copy Agent Context")
- Dry-run / preview mode before applying changes
- Windows + OneDrive-aware path handling

---

## Role Model (pre-build requirement)

DVP touches legally sensitive business records. Roles must be defined before any installer code is written.

| Role | Access | Can mutate vault | Notes |
| --- | --- | --- | --- |
| Vault Owner | Full | Yes — install, restructure, delete with confirm | Must approve any destructive action |
| Operator | Scan + report + generate agent config | No restructure | Generating reports is a write action; still logged |
| Agent | Read-only, constrained by `agents.yml` | No | Cannot exceed what `agents.yml` declares |
| Auditor | Archive read-only | No | Cannot trigger any action |

**Invariants:**

- DVP must log every file it creates, moves, or renames — immutable audit trail
- No delete or destructive restructure without explicit Vault Owner confirmation
- Derived artifacts (scan reports, agent configs) produced from sensitive source material are also sensitive — treat with same access controls as the vault itself
- Least-privilege: each role gets only what its function requires, nothing more

---

## Build Order (PROPOSED)

1. PowerShell/Python CLI — validates concept, works on Windows today
2. Simple local web UI — accessible to non-developers
3. Desktop app (Tauri or Electron) — only after adoption proves demand

---

## INDUSTRY GAP ANALYSIS — Doc Vault Plane (DVP)

**Framework:** 12-question gap analysis (c:\dev\docs\gap-analysis-framework.md v1.1)
**Applied:** 2026-06-16
**Scope:** DVP as a business document control plane for founders and operators
**Gap states:** `open` | `spec-complete` | `release-complete` | `runtime-complete`

Note: DVP does not exist yet. All gaps are open. This analysis defines what must be built.

| Q | Area | Priority | Gap | Status | Suggested Action |
| --- | --- | --- | --- | --- | --- |
| Q1 | Regulatory | High | Business docs are directly regulated: IRS 7-year retention, SOX records, HIPAA (if health), GDPR (if EU personal data), state LLC record requirements (Wyoming, Delaware, etc.) | open | Build jurisdiction-aware retention schedule generator; Wyoming LLC template first |
| Q2 | Standards | High | gc.profile.doc-vault aligns with ISO 15489 and ARMA GARP but DVP has no formal conformance claim or certification path | open | Define DVP conformance levels against gc.profile.doc-vault; publish conformance checklist |
| Q3 | De Facto | High | Target users store files in OneDrive, Google Drive, Dropbox — not raw local folders; no integration with any cloud storage provider | open | Build OneDrive-aware installer first (matches primary user); add Google Drive path |
| Q4 | Best Practice | High | No dry-run mode; no preview of folder changes before applying; no rollback; no idempotent re-install | open | Dry-run and manifest output are table-stakes for a tool touching business records |
| Q5 | Security | High | Installer reads/writes business records folders containing sensitive legal and financial docs; no privilege scoping; no audit log of what DVP changed | open | DVP must log every file it creates, moves, or renames; never delete without explicit confirm |
| Q6 | Ops | Medium | No runbooks for: scan fails, agents.yml out of sync, profile version mismatch, OneDrive sync conflict during install | open | Define recovery paths for each failure mode before v1 |
| Q7 | DevEx | Critical | Target user is a founder, not a developer; must work without CLI knowledge; 5-minute adoption must be provable on a real messy folder | open | Validate with real messy folder (Osprey pre-cleanup state); fix every stumble |
| Q8 | Interop | High | Must work with Claude Desktop (MCP), ChatGPT (file upload), Copilot, Codex, Cursor; must generate correct config for each | open | "Connect to [tool]" button for each major AI agent surface |
| Q9 | Process | Low | DVP is a new product with no process yet; establish basic: issue tracking, versioning, security disclosure | open | Mirror DCP process once repo exists |
| Q10 | Docs | High | No docs exist yet; the Osprey session is the only real example; onboarding must not assume any prior knowledge of GC or ONS | open | Write docs from the founder's perspective, not the developer's; Osprey walkthrough as the quickstart |
| Q11 | Testing | High | No installer tests; no tests for messy folder state, existing .governance/, OneDrive paths, Windows long paths, special characters in folder names | open | Build test suite against real-world messy folder states; include OneDrive path tests |
| Q12 | Ahead | High | `.governance/` as a machine-readable business constitution that any AI can read cold — no product owns this space; DVP is first-mover if shipped well | open | The Osprey session proved the concept works; DVP makes it repeatable in 5 minutes |

---

## Agent Safety Gap Items — DVP

**Source:** Claude + ChatGPT synthesis, 2026-06-17
**Context:** The policy layer already exists in gc.profile.doc-vault (`ai-access-boundaries.md`,
`access-matrix.template.yml`, `metadata.schema.yml`, `lifecycle.yml`). Agents have rules to read.
The enforcement layer — machine-enforceable operating contracts before an agent renames, moves,
opens, or modifies a file — does not yet exist. These items define what must be built.

| ID | Item | Priority | Description |
| --- | --- | --- | --- |
| DVP-AGENT-01 | Agent naming decision contract | P0 | Machine-readable rules for constructing filenames from entity, domain, category, lifecycle state, version, and date. Belongs in doc-vault/DVP, not ONS. ONS validates shape; DVP decides the correct business/legal segments. Agents execute this algorithm deterministically — no guessing from prose examples |
| DVP-AGENT-02 | Protected record manifest | P0 | `.governance/record-manifest.yml` tracks all governed records: immutable flags, SHA-256 hashes, lifecycle state, access level, and authorized operations per record. Stronger than an immutability manifest — covers rename/move/delete/read permissions. Files with `executed`, `issued`, `confirmation`, or `received` status are immutable by default |
| DVP-AGENT-03 | Agent operation policy | P0 | Defines what agents may do: suggest rename, stage rename, execute rename, create draft, redact copy, update index, etc. Sensitive or immutable records require Vault Owner approval before any mutation. No agent may exceed the operations declared in this policy |
| DVP-SEC-01 | Storage and encryption posture checks | P1 | DVP cannot encrypt, but it can verify declared posture: `owner-only` files must be in private/encrypted storage; public paths must not contain restricted classes; AI-accessible paths (MCP config) must not include `owner-only` records. Flags violations on every scan |
| DVP-AUDIT-01 | Unauthorized mutation detection | P1 | Compare filesystem state against `record-manifest.yml` hashes and index. If a governed record changed without a logged DVP operation, flag it as an unlogged mutation. Provides tamper-evidence without requiring OS-level audit tooling |

**Architectural boundary:** DVP-AGENT-01 through DVP-AUDIT-01 make `.governance/` a machine-enforceable
operating contract, not just a briefing document. The agent reads it not to understand what to do,
but to receive permission or denial for a specific operation on a specific record.

---

## Future Verticals — Industry Applications

DVP's core (installer, scanner, manifest, agent operation policy) is domain-agnostic. Industry
verticals instantiate DVP with a domain-specific GC profile and a regulatory rules layer.

### EHS Compliance Dashboard (STUB — 2026-06-17)

**Status:** Idea — pending ChatGPT review pass before any scoping decision
**Source:** Claude Desktop + Claude Code synthesis, 2026-06-17

**What it is:** DVP applied to industrial compliance document management (chemical plants,
manufacturing, energy). A compliance health dashboard: document + certification registry,
gap detection against triggered regulatory obligations, regulatory change monitoring.

**Three layers (Claude Desktop analysis):**

| Layer | What it does | Liability exposure | Build complexity |
| --- | --- | --- | --- |
| 1 — Document + deadline registry | Ingests permits, certs, training records, inspection reports; extracts expiry dates; maintains calendar with lead-time alerts | None — calendar/tracking only | Low — DVP core does most of this |
| 2 — Gap detection | Given chemical inventory + processes, what permits/certs should exist that don't? Requires rules mapping chemical thresholds to triggered regulations (RMP, PSM, RCRA, EPCRA, etc.) | Medium — implies regulatory judgment; needs compliance professional review of ruleset | Medium — finite, stable ruleset once built per regulatory regime |
| 3 — Regulatory monitoring | Watches EPA/OSHA/state dockets for rule changes affecting relevant CFR sections; flags "this affects you" | Low — surfacing only, no verdicts | High — external data pipeline, state-level variation |

**Regulatory domain (US federal core):** EPA RMP (CAA 112r), OSHA PSM (1910.119), TSCA, RCRA,
EPCRA/Tier II, DOT hazmat, NPDES. State agencies layer on top (TCEQ, etc.). Scope is finite once
a plant's chemical inventory and process thresholds are defined.

**Market context:** EHS compliance software is an existing category (Intelex, VelocityEHS,
Enablon). Incumbents are enterprise workflow software, not agent-native. Differentiated angle:
agent-readable document governance a founder/EHS manager sets up in an afternoon without an
implementation consultant — same wedge as DVP for LLCs.

**Relationship to DVP:** Layer 1 is DVP core + a `gc.profile.ehs-compliance` profile.
Layer 2 adds a `required-documents.yml` per regulatory regime (already sketched as
`gc.profile.audit-gap` in GC PASS-6 Track I). Layer 3 is the only genuinely new piece.

**Next step:** ChatGPT review pass on regulatory specifics, especially Layer 2 ruleset
mapping CFR sections to chemical thresholds. Decide: standalone product or DVP industry vertical.

---

## Relationship to Other Repos

| Layer | Repo | Role |
| --- | --- | --- |
| Standards | governance-commons | Defines gc.profile.doc-vault; DVP reads it |
| Naming | ons | Defines naming grammar; DVP applies it |
| Business doc control plane | dvp (this) | Installer, scanner, agent config generator |
| Developer control plane | dxp-org/devx-control-plane | Separate tool; same GC standard |

---

## Live Example

Osprey LLC (`C:\Users\Jess\OneDrive\Documents\100_BUISNESS\Osprey_LLC`) is the
first manually-configured DVP vault. The `.governance/` folder there (profile.yml, ons.yml,
retention.yml, agents.yml) is the reference implementation for what DVP will generate automatically.

See `c:\dev\governance-commons\profiles\doc-vault\examples\osprey-holding.profile.yml`
