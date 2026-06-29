#!/usr/bin/env node
import { Command } from 'commander';
import { installCommand } from './cli/install.js';
import { auditCommand } from './cli/audit.js';
import { statusCommand } from './cli/status.js';
import { detectMode } from './core/detector.js';

const program = new Command();

program
  .name('marlin')
  .description('Five-minute governance adoption kit\n\n  Install governance → Audit the repo → Emit evidence → Show status')
  .version('0.1.0');

program.addCommand(installCommand);
program.addCommand(auditCommand);
program.addCommand(statusCommand);

// Auto-detect mode when run with no subcommand
program.action(async () => {
  const mode = await detectMode(process.cwd());
  if (mode === 'install') {
    console.log('No governance scaffold found. Run: marlin install');
  } else {
    console.log('Governance scaffold detected. Run: marlin audit  or  marlin status');
  }
  program.outputHelp();
});

program.parse();
