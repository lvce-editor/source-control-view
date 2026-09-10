import { MenuEntryId } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'

export const showContextMenu = async (state: SourceControlState, index: number, menuX?: number, menuY?: number): Promise<SourceControlState> => {
  const { deltaY, headerHeight, id, itemHeight, items, root, x, y } = state
  const item = items[index]
  if (!item) {
    return state
  }
  const uri = item.file ? `${root}/${item.file}` : ''
  await ContextMenu.show2(id, MenuEntryId.SourceControl, menuX ?? x, menuY ?? y + headerHeight + index * itemHeight - deltaY, {
    index,
    menuId: MenuEntryId.SourceControl,
    uri,
  })
  return state
}
