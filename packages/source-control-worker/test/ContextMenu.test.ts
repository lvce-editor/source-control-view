import { test, expect } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ContextMenu from '../src/parts/ContextMenu/ContextMenu.ts'
import * as MenuWorker from '../src/parts/MenuWorker/MenuWorker.ts'

test('show2', async (): Promise<void> => {
  const commandMap = {
    'Menu.show2': async (): Promise<void> => {},
  }
  using mockRpc = RendererWorker.registerMockRpc(commandMap)
  MenuWorker.set(mockRpc)
  await ContextMenu.show2(1, MenuEntryId.SourceControl, 2, 3, {
    index: 0,
    menuId: MenuEntryId.SourceControl,
    uri: '/test/test.ts',
  })
  expect(mockRpc.invocations).toEqual([['Menu.show2', 1, MenuEntryId.SourceControl, 2, 3, { index: 0, menuId: MenuEntryId.SourceControl, uri: '/test/test.ts' }]])
})
