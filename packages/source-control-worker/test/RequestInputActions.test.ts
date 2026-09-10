import { expect, test } from '@jest/globals'
import { PlatformType } from '@lvce-editor/constants'
import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import { requestInputActions } from '../src/parts/RequestInputActions/RequestInputActions.ts'

const first = { command: 'ai.suggest', icon: 'Check', label: 'Suggest' }
const second = { command: 'other.format', icon: 'Add', label: 'Format' }

test('collects valid contributions from independent extensions', async () => {
  using _rpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getAllExtensions': async () => [
      null,
      {},
      { 'source-control-input-actions': {} },
      { 'source-control-input-actions': [null, {}, { ...first, command: '' }, first] },
      { 'source-control-input-actions': [second] },
    ],
  })
  expect(await requestInputActions('', 0)).toEqual([first, second])
})

test('excludes incompatible web extensions', async () => {
  using _rpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getAllExtensions': async () => [{ compatibility: { web: false }, 'source-control-input-actions': [first] }],
  })
  expect(await requestInputActions('', PlatformType.Web)).toEqual([])
})
