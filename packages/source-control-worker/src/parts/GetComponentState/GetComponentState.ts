import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as SourceControlStates from '../SourceControlStates/SourceControlStates.ts'

export const getComponentState = (id: number): SourceControlState => {
  return SourceControlStates.get(id).newState
}
