import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getDisplayItems } from '../GetDisplayItems/GetDisplayItems.ts'
import * as GetFileIcons from '../GetFileIcons/GetFileIcons.ts'
import * as GetFinalDeltaY from '../GetFinalDeltaY/GetFinalDeltaY.ts'
import { getGroups } from '../GetGroups/GetGroups.ts'
import { getInputHeight } from '../GetInputHeight/GetInputHeight.ts'
import { getListHeight } from '../GetListHeight/GetListHeight.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import * as GetProtocol from '../GetProtocol/GetProtocol.ts'
import { getVisibleSourceControlItems } from '../GetVisibleSourceControlItems/GetVisibleSourceControlItems.ts'
import * as Preferences from '../Preferences/Preferences.ts'
import { requestSourceActions } from '../RequestSourceActions/RequestSourceActions.ts'
import { restoreExpandedGroups } from '../RestoreExpandedGroups/RestoreExpandedGroups.ts'
import { restoreState } from '../RestoreState/RestoreState.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'
import * as SourceControl from '../SourceControl/SourceControl.ts'
import * as SourceControlStrings from '../SourceControlStrings/SourceControlStrings.ts'

export const loadContent = async (state: SourceControlState, savedState: unknown): Promise<SourceControlState> => {
  const {
    itemHeight,
    height,
    minimumSliderSize,
    workspacePath,
    fileIconCache,
    width,
    inputFontFamily,
    inputFontSize,
    inputFontWeight,
    inputLetterSpacing,
    inputLineHeight,
  } = state
  const root = workspacePath
  const scheme = GetProtocol.getProtocol(root)
  const { inputValue } = restoreState(savedState)
  const enabledProviderIds = await SourceControl.getEnabledProviderIds(scheme, root)

  const iconDefinitions = await SourceControl.getIconDefinitions(enabledProviderIds)
  const { allGroups, gitRoot } = await getGroups(enabledProviderIds)

  const expandedGroups = restoreExpandedGroups(allGroups)
  const displayItems = getDisplayItems(allGroups, expandedGroups, iconDefinitions)

  const actionsCache = await requestSourceActions()

  // TODO make preferences async and more functional
  const splitButtonEnabled = await Preferences.get('sourceControl.splitButtonEnabled')
  const badgeCount = allGroups.reduce((sum, group) => sum + group.items.length, 0)
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
  const inputPlaceholder = SourceControlStrings.messageEnterToCommitOnMaster()
  const inputBoxHeight = await getInputHeight(inputValue, width, inputFontFamily, inputFontSize, inputFontWeight, inputLetterSpacing, inputLineHeight)
  return {
    ...state,
    actionsCache,
    allGroups,
    badgeCount,
    decorationIcons: iconDefinitions,
    enabledProviderIds,
    fileIconCache: newFileIconCache,
    finalDeltaY,
    gitRoot,
    iconDefinitions,
    inputBoxHeight,
    inputPlaceholder,
    inputValue,
    items: displayItems,
    maxLineY,
    root,
    scrollBarHeight,
    splitButtonEnabled,
    visibleItems,
  }
}
