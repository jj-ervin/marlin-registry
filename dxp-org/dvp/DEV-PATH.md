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
