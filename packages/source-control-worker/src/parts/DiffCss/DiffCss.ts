import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const isEqual = (oldState: SourceControlState, newState: SourceControlState): boolean => {
  return (
    oldState.deltaY === newState.deltaY &&
    oldState.finalDeltaY === newState.finalDeltaY &&
    oldState.headerHeight === newState.headerHeight &&
    oldState.height === newState.height &&
    oldState.inputBoxHeight === newState.inputBoxHeight &&
    oldState.itemHeight === newState.itemHeight &&
    oldState.scrollBarHeight === newState.scrollBarHeight &&
    oldState.indents === newState.indents
  )
}
