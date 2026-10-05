import { defineConfig } from 'vitest/config';

// Vitest runs the SAME spec files as Mocha (globals: true), so the suite is
// identical under both runners.
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
