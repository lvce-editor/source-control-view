import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { show } from '../src/parts/ContextMenu/ContextMenu.ts'

test('show', async (): Promise<void> => {
  const commandMap = {
    'ContextMenu.show': () => Promise.resolve()
  }
  const mockRpc = RendererWorker.registerMockRpc(commandMap)
  await show(1, 2, 3, 'test')
  expect(mockRpc.invocations).toEqual([
    ['ContextMenu.show', 1, 2, 3, 'test']
  ])
})
