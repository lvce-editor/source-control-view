import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const handleScrollBarCaptureLost = (state: SourceControlState): SourceControlState => {
  return {
    ...state,
    scrollBarActive: false,
  }
}
