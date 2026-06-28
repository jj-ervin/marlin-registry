import type { GcPrincipal } from './principal.js';
import type { EvidenceBundle } from './evidence.js';

export interface WizardAnswers {
  // Principal identity (collected first)
  principal: GcPrincipal;

  // Mode
  mode: 'install' | 'reconfigure';
  preset?: string;

  // Governance tier
  gcConformanceLevel: 'advisory' | 'standard' | 'strict';
  authorityLevel: 'AL:1' | 'AL:2' | 'AL:3';
  governanceRecordStyle: 'pass-cluster' | 'none';

  // Naming (ONS)
  onsValidationTier: 'FAST' | 'STANDARD' | 'STRICT';
  namespaceRoot: string;
  productRoot: string;
  separatorPreference: 'kebab' | 'underscore' | 'explicit';
  vscodeExtensionNaming?: 'product-vscode' | 'vscode-product' | 'product.vscode';
  tokenPrefixPattern?: string;

  // Project shape
  projectType: 'library' | 'app' | 'cli' | 'vscode-extension' | 'backend' | 'fullstack' | 'multi-repo';
  teamTier: 'solo' | 'small-team' | 'enterprise';
  experienceLevel: 'beginner' | 'intermediate' | 'expert';

  // Stack
  frontendFramework?: 'react' | 'vue' | 'svelte' | 'none';
  backendLanguage?: 'typescript' | 'python' | 'go' | 'rust' | 'other';
  ciTarget?: 'github-actions' | 'gitlab-ci' | 'azure-devops' | 'bitbucket' | 'none';
  packageRegistries?: Array<'pypi' | 'npm' | 'internal'>;
  license?: string;
  agenticGovernance: boolean;

  // Scaffold options
  emitPlanningDocs: boolean;
  emitGeeConfig: boolean;
  registerInProjectsYaml: boolean;
  emitCiWorkflow: boolean;
  appendReadmeSection: boolean;
}

export interface ProvisionOptions {
  dryRun?: boolean;
  outputDir?: string;
  evidenceDir?: string;
}

export interface ProvisionResult {
  filesWritten: string[];
  filesSkipped: string[];
  evidence: EvidenceBundle;
}

import { render } from '../templates/index.js';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { randomUUID } from 'crypto';
import { buildBundle } from './evidence.js';
import type { Finding } from './evidence.js';

/** Build the template context shared across all templates. */
function buildContext(answers: WizardAnswers): Record<string, unknown> {
  const now = new Date().toISOString();
  return {
    validatorVersion: '0.1.0',
    timestamp: now,
    date: now.split('T')[0],
    projectName: answers.namespaceRoot || 'unnamed-project',
    projectDescription: '',
    authorityLevel: answers.authorityLevel,
    gcConformanceLevel: answers.gcConformanceLevel,
    onsValidationTier: answers.onsValidationTier,
    namespaceRoot: answers.namespaceRoot,
    productRoot: answers.productRoot,
    separatorPreference: answers.separatorPreference,
    vscodeExtensionNaming: answers.vscodeExtensionNaming,
    tokenPrefixPattern: answers.tokenPrefixPattern,
    agenticGovernance: answers.agenticGovernance,
    emitPlanningDocs: answers.emitPlanningDocs,
    preset: answers.preset,
    principal: answers.principal,
  };
}

/** Map wizard answers to the list of files to emit with their template names. */
function planFiles(answers: WizardAnswers, outputDir: string): Array<{ template: string; dest: string }> {
  const files: Array<{ template: string; dest: string }> = [
    { template: 'gc-principal.yaml.hbs', dest: join(outputDir, 'gc-principal.yaml') },
    { template: 'ons-profile.yaml.hbs', dest: join(outputDir, 'ons-profile.yaml') },
    { template: 'gc-conformance.yaml.hbs', dest: join(outputDir, 'gc-conformance.yaml') },
    { template: 'README-governance-section.md.hbs', dest: join(outputDir, 'README-governance-section.md') },
  ];

  if (answers.emitPlanningDocs) {
    files.push(
      { template: 'DEV-PATH.md.hbs', dest: join(outputDir, 'DEV-PATH.md') },
      { template: 'DEV-PLAN.md.hbs', dest: join(outputDir, 'DEV-PLAN.md') },
    );
  }

  if (answers.ciTarget === 'github-actions' && answers.emitCiWorkflow) {
    files.push({
      template: 'gc-validate.yml.hbs',
      dest: join(outputDir, '.github', 'workflows', 'gc-validate.yml'),
    });
  }

  return files;
}

/**
 * Core provisioning library. Accepts wizard answers, renders templates,
 * validates output, optionally writes governance files.
 * CLI and GUI are thin shells over this function.
 */
export async function provision(
  answers: WizardAnswers,
  opts: ProvisionOptions = {}
): Promise<ProvisionResult> {
  // ZTA: principal must be present before any operation (INIT-D11)
  if (!answers.principal) throw new Error('Principal identity required before provisioning');
  if (answers.principal.role === 'installer' && answers.principal.installer_expiry) {
    throw new Error('Installer role has expired. Re-run with --reconfigure to set ongoing role.');
  }

  const outputDir = opts.outputDir ?? process.cwd();
  const context = buildContext(answers);
  const plan = planFiles(answers, outputDir);

  const filesWritten: string[] = [];
  const filesSkipped: string[] = [];
  const findings: Finding[] = [];

  for (const { template, dest } of plan) {
    try {
      const content = render(template, context);

      if (opts.dryRun) {
        filesSkipped.push(dest);
        console.log(`[dry-run] would write: ${dest}`);
        console.log(content);
        console.log('---');
      } else {
        const dir = dest.substring(0, dest.lastIndexOf('\\') || dest.lastIndexOf('/'));
        if (dir && !existsSync(dir)) mkdirSync(dir, { recursive: true });
        writeFileSync(dest, content, 'utf8');
        filesWritten.push(dest);
        findings.push({ id: `WRITE-${template}`, severity: 'pass', file: dest, description: `Written: ${dest}` });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      findings.push({ id: `ERR-${template}`, severity: 'error', file: dest, description: msg });
    }
  }

  const errors = findings.filter((f) => f.severity === 'error').length;
  const bundle = buildBundle(
    opts.dryRun ? 'install-dry-run' : 'install',
    answers.principal.principal_id,
    findings,
    { project: answers.namespaceRoot, root: outputDir, files_scanned: plan.map((p) => p.dest), preset: answers.preset }
  );

  return { filesWritten, filesSkipped, evidence: bundle };
}
