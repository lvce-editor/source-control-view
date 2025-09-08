import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const viewAsList = (state: SourceControlState): SourceControlState => {
  return {
    ...state,
    viewMode: 1,
  }
}
