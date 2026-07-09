import { expect, test } from '@jest/globals'
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
