import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import graphqlEslint from '@graphql-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-config-prettier';

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
      '@typescript-eslint': tseslint,
      'import': importPlugin
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      'import/order': ['error', {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'always',
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true
        },
        'pathGroups': [
          {
            'pattern': '@nestjs/**',
            'group': 'external',
            'position': 'before'
          }
        ]
      }],
      'import/no-duplicates': 'error',
      'import/no-unused-modules': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error'
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