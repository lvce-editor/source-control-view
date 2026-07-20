import { expect, test } from '@jest/globals'
import { RendererWorker as ParentRpc } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { revealInExplorer } from '../src/parts/RevealInExplorer/RevealInExplorer.ts'

test('revealInExplorer', async () => {
  const commandMap = {
    'Explorer.reveal': async (): Promise<void> => {},
    'SideBar.show': async (): Promise<void> => {},
  }
  using mockRpc = ParentRpc.registerMockRpc(commandMap)
  const state = createDefaultState()
  const uri = '/test/src/test.ts'

  const newState = await revealInExplorer(state, uri)

  expect(newState).toBe(state)
  expect(mockRpc.invocations).toEqual([
    ['SideBar.show', 'Explorer'],
    ['Explorer.reveal', uri],
  ])
})
