import { MenuEntryId } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'

export const handleContextMenu = async (state: SourceControlState, button: number, x: number, y: number): Promise<SourceControlState> => {
  await ContextMenu.show(x, y, MenuEntryId.SourceControl)
  return state
}
