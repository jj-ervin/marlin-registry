# OSS 5-Minute Readiness Test

**Purpose:** Prove that a stranger can install Governance Commons or DevX Control Plane, understand the value, and get one useful result in five minutes.

---

## Test Rule

A project is not OSS-ready until a new user can:

1. Clone or download it.
2. Run one obvious install or setup command.
3. See what changed.
4. Understand why it matters.
5. Know the next command or edit.

The target reaction is: "This would reduce chaos in my repo."

---

## Governance Commons

**Five-minute promise:** Add shared AI-agent context to an existing repo.

**Required path:**

```powershell
.\install.ps1 -TargetPath C:\work\my-project
```

**User should see:**
- `.governance/context.md`
- `.governance/agents.md`
- `.governance/log.md`
- `AGENTS.md`
- `CLAUDE.md`
- `.cursor/rules/governance.mdc`
- `.github/copilot-instructions.md`

**User should understand:**
- `context.md` tells agents what the project is.
- `agents.md` tells agents the rules.
- `log.md` preserves decisions and work history.
- Tool-specific files point common AI tools at the same source of truth.

**OSS release gates:**
- README has a five-minute install.
- Installer works from a clean clone.
- Starter files are blank enough for real projects.
- Template files are useful enough to teach by example.
- License, contribution notes, and support boundary are explicit.

---

## DevX Control Plane

**Five-minute promise:** See a multi-repo portfolio from one registry-driven dashboard.

**Required path:**

```powershell
.\dcp.ps1 init -TargetPath C:\work\my-portfolio
Set-Location C:\work\my-portfolio
.\dcp.ps1 validate
.\dcp.ps1 status
```

**User should see:**
- `projects.yaml`
- `dev-status.ps1`
- `validate-pointers.ps1`
- `docs/templates/`
- dashboard output with repo status and planning health

**User should understand:**
- `projects.yaml` is the portfolio source of truth.
- `validate` catches broken planning pointers.
- `status` shows repo lifecycle, dirty state, branch, recent commit, and plan health.
- DCP sits above repos; it does not replace them.

**OSS release gates:**
- README starts with install, result, and value.
- Fresh scaffold works outside the source repo.
- `projects.yaml` has safe example data or an obvious empty state.
- `validate` and `status` fail with clear messages.
- Windows path is proven; Mac/Linux path is documented or marked not ready.
- License, contribution notes, and support boundary are explicit.

---

## What Not To Build Yet

Do not build Pass6 features to compensate for unclear OSS onboarding.

First prove:
- one command installs it
- one command shows value
- one README explains it
- one real user can complete the loop without help

