import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const handleWorkspaceRefresh = async (state: SourceControlState): Promise<SourceControlState> => {
  // TODO ask source control providers for new data
  return state
}
