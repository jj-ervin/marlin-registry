/**
 * Ed25519 key pair generation and storage for marlin-dxp principals.
 * Keys are stored in the user's OS config directory — never in the repo.
 * Private key: PKCS#8 PEM, mode 0o600.
 * Public key: JWK (OKP / Ed25519) embedded in gc-principal.yaml.
 */
import { generateKeyPairSync, createPrivateKey } from 'crypto';
import type { KeyObject } from 'crypto';
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

export function dxpConfigDir(): string {
  if (process.platform === 'win32') {
    return join(process.env['APPDATA'] ?? join(homedir(), 'AppData', 'Roaming'), 'marlin-dxp');
  }
  if (process.platform === 'darwin') {
    return join(homedir(), 'Library', 'Application Support', 'marlin-dxp');
  }
  return join(process.env['XDG_CONFIG_HOME'] ?? join(homedir(), '.config'), 'marlin-dxp');
}

function keysDir(): string {
  return join(dxpConfigDir(), 'keys');
}

function keyPath(principalId: string): string {
  return join(keysDir(), `${principalId}.pem`);
}

export interface Ed25519PublicJwk {
  kty: 'OKP';
  crv: 'Ed25519';
  x: string;
  kid: string;
}

export interface GeneratedKeypair {
  publicKeyJwk: Ed25519PublicJwk;
  privateKeyPath: string;
}

/** Generate an Ed25519 key pair and store the private key on disk. */
export function generateAndStoreKeypair(principalId: string): GeneratedKeypair {
  const { publicKey, privateKey } = generateKeyPairSync('ed25519');

  const jwk = publicKey.export({ format: 'jwk' }) as { x: string };
  const pem = privateKey.export({ type: 'pkcs8', format: 'pem' }) as string;

  mkdirSync(keysDir(), { recursive: true });
  const path = keyPath(principalId);
  writeFileSync(path, pem, { mode: 0o600 });

  return {
    publicKeyJwk: { kty: 'OKP', crv: 'Ed25519', x: jwk.x, kid: principalId },
    privateKeyPath: path,
  };
}

/** Load a stored private key for a principal. Returns null if not found. */
export function loadPrivateKey(principalId: string): KeyObject | null {
  const path = keyPath(principalId);
  if (!existsSync(path)) return null;
  try {
    return createPrivateKey(readFileSync(path, 'utf8'));
  } catch {
    return null;
  }
}

/** Check whether a private key exists for a principal. */
export function hasPrivateKey(principalId: string): boolean {
  return existsSync(keyPath(principalId));
}
