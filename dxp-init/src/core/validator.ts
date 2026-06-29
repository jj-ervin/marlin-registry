/**
 * Planning document conformance validator.
 * Ports validate-planning.ps1 DEV-ACCORD.00 rules to TypeScript.
 * Standard: GC:2008 / DEV-ACCORD.00
 */
import { readFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import type { Finding } from './evidence.js';

export interface ValidationResult {
  findings: Finding[];
  errors: number;
  warnings: number;
  filesChecked: number;
}

const VALID_TYPES = ['DEV-PATH', 'DEV-PLAN', 'DEV-RELEASE', 'DEV-TRACKS'] as const;
const EM_DASH = '—';
const EN_DASH = '–';

const EXCLUDE_DIR = /archive|_archive|lasso_archive|lasso-mvp_archive|node_modules|\.venv|state-snapshot|devtoolkit-legacy/i;

function normRel(filePath: string, root: string): string {
  return filePath.replace(root + '\\', '').replace(root + '/', '').replace(/\\/g, '/');
}

function scanPlanningDocs(root: string, projectScope?: string): string[] {
  const searchRoot = projectScope ? join(root, projectScope) : root;
  const results: string[] = [];

  function walk(dir: string, depth: number) {
    if (depth > 4) return;
    let entries;
    try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (EXCLUDE_DIR.test(entry.name)) continue;
        // skip hidden dirs except .github
        if (entry.name.startsWith('.') && entry.name !== '.github') continue;
        walk(fullPath, depth + 1);
      } else if (entry.isFile()) {
        if (/^(DEV-PATH|DEV-PLAN|DEV-RELEASE|DEV-TRACKS)\.md$/.test(entry.name) || entry.name === 'TRACKS.md') {
          results.push(fullPath);
        }
      }
    }
  }

  walk(searchRoot, 0);
  return [...new Set(results)].sort();
}

interface DocRecord { h1: string; path: string; }

