# Project Context

## What this project is

`dxp-org` is the local Developer Experience Platform workspace root. It coordinates multiple project repos, including the DevX Control Plane, DevToolkit v1, DevToolkit v2, and governance packages.

This is a workspace and portfolio boundary, not a single application repo. Individual projects own their implementation details. DCP owns registry and validation. Governance Commons provides the standards layer.

## Current state

- `devx-control-plane` is the active portfolio control plane.
- `devxtoolkit-v1-x` is the active runnable DevToolkit v1 implementation.
- `devxtoolkit-v2-x` is scaffold-only until architecture and compatibility are defined.
- Legacy `devtoolkit` is not active in this workspace.
- `DEV-PLAN.md` and `DEV-PATH.md` define the current portfolio execution plan and development history.

## Key decisions made

- **Workspace, not monorepo** - `dxp-org` contains multiple repos with separate histories.
- **DCP governs portfolio state** - registry, pointer validation, and dashboard state live in `devx-control-plane`.
- **Governance Commons guides standards** - portable rules should come from Governance Commons, not local reinvention.
- **DevToolkit v1 is canonical for implementation** - v2 stays scaffold-only until a migration plan exists.
- **Legacy names leave the active workspace** - confusing old names should be archived or redirected.

## Known constraints

- `dxp-org` itself is under the parent `C:\dev` git repo, so DCP currently reports the workspace root as `no git`.
- Some nested repos are represented as gitlinks in the parent workspace.
- DCP pointer validation must use paths relative to `devx-control-plane`.
- The `.governance` layer should remain lightweight and should not replace `DEV-PLAN.md` or `DEV-PATH.md`.

## What done looks like

The workspace governance baseline is complete when all active repos have `.governance` context, agent instructions, and work logs; DCP validates those pointers along with planning docs; and the dashboard clearly distinguishes active, scaffold, archive, and needs-audit repos.

