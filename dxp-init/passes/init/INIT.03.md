# INIT.03 — Template Library

**PASS ID:** INIT.03
**Status:** CLOSED
**Track:** D — Template library
**Wave:** 2 — depends on INIT.01 + INIT.02
**Timestamp:** 2026-06-28T00:00:00Z
**Authority:** AL:1
**Author:** jj-ervin

---

## Goal

All governance files that dxp-init emits are driven by Handlebars templates.
No hardcoded string generation in the core library.

## Scope

- `templates/gc-principal.yaml.hbs`
- `templates/ons-profile.yaml.hbs`
- `templates/gc-conformance.yaml.hbs`
- `templates/DEV-PATH.md.hbs` — H1 + AUTHORITY LEVEL + Status per DEV-ACCORD.00
- `templates/DEV-PLAN.md.hbs`
- `templates/README-governance-section.md.hbs`
- `templates/gc-validate.yml.hbs` — GitHub Actions CI workflow
- `templates/evidence-preset/soc2.yaml.hbs` — SOC 2 controls scaffolding
- `templates/evidence-preset/nist-ai-rmf.yaml.hbs`
- `templates/evidence-preset/iso42001.yaml.hbs`
- `templates/evidence-preset/eu-ai-act-readiness.yaml.hbs`

## Done when

`provisioner.render('DEV-PATH.md', answers)` returns a valid DEV-ACCORD.00
conformant markdown string.

## Depends on

INIT.01 (scaffold), INIT.02 (schemas define the gc-principal shape for templates).

## Next

INIT.04 (core library) consumes the template registry.
