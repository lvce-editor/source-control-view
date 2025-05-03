import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getNumberOfVisibleItems } from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import { getVisibleSourceControlItems } from '../GetVisibleSourceControlItems/GetVisibleSourceControlItems.ts'

export const setDeltaY = async (state: SourceControlState, newDeltaY: number): Promise<SourceControlState> => {
  const { itemHeight, items, height, headerHeight, actionsCache, fileIconCache } = state
  const normalizedDeltaY = Math.max(newDeltaY, 0)
  const newMinLineY = Math.floor(normalizedDeltaY / itemHeight)
  const total = items.length
  const listHeight = height - headerHeight
  const visibleCount = getNumberOfVisibleItems(listHeight, itemHeight)
  const maxLineY = Math.min(newMinLineY + visibleCount, total)
  const visible = getVisibleSourceControlItems(items, newMinLineY, maxLineY, actionsCache, fileIconCache)
  return {
    ...state,
    deltaY: newDeltaY,
    visibleItems: visible,
    minLineY: newMinLineY,
    maxLineY,
  }
}
