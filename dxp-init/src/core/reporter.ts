/**
 * Portfolio planning status reporter.
 * Ports dev-report.ps1 logic to TypeScript.
 * Standard: GC:2008 / DEV-ACCORD.00
 */
import { readFileSync, readdirSync } from 'fs';
import { join, dirname, basename } from 'path';

export interface WorkItem {
  status: 'done' | 'active' | 'blocked' | 'planned';
  work: string;
  priority: string;
}

export interface ProjectReport {
  name: string;
  relPath: string;
  status: string;
  al: string;
  phase: string;
  done: number;
  active: number;
  blocked: number;
  planned: number;
  total: number;
  pct: string;
  nextStep: string;
  nextBlock: string;
}

export interface StatusReport {
  projects: ProjectReport[];
  root: string;
  timestamp: string;
}

const EXCLUDE_PATH = /archive|_archive|lasso_archive|lasso-mvp_archive|[\\/]\.eco[\\/]|state-snapshot/i;

function stripMd(s: string): string {
  return s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/[✅⬜🔵⭕🔴🟡🟢]/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function findColIdx(headers: string[], pattern: RegExp): number | null {
  for (let i = 0; i < headers.length; i++) {
    if (pattern.test(headers[i])) return i;
  }
  return null;
}

function rowStatus(
  fullRow: string,
  cells: string[],
  statusIdx: number | null,
  prioIdx: number | null
): WorkItem['status'] | 'skip' {
  if (/✅/.test(fullRow)) return 'done';
  if (/⬜/.test(fullRow)) return 'planned';
  if (/🔵/.test(fullRow)) return 'active';
  if (statusIdx !== null && statusIdx < cells.length) {
    const sv = cells[statusIdx].toLowerCase().trim();
    if (/^done$|^complete$|^shipped$|^released$|spec-complete|release-complete/.test(sv)) return 'done';
    if (/^active$|in[ -]progress/.test(sv)) return 'active';
    if (/blocked/.test(sv)) return 'blocked';
    if (/^planned$|^queued$|^open$|^todo$|^not.started$/.test(sv)) return 'planned';
  }
  if (prioIdx !== null && prioIdx < cells.length) {
    if (/^P[0-9]$|^P[0-9]\s|^High$|^Medium$|^Low$/.test(cells[prioIdx])) return 'planned';
  }
  return 'skip';
}

const EXCLUDE_FIRST = /^(pass|version|date|state|decision|format|question|q|area|artifact|component|layer|type|surface|release|gap|batch|phase|separator|rule|constraint|symbol|token|tier|scope|id name)$/;

function extractWorkItems(content: string): WorkItem[] {
  const items: WorkItem[] = [];
  const lines = content.split(/\r?\n/);

  for (let i = 0; i < lines.length - 2; i++) {
    const line = lines[i];
    if (/^\s*\|.+\|$/.test(line) && /^\s*\|[\s\-|:]+\|$/.test(lines[i + 1])) {
      const rawHdrs = line.split('|').slice(1, -1).map(h => h.trim());
      const headers = rawHdrs.map(h => h.toLowerCase());
      const firstH = headers[0] ?? '';

      const workIdx = findColIdx(headers, /work|task|goal|item|description/);
      const statusIdx = findColIdx(headers, /^status$|^state$/);
      const prioIdx = findColIdx(headers, /priority/);

      const isWork =
        !EXCLUDE_FIRST.test(firstH) &&
        headers.length >= 2 &&
        workIdx !== null &&
        (statusIdx !== null || prioIdx !== null);

      if (isWork) {
        let j = i + 2;
        while (j < lines.length && /^\s*\|.+\|$/.test(lines[j])) {
          const cells = lines[j].split('|').slice(1, -1).map(c => c.trim());
          const st = rowStatus(lines[j], cells, statusIdx, prioIdx);
          if (st !== 'skip') {
            const work = workIdx !== null && workIdx < cells.length ? stripMd(cells[workIdx]) : '';
            const priority = prioIdx !== null && prioIdx < cells.length ? cells[prioIdx] : '';
            items.push({ status: st, work, priority });
          }
          j++;
        }
        i = j - 1;
      }
    }
  }
  return items;
}

function extractPhase(content: string): string {
  const checks = [
    /^\*\*Active [Pp]hase:\*\*\s*(.+)$/m,
    /^\*\*Current [Pp]hase:\*\*\s*(.+)$/m,
    /^\*\*Active PASS:\*\*\s*(.+)$/m,
    /^\*\*Next milestone:\*\*\s*(.+)$/m,
    /^\*\*Current [Vv]ersion:\*\*\s*(.+)$/m,
    /^\*\*Current [Pp]osition:\*\*\s*(.+)$/m,
  ];
  for (const pat of checks) {
    const m = content.match(pat);
    if (m?.[1]) return stripMd(m[1]);
  }
  const section = content.match(/## (?:Current Phase|CURRENT PHASE)[^\n]*\n\n([^\n]{5,60})\n/s);
  if (section?.[1]) return stripMd(section[1]);
  return '';
}

function extractNextStep(content: string, items: WorkItem[]): string {
  const todo = items.filter(i => i.status === 'active' || i.status === 'planned');
  if (todo.length > 0) {
    const next = [...todo].sort((a, b) => {
      const prioScore = (p: string) => p.match(/P0/) ? 0 : p.match(/P1/) ? 1 : p.match(/P2/) ? 2 : 5;
      const statusScore = (s: string) => s === 'active' ? 0 : 1;
      return prioScore(a.priority) - prioScore(b.priority) || statusScore(a.status) - statusScore(b.status);
    })[0];
    if (next.work) return next.work;
  }

  const prosePats = [
    /(?:Immediate priorities?|Next Work|Priority Work|Active work|Queue)[^\n]*:\s*\n+((?:\s*[-*]\s+[^\n]+\n){1,5})/s,
    /\*\*Next step:\*\*\s*([^\n]+)/,
    /\*\*Next milestone:\*\*\s*([^\n]+)/,
  ];
  for (const pat of prosePats) {
    const m = content.match(pat);
    if (m?.[1]) {
      const lines = m[1].split('\n').filter(l => /^\s*[-*]/.test(l));
      const val = lines[0] ?? m[1];
      const cleaned = stripMd(val.replace(/^\s*[-*]\s+/, ''));
      if (cleaned.length > 5) return cleaned;
    }
  }
  return '';
}

function extractBlockers(planContent: string, releaseContent = ''): string[] {
  const found: string[] = [];
  for (const text of [releaseContent, planContent]) {
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^\s*-\s*\[\s+\]\s*(.+)/);
      if (m) {
        const v = stripMd(m[1]);
        if (v && !found.includes(v)) found.push(v);
      }
    }
    if (found.length >= 3) break;
  }
  if (found.length === 0) {
    const blockerPat = /(?:blocker[s]?:|blocked on|gated on|waiting on|requires?)[:\s]+(.{10,80})/i;
    for (const text of [releaseContent, planContent]) {
      for (const line of text.split(/\r?\n/)) {
        const m = line.match(blockerPat);
        if (m) {
          const v = stripMd(m[1]);
          if (v && !found.includes(v)) found.push(v);
        }
      }
      if (found.length >= 2) break;
    }
  }
  return [...new Set(found)].slice(0, 2);
}

