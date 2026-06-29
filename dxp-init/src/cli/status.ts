import { Command } from 'commander';
import { writeFileSync } from 'fs';
import { generateReport, renderReport } from '../core/reporter.js';

export const statusCommand = new Command('status')
  .description('Portfolio health report — gap table, per-project detail, blocked items')
  .option('--project <name>', 'Single-project status instead of full portfolio')
  .option('--out <file>', 'Write report to file (plain text) instead of terminal')
  .option('--gap-only', 'Show gap analysis table only')
  .option('--detail-only', 'Show per-project detail blocks only')
  .option('--evidence <dir>', 'Emit signed evidence bundle alongside report')
  .action(async (opts: { project?: string; out?: string; gapOnly?: boolean; detailOnly?: boolean; evidence?: string }) => {
    const root = process.cwd();
    const report = generateReport(root, { project: opts.project });
    const text = renderReport(report, { gapOnly: opts.gapOnly, detailOnly: opts.detailOnly });

    console.log(text);

    if (opts.out) {
      writeFileSync(opts.out, text, 'utf8');
      console.log(`  Saved: ${opts.out}`);
    }

    if (opts.evidence) {
      const { buildBundle, writeBundle } = await import('../core/evidence.js');
      const findings = report.projects.map(p => ({
        id: p.name,
        severity: 'info' as const,
        file: p.relPath,
        description: `${p.status || '—'} | ${p.al || '—'} | ${p.done}/${p.total} items | ${p.pct}`,
      }));
      const bundle = buildBundle(
        'status',
        'marlin-cli',
        findings,
        { project: opts.project ?? '(portfolio)', root }
      );
      const filePath = await writeBundle(bundle, opts.evidence);
      console.log(`  Evidence bundle written: ${filePath}`);
    }
  });
