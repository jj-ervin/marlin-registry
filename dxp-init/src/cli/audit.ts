import { Command } from 'commander';
import chalk from 'chalk';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { load as yamlLoad } from 'js-yaml';
import { validatePlanningDocs } from '../core/validator.js';
import { buildBundle, signBundle, verifyBundle, writeBundle } from '../core/evidence.js';
import type { EvidenceBundle } from '../core/evidence.js';
import { loadPrivateKey, hasPrivateKey } from '../core/keystore.js';

const ANON_PRINCIPAL = 'marlin-cli';

function loadLocalPrincipalId(cwd: string): string | null {
  const p = join(cwd, 'gc-principal.yaml');
  if (!existsSync(p)) return null;
  try {
    const doc = yamlLoad(readFileSync(p, 'utf8')) as { principal_id?: string };
    return doc?.principal_id ?? null;
  } catch {
    return null;
  }
}

function trySign(bundle: EvidenceBundle, principalId: string): EvidenceBundle {
  if (!hasPrivateKey(principalId)) return bundle;
  const privateKey = loadPrivateKey(principalId);
  if (!privateKey) return bundle;
  return signBundle(bundle, privateKey);
}

function renderValidationResults(result: ReturnType<typeof validatePlanningDocs>, root: string): void {
  console.log('');
  console.log('  DEV-ACCORD CONFORMANCE CHECK — marlin audit validate');
  console.log('  Standard: GC:2008 / DEV-ACCORD.00');
  console.log(`  ${new Date().toISOString().replace('T', ' ').substring(0, 16)}  ${root}`);
  console.log('');

  for (const f of result.findings) {
    if (f.severity === 'pass') {
      console.log(chalk.green('  [PASS     ]') + chalk.gray(` ${f.description}`));
    } else if (f.severity === 'error') {
      console.log(chalk.red(`  [ERROR ${f.id}]`) + chalk.white(` ${f.file}`) + chalk.redBright(` — ${f.description}`));
      if (f.remediation) console.log(chalk.gray(`             Remediation: ${f.remediation}`));
    } else if (f.severity === 'warning') {
      console.log(chalk.yellow(`  [WARN  ${f.id}]`) + chalk.white(` ${f.file}`) + chalk.yellow(` — ${f.description}`));
      if (f.remediation) console.log(chalk.gray(`             Remediation: ${f.remediation}`));
    }
  }

  console.log('');
  const { errors, warnings, filesChecked } = result;
  if (errors === 0 && warnings === 0) {
    console.log(`  ── ${filesChecked} docs checked  │  ` + chalk.green('all conformant') + `  │  DEV-ACCORD.00 ──`);
  } else if (errors === 0) {
    console.log(`  ── ${filesChecked} docs checked  │  ` + chalk.green('0 errors') + `  ` + chalk.yellow(`${warnings} warnings`) + `  │  DEV-ACCORD.00 ──`);
  } else {
    console.log(`  ── ${filesChecked} docs checked  │  ` + chalk.red(`${errors} errors`) + `  ` + chalk.yellow(`${warnings} warnings`) + `  │  DEV-ACCORD.00 ──`);
  }
  console.log('');
}

export const auditCommand = new Command('audit')
  .description('Run governance audit operations against the current project');

auditCommand
  .command('validate')
  .description('DEV-ACCORD + ONS conformance check (GC:2008 / DEV-ACCORD.00)')
  .addHelpText('after', '\n  Standard: GC:2008 / DEV-ACCORD.00')
  .option('--evidence <dir>', 'Write signed evidence bundle to directory')
  .option('--project <name>', 'Scope to a single project subdirectory')
  .option('--strict', 'Treat warnings as errors (exit 1 if any warnings)')
  .action(async (opts: { evidence?: string; project?: string; strict?: boolean }) => {
    const root = process.cwd();
    const result = validatePlanningDocs(root, { project: opts.project, strict: opts.strict });
    renderValidationResults(result, root);

    if (opts.evidence) {
      const principalId = loadLocalPrincipalId(root) ?? ANON_PRINCIPAL;
      let bundle = buildBundle(
        'audit-validate',
        principalId,
        result.findings,
        { project: opts.project ?? '(portfolio)', root, files_scanned: [] }
      );
      bundle = trySign(bundle, principalId);
      const filePath = await writeBundle(bundle, opts.evidence);
      const signed = !!bundle.signature;
      console.log(chalk.cyan(`  Evidence bundle written: ${filePath}`) + (signed ? chalk.green(' (signed)') : chalk.yellow(' (unsigned — no key found)')));
      console.log('');
    }

    if (result.errors > 0) process.exit(1);
    if (opts.strict && result.warnings > 0) process.exit(1);
  });

