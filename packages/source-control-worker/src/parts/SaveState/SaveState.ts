import type { SavedState } from '../SavedState/SavedState.ts'
import * as Assert from '../Assert/Assert.ts'
import * as SourceControlStates from '../SourceControlStates/SourceControlStates.ts'

export const saveState = (uid: number): SavedState => {
  Assert.number(uid)
  const value = SourceControlStates.get(uid)
  const { newState } = value
  const { root, maxLineY, isExpanded } = newState
  return {
    root,
    minLineY: 0,
    maxLineY,
    deltaY: 0,
    isExpanded,
  }
}
