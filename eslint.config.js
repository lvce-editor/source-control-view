import config from '@lvce-editor/eslint-config'

export default [
  ...config,
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'prefer-destructuring': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      'no-restricted-syntax': 'off',
      'jest/no-restricted-jest-methods': 'off',
      'unicorn/prefer-export-from': 'off',
    },
  },
]
