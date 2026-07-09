import { expect, test } from '@jest/globals'
import { PlatformType } from '@lvce-editor/constants'
import { ExtensionHost } from '@lvce-editor/rpc-registry'
import { requestSourceControlButtons } from '../src/parts/RequestSourceControlButtons/RequestSourceControlButtons.ts'

test('requestSourceControlButtons', async () => {
  const mockExtensions = [
    {
      'source-control-buttons': [
        {
          command: 'git.commitAndSync',
          icon: 'Check',
          id: 'git.commitAndSync',
          label: 'Commit & Sync',
        },
      ],
    },
    {
      'source-control-buttons': [
        {
          command: 'test.command',
          icon: 'Check',
          id: 'test.command',
          label: 'Test',
        },
      ],
    },
  ]
  const commandMap = {
    'Extensions.getExtensions': async (): Promise<typeof mockExtensions> => mockExtensions,
  }
  using mockRpc = ExtensionHost.registerMockRpc(commandMap)

  const result = await requestSourceControlButtons()

  expect(result).toEqual([
    {
      command: 'git.commitAndSync',
      icon: 'Check',
      id: 'git.commitAndSync',
      label: 'Commit & Sync',
    },
    {
      command: 'test.command',
      icon: 'Check',
      id: 'test.command',
      label: 'Test',
    },
  ])
  expect(mockRpc.invocations).toEqual([['Extensions.getExtensions']])
})

test('requestSourceControlButtons excludes extensions that are incompatible with web', async () => {
  const mockExtensions = [
    {
      compatibility: {
        web: false,
      },
      'source-control-buttons': [
        {
          command: 'git.commitAndSync',
          icon: 'Check',
          id: 'git.commitAndSync',
          label: 'Commit & Sync',
        },
      ],
    },
  ]
  const commandMap = {
    'Extensions.getExtensions': async (): Promise<typeof mockExtensions> => mockExtensions,
  }
  using mockRpc = ExtensionHost.registerMockRpc(commandMap)

  const result = await requestSourceControlButtons(PlatformType.Web)

  expect(result).toEqual([])
  expect(mockRpc.invocations).toEqual([['Extensions.getExtensions']])
})

test('requestSourceControlButtons preserves web-incompatible extensions in electron', async () => {
  const mockExtensions = [
    {
      compatibility: {
        web: false,
      },
      'source-control-buttons': [
        {
          command: 'git.commitAndSync',
          icon: 'Check',
          id: 'git.commitAndSync',
          label: 'Commit & Sync',
        },
      ],
    },
  ]
  const commandMap = {
    'Extensions.getExtensions': async (): Promise<typeof mockExtensions> => mockExtensions,
  }
  using mockRpc = ExtensionHost.registerMockRpc(commandMap)

  const result = await requestSourceControlButtons(PlatformType.Electron)

  expect(result).toHaveLength(1)
  expect(result[0].label).toBe('Commit & Sync')
  expect(mockRpc.invocations).toEqual([['Extensions.getExtensions']])
})
