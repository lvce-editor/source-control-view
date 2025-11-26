import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'

test.skip('show', async (): Promise<void> => {
  const commandMap = {
    'ContextMenu.show': async (): Promise<void> => {},
  }
  const mockRpc = RendererWorker.registerMockRpc(commandMap)
  // @ts-ignore
  await show(1, 2, 3, 'test')
  expect(mockRpc.invocations).toEqual([['ContextMenu.show', 1, 2, 3, 'test']])
})
