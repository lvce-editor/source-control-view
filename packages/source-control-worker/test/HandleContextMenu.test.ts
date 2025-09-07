import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleContextMenu } from '../src/parts/HandleContextMenu/HandleContextMenu.ts'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'

test('handleContextMenu', async () => {
  const commandMap = {
    'ContextMenu.show': () => Promise.resolve()
  }
  const mockRpc = ParentRpc.registerMockRpc(commandMap)

  const state = createDefaultState()
  const button = 2
  const x = 100
  const y = 200

  const newState = await handleContextMenu(state, button, x, y)
  expect(newState).toBe(state)
  expect(mockRpc.invocations).toEqual([
    { method: 'ContextMenu.show', params: [2, 100, 200] }
  ])
})
