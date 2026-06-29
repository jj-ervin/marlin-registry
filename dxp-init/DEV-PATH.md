# DEV-PATH — dxp-init

**AUTHORITY LEVEL: AL:1**
**Status:** active
**Updated:** 2026-06-27
**Authority:** This file. Founding charter for the dxp-init project.

---

## Role

`dxp-init` is a developer onboarding wizard that provisions a full governance
baseline for a new project in one session. It is the missing entry point between
"the specs exist" and "a developer can adopt them in 5 minutes."

It surfaces every consequential style and governance decision upfront — naming
conventions, authority levels, CI targets, package targets, framework preferences,
business entity type — and emits a complete, conformant governance scaffold.

`dxp-init` is a **DXP (Developer Experience)** product and the **first concrete
adoption surface** for GC, DCP, ONS, GEE, and DEV-ACCORD standards.

---

## Mode Map

`dxp-init` is not just an installer. It is a **governance workbench** with three
modes, each a distinct surface over the same core library.

| Mode | Trigger | What it does |
| --- | --- | --- |
| INSTALL | New repo, or `--install` | Wizard → emits governance scaffold from scratch |
| AUDIT | Existing repo, or `--audit` | Full review grammar suite: validate, normalize, verify, adversarial, meta-audit, trace, authority audit, registry audit, close-the-loop, de-stale |
| STATUS | Any repo, or `--status` | Portfolio health report — gap table, per-project detail, blocked items |

**Mode detection:** on first run, `dxp-init` auto-detects mode by checking whether
planning docs already exist in the target repo. If no `DEV-PATH.md` is found,
default to INSTALL. If planning docs are found, offer AUDIT as the default with
INSTALL as a reconfigure option.

The wizard always asks: **"Is this a new repo or an existing project?"** Both
branches are full first-class modes, not afterthoughts.

---

## Architecture Position

| Layer | Owned by | Notes |
| --- | --- | --- |
| Core provisioning library | dxp-init | TypeScript — takes wizard answers, emits governance files |
| CLI frontend | dxp-init | `dxp-init` command — Inquirer/Clack interactive wizard |
| GUI frontend (Electron/Tauri) | dxp-init | Thin window shell over the same core library |
| Cockpit first-run module | Cockpit | Future — Cockpit calls dxp-init core as a module |

The core library is the product. CLI and GUI are shells.
Cockpit integration is not a blocker — it uses the same core when it ships.

---

## What the Wizard Surfaces

### Principal identity

- Name and handle (used in `by:` fields for governance records, passchangelog entries, GEE principal block)
- Email address (governance contact; used in `gc-principal.yaml` and README governance section)
- GitHub / GitLab username (for commit attribution suggestions and `git config` output)
- Role: `owner` / `maintainer` / `installer` / `auditor`
  - `owner` — full authority; can modify any governance record; authority is permanent
  - `maintainer` — authorized to normalize, audit, and close-loop; cannot change foundational authority structure
  - `installer` — one-time bootstrap authority; shifts to `maintainer` after first successful run; expires automatically
  - `auditor` — read-only access to all audit operations; cannot modify governance records
- Entity type: individual / LLC / corporation (if org: entity name and registration jurisdiction)
- Succession principal (optional): name and handle of a backup authority if the owner is unavailable
- Attestation: explicit confirmation that the principal has authority to install governance on this repo
- CI/headless detection: if no TTY is available, wizard prompts for service account / bot principal config rather than a human identity

### Governance tier

- GC conformance level: advisory / standard / strict
- Authority level default for the project (AL:1 / AL:2 / AL:3)
- Governance record style: PASS cluster name, or no formal governance records
- Business entity type: personal / LLC / corporation (affects authority model)

### Naming conventions (ONS)

- ONS validation tier: FAST / STANDARD / STRICT
- Namespace / product root declaration
- Separator preference: kebab-default, underscore-default, or explicit per-domain
- VS Code extension naming: `{product}-vscode` vs `vscode-{product}` vs `{product}.vscode`
- Token prefix: `--{company}-{token}` vs `--{product}-{token}`
- Governance record cluster name (PASS vs custom)

### Project shape

- Project type: library / app / CLI tool / VS Code extension / backend service / full-stack / multi-repo
- Experience level: beginner / intermediate / expert (controls wizard verbosity)
- Team size: solo / small team / enterprise

### Stack and tooling

