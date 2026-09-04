import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as SourceControlStates from '../SourceControlStates/SourceControlStates.ts'

const applyComponentState = (currentState: SourceControlState, state: SourceControlState): SourceControlState => {
  if (!state || typeof state !== 'object' || Array.isArray(state)) {
    throw new TypeError('Source Control state must be an object')
  }
  if (state.id !== currentState.id) {
    throw new Error(`Source Control state id must remain ${currentState.id}`)
  }
  return state
}

export const setComponentState = SourceControlStates.wrapCommand(applyComponentState)
