import { defineConfig } from 'eslint/config'
import * as config from '@lvce-editor/eslint-config'

export default defineConfig([
  ...config.default,
  {
    // The application runtime has its own Node version in the pinned checkout.
    files: ['.github/workflows/integration.yml'],
    rules: { 'github-actions/node-version-file': 'off' },
  },
  {
    // These regressions exercise toolbar clicks and keyboard input through the DOM.
    files: ['packages/e2e-integration/src/**/*.ts'],
    rules: { '@typescript-eslint/no-deprecated': 'off' },
  },
  ...config.recommendedVirtualDom,
  ...config.recommendedRegex,
  ...config.recommendedActions,
  {
    rules: {
      'e2e/no-timeouts': 'off',
      'e2e/prefer-execute-extension-command': 'off',
    },
  },
  {
    files: ['packages/source-control-worker/test/**/*.ts'],
    rules: {
      'virtual-dom/clickable-div-needs-role': 'off',
      'virtual-dom/no-object-attribute-values': 'off',
      'virtual-dom/prefer-constants': 'off',
      'virtual-dom/prefer-merge-class-names': 'off',
    },
  },
  {
    files: [
      'packages/source-control-worker/src/parts/GetSourceControlVirtualDom/GetSourceControlVirtualDom.ts',
      'packages/source-control-worker/src/parts/GetSplitButtonVirtualDom/GetSplitButtonVirtualDom.ts',
    ],
    rules: {
      'virtual-dom/prefer-constants': 'off',
    },
  },
])
