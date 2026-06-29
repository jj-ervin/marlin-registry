import { Command } from 'commander';
import chalk from 'chalk';
import { runMarlin } from '../core/marlin.js';
import { provision } from '../core/provisioner.js';

export const installCommand = new Command('install')
  .description('Install governance scaffold for a new or existing project')
  .option('--dry-run', 'Show what would be created without writing files')
  .option('--preset <name>', 'Apply named preset (gc-standard, soc2, iso27001, nist-ai-rmf, iso42001, eu-ai-act-readiness, hipaa, pci, fedramp, solo-dev, enterprise, gc-strict)')
  .option('--reconfigure', 'Re-run wizard against existing project; diff-only overwrites')
  .action(async (opts: { dryRun?: boolean; preset?: string; reconfigure?: boolean }) => {
    const answers = await runMarlin({
      preset: opts.preset,
      reconfigure: opts.reconfigure,
      dryRun: opts.dryRun,
    });

    const result = await provision(answers, {
      dryRun: opts.dryRun,
      outputDir: process.cwd(),
    });

    if (opts.dryRun) {
      console.log('');
      console.log(chalk.cyan('  [dry-run] No files written. Files that would be created:'));
      for (const f of result.filesSkipped) {
        console.log(chalk.gray(`    ${f}`));
      }
    } else {
      console.log('');
      console.log(chalk.green('  Governance scaffold installed.'));
      for (const f of result.filesWritten) {
        console.log(chalk.gray(`    ${f}`));
      }
    }

    const { errors, warnings } = result.evidence.summary;
    if (errors > 0) {
      console.log('');
      console.log(chalk.red(`  ${errors} error(s) during provisioning — check output above.`));
      process.exit(1);
    }
    if (warnings > 0) {
      console.log(chalk.yellow(`  ${warnings} warning(s)`));
    }

    if (!opts.dryRun) {
      console.log('');
      console.log(chalk.gray('  Next steps:'));
      console.log(chalk.gray('    marlin audit validate    — validate scaffold conformance'));
      console.log(chalk.gray('    marlin status            — view portfolio health report'));
    }
  });
