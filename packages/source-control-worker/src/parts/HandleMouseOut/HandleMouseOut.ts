import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const handleMouseOut = (state: SourceControlState, index: number): SourceControlState => {
  if (index === -1) {
    return {
      ...state,
      buttonIndex: -1,
      buttons: [],
    }
  }
  return state
}
