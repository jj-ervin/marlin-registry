# .governance

> Stop losing context across AI tools.

AI coding tools are powerful, but project context gets scattered across chat history, prompts, rules files, READMEs, issues, and commits. Every time you start a new session, you're rebuilding context from scratch.

`.governance` gives your project a small shared structure for agent instructions, constraints, decisions, and work history — in one place, readable by any agent.

---

## What's inside

```
.governance/
  agents.md       — what agents are allowed to do, what they are not
  context.md      — what this project is, current state, key decisions
  log.md          — what happened, in order, with dates
AGENTS.md         — Codex / Claude Code compatible agent instructions
CLAUDE.md         — Claude Code specific instructions
.cursor/
  rules/
    governance.mdc  — Cursor rules
.github/
  copilot-instructions.md  — GitHub Copilot instructions
```

---

## Quick start

**Option 1 — Starter (blank structure, fill it yourself):**

Copy the `starter/` folder contents into your project root.

**Option 2 — Template (pre-filled examples to guide you):**

Copy the `template/` folder contents into your project root.

---

## How to use it

1. Copy the starter or template into your project root
2. Fill in `.governance/context.md` — what the project is, what state it's in
3. Fill in `.governance/agents.md` — what agents can and cannot do
4. Point your agents at it — paste the contents of `AGENTS.md` into your agent's instruction field, or leave the file in place for tools that pick it up automatically

Every time you start a new agent session, context is already there.

---

## Compatibility

| Tool | File |
|------|------|
| Claude Code | `CLAUDE.md` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| Cursor | `.cursor/rules/governance.mdc` |
| Codex / any agent | `AGENTS.md` |

---

## Part of the DevX Control Plane

`.governance` is the entry point. For teams that need more — agent routing, multi-repo registry, audit trails, compliance evidence — see [DevX Control Plane](https://github.com/dxp-org/devx-control-plane) and [Governance Commons](https://governancecommons.org).

---

*Copyright 2026 Jesse Ervin. All rights reserved.*
