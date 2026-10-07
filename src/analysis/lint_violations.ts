/** Lint fixture — intentional style violations for eslint and biome. */

import fs from 'node:fs';

const unusedImport = fs; // eslint-disable-line @typescript-eslint/no-unused-vars

export const badlyNamedConstant = 42;

export function BadlyNamedFunction(InputValue: number, otherArg: number[] = []): number {
  const unusedLocal = InputValue * 2;
  otherArg.push(InputValue);
  let result = 0;
  for (let i = 0; i < otherArg.length; i++) {
    result += otherArg[i];
  }
  return result + unusedLocal * 0;
}

export function swallowEverything(path: string): string | null {
  try {
    return fs.readFileSync(path, 'utf8');
  } catch {
    return null;
  }
}

export function compareSingletons(value: unknown): string {
  if (value == null) {
    return 'none';
  }
  if (value == true) {
    return 'true';
  }
  return 'other';
}
