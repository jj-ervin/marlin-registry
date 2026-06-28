import { Command } from 'commander';

export const statusCommand = new Command('status')
  .description('Portfolio health report — gap table, per-project detail, blocked items')
  .option('--project <name>', 'Single-project status instead of full portfolio')
  .option('--out <file>', 'Write report to file (markdown) instead of terminal')
  .option('--evidence <dir>', 'Emit signed evidence bundle alongside report')
  .action(async (opts: { project?: string; out?: string; evidence?: string }) => {
    // TODO INIT.20 — port dev-report.ps1 logic to TypeScript
    // TODO INIT.27 — emit evidence bundle
    console.log('[dxp-init status] not yet implemented', opts);
  });
