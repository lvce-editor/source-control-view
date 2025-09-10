import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getDisplayItems } from '../GetDisplayItems/GetDisplayItems.ts'
import { getListHeight } from '../GetListHeight/GetListHeight.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import { getVisibleSourceControlItems } from '../GetVisibleSourceControlItems/GetVisibleSourceControlItems.ts'

export const updateVisibleItems = async (state: SourceControlState, expandedGroups: Record<string, boolean>): Promise<SourceControlState> => {
  const { itemHeight, height, actionsCache, fileIconCache, allGroups, iconDefinitions } = state
  const displayItems = getDisplayItems(allGroups, expandedGroups, iconDefinitions)
  const total = displayItems.length
  const listHeight = getListHeight(total, itemHeight, height)
  const numberOfVisible = GetNumberOfVisibleItems.getNumberOfVisibleItems(listHeight, itemHeight)
  const minLineY = 0
  const maxLineY = Math.min(numberOfVisible, total)
  const visibleItems = getVisibleSourceControlItems(displayItems, minLineY, maxLineY, actionsCache, fileIconCache)
  return {
    ...state,
    items: displayItems,
    visibleItems,
    expandedGroups,
    minLineY,
    maxLineY,
  }
}
