import { expect, test } from '@jest/globals'
import { RendererWorker as ParentRpc } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleContextMenu } from '../src/parts/HandleContextMenu/HandleContextMenu.ts'

test('handleContextMenu', async (): Promise<void> => {
  const commandMap = {
    'ContextMenu.show': (): Promise<void> => Promise.resolve(),
  }
  const mockRpc = ParentRpc.registerMockRpc(commandMap)

  const state = createDefaultState()
  const button = 2
  const x = 100
  const y = 200

  const newState = await handleContextMenu(state, button, x, y)
  expect(newState).toBe(state)
  expect(mockRpc.invocations).toEqual([['ContextMenu.show', 100, 200, 22]])
})
