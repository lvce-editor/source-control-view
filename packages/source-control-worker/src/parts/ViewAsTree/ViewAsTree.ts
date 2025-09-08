import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const viewAsTree = (state: SourceControlState): SourceControlState => {
  return {
    ...state,
    viewMode: 2,
  }
}
