import { MenuEntryId } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'
import { getIndex } from '../GetIndex/GetIndex.ts'

export const handleContextMenu = async (state: SourceControlState, button: number, x: number, y: number): Promise<SourceControlState> => {
  const { id, items, root } = state
  const index = getIndex(state, x, y)
  const item = items[index]
  const uri = item?.file ? `${root}/${item.file}` : ''
  await ContextMenu.show2(id, MenuEntryId.SourceControl, x, y, {
    menuId: MenuEntryId.SourceControl,
    uri,
  })
  return state
}
