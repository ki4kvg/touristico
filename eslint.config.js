import { defineConfig } from 'eslint-define-config';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default defineConfig({
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: {
      NodeJS: 'readonly',
      process: 'readonly',
      window: 'readonly',
      document: 'readonly',
    },
  },
  plugins: {
    react: reactPlugin,
    '@typescript-eslint': tsPlugin,
    'react-hooks': reactHooksPlugin,
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
  ignores: ['node_modules'],
});
