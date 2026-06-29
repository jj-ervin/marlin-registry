/**
 * Marlin — the dxp-init governance installer.
 * "Scaffold governance in five minutes."
 *
 * Marlin is the wizard/installer experience inside dxp-init.
 * The CLI command is `dxp-init install`; the experience says "Welcome to Marlin."
 * Marlin owns first-run only. Long-running control monitoring is a Cockpit module.
 */
import { intro, outro, text, select, confirm, spinner, isCancel, cancel, note } from '@clack/prompts';
import { randomUUID } from 'crypto';
import type { WizardAnswers } from './provisioner.js';
import type { GcPrincipal } from './principal.js';

const DOES_NOT_CERTIFY = [
  'regulatory_compliance',
  'control_effectiveness',
  'security_review',
  'eu_ai_act_conformity',
  'soc2_readiness',
  'nist_ai_rmf_completion',
];

const ATTESTATION_STATEMENT =
  'I confirm that I am authorized to install dxp-init governance scaffolding on this repository. ' +
  'This attestation does not certify regulatory compliance or operational control effectiveness.';

async function ask<T>(prompt: Promise<T | symbol>): Promise<T> {
  const result = await prompt;
  if (isCancel(result)) {
    cancel('Marlin: installation cancelled.');
    process.exit(0);
  }
  return result as T;
}

