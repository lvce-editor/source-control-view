import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getDisplayItems } from '../GetDisplayItems/GetDisplayItems.ts'
import { getFinalDeltaY } from '../GetFinalDeltaY/GetFinalDeltaY.ts'
import { getIndents } from '../GetIndents/GetIndents.ts'
import { getListHeight } from '../GetListHeight/GetListHeight.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import { getVisibleSourceControlItems } from '../GetVisibleSourceControlItems/GetVisibleSourceControlItems.ts'
import { getScrollBarSize } from '../ScrollBarFunctions/ScrollBarFunctions.ts'

export const updateVisibleItems = async (state: Readonly<SourceControlState>, expandedGroups: Readonly<Record<string, boolean>>): Promise<SourceControlState> => {
  const { actionsCache, allGroups, fileIconCache, headerHeight, height, iconDefinitions, indents, itemHeight, minimumSliderSize } = state
  const displayItems = getDisplayItems(allGroups, expandedGroups, iconDefinitions)
  const badgeCount = allGroups.reduce((sum, group) => sum + group.items.length, 0)
  const total = displayItems.length
  const availableListHeight = Math.max(height - headerHeight, 0)
  const listHeight = getListHeight(total, itemHeight, availableListHeight)
  const contentHeight = total * itemHeight
  const finalDeltaY = getFinalDeltaY(listHeight, itemHeight, total)
  const scrollBarHeight = getScrollBarSize(availableListHeight, contentHeight, minimumSliderSize)
  const numberOfVisible = GetNumberOfVisibleItems.getNumberOfVisibleItems(listHeight, itemHeight)
  const minLineY = 0
  const maxLineY = Math.min(numberOfVisible, total)
  const visibleItems = getVisibleSourceControlItems(displayItems, minLineY, maxLineY, actionsCache, fileIconCache)
  return {
    ...state,
    badgeCount,
    deltaY: 0,
    expandedGroups,
    finalDeltaY,
    indents: getIndents(indents, visibleItems),
    items: displayItems,
    maxLineY,
    minLineY,
    scrollBarHeight,
    visibleItems,
  }
}
