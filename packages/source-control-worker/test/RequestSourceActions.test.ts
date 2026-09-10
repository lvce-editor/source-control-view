import { expect, test } from '@jest/globals'
import { PlatformType } from '@lvce-editor/constants'
import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import { requestSourceActions } from '../src/parts/RequestSourceActions/RequestSourceActions.ts'

test('requestSourceActions', async () => {
  const mockExtensions = [
    {
      'source-control-actions': {
        action1: [{ command: 'command1', label: 'label1' }],
        action2: [{ command: 'command2', label: 'label2' }],
      },
    },
    {
      'source-control-actions': {
        action3: [{ command: 'command3', label: 'label3' }],
      },
    },
  ]
  const commandMap = {
    'Extensions.getAllExtensions': async (): Promise<typeof mockExtensions> => mockExtensions,
  }
  using mockRpc = ExtensionManagementWorker.registerMockRpc(commandMap)

  const result = await requestSourceActions('/assets', PlatformType.Electron)

  expect(result).toEqual({
    action1: [{ command: 'command1', label: 'label1' }],
    action2: [{ command: 'command2', label: 'label2' }],
    action3: [{ command: 'command3', label: 'label3' }],
  })
  expect(mockRpc.invocations).toEqual([['Extensions.getAllExtensions', '/assets', PlatformType.Electron]])
})

test('requestSourceActions excludes extensions that are incompatible with web', async () => {
  const mockExtensions = [
    {
      compatibility: {
        web: false,
      },
      'source-control-actions': {
        action1: [{ command: 'command1', label: 'label1' }],
      },
    },
  ]
  const commandMap = {
    'Extensions.getAllExtensions': async (): Promise<typeof mockExtensions> => mockExtensions,
  }
  using mockRpc = ExtensionManagementWorker.registerMockRpc(commandMap)

  const result = await requestSourceActions('', PlatformType.Web)

  expect(result).toEqual({})
  expect(mockRpc.invocations).toEqual([['Extensions.getAllExtensions', '', PlatformType.Web]])
})