export async function runMarlin(opts: {
  preset?: string;
  reconfigure?: boolean;
  dryRun?: boolean;
}): Promise<WizardAnswers> {
  intro('  Welcome to Marlin.  ');

  note(
    'The dxp-init governance installer.\n' +
    'Let\'s scaffold your governance baseline.\n\n' +
    'Marlin makes your project audit-ready, evidence-ready,\n' +
    'and control-mapped — it does not certify compliance.',
    'Scaffold governance in five minutes'
  );

  // ── Screen 1: Principal identity ──────────────────────────────────────────

  const name = await ask(text({
    message: 'Your full name',
    validate: v => v.trim() ? undefined : 'Name is required',
  }));

  const email = await ask(text({
    message: 'Your email address (optional — press Enter to skip)',
    defaultValue: '',
  }));

  const role = await ask(select({
    message: 'Your role on this project',
    options: [
      { value: 'owner', label: 'Owner', hint: 'long-term maintainer; makes governance decisions' },
      { value: 'maintainer', label: 'Maintainer', hint: 'ongoing contributor with governance responsibility' },
      { value: 'installer', label: 'Installer', hint: 'setting up governance on behalf of the owner' },
      { value: 'auditor', label: 'Auditor', hint: 'reviewing governance for another project' },
    ],
  })) as 'owner' | 'maintainer' | 'installer' | 'auditor';

  const entityType = await ask(select({
    message: 'Entity type',
    options: [
      { value: 'individual', label: 'Individual', hint: 'personal or sole-developer project' },
      { value: 'llc', label: 'LLC', hint: 'limited liability company' },
      { value: 'corporation', label: 'Corporation', hint: 'incorporated entity' },
    ],
  })) as 'individual' | 'llc' | 'corporation';

  let entityName = '';
  if (entityType !== 'individual') {
    entityName = await ask(text({
      message: 'Entity / company name',
      validate: v => v.trim() ? undefined : 'Required for LLC / corporation',
    }));
  }

  // ── Screen 2: Project identity ────────────────────────────────────────────

  const namespaceRoot = await ask(text({
    message: 'Project namespace root (e.g. my-project, acme-core)',
    validate: v => /^[a-z0-9][a-z0-9\-_.]*$/.test(v.trim()) ? undefined : 'Use lowercase kebab-case (letters, digits, hyphens)',
  }));

  const authorityLevel = await ask(select({
    message: 'Authority level (DEV-ACCORD AL)',
    options: [
      { value: 'AL:1', label: 'AL:1 — Individual / solo', hint: 'no review gating required' },
      { value: 'AL:2', label: 'AL:2 — Team / small org', hint: 'peer review gating' },
      { value: 'AL:3', label: 'AL:3 — Enterprise / regulated', hint: 'formal audit gating' },
    ],
  })) as 'AL:1' | 'AL:2' | 'AL:3';

  const gcConformanceLevel = await ask(select({
    message: 'GC scaffold conformance level',
    options: [
      { value: 'advisory', label: 'Advisory', hint: 'guidelines only; low overhead; solo / early projects' },
      { value: 'standard', label: 'Standard', hint: 'balanced; recommended for team projects' },
      { value: 'strict', label: 'Strict', hint: 'maximum rigour; regulated / enterprise contexts' },
    ],
  })) as 'advisory' | 'standard' | 'strict';

  // ── Screen 3: Stack and CI ────────────────────────────────────────────────

  const ciTarget = await ask(select({
    message: 'CI platform (for automated scaffold validation)',
    options: [
      { value: 'github-actions', label: 'GitHub Actions', hint: 'emit .github/workflows/gc-validate.yml' },
      { value: 'none', label: 'None / skip', hint: 'configure CI manually later' },
    ],
  })) as 'github-actions' | 'none';

  // ── Screen 4: Scaffold options ────────────────────────────────────────────

  const emitPlanningDocs = await ask(confirm({
    message: 'Emit DEV-PATH.md and DEV-PLAN.md planning documents?',
    initialValue: true,
  }));

  let emitCiWorkflow = false;
  if (ciTarget === 'github-actions') {
    emitCiWorkflow = await ask(confirm({
      message: 'Emit .github/workflows/gc-validate.yml CI workflow?',
      initialValue: true,
    }));
  }

  const appendReadmeSection = await ask(confirm({
    message: 'Emit README-governance-section.md (governance badge and commands)?',
    initialValue: true,
  }));

  // ── Build principal record ────────────────────────────────────────────────

  const now = new Date().toISOString();
  const principal: GcPrincipal = {
    version: '1.0.0',
    principal_id: randomUUID(),
    name: name as string,
    ...(email ? { email: email as string } : {}),
    role,
    entity: {
      type: entityType,
      ...(entityName ? { name: entityName } : {}),
    },
    attestation: {
      confirmed: true,
      timestamp: now,
      statement: ATTESTATION_STATEMENT,
    },
    scope: 'governance-scaffold-install',
    does_not_certify: DOES_NOT_CERTIFY,
    created_at: now,
  };

  // ONS tier follows GC level
  const onsMap: Record<string, 'FAST' | 'STANDARD' | 'STRICT'> = {
    advisory: 'FAST',
    standard: 'STANDARD',
    strict: 'STRICT',
  };

  const s = spinner();
  s.start('Preparing scaffold plan…');
  await new Promise(r => setTimeout(r, 300));
  s.stop('Scaffold plan ready');

  outro(`  Governance baseline ready for "${namespaceRoot}".  `);

  return {
    principal,
    mode: opts.reconfigure ? 'reconfigure' : 'install',
    preset: opts.preset,
    gcConformanceLevel,
    authorityLevel,
    governanceRecordStyle: 'pass-cluster',
    onsValidationTier: onsMap[gcConformanceLevel],
    namespaceRoot: namespaceRoot as string,
    productRoot: namespaceRoot as string,
    separatorPreference: 'kebab',
    projectType: 'app',
    teamTier: entityType === 'individual' ? 'solo' : 'small-team',
    experienceLevel: 'intermediate',
    ciTarget: ciTarget === 'none' ? undefined : ciTarget,
    agenticGovernance: false,
    emitPlanningDocs: emitPlanningDocs as boolean,
    emitGeeConfig: false,
    registerInProjectsYaml: false,
    emitCiWorkflow,
    appendReadmeSection: appendReadmeSection as boolean,
  };
}
