import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getIndex } from '../GetIndex/GetIndex.ts'
import { showContextMenu } from '../ShowContextMenu/ShowContextMenu.ts'

export const handleContextMenu = async (state: SourceControlState, button: number, x: number, y: number): Promise<SourceControlState> => {
  const index = getIndex(state, x, y)
  return showContextMenu(state, index, x, y)
}
