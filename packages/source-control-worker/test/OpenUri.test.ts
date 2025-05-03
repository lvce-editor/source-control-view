import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { openUri } from '../src/parts/OpenUri/OpenUri.ts'
import { set } from '../src/parts/ParentRpc/ParentRpc.ts'

test('openUri', async () => {
  const mockInvoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  set(mockRpc)
  await openUri('test-uri')
  expect(mockInvoke).toHaveBeenCalledTimes(1)
  expect(mockInvoke).toHaveBeenCalledWith('Main.openUri', 'test-uri')
})
