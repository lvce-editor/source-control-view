import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ExtensionHost from '../src/parts/ExtensionHost/ExtensionHost.ts'
import * as Refresh from '../src/parts/Refresh/Refresh.ts'

test('refresh should update state with groups and visible items', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostSourceControl.getGroups') {
        return Promise.resolve({
          allGroups: [],
          gitRoot: '/test',
        })
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ExtensionHost.set(mockRpc)

  const state = createDefaultState()
  const result = await Refresh.refresh(state)
  expect(result).toEqual({
    ...state,
    allGroups: [],
    gitRoot: '',
    items: [],
    visibleItems: [],
    isExpanded: true,
    maxLineY: 0,
    scrollBarHeight: 0,
    finalDeltaY: 0,
  })
})
