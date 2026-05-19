import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      '**/dist',
      '**/node_modules',
      'eslint.config.mjs',
      'vitest.config.ts',
      'benchmark/**',
      'test/**',
    ],
  },
  eslint.configs.all,
  tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        project: ['./tsconfig.esm.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'no-magic-numbers': 'off',
      'one-var': 'off',
      'sort-keys': 'error',
    },
  },
  eslintConfigPrettier,
);
