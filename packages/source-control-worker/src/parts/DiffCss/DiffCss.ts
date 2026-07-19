import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

const haveSameIndents = (oldState: SourceControlState, newState: SourceControlState): boolean => {
  const oldItems = oldState.visibleItems
  const newItems = newState.visibleItems
  return oldItems.length === newItems.length && oldItems.every((item, index) => item.indent === newItems[index].indent)
}

export const isEqual = (oldState: SourceControlState, newState: SourceControlState): boolean => {
  return (
    oldState.deltaY === newState.deltaY &&
    oldState.finalDeltaY === newState.finalDeltaY &&
    oldState.headerHeight === newState.headerHeight &&
    oldState.height === newState.height &&
    oldState.inputBoxHeight === newState.inputBoxHeight &&
    oldState.itemHeight === newState.itemHeight &&
    oldState.scrollBarHeight === newState.scrollBarHeight &&
    haveSameIndents(oldState, newState)
  )
}
