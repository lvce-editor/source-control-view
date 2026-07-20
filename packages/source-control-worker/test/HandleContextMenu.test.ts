import { expect, test } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { RendererWorker as ParentRpc } from '@lvce-editor/rpc-registry'
import type { DisplayItem } from '../src/parts/DisplayItem/DisplayItem.ts'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleContextMenu } from '../src/parts/HandleContextMenu/HandleContextMenu.ts'

const fileItem: DisplayItem = {
  badgeCount: 0,
  decorationIcon: '',
  decorationIconTitle: '',
  decorationStrikeThrough: false,
  detail: '',
  file: 'src/test.ts',
  groupId: 'working-tree',
  icon: '',
  label: 'test.ts',
  posInSet: 1,
  setSize: 1,
  type: 8,
}

test('handleContextMenu', async (): Promise<void> => {
  const commandMap = {
    'ContextMenu.show2': async (): Promise<void> => {},
  }
  using mockRpc = ParentRpc.registerMockRpc(commandMap)

  const state: SourceControlState = {
    ...createDefaultState(),
    headerHeight: 50,
    itemHeight: 30,
    items: [fileItem],
    root: '/test',
    y: 100,
  }
  const button = 2
  const x = 100
  const y = 150

  const newState = await handleContextMenu(state, button, x, y)
  expect(newState).toBe(state)
  expect(mockRpc.invocations).toEqual([
    [
      'ContextMenu.show2',
      state.id,
      MenuEntryId.SourceControl,
      x,
      y,
      {
        menuId: MenuEntryId.SourceControl,
        uri: '/test/src/test.ts',
      },
    ],
  ])
})