function checkDoc(
  filePath: string,
  root: string,
  h1ByType: Map<string, DocRecord[]>
): Finding[] {
  const findings: Finding[] = [];
  const name = basename(filePath);
  const rel = normRel(filePath, root);

  const addFinding = (id: string, severity: Finding['severity'], description: string, remediation?: string) =>
    findings.push({ id, severity, file: rel, description, rule: `DEV-ACCORD-${id}`, standard_ref: 'GC:2008', ...(remediation ? { remediation } : {}) });

  // W3 — legacy TRACKS.md name
  if (name === 'TRACKS.md') {
    addFinding('W3', 'warning', 'File named TRACKS.md — canonical name is DEV-TRACKS.md (DEV-ACCORD-CI-5)', 'Rename to DEV-TRACKS.md');
    return findings;
  }

  const typeFromName = name.replace(/\.md$/, '');
  if (!(VALID_TYPES as readonly string[]).includes(typeFromName)) return findings;

  let lines: string[];
  try {
    lines = readFileSync(filePath, 'utf8').split(/\r?\n/);
  } catch (e) {
    addFinding('E1', 'error', `Cannot read file: ${e instanceof Error ? e.message : String(e)}`);
    return findings;
  }

  if (lines.length === 0 || lines.every(l => l.trim() === '')) {
    addFinding('E1', 'error', 'File is empty');
    return findings;
  }

  // E1 — H1 must be first non-empty line
  const firstNonEmpty = lines.slice(0, 5).find(l => l.trim() !== '');
  if (!firstNonEmpty || !firstNonEmpty.startsWith('# ')) {
    const preview = (firstNonEmpty ?? '').substring(0, 60);
    addFinding('E1', 'error', `H1 is not the first non-empty line (found: '${preview}')`, `First non-empty line must be: # ${typeFromName} — <Project Scope>`);
    return findings;
  }

  const h1Body = firstNonEmpty.substring(2);
  const hasEmDash = h1Body.includes(EM_DASH);
  const hasEnDash = h1Body.includes(EN_DASH);
  const hasHyphen = /^[A-Z\-]+ - /.test(h1Body);

  // E2 — doc type detection
  let detectedType: string | null = null;
  for (const t of VALID_TYPES) {
    if (h1Body.startsWith(`${t} ${EM_DASH}`) || h1Body.startsWith(`${t}${EM_DASH}`)) { detectedType = t; break; }
    if (h1Body.startsWith(`${t} `) || h1Body === t) { detectedType = t; break; }
  }

  let hasErrors = false;

  if (!detectedType) {
    addFinding('E2', 'error', `H1 doc type not recognized — expected one of: ${VALID_TYPES.join(', ')} (H1: '${h1Body}')`, `Start H1 with one of: ${VALID_TYPES.map(t => `# ${t} —`).join(', ')}`);
    hasErrors = true;
  } else if (detectedType !== typeFromName) {
    addFinding('E2', 'error', `H1 doc type '${detectedType}' does not match filename '${name}'`);
    hasErrors = true;
  }

  // E3 — em dash separator
  if (!hasEmDash) {
    if (hasHyphen) {
      addFinding('E3', 'error', `H1 uses hyphen (-) as separator — must be em dash ${EM_DASH} (U+2014)`, `Replace \" - \" with \" ${EM_DASH} \"`);
    } else if (hasEnDash) {
      addFinding('E3', 'error', `H1 uses en dash (${EN_DASH}) as separator — must be em dash ${EM_DASH} (U+2014)`, `Replace \"${EN_DASH}\" with \"${EM_DASH}\"`);
    } else {
      addFinding('E3', 'error', `H1 missing em dash separator ${EM_DASH} (U+2014)`, `Format: # ${typeFromName} ${EM_DASH} <Project Scope>`);
    }
    hasErrors = true;
  }

  // E4 — scope not empty
  let scope = '';
  if (hasEmDash && detectedType) {
    const afterType = h1Body.substring(detectedType.length).trimStart();
    if (afterType.startsWith(EM_DASH)) scope = afterType.substring(1).trim();
  }
  if (hasEmDash && scope === '') {
    addFinding('E4', 'error', `H1 project scope is empty after em dash`, `Format: # ${typeFromName} ${EM_DASH} <Project Scope>`);
    hasErrors = true;
  }

  // Collect for E5 collision check
  if (!hasErrors && detectedType && hasEmDash && scope) {
    const h1Text = firstNonEmpty.trim();
    const list = h1ByType.get(typeFromName) ?? [];
    list.push({ h1: h1Text, path: filePath });
    h1ByType.set(typeFromName, list);
  }

  // W1/W2 — first 15 lines
  const head15 = lines.slice(0, 15).join('\n');
  if (!/\*\*AUTHORITY LEVEL: AL:\d/.test(head15)) {
    addFinding('W1', 'warning', 'AUTHORITY LEVEL not declared in first 15 lines', 'Add **AUTHORITY LEVEL: AL:N** (where N is 1, 2, or 3) within the first 15 lines');
  }
  if (!/\*\*[Ss]tatus[:\*]/.test(head15)) {
    addFinding('W2', 'warning', 'Status not declared in first 15 lines', 'Add **Status:** <value> within the first 15 lines');
  }

  if (!hasErrors) {
    findings.push({ id: 'PASS', severity: 'pass', file: rel, description: rel });
  }

  return findings;
}

export function validatePlanningDocs(
  root: string,
  opts: { project?: string; strict?: boolean } = {}
): ValidationResult {
  const files = scanPlanningDocs(root, opts.project);
  const allFindings: Finding[] = [];
  const h1ByType = new Map<string, DocRecord[]>();

  for (const filePath of files) {
    const findings = checkDoc(filePath, root, h1ByType);
    allFindings.push(...findings);
  }

  // E5 — collision check
  for (const [type, docs] of h1ByType.entries()) {
    const seen = new Map<string, string[]>();
    for (const doc of docs) {
      const existing = seen.get(doc.h1) ?? [];
      existing.push(doc.path);
      seen.set(doc.h1, existing);
    }
    for (const [h1, paths] of seen.entries()) {
      if (paths.length > 1) {
        allFindings.push({
          id: 'E5',
          severity: 'error',
          file: normRel(paths[0], root),
          description: `H1 collision — ${paths.length} ${type} files share the same H1: "${h1}" — files: ${paths.map(p => normRel(p, root)).join(', ')}`,
          rule: 'DEV-ACCORD-E5',
          standard_ref: 'GC:2008',
          remediation: 'Each planning doc must have a unique H1 that identifies its project scope',
        });
      }
    }
  }

  const errors = allFindings.filter(f => f.severity === 'error').length;
  const warnings = allFindings.filter(f => f.severity === 'warning').length;

  return { findings: allFindings, errors, warnings, filesChecked: files.length };
}