function trunc(s: string, n: number): string {
  return s.length > n ? s.substring(0, n - 1) + '…' : s;
}

function getProjectData(planPath: string, root: string): ProjectReport {
  const dir = dirname(planPath);
  const name = dir === root ? 'dev (root)' : basename(dir);
  const relPath = dir.replace(root + '\\', '').replace(root + '/', '').replace(root, '(root)');

  const report: ProjectReport = { name, relPath, status: '', al: '', phase: '', done: 0, active: 0, blocked: 0, planned: 0, total: 0, pct: '—', nextStep: '', nextBlock: '' };

  let plan: string;
  try { plan = readFileSync(planPath, 'utf8'); } catch { return report; }

  const head15 = plan.split(/\r?\n/).slice(0, 15).join('\n');
  const releasePath = join(dir, 'DEV-RELEASE.md');
  let release = '';
  try { release = readFileSync(releasePath, 'utf8'); } catch { /* optional */ }

  // Status and AL
  const statusM = head15.match(/\*\*Status:\*\*\s*(.+)/);
  if (statusM?.[1]) report.status = trunc(stripMd(statusM[1]), 36);

  const alM = head15.match(/AL:(\d)/);
  if (alM?.[1]) report.al = `AL:${alM[1]}`;

  // Phase
  const ph = extractPhase(plan);
  report.phase = trunc(ph, 55);

  // Work items
  const items = extractWorkItems(plan);
  for (const it of items) {
    if (it.status === 'done') report.done++;
    else if (it.status === 'active') report.active++;
    else if (it.status === 'blocked') report.blocked++;
    else report.planned++;
  }
  report.total = report.done + report.active + report.blocked + report.planned;
  if (report.total > 0) report.pct = `${Math.round((report.done / report.total) * 100)}%`;

  // Next step
  const ns = extractNextStep(plan, items);
  report.nextStep = trunc(ns, 65);

  // Blockers
  const blk = extractBlockers(release, plan);
  if (blk.length === 0 && report.blocked > 0) {
    const bi = items.find(i => i.status === 'blocked');
    if (bi?.work) blk.push(bi.work);
  }
  if (blk.length > 0) report.nextBlock = trunc(blk[0], 70);

  return report;
}

