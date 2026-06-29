import { Command } from 'commander';
import chalk from 'chalk';
import { validatePlanningDocs } from '../core/validator.js';
import { buildBundle, writeBundle } from '../core/evidence.js';

const ANON_PRINCIPAL = 'dxp-init-cli';

function renderValidationResults(result: ReturnType<typeof validatePlanningDocs>, root: string): void {
  console.log('');
  console.log('  DEV-ACCORD CONFORMANCE CHECK — dxp-init audit validate');
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
      const bundle = buildBundle(
        'audit-validate',
        ANON_PRINCIPAL,
        result.findings,
        { project: opts.project ?? '(portfolio)', root, files_scanned: [] }
      );
      const filePath = await writeBundle(bundle, opts.evidence);
      console.log(chalk.cyan(`  Evidence bundle written: ${filePath}`));
      console.log('');
    }

    if (result.errors > 0) process.exit(1);
    if (opts.strict && result.warnings > 0) process.exit(1);
  });

auditCommand
  .command('normalize')
  .description('Align names, scope, status, paths, and registry pointers')
  .option('--evidence <dir>', 'Emit signed evidence bundle to directory')
  .action(async (opts: { evidence?: string }) => {
    // TODO INIT.16
    console.log('[dxp-init audit normalize] not yet implemented', opts);
  });

auditCommand
  .command('verify')
  .description('Inspect code/tests to confirm declared contracts are implemented')
  .option('--evidence <dir>', 'Emit signed evidence bundle to directory')
  .action(async (opts: { evidence?: string }) => {
    // TODO INIT.17
    console.log('[dxp-init audit verify] not yet implemented', opts);
  });

auditCommand
  .command('trace')
  .description('Follow a claim from origin → authority → plan → implementation → evidence')
  .option('--evidence <dir>', 'Emit signed evidence bundle to directory')
  .action(async (opts: { evidence?: string }) => {
    // TODO INIT.17
    console.log('[dxp-init audit trace] not yet implemented', opts);
  });

auditCommand
  .command('adversarial')
  .description('Try to disprove claims. Find contradictions, drift paths, unsafe assumptions.')
  .option('--evidence <dir>', 'Emit signed evidence bundle to directory')
  .action(async (opts: { evidence?: string }) => {
    // TODO INIT.18
    console.log('[dxp-init audit adversarial] not yet implemented', opts);
  });

auditCommand
  .command('meta')
  .description('Audit the tracker/registry/gap list — not the thing itself')
  .option('--evidence <dir>', 'Emit signed evidence bundle to directory')
  .action(async (opts: { evidence?: string }) => {
    // TODO INIT.18
    console.log('[dxp-init audit meta] not yet implemented', opts);
  });

auditCommand
  .command('authority')
  .description('Identify which document has the right to define each claim')
  .option('--evidence <dir>', 'Emit signed evidence bundle to directory')
  .action(async (opts: { evidence?: string }) => {
    // TODO INIT.17
    console.log('[dxp-init audit authority] not yet implemented', opts);
  });

auditCommand
  .command('registry')
  .description('Check projects.yaml and indexes for accuracy (missing fields, stale notes, broken pointers)')
  .option('--evidence <dir>', 'Emit signed evidence bundle to directory')
  .action(async (opts: { evidence?: string }) => {
    // TODO INIT.17
    console.log('[dxp-init audit registry] not yet implemented', opts);
  });

auditCommand
  .command('close')
  .description('Fix issue, validate fix, update trackers')
  .option('--evidence <dir>', 'Emit signed evidence bundle to directory')
  .action(async (opts: { evidence?: string }) => {
    // TODO INIT.19
    console.log('[dxp-init audit close] not yet implemented', opts);
  });

auditCommand
  .command('destale')
  .description('Remove outdated claims after a correction or implementation lands')
  .option('--evidence <dir>', 'Emit signed evidence bundle to directory')
  .action(async (opts: { evidence?: string }) => {
    // TODO INIT.19
    console.log('[dxp-init audit destale] not yet implemented', opts);
  });
