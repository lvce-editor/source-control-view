import { expect, test } from '@jest/globals'
import * as ExtensionHost from '../src/parts/ExtensionHost/ExtensionHost.ts'
import { requestSourceActions } from '../src/parts/RequestSourceActions/RequestSourceActions.ts'

test('requestSourceActions', async () => {
  const mockExtensions = [
    {
      'source-control-actions': {
        action1: 'value1',
        action2: 'value2',
      },
    },
    {
      'source-control-actions': {
        action3: 'value3',
      },
    },
  ]
  const commandMap = {
    'ExtensionHostSourceControl.requestSourceActions': (): Promise<typeof mockExtensions> => Promise.resolve(mockExtensions),
    'Extensions.getExtensions': (): Promise<typeof mockExtensions> => Promise.resolve(mockExtensions),
  }
  const mockRpc = ExtensionHost.registerMockRpc(commandMap)

  const result = await requestSourceActions()

  expect(result).toEqual({
    action1: 'value1',
    action2: 'value2',
    action3: 'value3',
  })
  expect(mockRpc.invocations).toEqual([['Extensions.getExtensions']])
})
