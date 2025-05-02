import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { handleMouseOut } from '../HandleMouseOut/HandleMouseOut.ts'

export const handleMouseOutAt = (state: SourceControlState, index: number): SourceControlState => {
  return handleMouseOut(state, -1)
}
