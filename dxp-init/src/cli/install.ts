import { Command } from 'commander';

export const installCommand = new Command('install')
  .description('Install governance scaffold for a new or existing project')
  .option('--dry-run', 'Show what would be created without writing files')
  .option('--preset <name>', 'Apply named preset (gc-standard, soc2, iso27001, nist-ai-rmf, iso42001, eu-ai-act-readiness, hipaa, pci, fedramp, solo-dev, enterprise, gc-strict)')
  .option('--reconfigure', 'Re-run wizard against existing project; diff-only overwrites')
  .action(async (opts: { dryRun?: boolean; preset?: string; reconfigure?: boolean }) => {
    // TODO INIT.08 — Clack interactive wizard (principal identity first, then governance tier, naming, stack)
    // TODO INIT.22 — principal identity collection
    // TODO INIT.04 — call provisioner.provision(answers, opts)
    console.log('[dxp-init install] not yet implemented', opts);
  });