- Frontend framework: React / Vue / Svelte / None
- Backend language: TypeScript / Python / Go / Rust / other
- CI/CD target: GitHub Actions / GitLab CI / Azure DevOps / Bitbucket / none
- Package registry targets: PyPI / npm / both / internal only / none
- License: MIT / Apache 2.0 / GPL / Proprietary / other
- Agentic governance: is this project governed by AI agents? (yes → GEE + ONS agentic domain)

### Planning scaffold

- DEV-ACCORD planning docs: yes / no (emits DEV-PATH.md, DEV-PLAN.md with correct H1s)
- GEE namespace prefix
- projects.yaml entry stub
- README governance section

---

## Artifacts Emitted

| Artifact | Condition |
| --- | --- |
| `gc-principal.yaml` | Always — canonical identity record; authority anchor for all other emitted files |
| `ons-profile.yaml` | Always |
| `DEV-PATH.md` | If planning scaffold enabled |
| `DEV-PLAN.md` | If planning scaffold enabled |
| `gc-conformance.yaml` | If GC conformance level chosen |
| `.governed-event/config.yaml` | If agentic governance enabled |
| `projects.yaml` entry stub | If portfolio registration chosen |
| `.github/workflows/gc-validate.yml` | If GitHub Actions chosen |
| `README.md` governance section | Always (appended or standalone) |

---

## Standing Quality Gates

These apply to every PASS from Wave 4 onward and cannot be waived:

**Self-validation gate:** any PASS that produces audit output must run
`dxp-init audit validate` on its own source and pass before the PASS can be
closed. A governance tool must pass its own checks on its own source before
shipping. This was established after the Wave 3 dogfood run (2026-06-28)
which found the UTF-8 BOM bug on the first real-data run.

**Schema-validation gate:** any evidence bundle emitted must validate against
`gc-evidence-bundle.schema.json` before the PASS can be closed.

---

## Design Decisions

**INIT-D15 — dxp-init is the install-time bootstrapper; compliance operations is a separate runtime product.**
The boundary between dxp-init and full compliance tooling is architectural, not
branding: dxp-init runs and exits (stateless — reads/writes files, then done),
while compliance operations is a continuously running stateful service (scheduled
control tests, evidence vault with retention and chain-of-custody, exception
tracking, drift detection, a risk register that persists over time). You do not
bolt a persistent service onto a stateless CLI.

The two products share a contract layer: the `gc-principal`, `gc-conformance`,
and `gc-evidence-bundle` schemas are the API between them. dxp-init writes those
artifacts; the compliance platform reads them, tests against them, and tracks
them over time.

Portfolio placement: the runtime compliance product is a **Cockpit compliance
module**, not a new standalone repo. Cockpit is already the runtime operator
surface; continuous compliance operations is a runtime operator surface. This
keeps the portfolio from sprawling and gives Cockpit a concrete first job.

Product tiers (the dividing line is between Tier 2 and Tier 3):

| Tier | Capability | Product |
| --- | --- | --- |
| 1 | Scaffold / install / audit / status | dxp-init |
| 2 | Signed evidence bundles, CI validation, mapping presets | dxp-init |
| 3 | Framework control catalog, control tests, owners, exceptions, review cadence | Cockpit compliance module |
| 4 | Audit workflows, approvals, risk register, retention, dashboards, export packages | Cockpit compliance module |
| 5 | Certification support — auditor / notified-body / Vanta/Drata/Secureframe evidence sync | Cockpit compliance module |

dxp-init's scope ceiling is Tier 2. Even at Tier 5, the product never claims a
project "is compliant" — certification comes from external auditors, notified
bodies, or accredited certifiers. The runtime product's honest claim ceiling is
"controls monitored, evidence collected, exceptions tracked, audit package
generated" — never "SOC 2 certified" or "EU AI Act compliant."

**INIT-D17 — Planning doctrine: waves, tracks, PASSes, sub-PASSes, compound PASSes.**
These four concepts are distinct and operate at different levels. Each PASS must
declare both a wave and a primary track.

**Definitions:**

| Concept | What it is | Dimension |
| --- | --- | --- |
| Track | A permanent workstream lane (A–L) | structural |
| Wave | A sequenced delivery batch | temporal |
| PASS (NNNN.00) | Header PASS — defines the goal and scope of the effort | execution |
| Sub-PASS (NNNN.01–09) | Individual task under a header PASS; runs as needed | decomposition |
| Compound PASS (NNNN.10–99) | Parallel batch of tasks from the header PASS grouped because they can run simultaneously | parallel execution |

**The numbering hierarchy:**

