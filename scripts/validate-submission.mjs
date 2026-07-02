#!/usr/bin/env node
// INIT.19.13 - registry submission CI gate.
//
// Deliberately self-contained: this duplicates marlin's manifest/checksum
// validation rules (packages/marlin/src/manifest.ts::validateManifest and
// publisher.ts::validateManifestFile) instead of checking out the private
// `marlin` repo and delegating to its real code. marlin-registry is a
// PUBLIC repo, and public repos' Actions run logs are publicly visible - a
// future marlin build error could leak private source into a public log.
// This script is the accepted exception to "delegate, don't reimplement":
// if marlin's manifest schema changes, this script must be updated to
// match. See marlin/DEV-PATH.md's package trust/test gates note and
// marlin-registry commit history for the decision record.
//
// Usage: node scripts/validate-submission.mjs <base-sha> <head-sha>

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { load as yamlLoad } from 'js-yaml';

const [, , baseSha, headSha] = process.argv;

if (!baseSha || !headSha) {
  console.error('Usage: validate-submission.mjs <base-sha> <head-sha>');
  process.exit(2);
}

const VALID_PLATFORMS = new Set(['windows', 'darwin', 'linux']);

function changedManifestFiles(base, head) {
  const out = execFileSync('git', ['diff', '--name-only', '--diff-filter=ACM', base, head], {
    encoding: 'utf8',
  });
  return out
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => /^manifests\/.+\.ya?ml$/.test(line));
}

// Mirrors packages/marlin/src/manifest.ts::validateManifest. Throws on the
// same hard errors that file throws on.
function parseManifest(raw, source) {
  const parsed = yamlLoad(raw);
  if (!parsed || typeof parsed !== 'object') {
    throw new Error(`${source}: manifest must be a YAML object`);
  }
  const m = parsed;

  if (m.apiVersion !== 'marlin/v1') {
    throw new Error(`${source}: apiVersion must be "marlin/v1"`);
  }
  if (m.kind !== 'Package') {
    throw new Error(`${source}: kind must be "Package"`);
  }

  const meta = m.metadata;
  if (!meta) throw new Error(`${source}: metadata is required`);
  for (const field of ['name', 'version', 'description', 'author']) {
    if (typeof meta[field] !== 'string' || !meta[field]) {
      throw new Error(`${source}: metadata.${field} is required`);
    }
  }
  if (!/^\d+\.\d+\.\d+/.test(meta.version)) {
    throw new Error(`${source}: metadata.version must be a semver string`);
  }

  const platforms = m.platforms;
  if (!platforms || typeof platforms !== 'object') {
    throw new Error(`${source}: platforms is required`);
  }
  const entries = Object.keys(platforms);
  if (entries.length === 0) {
    throw new Error(`${source}: platforms must have at least one entry`);
  }
  for (const key of entries) {
    if (!VALID_PLATFORMS.has(key)) {
      throw new Error(`${source}: platforms.${key} is not a recognized platform (expected one of ${[...VALID_PLATFORMS].join(', ')})`);
    }
  }

  return m;
}

// Mirrors packages/marlin/src/publisher.ts::validateManifestFile's
// additional semantic checks beyond schema validation.
function validateManifestFile(filePath) {
  const errors = [];
  const warnings = [];
  let manifest = null;

  const raw = readFileSync(filePath, 'utf8');
  try {
    manifest = parseManifest(raw, filePath);
  } catch (e) {
    return { valid: false, errors: [e.message], manifest: null };
  }

  const { metadata, platforms } = manifest;

  for (const [platName, entry] of Object.entries(platforms)) {
    if (!entry) continue;
    const cs = entry.artifact && entry.artifact.checksum;
    if (!cs || (!cs.value && !cs.file)) {
      errors.push(`platforms.${platName}: checksum is required for published packages (use checksum.value or checksum.file)`);
    }
  }

  if (!metadata.homepage) warnings.push('metadata.homepage is recommended for published packages');
  if (!metadata.license) warnings.push('metadata.license is recommended for published packages');
  if (!metadata.tags || metadata.tags.length === 0) warnings.push('metadata.tags is recommended - helps users find your package');

  const platformCount = Object.keys(platforms).length;
  if (platformCount < 2) {
    warnings.push(`Only ${platformCount} platform(s) defined - publishing with Windows-only support is allowed but multi-platform is recommended`);
  }

  return { valid: errors.length === 0, errors: [...errors, ...warnings], manifest };
}

function loadIndex() {
  const raw = readFileSync('index.yaml', 'utf8');
  return yamlLoad(raw);
}

function main() {
  const changed = changedManifestFiles(baseSha, headSha);
  if (changed.length === 0) {
    console.log('No manifest files changed in this PR - nothing to validate.');
    return;
  }

  let index;
  try {
    index = loadIndex();
  } catch (e) {
    console.error(`FAIL: index.yaml does not parse: ${e.message}`);
    process.exit(1);
  }
  const packages = Array.isArray(index?.packages) ? index.packages : [];

  let failed = false;

  for (const manifestPath of changed) {
    console.log(`\nValidating ${manifestPath}...`);
    const result = validateManifestFile(manifestPath);

    if (!result.valid) {
      failed = true;
      console.error(`FAIL: ${manifestPath}`);
      for (const err of result.errors) console.error(`  - ${err}`);
      continue;
    }

    if (result.errors.length > 0) {
      console.log(`OK (with warnings): ${manifestPath}`);
      for (const warning of result.errors) console.log(`  ! ${warning}`);
    } else {
      console.log(`OK: ${manifestPath}`);
    }

    const { name, version, description } = result.manifest.metadata;
    const entry = packages.find((p) => p.name === name && p.version === version);
    if (!entry) {
      failed = true;
      console.error(`FAIL: index.yaml has no entry for ${name}@${version} (manifest changed but index not updated)`);
      continue;
    }

    // remote-registry.ts accepts either form: an absolute URL used as-is, or
    // a relative path resolved against the raw.githubusercontent.com base at
    // install time (resolveEntry in remote-registry.ts). Both are valid.
    const relativePath = `manifests/${name}/${version}.yaml`;
    const absoluteUrl = `https://raw.githubusercontent.com/jj-ervin/marlin-registry/main/${relativePath}`;
    if (entry.manifest !== relativePath && entry.manifest !== absoluteUrl) {
      failed = true;
      console.error(`FAIL: index.yaml entry for ${name}@${version} has manifest '${entry.manifest}', expected '${relativePath}' or '${absoluteUrl}'`);
    }
    if (entry.description !== description) {
      failed = true;
      console.error(`FAIL: index.yaml entry for ${name}@${version} description does not match the manifest`);
    }
  }

  if (failed) {
    console.error('\nRegistry submission validation FAILED.');
    process.exit(1);
  }

  console.log('\nRegistry submission validation passed.');
}

main();
