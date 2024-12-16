import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import graphqlEslint from '@graphql-eslint/eslint-plugin';
import prettier from 'eslint-config-prettier';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

export default [
  eslint.configs.recommended,
  prettier,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
    }
  },
  {
    files: ['**/*.graphql'],
    plugins: {
      '@graphql-eslint': graphqlEslint
    },
    languageOptions: {
      parser: '@graphql-eslint/eslint-plugin',
      parserOptions: {
        schema: './schema.graphql',
      },
    },
    rules: {
      '@graphql-eslint/known-type-names': 'error',
      '@graphql-eslint/no-anonymous-operations': 'error',
      '@graphql-eslint/naming-convention': [
        'error',
        {
          OperationDefinition: {
            style: 'PascalCase',
            forbiddenPrefixes: ['Query_', 'Mutation_', 'Subscription_'],
          },
        },
      ],
    }
  }
];
