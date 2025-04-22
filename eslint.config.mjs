import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import { fileURLToPath } from 'node:url';
import globals from 'globals';
import path from 'node:path';
import typescriptEslint from 'typescript-eslint';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const compat = new FlatCompat({
  allConfig: eslint.configs.all,
  baseDirectory: dirname,
  recommendedConfig: eslint.configs.recommended,
});

export default typescriptEslint.config(
  eslint.configs.all,
  ...typescriptEslint.configs.recommended,
  ...compat.extends('plugin:prettier/recommended', 'prettier'),
  {
    ignores: ['**/dist', '**/node_modules'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: typescriptEslint.parser,
    },

    plugins: {
      prettier: eslintPluginPrettier,
      'typescript-eslint': typescriptEslint.plugin,
    },

    rules: {
      'no-magic-numbers': 'off',
      'one-var': 'off',
      'sort-keys': 'error',
    },
  },
  eslintConfigPrettier,
);
