import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const isEqual = (oldState: SourceControlState, newState: SourceControlState): boolean => {
  return (
    oldState.allGroups === newState.allGroups &&
    oldState.deltaY === newState.deltaY &&
    oldState.items === newState.items &&
    oldState.loading === newState.loading &&
    oldState.maxLineY === newState.maxLineY &&
    oldState.minLineY === newState.minLineY &&
    oldState.sourceControlButtons === newState.sourceControlButtons &&
    oldState.visibleItems === newState.visibleItems
  )
}
