import { expect, test } from '@jest/globals'
import { ExtensionHost } from '@lvce-editor/rpc-registry'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as Refresh from '../src/parts/Refresh/Refresh.ts'

test('refresh should update state with groups and visible items', async (): Promise<void> => {
  const commandMap = {
    'ExtensionHostSourceControl.getGroups': (): Promise<{ allGroups: never[]; gitRoot: string }> =>
      Promise.resolve({
        allGroups: [],
        gitRoot: '/test',
      }),
  }
  const mockRpc = ExtensionHost.registerMockRpc(commandMap)

  const state: SourceControlState = createDefaultState()
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
  expect(mockRpc.invocations).toEqual([])
})
