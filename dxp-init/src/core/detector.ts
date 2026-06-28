import { existsSync } from 'fs';
import { join } from 'path';

export type DetectedMode = 'install' | 'audit';

/** Auto-detect whether a repo needs install (no planning docs) or audit (docs exist). */
export async function detectMode(cwd: string): Promise<DetectedMode> {
  const planningDocs = ['DEV-PATH.md', 'DEV-PLAN.md'];
  const found = planningDocs.some((f) => existsSync(join(cwd, f)));
  return found ? 'audit' : 'install';
}