```text
NNNN.00   header PASS — owns the goal
NNNN.01   sub-PASS — individual task
NNNN.02   sub-PASS — individual task
NNNN.10   compound PASS — parallel batch A (tasks that can run at the same time)
NNNN.20   compound PASS — parallel batch B (another parallel group)
```

A compound PASS is the **batch itself**, not a container above it. It groups tasks
from the header that can execute in parallel. Multiple compound PASSes under one
header represent separate parallel waves of grouped work.

**Rules:**

- Every PASS declares exactly one **primary track**. A secondary track may be noted
  when a PASS genuinely spans two concerns (e.g. INIT.02: H primary, L secondary).
- Every PASS declares exactly one **wave**. Wave 0 is reserved for charter PASSes.
- A wave may contain PASSes from multiple tracks. A track spans multiple waves.
- Use **sub-PASSes (.01–.09)** for individual tasks under a header that have distinct
  Done-when criteria or could fail independently.
- Use **compound PASSes (.10–.99)** when multiple tasks from the header can run in
  parallel and belong together as a group. Each compound PASS is one parallel batch.
- A single PASS spanning multiple tracks (like INIT.05) is acceptable when all the
  work ships in one wave. It is a signal, not an error — if the operations had
  different dependencies, they would be sub-PASSes.

**INIT cluster track map (INIT.00–INIT.06):**

| PASS | Track | Wave |
| --- | --- | --- |
| INIT.00 | A — Core provisioning library | 0 |
| INIT.01 | A — Core provisioning library | 1 |
| INIT.02 | H — Evidence profiles (primary); L — Identity (secondary) | 1 |
| INIT.03 | D — Template library | 2 |
| INIT.04 | A — Core provisioning library | 2 |
| INIT.05 | B — CLI (primary); F — AUDIT; G — STATUS | 3 |
| INIT.06 | H — Evidence profiles | 4 |

**INIT-D16 — Marlin product positioning.**
Marlin is the name of the first-run governance installer experience inside
dxp-init. It is the wizard/onboarding UX, not the whole product.

Positioning:

| Name | Role |
| --- | --- |
| Marlin | installer / onboarding wizard experience |
| dxp-init | CLI package and technical command name |
| Cockpit | eventual GUI home |
| GC / ONS | standards underneath |

Users run `dxp-init install`. The experience says "Welcome to Marlin." and
"Scaffold governance in five minutes." The intro/outro voice belongs to Marlin.

Scope boundary: Marlin is sharp and directional — a first-run guide. It does
not own long-running control monitoring; that belongs to a Cockpit compliance
module (see INIT-D15). "Marlin" should never appear on a dashboard, status
page, or recurring job — only at install time.

**INIT-D1 — Core library architecture.**
The provisioning logic lives in a TypeScript library that is independent of any
UI layer. The CLI and GUI are thin shells that call the same library. This means
the GUI is not a rewrite — it is an additional shell added later without touching
the core. Cockpit integration follows the same pattern.

**INIT-D2 — CLI ships first, GUI is the second shell.**
The questions and artifacts are already fully specified. The CLI can ship as soon
as the core library and templates are written. The GUI (Electron/Tauri window) is
a follow-on shell over the same logic, not a separate product phase.

**INIT-D3 — Cockpit is the eventual GUI home, not a blocker.**
Cockpit's founding scope is "eco's personal developer hub" and a first-run
experience fits exactly there. But Cockpit is at scaffold with no code. `dxp-init`
ships standalone and becomes a Cockpit module when Cockpit is ready.

**INIT-D4 — Presets reduce wizard length for common cases.**
Not every developer needs every question. Named presets collapse the wizard for
common configurations: `--preset gc-standard`, `--preset solo-dev`,
`--preset enterprise`, `--preset gc-strict`. Expert mode shows all questions.

**INIT-D5 — All decisions are reversible via re-run.**
`dxp-init --reconfigure` re-runs the wizard against an existing project, shows
current values as defaults, and only overwrites files that change. This makes it
safe to run after the initial scaffold.

**INIT-D10 — Evidence profiles, not compliance profiles. The product never claims compliance.**
`--preset soc2` means "emit controls and evidence scaffolding aligned to SOC 2
Trust Service Criteria." It does not mean "this repo is SOC 2 compliant."
Compliance requires operations, security controls, legal scope, and often external
audit. dxp-init produces audit-ready, evidence-ready, control-mapped artifacts
that an auditor or automated compliance platform (Vanta, Drata, Secureframe) can
consume. The distinction is not a hedge — it is the honest and legally defensible
claim, and it makes the tool more credible, not less.

