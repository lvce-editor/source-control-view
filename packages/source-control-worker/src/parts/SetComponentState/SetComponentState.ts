import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as SourceControlStates from '../SourceControlStates/SourceControlStates.ts'

const applyComponentState = (currentState: SourceControlState, state: SourceControlState): SourceControlState => {
  if (!state || typeof state !== 'object' || Array.isArray(state)) {
    throw new TypeError('Source Control state must be an object')
  }
  const { id } = state
  const { id: currentId } = currentState
  if (id !== currentId) {
    throw new Error(`Source Control state id must remain ${currentId}`)
  }
  return state
}

export const setComponentState = SourceControlStates.wrapCommand(applyComponentState)
