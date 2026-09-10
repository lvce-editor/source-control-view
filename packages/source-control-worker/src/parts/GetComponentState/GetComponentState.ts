import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as SourceControlStates from '../SourceControlStates/SourceControlStates.ts'

export const getComponentState = (id: number): SourceControlState => {
  const state = SourceControlStates.get(id).newState
  return SourceControlStates.inputDiagnostics.length > 0 ? ({ ...state, inputDiagnostics: SourceControlStates.inputDiagnostics } as SourceControlState) : state
}
