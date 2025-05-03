import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
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
  const mockInvoke = jest.fn(() => {
    return mockExtensions
  })
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })

  ExtensionHost.set(mockRpc)

  const result = await requestSourceActions()

  expect(result).toEqual({
    action1: 'value1',
    action2: 'value2',
    action3: 'value3',
  })
})
