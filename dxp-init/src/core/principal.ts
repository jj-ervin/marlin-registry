/**
 * gc-principal loading, validation, and signing.
 * Schema: schemas/gc-principal.schema.json
 * TODO INIT.22 (collection), INIT.26 (schema validation), INIT.36 (signing)
 */

export interface GcPrincipalEntity {
  type: 'individual' | 'llc' | 'corporation';
  name?: string;
  jurisdiction?: string;
  jurisdiction_ref?: {
    country?: string;
    region?: string;
    registry?: string;
    registration_id?: string;
    uri?: string;
  };
  did?: string;
}

export interface GcPrincipalSigning {
  public_key?: string;
  algorithm: 'EdDSA';
  curve?: 'Ed25519';
  public_key_jwk: {
    kty: 'OKP';
    crv: 'Ed25519';
    x: string;
    kid?: string;
  };
  key_id?: string;
  did_verification_method?: string;
  signature?: string;
}

export interface GcPrincipal {
  version: '1.0.0';
  principal_id: string;
  name: string;
  email?: string;
  github_handle?: string;
  role: 'owner' | 'maintainer' | 'installer' | 'auditor';
  entity: GcPrincipalEntity;
  succession?: { name: string; handle: string; email?: string };
  attestation: { confirmed: boolean; timestamp: string; statement?: string };
  installer_expiry?: { expired_at: string; transitioned_to: 'owner' | 'maintainer' };
  signing?: GcPrincipalSigning;
  ci_mode?: {
    service_account: string;
    platform: 'github-actions' | 'gitlab-ci' | 'azure-devops' | 'bitbucket-pipelines' | 'other';
    triggered_by?: string;
  };
  scope?: 'governance-scaffold-install';
  does_not_certify?: string[];
  created_at: string;
  updated_at?: string;
}

/** Load gc-principal.yaml from the target project directory. */
export async function loadPrincipal(_projectRoot: string): Promise<GcPrincipal | null> {
  // TODO INIT.26
  throw new Error('loadPrincipal() not yet implemented — see INIT.26');
}

/** Validate a principal record against gc-principal.schema.json. */
export async function validatePrincipal(_principal: unknown): Promise<{ valid: boolean; errors: string[] }> {
  // TODO INIT.26
  throw new Error('validatePrincipal() not yet implemented — see INIT.26');
}

/** Check whether installer role has expired; return true if still valid. */
export function isInstallerValid(principal: GcPrincipal): boolean {
  if (principal.role !== 'installer') return true;
  return !principal.installer_expiry;
}
