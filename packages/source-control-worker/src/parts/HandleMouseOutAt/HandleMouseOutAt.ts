import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { handleMouseOut } from '../HandleMouseOut/HandleMouseOut.ts'
import { getIndex } from '../GetIndex/GetIndex.ts'

export const handleMouseOutAt = (state: SourceControlState, eventX: number, eventY: number): SourceControlState => {
  const index = getIndex(state, eventX, eventY)
  return handleMouseOut(state, index)
}