auditCommand
  .command('verify-bundle')
  .description('Verify the Ed25519 signature on a signed evidence bundle')
  .argument('<bundle>', 'Path to evidence bundle JSON file')
  .action((bundlePath: string) => {
    let bundle: EvidenceBundle;
    try {
      bundle = JSON.parse(readFileSync(bundlePath, 'utf8')) as EvidenceBundle;
    } catch (e) {
      console.error(chalk.red(`Cannot read bundle: ${e instanceof Error ? e.message : String(e)}`));
      process.exit(1);
    }
    const result = verifyBundle(bundle);
    if (result.valid) {
      console.log(chalk.green('  [VERIFIED]') + ` ${bundlePath}`);
      console.log(chalk.gray(`  Signer:    ${bundle.signature?.key?.kid ?? '—'}`));
      console.log(chalk.gray(`  Signed at: ${bundle.signature?.signed_at ?? '—'}`));
      console.log(chalk.gray(`  Operation: ${bundle.operation}`));
      console.log(chalk.gray(`  Conformant: ${bundle.summary.conformant}`));
    } else {
      console.log(chalk.red('  [INVALID] ') + ` ${bundlePath}`);
      console.log(chalk.red(`  Reason: ${result.reason}`));
      process.exit(1);
    }
  });

auditCommand
  .command('normalize')
  .description('Align names, scope, status, paths, and registry pointers')
  .option('--evidence <dir>', 'Emit signed evidence bundle to directory')
  .action(async (opts: { evidence?: string }) => {
    // TODO INIT.16
    console.log('[marlin audit normalize] not yet implemented', opts);
  });

auditCommand
  .command('verify')
  .description('Inspect code/tests to confirm declared contracts are implemented')
  .option('--evidence <dir>', 'Emit signed evidence bundle to directory')
  .action(async (opts: { evidence?: string }) => {
    // TODO INIT.17
    console.log('[marlin audit verify] not yet implemented', opts);
  });

auditCommand
  .command('trace')
  .description('Follow a claim from origin → authority → plan → implementation → evidence')
  .option('--evidence <dir>', 'Emit signed evidence bundle to directory')
  .action(async (opts: { evidence?: string }) => {
    // TODO INIT.17
    console.log('[marlin audit trace] not yet implemented', opts);
  });

auditCommand
  .command('adversarial')
  .description('Try to disprove claims. Find contradictions, drift paths, unsafe assumptions.')
  .option('--evidence <dir>', 'Emit signed evidence bundle to directory')
  .action(async (opts: { evidence?: string }) => {
    // TODO INIT.18
    console.log('[marlin audit adversarial] not yet implemented', opts);
  });

auditCommand
  .command('meta')
  .description('Audit the tracker/registry/gap list — not the thing itself')
  .option('--evidence <dir>', 'Emit signed evidence bundle to directory')
  .action(async (opts: { evidence?: string }) => {
    // TODO INIT.18
    console.log('[marlin audit meta] not yet implemented', opts);
  });

auditCommand
  .command('authority')
  .description('Identify which document has the right to define each claim')
  .option('--evidence <dir>', 'Emit signed evidence bundle to directory')
  .action(async (opts: { evidence?: string }) => {
    // TODO INIT.17
    console.log('[marlin audit authority] not yet implemented', opts);
  });

auditCommand
  .command('registry')
  .description('Check projects.yaml and indexes for accuracy (missing fields, stale notes, broken pointers)')
  .option('--evidence <dir>', 'Emit signed evidence bundle to directory')
  .action(async (opts: { evidence?: string }) => {
    // TODO INIT.17
    console.log('[marlin audit registry] not yet implemented', opts);
  });

auditCommand
  .command('close')
  .description('Fix issue, validate fix, update trackers')
  .option('--evidence <dir>', 'Emit signed evidence bundle to directory')
  .action(async (opts: { evidence?: string }) => {
    // TODO INIT.19
    console.log('[marlin audit close] not yet implemented', opts);
  });

auditCommand
  .command('destale')
  .description('Remove outdated claims after a correction or implementation lands')
  .option('--evidence <dir>', 'Emit signed evidence bundle to directory')
  .action(async (opts: { evidence?: string }) => {
    // TODO INIT.19
    console.log('[marlin audit destale] not yet implemented', opts);
  });
