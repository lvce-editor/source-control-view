import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const setDeltaY = async (state: SourceControlState, deltaY: number): Promise<SourceControlState> => {
  const newDeltaY = state.deltaY + deltaY
  return {
    ...state,
    deltaY: newDeltaY,
  }
}
