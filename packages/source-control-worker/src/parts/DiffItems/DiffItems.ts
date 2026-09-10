import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const isEqual = (oldState: SourceControlState, newState: SourceControlState): boolean => {
  return (
    oldState.allGroups === newState.allGroups &&
    oldState.deltaY === newState.deltaY &&
    oldState.items === newState.items &&
    oldState.inputActions === newState.inputActions &&
    oldState.inputMessage === newState.inputMessage &&
    oldState.loading === newState.loading &&
    oldState.maxLineY === newState.maxLineY &&
    oldState.minLineY === newState.minLineY &&
    oldState.providerUnavailableMessage === newState.providerUnavailableMessage &&
    oldState.scrollBarActive === newState.scrollBarActive &&
    oldState.scrollBarHeight === newState.scrollBarHeight &&
    oldState.sourceControlButtons === newState.sourceControlButtons &&
    oldState.visibleItems === newState.visibleItems
  )
}
