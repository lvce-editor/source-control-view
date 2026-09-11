import { expect, jest, test } from '@jest/globals'
import { RendererWorker as ParentRpc } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { revealInExplorer } from '../src/parts/RevealInExplorer/RevealInExplorer.ts'

test('revealInExplorer', async () => {
  jest.useFakeTimers()
  const commandMap = {
    'Application.executeForView': async (): Promise<void> => {},
  }
  using mockRpc = ParentRpc.registerMockRpc(commandMap)
  const state = createDefaultState()
  const { id } = state
  const uri = '/test/src/test.ts'

  const newState = revealInExplorer(state, uri)
  await jest.runAllTimersAsync()

  expect(newState).toBe(state)
  expect(mockRpc.invocations).toEqual([
    ['Application.executeForView', id, 'SideBar.show', 'Explorer'],
    ['Application.executeForView', id, 'Explorer.reveal', uri],
  ])
  jest.useRealTimers()
})

test('revealInExplorer keeps the explorer in the source control application', async () => {
  jest.useFakeTimers()
  using mockRpc = ParentRpc.registerMockRpc({
    'Application.executeForView': async (): Promise<void> => {},
  })
  const state = { ...createDefaultState(), applicationId: 'test-application', id: 42 }
  const uri = '/test/src/test.ts'

  const newState = revealInExplorer(state, uri)
  expect(mockRpc.invocations).toEqual([])
  await jest.runAllTimersAsync()

  expect(newState).toBe(state)
  expect(mockRpc.invocations).toEqual([
    ['Application.executeForView', 42, 'SideBar.show', 'Explorer'],
    ['Application.executeForView', 42, 'Explorer.reveal', uri],
  ])
  jest.useRealTimers()
})
