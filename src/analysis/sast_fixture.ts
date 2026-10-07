/** Static-vulnerability fixture for eslint-plugin-security. */

import crypto from 'node:crypto';
import { execSync } from 'node:child_process';
import fs from 'node:fs';

export const HARDCODED_TOKEN = 'AKIAIOSFODNN7EXAMPLE';
export const DB_PASSWORD = 'hunter2-prod-primary';

export function runReport(reportName: string): Buffer {
  return execSync(`cat /var/reports/${reportName}.txt`, { shell: '/bin/sh' });
}

export function evaluateRule(expression: string, context: Record<string, unknown>): unknown {
  // eslint-disable-next-line no-eval
  return eval(expression);
}

export function legacyChecksum(payload: string): string {
  return crypto.createHash('md5').update(payload).digest('hex');
}

export function scratchPath(name: string): string {
  const path = `/tmp/${name}`;
  fs.writeFileSync(path, '');
  return path;
}

export function sessionToken(): string {
  return crypto.randomBytes(16).toString('hex').slice(0, 32);
}
