import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getNumberOfVisibleItems } from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import { getVisibleSourceControlItems } from '../GetVisibleSourceControlItems/GetVisibleSourceControlItems.ts'

export const setDeltaY = async (state: SourceControlState, newDeltaY: number): Promise<SourceControlState> => {
  const { actionsCache, fileIconCache, finalDeltaY, headerHeight, height, itemHeight, items } = state
  const normalizedDeltaY = Math.min(Math.max(newDeltaY, 0), finalDeltaY)
  const newMinLineY = Math.floor(normalizedDeltaY / itemHeight)
  const total = items.length
  const listHeight = height - headerHeight
  const visibleCount = getNumberOfVisibleItems(listHeight, itemHeight)
  const maxLineY = Math.min(newMinLineY + visibleCount, total)
  const visible = getVisibleSourceControlItems(items, newMinLineY, maxLineY, actionsCache, fileIconCache)
  return {
    ...state,
    deltaY: normalizedDeltaY,
    maxLineY,
    minLineY: newMinLineY,
    visibleItems: visible,
  }
}
