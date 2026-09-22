import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getDisplayItems } from '../GetDisplayItems/GetDisplayItems.ts'
import * as GetFinalDeltaY from '../GetFinalDeltaY/GetFinalDeltaY.ts'
import { getGroups } from '../GetGroups/GetGroups.ts'
import { getIndents } from '../GetIndents/GetIndents.ts'
import { getListHeight } from '../GetListHeight/GetListHeight.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import * as GetVisibleSourceControlItemsWithIcons from '../GetVisibleSourceControlItemsWithIcons/GetVisibleSourceControlItemsWithIcons.ts'
import { restoreExpandedGroups } from '../RestoreExpandedGroups/RestoreExpandedGroups.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'
import * as SourceControl from '../SourceControl/SourceControl.ts'
import * as SourceControlStrings from '../SourceControlStrings/SourceControlStrings.ts'

export const refresh = async (state: SourceControlState): Promise<SourceControlState> => {
  const {
    actionsCache,
    applicationId,
    assetDir,
    defaultInputValue,
    enabledProviderIds,
    fileIconCache,
    headerHeight,
    height,
    iconDefinitions,
    indents,
    inputValue,
    itemHeight,
    minimumSliderSize,
    platform,
    root,
    splitButtonEnabled,
    viewMode,
  } = state
  const { allGroups, gitRoot } = await getGroups(enabledProviderIds, root, assetDir, platform, applicationId)
  const expandedGroups = restoreExpandedGroups(allGroups)
  const displayItems = await getDisplayItems(allGroups, expandedGroups, iconDefinitions, viewMode)
  const badgeCount = await SourceControl.getBadgeCount(enabledProviderIds, assetDir, platform, applicationId)
  const total = displayItems.length
  const contentHeight = total * itemHeight
  const availableListHeight = Math.max(height - headerHeight, 0)
  const listHeight = getListHeight(total, itemHeight, availableListHeight)
  const scrollBarHeight = ScrollBarFunctions.getScrollBarSize(availableListHeight, contentHeight, minimumSliderSize)
  const numberOfVisible = GetNumberOfVisibleItems.getNumberOfVisibleItems(listHeight, itemHeight)
  const minLineY = 0
  const maxLineY = Math.min(numberOfVisible, total)
  const { fileIconCache: newFileIconCache, visibleItems } = await GetVisibleSourceControlItemsWithIcons.getVisibleSourceControlItemsWithIcons(
    displayItems,
    minLineY,
    maxLineY,
    actionsCache,
    fileIconCache,
  )
  const finalDeltaY = GetFinalDeltaY.getFinalDeltaY(listHeight, itemHeight, total)
  const inProgress = await SourceControl.getProgress(enabledProviderIds, assetDir, platform, applicationId)
  const currentDefaultInputValue = await SourceControl.getDefaultCommitMessage(enabledProviderIds, root, assetDir, platform, applicationId)
  const currentBranch = await SourceControl.getCurrentBranch(enabledProviderIds, root, assetDir, platform, applicationId)
  const inputPlaceholder = SourceControlStrings.messageEnterToCommit(currentBranch)
  return {
    ...state,
    actionsCache,
    allGroups,
    badgeCount,
    defaultInputValue: currentDefaultInputValue,
    deltaY: 0,
    enabledProviderIds,
    fileIconCache: newFileIconCache,
    finalDeltaY,
    gitRoot,
    indents: getIndents(indents, visibleItems),
    inProgress,
    inputPlaceholder,
    inputValue: inputValue === defaultInputValue ? currentDefaultInputValue : inputValue,
    items: displayItems,
    maxLineY,
    minLineY,
    scrollBarHeight,
    splitButtonEnabled,
    visibleItems,
  }
}
