# C:\dev — Portfolio Control Plane

## What this is

`C:\dev` is the **portfolio control plane** for this developer's local ecosystem.

It is not a monorepo. It is not a project. It is the root from which projects are indexed, navigated, and operated.

## Boundary rules

| Layer | Lives in | Examples |
|---|---|---|
| Portable governance standards | `governance-commons/` | naming, RFCs, trust contracts, schemas |
| Portfolio control plane | `C:\dev` (here) | registry, status tools, indexes, planning templates, pointers |
| Project execution plans | individual project repos | DEV-PLAN.md, DEV-PATH.md, TRACKS.md |
| Live task/agent state | runtime workspace or run records | task queues, agent handoffs, execution traces |

## What belongs here

- `projects.yaml` — registry and pointers to each project's canonical plan
- `dev-status.ps1` — operational status tooling
- `docs/` — portfolio-level docs, source corpus, research index
- `docs/templates/` — planning templates (not filled-in plans)
- Cross-project indexes and pointers

## What does NOT belong here

- Filled-in project plans (those live in each project repo)
- Live runtime execution state (that belongs in a workspace or database)
- Governance standards (those belong in `governance-commons/`)

## Portability rule

> If a rule or standard should be portable across organizations or other portfolios → `governance-commons/`
>
> If it is local workflow, tooling, or convention for this machine and this portfolio → `C:\dev`

## Naming

In prose and documentation, refer to this directory as the **portfolio control plane**, not as a monorepo or master dev repo.
