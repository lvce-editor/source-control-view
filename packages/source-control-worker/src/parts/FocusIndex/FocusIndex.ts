import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getVisibleSourceControlItems } from '../GetVisibleSourceControlItems/GetVisibleSourceControlItems.ts'
import { selectIndex } from '../SelectIndex/SelectIndex.ts'
import { setDeltaY } from '../SetDeltaY/SetDeltaY.ts'

const focusIndex = async (state: SourceControlState, index: number): Promise<SourceControlState> => {
  const { actionsCache, fileIconCache, focusedIndex: currentFocusedIndex, headerHeight, height, itemHeight, items, maxLineY, minLineY, selectedItem } = state
  const lastIndex = items.length - 1
  if (lastIndex < 0) {
    return state
  }
  const focusedIndex = Math.max(0, Math.min(index, lastIndex))
  if (focusedIndex === currentFocusedIndex) {
    return state
  }
  const newState = { ...state, focusedIndex }
  if (focusedIndex < minLineY) {
    return setDeltaY(newState, focusedIndex * itemHeight)
  }
  if (focusedIndex >= maxLineY) {
    return setDeltaY(newState, (focusedIndex + 1) * itemHeight - (height - headerHeight))
  }
  return {
    ...newState,
    visibleItems: getVisibleSourceControlItems(items, minLineY, maxLineY, actionsCache, fileIconCache, selectedItem, focusedIndex),
  }
}

export const focusNext = (state: SourceControlState): Promise<SourceControlState> => {
  const { focusedIndex, items } = state
  if (focusedIndex === items.length - 1) {
    return Promise.resolve(state)
  }
  return focusIndex(state, focusedIndex + 1)
}

export const focusPrevious = (state: SourceControlState): Promise<SourceControlState> => {
  const { focusedIndex, items } = state
  if (focusedIndex === -1) {
    return focusIndex(state, items.length - 1)
  }
  if (focusedIndex === 0) {
    return Promise.resolve(state)
  }
  return focusIndex(state, focusedIndex - 1)
}
export const focusFirst = (state: SourceControlState): Promise<SourceControlState> => focusIndex(state, 0)
export const focusLast = (state: SourceControlState): Promise<SourceControlState> => {
  const { items } = state
  return focusIndex(state, items.length - 1)
}

export const activateFocused = async (state: SourceControlState): Promise<SourceControlState> => {
  const { focusedIndex, items } = state
  const index = focusedIndex === -1 && items.length > 0 ? 0 : focusedIndex
  return selectIndex(state, index)
}
