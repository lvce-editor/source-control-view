import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ExtensionHost from '../src/parts/ExtensionHost/ExtensionHost.ts'
import * as Refresh from '../src/parts/Refresh/Refresh.ts'

test('refresh should update state with groups and visible items', async () => {
  const commandMap = {
    'ExtensionHostSourceControl.getGroups': () => Promise.resolve({
      allGroups: [],
      gitRoot: '/test',
    })
  }
  const mockRpc = ExtensionHost.registerMockRpc(commandMap)

  const state = createDefaultState()
  const result = await Refresh.refresh(state)
  expect(result).toEqual({
    ...state,
    allGroups: [],
    gitRoot: '',
    items: [],
    visibleItems: [],
    maxLineY: 0,
    scrollBarHeight: 0,
    finalDeltaY: 0,
  })
  expect(mockRpc.invocations).toEqual([
    { method: 'ExtensionHostSourceControl.getGroups', params: [] }
  ])
})