function scanPlanFiles(root: string, project?: string): string[] {
  const searchRoot = project ? join(root, project) : root;
  const results: string[] = [];

  function walk(dir: string) {
    let entries;
    try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (EXCLUDE_PATH.test(fullPath)) continue;
        if (entry.name.startsWith('.')) continue;
        walk(fullPath);
      } else if (entry.isFile() && entry.name === 'DEV-PLAN.md') {
        results.push(fullPath);
      }
    }
  }

  walk(searchRoot);
  return results.sort();
}

export function generateReport(root: string, opts: { project?: string } = {}): StatusReport {
  const planFiles = scanPlanFiles(root, opts.project);
  const projects = planFiles.map(p => getProjectData(p, root));
  return { projects, root, timestamp: new Date().toISOString() };
}

export function renderReport(report: StatusReport, opts: { gapOnly?: boolean; detailOnly?: boolean } = {}): string {
  const { projects, root, timestamp } = report;
  const lines: string[] = [];

  const ts = timestamp.replace('T', ' ').substring(0, 16);
  lines.push('');
  lines.push('  DEV PORTFOLIO STATUS REPORT');
  lines.push('  Standard: GC:2008 / DEV-ACCORD.00');
  lines.push(`  ${ts}  ${root}`);
  lines.push('');

  const C1 = 30, C2 = 24, C3 = 7, C4 = 9, C5 = 6;
  const fit = (s: string, w: number) => (s.length > w ? s.substring(0, w - 1) + '…' : s).padEnd(w);

  if (!opts.detailOnly) {
    lines.push('  ' + fit('PROJECT', C1) + fit('STATUS', C2) + fit('AL', C3) + fit('DONE/TOT', C4) + fit('PCT', C5) + '  PHASE');
    lines.push('  ' + '─'.repeat(C1 + C2 + C3 + C4 + C5 + 14));

    for (const p of projects) {
      const dv = p.total > 0 ? `${p.done}/${p.total}` : '—';
      lines.push(
        '  ' +
        fit(p.name, C1) +
        fit(p.status || '—', C2) +
        fit(p.al || '—', C3) +
        fit(dv, C4) +
        fit(p.pct, C5) +
        '  ' + p.phase
      );
    }

    const tDone = projects.reduce((s, p) => s + p.done, 0);
    const tTotal = projects.reduce((s, p) => s + p.total, 0);
    const tBlk = projects.reduce((s, p) => s + p.blocked, 0);
    const tPct = tTotal > 0 ? `${Math.round((tDone / tTotal) * 100)}%` : '—';

    lines.push('  ' + '─'.repeat(C1 + C2 + C3 + C4 + C5 + 14));
    lines.push(`  ${projects.length} projects │ ${tDone}/${tTotal} structured items (${tPct}) │ ${tBlk} blocked`);
    lines.push('');
  }

  if (!opts.gapOnly) {
    lines.push('  ── PROJECT DETAIL ──────────────────────────────────────────────');
    lines.push('');
    for (const p of projects) {
      const bar = '─'.repeat(Math.max(2, 64 - p.name.length));
      lines.push(`  ── ${p.name} ${bar}`);
      if (p.status) lines.push(`     Status:     ${p.status}`);
      if (p.al) lines.push(`     Authority:  ${p.al}`);
      if (p.phase) lines.push(`     Phase:      ${p.phase}`);
      if (p.total > 0) lines.push(`     Items:      ${p.done}/${p.total} (${p.pct}) — ${p.active} active  ${p.blocked} blocked  ${p.planned} planned`);
      if (p.nextStep) lines.push(`     Next step:  ${p.nextStep}`);
      if (p.nextBlock) lines.push(`     Next block: ${p.nextBlock}`);
      lines.push('');
    }
  }

  return lines.join('\n');
}
