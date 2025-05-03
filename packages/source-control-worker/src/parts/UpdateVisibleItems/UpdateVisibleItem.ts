import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getDisplayItems } from '../GetDisplayItems/GetDisplayItems.ts'
import * as GetFileIcons from '../GetFileIcons/GetFileIcons.ts'
import { getListHeight } from '../GetListHeight/GetListHeight.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import { getVisibleSourceControlItems } from '../GetVisibleSourceControlItems/GetVisibleSourceControlItems.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'

export const updateVisibleItems = async (state: SourceControlState, isExpanded: boolean): Promise<SourceControlState> => {
  const { allGroups, itemHeight, height, minimumSliderSize, fileIconCache, actionsCache } = state
  const displayItems = getDisplayItems(allGroups, isExpanded)
  const newMaxLineY = displayItems.length
  const total = displayItems.length
  const contentHeight = total * itemHeight
  const listHeight = getListHeight(total, itemHeight, height)
  const scrollBarHeight = ScrollBarFunctions.getScrollBarSize(height, contentHeight, minimumSliderSize)
  const numberOfVisible = GetNumberOfVisibleItems.getNumberOfVisibleItems(listHeight, itemHeight)
  const minLineY = 0
  const maxLineY = Math.min(numberOfVisible, total)
  const slicedItems = displayItems.slice(minLineY, maxLineY)
  const newFileIconCache = await GetFileIcons.getFileIcons(slicedItems, fileIconCache)
  const visibleItems = getVisibleSourceControlItems(displayItems, minLineY, maxLineY, actionsCache, newFileIconCache)
  return {
    ...state,
    items: displayItems,
    isExpanded,
    maxLineY: newMaxLineY,
    fileIconCache: newFileIconCache,
    visibleItems,
    scrollBarHeight,
  }
}
