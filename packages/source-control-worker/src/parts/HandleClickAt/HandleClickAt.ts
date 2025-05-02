import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as SelectIndex from '../SelectIndex/SelectIndex.ts'

export const handleClickAt = async (state: SourceControlState, eventX: number, eventY: number): Promise<SourceControlState> => {
  const { headerHeight, y, itemHeight } = state
  const relativeY = eventY - y - headerHeight
  const index = Math.floor(relativeY / itemHeight)
  return SelectIndex.selectIndex(state, index)
}
