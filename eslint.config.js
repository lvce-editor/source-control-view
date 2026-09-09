import { defineConfig } from 'eslint/config'
import * as config from '@lvce-editor/eslint-config'

export default defineConfig([
  ...config.default,
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
      'virtual-dom/prefer-state-destructuring': 'off',
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
  {
    files: [
      'packages/source-control-worker/src/parts/Bounds/Bounds.ts',
      'packages/source-control-worker/src/parts/GetActions/GetActions.ts',
      'packages/source-control-worker/src/parts/HandleButtonClick/HandleButtonClick.ts',
      'packages/source-control-worker/src/parts/HandleClickSourceControlButtons/HandleClickSourceControlButtons.ts',
      'packages/source-control-worker/src/parts/HandleSourceControlButtonClick/HandleSourceControlButtonClick.ts',
      'packages/source-control-worker/src/parts/HandleWheel/HandleWheel.ts',
      'packages/source-control-worker/src/parts/HandleWorkspaceRefresh/HandleWorkspaceRefresh.ts',
      'packages/source-control-worker/src/parts/SourceControlActions/SourceControlActions.ts',
    ],
    rules: {
      'virtual-dom/prefer-state-destructuring': 'off',
    },
  },
])
