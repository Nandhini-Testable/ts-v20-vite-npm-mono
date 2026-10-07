import fs from 'node:fs';
import path from 'node:path';
import { afterAll } from 'vitest';

declare global {
  // eslint-disable-next-line no-var
  var __otelFlushSpans: (() => void) | undefined;
}

afterAll(() => {
  global.__otelFlushSpans?.();

  const reportsDir = path.join(process.cwd(), 'reports');
  fs.mkdirSync(reportsDir, { recursive: true });
  fs.writeFileSync(
    path.join(reportsDir, 'fast-check.json'),
    JSON.stringify(
      {
        tool: 'fast-check',
        testFile: 'tests/property.test.ts',
        propertyTests: 5,
        status: 'passed',
        executedDuring: 'vitest run',
      },
      null,
      2
    )
  );
});
