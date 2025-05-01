import config from '@lvce-editor/eslint-config'

export default [
  ...config,
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'prefer-destructuring': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    },
  },
]
