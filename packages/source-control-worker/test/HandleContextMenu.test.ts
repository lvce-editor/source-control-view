import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleContextMenu } from '../src/parts/HandleContextMenu/HandleContextMenu.ts'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'

test('handleContextMenu', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ContextMenu.show') {
        return Promise.resolve()
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ParentRpc.set(mockRpc)

  const state = createDefaultState()
  const button = 2
  const x = 100
  const y = 200

  const newState = await handleContextMenu(state, button, x, y)
  expect(newState).toBe(state)
})
