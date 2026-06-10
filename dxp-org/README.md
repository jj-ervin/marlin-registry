# DevX Toolkit Directory Normalization

This workspace now uses ONS-compliant directory names for the DevXToolkit versioned repositories.

- `devxtoolkit-v1-x/` — normalized v1 repo, following ONS `lowercase-kebab` directory naming.
- `devxtoolkit-v2-x/` — normalized v2 repo, following ONS `lowercase-kebab` directory naming.

Rationale:
- ONS directory names must use `lowercase-kebab` form.
- The `.` separator is reserved for hierarchy semantics, so version labels are represented as `-x` rather than `.x`.
- This keeps repository structure aligned with Governance Commons naming governance.
