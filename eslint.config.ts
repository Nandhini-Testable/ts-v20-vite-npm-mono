import sonarjs from 'eslint-plugin-sonarjs';
import security from 'eslint-plugin-security';

export default [
  {
    files: ['src/**/*.ts', 'packages/**/*.ts'],
    plugins: { sonarjs, security },
    languageOptions: { ecmaVersion: 2022, sourceType: 'commonjs' },
    rules: {
      'sonarjs/cognitive-complexity': ['warn', 15],
      'security/detect-object-injection': 'warn',
      'security/detect-non-literal-fs-filename': 'warn',
      'no-unused-vars': 'warn',
    },
  },
];
