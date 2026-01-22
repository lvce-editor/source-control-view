import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const renderIncremental = (oldState: SourceControlState, newState: SourceControlState): any => {
  const { id } = newState
  const patches: readonly any[] = []
  return ['Viewlet.setPatches', id, patches]
}
