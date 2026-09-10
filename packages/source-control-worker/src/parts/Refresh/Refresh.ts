import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getDisplayItems } from '../GetDisplayItems/GetDisplayItems.ts'
import * as GetFileIcons from '../GetFileIcons/GetFileIcons.ts'
import * as GetFinalDeltaY from '../GetFinalDeltaY/GetFinalDeltaY.ts'
import { getGroups } from '../GetGroups/GetGroups.ts'
import { getIndents } from '../GetIndents/GetIndents.ts'
import { getListHeight } from '../GetListHeight/GetListHeight.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import { getVisibleSourceControlItems } from '../GetVisibleSourceControlItems/GetVisibleSourceControlItems.ts'
import { restoreExpandedGroups } from '../RestoreExpandedGroups/RestoreExpandedGroups.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'
import * as SourceControl from '../SourceControl/SourceControl.ts'

export const refresh = async (state: SourceControlState): Promise<SourceControlState> => {
  const {
    actionsCache,
    applicationId,
    assetDir,
    enabledProviderIds,
    fileIconCache,
    headerHeight,
    height,
    iconDefinitions,
    indents,
    itemHeight,
    minimumSliderSize,
    platform,
    root,
    splitButtonEnabled,
  } = state
  const { allGroups, gitRoot } = await getGroups(enabledProviderIds, root, assetDir, platform, applicationId)
  const expandedGroups = restoreExpandedGroups(allGroups)
  const displayItems = getDisplayItems(allGroups, expandedGroups, iconDefinitions)
  const badgeCount = await SourceControl.getBadgeCount(enabledProviderIds, assetDir, platform, applicationId)
  const total = displayItems.length
  const contentHeight = total * itemHeight
  const availableListHeight = Math.max(height - headerHeight, 0)
  const listHeight = getListHeight(total, itemHeight, availableListHeight)
  const scrollBarHeight = ScrollBarFunctions.getScrollBarSize(availableListHeight, contentHeight, minimumSliderSize)
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
    badgeCount,
    deltaY: 0,
    enabledProviderIds,
    fileIconCache: newFileIconCache,
    finalDeltaY,
    gitRoot,
    indents: getIndents(indents, visibleItems),
    items: displayItems,
    maxLineY,
    minLineY,
    scrollBarHeight,
    splitButtonEnabled,
    visibleItems,
  }
}
