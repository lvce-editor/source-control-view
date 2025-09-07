import { expect, test } from '@jest/globals'
import { openUri } from '../src/parts/OpenUri/OpenUri.ts'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'

test('openUri', async (): Promise<void> => {
  const commandMap = {
    'Main.openUri': (): Promise<void> => Promise.resolve(),
  }
  const mockRpc = ParentRpc.registerMockRpc(commandMap)
  await openUri('test-uri')
  expect(mockRpc.invocations).toEqual([['Main.openUri', 'test-uri']])
})
