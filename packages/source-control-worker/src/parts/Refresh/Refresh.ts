import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getDisplayItems } from '../GetDisplayItems/GetDisplayItems.ts'
import * as GetFileIcons from '../GetFileIcons/GetFileIcons.ts'
import * as GetFinalDeltaY from '../GetFinalDeltaY/GetFinalDeltaY.ts'
import { getGroups } from '../GetGroups/GetGroups.ts'
import { getListHeight } from '../GetListHeight/GetListHeight.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import { getVisibleSourceControlItems } from '../GetVisibleSourceControlItems/GetVisibleSourceControlItems.ts'
import { restoreExpandedGroups } from '../RestoreExpandedGroups/RestoreExpandedGroups.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'

export const refresh = async (state: SourceControlState): Promise<SourceControlState> => {
  const { actionsCache, enabledProviderIds, fileIconCache, height, iconDefinitions, itemHeight, minimumSliderSize, splitButtonEnabled } = state
  const { allGroups, gitRoot } = await getGroups(enabledProviderIds)
  const expandedGroups = restoreExpandedGroups(allGroups)
  const displayItems = getDisplayItems(allGroups, expandedGroups, iconDefinitions)
  const total = displayItems.length
  const contentHeight = total * itemHeight
  const listHeight = getListHeight(total, itemHeight, height)
  const scrollBarHeight = ScrollBarFunctions.getScrollBarSize(height, contentHeight, minimumSliderSize)
  const numberOfVisible = GetNumberOfVisibleItems.getNumberOfVisibleItems(listHeight, itemHeight)
  const minLineY = 0
  const maxLineY = Math.min(numberOfVisible, total)
  const newFileIconCache = await GetFileIcons.getFileIcons(displayItems, fileIconCache)
  const visibleItems = getVisibleSourceControlItems(displayItems, minLineY, maxLineY, actionsCache, newFileIconCache)
  const finalDeltaY = GetFinalDeltaY.getFinalDeltaY(listHeight, itemHeight, total)
  return {
    ...state,
    actionsCache,
    allGroups,
    enabledProviderIds,
    fileIconCache: newFileIconCache,
    finalDeltaY,
    gitRoot,
    items: displayItems,
    maxLineY,
    scrollBarHeight,
    splitButtonEnabled,
    visibleItems,
  }
}
