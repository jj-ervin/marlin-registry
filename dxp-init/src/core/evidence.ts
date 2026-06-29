/**
 * Evidence bundle generation and signing.
 * Schema: schemas/gc-evidence-bundle.schema.json
 * Aligns with gc-compliance-evidence.schema.json (GC) and SLSA provenance v1.0.
 * TODO INIT.27 (bundle), INIT.28 (signing), INIT.06 (full PASS)
 */
import { randomUUID, sign as cryptoSign, verify as cryptoVerify, createPublicKey } from 'crypto';
import type { KeyObject } from 'crypto';

export type AuditOperation =
  | 'install' | 'install-dry-run'
  | 'audit-validate' | 'audit-normalize' | 'audit-verify'
  | 'audit-adversarial' | 'audit-meta' | 'audit-trace'
  | 'audit-authority' | 'audit-registry' | 'audit-close-loop'
  | 'audit-destale' | 'status';

export type FindingSeverity = 'error' | 'warning' | 'info' | 'pass';

export interface Finding {
  id: string;
  severity: FindingSeverity;
  file?: string;
  line?: number;
  description: string;
  rule?: string;
  standard_ref?: string;
  remediation?: string;
}

export interface EvidenceSummary {
  total: number;
  errors: number;
  warnings: number;
  info: number;
  passed: number;
  conformant: boolean;
  closure_state?: 'open' | 'spec-complete' | 'release-complete' | 'runtime-complete';
}

export interface EvidenceBundle {
  version: '1.0.0';
  bundle_id: string;
  operation: AuditOperation;
  principal_ref: string;
  principal_snapshot?: {
    principal_id: string;
    name: string;
    role: string;
    public_key?: string;
  };
  timestamp: {
    iso: string;
    time_loc?: string;
    epoch_ms: number;
  };
  validator: {
    name: string;
    version: string;
    standard: string;
    standard_version?: string;
  };
  scope: {
    project: string;
    root?: string;
    files_scanned?: string[];
    preset?: string;
  };
  findings: Finding[];
  summary: EvidenceSummary;
  gee_envelope?: Record<string, unknown>;
  slsa_provenance?: Record<string, unknown>;
  sbom_ref?: {
    format: 'CycloneDX' | 'SPDX';
    version?: string;
    uri: string;
    media_type?:
      | 'application/vnd.cyclonedx+json'
      | 'application/vnd.cyclonedx+xml'
      | 'application/spdx+json'
      | 'text/spdx'
      | 'application/json';
    digest?: Record<string, string>;
  };
  signature?: {
    algorithm: 'EdDSA';
    protected_header: {
      alg: 'EdDSA';
      kid?: string;
      typ?: 'JWS';
    };
    value: string;
    key: {
      kty: 'OKP';
      crv: 'Ed25519';
      x: string;
      kid?: string;
    };
    signed_at: string;
  };
}

/** Build an unsigned evidence bundle from audit findings. */
export function buildBundle(
  operation: AuditOperation,
  principalId: string,
  findings: Finding[],
  scope: EvidenceBundle['scope']
): EvidenceBundle {
  const now = new Date();
  const errors = findings.filter((f) => f.severity === 'error').length;
  const warnings = findings.filter((f) => f.severity === 'warning').length;
  const info = findings.filter((f) => f.severity === 'info').length;
  const passed = findings.filter((f) => f.severity === 'pass').length;

  return {
    version: '1.0.0',
    bundle_id: randomUUID(),
    operation,
    principal_ref: principalId,
    timestamp: {
      iso: now.toISOString(),
      epoch_ms: now.getTime(),
    },
    validator: {
      name: 'marlin-dxp',
      version: '0.1.0',
      standard: 'GC:2008',
      standard_version: 'DEV-ACCORD.00',
    },
    scope,
    findings,
    summary: {
      total: findings.length,
      errors,
      warnings,
      info,
      passed,
      conformant: errors === 0,
      closure_state: errors === 0 ? 'spec-complete' : 'open',
    },
  };
}

function base64url(data: string | Buffer): string {
  const buf = typeof data === 'string' ? Buffer.from(data, 'utf8') : data;
  return buf.toString('base64url');
}

/**
 * Sign a bundle with an Ed25519 private key.
 * The signature covers the bundle serialised without its signature field
 * (JWS compact serialization: BASE64URL(header).BASE64URL(payload).BASE64URL(sig)).
 */
export function signBundle(bundle: EvidenceBundle, privateKey: KeyObject): EvidenceBundle {
  const { signature: _existing, ...unsigned } = bundle;

  const kid = bundle.principal_ref;
  const protectedHeader = { alg: 'EdDSA', kid, typ: 'JWS' };
  const headerB64 = base64url(JSON.stringify(protectedHeader));
  const payloadB64 = base64url(JSON.stringify(unsigned));
  const signingInput = `${headerB64}.${payloadB64}`;

  const sigBytes = cryptoSign(null, Buffer.from(signingInput), privateKey);

  const publicKey = createPublicKey(privateKey);
  const jwk = publicKey.export({ format: 'jwk' }) as { x: string };

  return {
    ...unsigned,
    signature: {
      algorithm: 'EdDSA',
      protected_header: { alg: 'EdDSA', kid, typ: 'JWS' },
      value: `${headerB64}.${payloadB64}.${base64url(sigBytes)}`,
      key: { kty: 'OKP', crv: 'Ed25519', x: jwk.x, kid },
      signed_at: new Date().toISOString(),
    },
  };
}

/** Verify a signed bundle. Returns valid:true if signature checks out. */
export function verifyBundle(bundle: EvidenceBundle): { valid: boolean; reason?: string } {
  if (!bundle.signature?.value) return { valid: false, reason: 'Bundle has no signature' };

  const parts = bundle.signature.value.split('.');
  if (parts.length !== 3) return { valid: false, reason: 'Malformed JWS compact serialization' };

  const [headerB64, payloadB64, sigB64] = parts;
  const signingInput = `${headerB64}.${payloadB64}`;

  try {
    const publicKey = createPublicKey({ key: bundle.signature.key, format: 'jwk' });
    const sigBytes = Buffer.from(sigB64, 'base64url');
    const valid = cryptoVerify(null, Buffer.from(signingInput), publicKey, sigBytes);
    return valid ? { valid: true } : { valid: false, reason: 'Signature verification failed' };
  } catch (e) {
    return { valid: false, reason: e instanceof Error ? e.message : String(e) };
  }
}

/** Write a bundle to disk as JSON. Returns the written file path. */
export async function writeBundle(bundle: EvidenceBundle, outputDir: string): Promise<string> {
  const { mkdirSync, writeFileSync } = await import('fs');
  const { join } = await import('path');
  mkdirSync(outputDir, { recursive: true });
  const ts = bundle.timestamp.iso.replace(/[:.]/g, '-').replace('T', '_').substring(0, 19);
  const fileName = `evidence-${bundle.operation}-${ts}.json`;
  const filePath = join(outputDir, fileName);
  writeFileSync(filePath, JSON.stringify(bundle, null, 2), 'utf8');
  return filePath;
}
