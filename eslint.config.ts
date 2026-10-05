import tseslint from 'typescript-eslint';
import sonarjs from 'eslint-plugin-sonarjs';
import security from 'eslint-plugin-security';

export default [
  {
    ignores: ['node_modules/**', 'dist/**', 'coverage/**', 'reports/**'],
  },
  {
    files: ['src/**/*.ts', 'packages/**/*.ts'],
    plugins: { sonarjs, security, '@typescript-eslint': tseslint.plugin },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      'sonarjs/cognitive-complexity': ['warn', 15],
      'security/detect-object-injection': 'warn',
      'security/detect-non-literal-fs-filename': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];
