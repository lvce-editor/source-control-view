import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getIndex } from '../GetIndex/GetIndex.ts'
import * as SelectIndex from '../SelectIndex/SelectIndex.ts'

export const handleClickAt = async (state: SourceControlState, eventX: number, eventY: number): Promise<SourceControlState> => {
  const index = getIndex(state, eventX, eventY)
  return SelectIndex.selectIndex(state, index)
}