**INIT-D11 — Zero Trust Architecture (ZTA) is a design principle, not a feature.**
Every identity, permission, and trust decision in dxp-init is designed against
NIST SP 800-207 (Zero Trust Architecture). Key rules: never trust the file — verify
the claim; no implicit trust between modes; every audit action is authenticated
against the principal record; least privilege by default (auditor role cannot write;
installer role expires); session-scoped tokens rather than long-lived credentials.
ZTA is not something added later — it is the frame for every new design decision.

**INIT-D12 — EU AI Act: use "readiness" framing, not "compliance."**
The EU AI Act entered into force 2024-08-01 and becomes fully applicable
2026-08-02. The `--preset eu-ai-act-readiness` profile scaffolds classification,
human oversight configuration, logging, and risk management artifacts. It does not
certify compliance. The same principle applies to all regulatory presets: the tool
emits evidence scaffolding, not compliance certificates.

**INIT-D13 — Evidence bundle is the killer feature; ship it in Phase 1.**
`dxp-init audit --evidence out/` emits a signed JSON/YAML bundle containing:
validator version, input files, findings, principal identity, time.loc timestamp,
and an optional GEE envelope. This is what makes governance claims portable and
auditor-trusted — not the docs, but the signed machine-readable record that the
docs were validated at timestamp T by principal P using validator V. GC already
has `gc-compliance-evidence.schema.json` with JWS/EdDSA signing; dxp-init is the
runtime that produces records in that format.

**INIT-D14 — W3C DID/VC for principal identity is Phase 2. Sign locally first.**
Phase 1: Ed25519 key pair, local signing, `gc-principal.yaml` with a signed
attestation. This is useful, auditor-trusted, and ships in the same release as the
evidence bundle. Phase 2: promote the principal record to a W3C Decentralized
Identifier (DID) with Verifiable Credentials — cryptographically verifiable by
external tools without trusting the repo. Defer until Phase 1 is stable.

**INIT-D9 — Principal identity is the governance anchor; it is collected first.**
Before any wizard question about naming conventions or project shape, the wizard
establishes who the principal is and what authority they hold. Every emitted
governance file references `gc-principal.yaml` for its authority attribution.
The `by:` field in passchangelog entries, the `registrar` field in ONS registries,
the `principal` block in GEE config, and the `**Authority:**` line in DEV-PATH.md
all trace back to this single record. If the principal changes (role transfer,
ownership handoff), re-running `dxp-init install --reconfigure` updates only
`gc-principal.yaml` and the files that reference it.

Installer role expiry is a security hygiene measure: the `installer` role is
flagged in `gc-principal.yaml` as one-time; after the first validated run the
wizard prompts the principal to confirm their ongoing role (usually `owner` or
`maintainer`). The expired installer token is logged in the principal record.

**INIT-D7 — Mode selection is the first and most important question.**
On first run, `dxp-init` auto-detects mode: no planning docs found → INSTALL;
docs exist → AUDIT offered as default with INSTALL available as reconfigure.
The three modes (INSTALL / AUDIT / STATUS) are all first-class surfaces, not
an installer with an afterthought cleanup flag. The underlying core library is
shared; mode is a routing decision, not a separate product branch.

**INIT-D8 — AUDIT mode is the full review grammar surface.**
REVIEW-GRAMMAR.md defines 10 command verbs: normalize, validate, verify,
adversarial audit, meta-audit, trace, authority audit, registry audit,
close-the-loop, and de-stale. The AUDIT module exposes all 10 as discrete
one-click actions in the GUI, and as subcommands in the CLI
(`dxp-init audit validate`, `dxp-init audit normalize`, etc.). The existing
validate-planning.ps1 and dev-report.ps1 are the reference implementations
for the validate and status operations respectively.

**INIT-D6 — GUI target: Electron first, Tauri as follow-on.**
Electron ships faster because it uses standard web tech (React/Svelte). Tauri is
lighter and Rust-based — better for distribution. Decision: build the GUI as a
web app first (can run in Electron immediately), then evaluate Tauri packaging
once the UI is stable.

---

## Phase History

### Phase 0 — Charter

**Status:** ACTIVE
**Period:** 2026-06-27 —
**Pass entries:** INIT-D1 through INIT-D6

- Concept approved; project registered in portfolio
- Architecture decision: core library + CLI + GUI shells
- Full wizard question surface defined (governance tier, naming, stack, tooling)
- Cockpit relationship defined: future module, not blocker
