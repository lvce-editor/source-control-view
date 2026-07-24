import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getDisplayItems } from '../GetDisplayItems/GetDisplayItems.ts'
import * as GetFileIcons from '../GetFileIcons/GetFileIcons.ts'
import * as GetFinalDeltaY from '../GetFinalDeltaY/GetFinalDeltaY.ts'
import { getGroups } from '../GetGroups/GetGroups.ts'
import { getHeaderHeight } from '../GetHeaderHeight/GetHeaderHeight.ts'
import { getInputHeight } from '../GetInputHeight/GetInputHeight.ts'
import { getListHeight } from '../GetListHeight/GetListHeight.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import * as GetProtocol from '../GetProtocol/GetProtocol.ts'
import { getSourceControlUnavailableMessage } from '../GetSourceControlUnavailableMessage/GetSourceControlUnavailableMessage.ts'
import { getVisibleSourceControlItems } from '../GetVisibleSourceControlItems/GetVisibleSourceControlItems.ts'
import * as Preferences from '../Preferences/Preferences.ts'
import { requestSourceActions } from '../RequestSourceActions/RequestSourceActions.ts'
import { requestSourceControlButtons } from '../RequestSourceControlButtons/RequestSourceControlButtons.ts'
import { restoreExpandedGroups } from '../RestoreExpandedGroups/RestoreExpandedGroups.ts'
import { restoreState } from '../RestoreState/RestoreState.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'
import * as SourceControl from '../SourceControl/SourceControl.ts'
import * as SourceControlStrings from '../SourceControlStrings/SourceControlStrings.ts'

export const loadContent = async (state: SourceControlState, savedState: unknown): Promise<SourceControlState> => {
  const {
    fileIconCache,
    height,
    inputFontFamily,
    inputFontSize,
    inputFontWeight,
    inputLetterSpacing,
    inputLineHeight,
    inputPadding,
    itemHeight,
    minimumSliderSize,
    width,
    workspacePath,
  } = state
  const root = workspacePath
  const scheme = GetProtocol.getProtocol(root)
  const { inputValue } = restoreState(savedState)
  const { assetDir, platform } = state
  const enabledProviderIds = await SourceControl.getEnabledProviderIds(scheme, root, assetDir, platform)
  const providerUnavailableMessage = enabledProviderIds.length === 0 ? await getSourceControlUnavailableMessage(assetDir, platform) : ''
  const showGenerateCommitMessageButton =
    enabledProviderIds.length === 0 ? false : await SourceControl.getShowGenerateCommitMessageButton(enabledProviderIds[0], assetDir, platform)

  const iconDefinitions = await SourceControl.getIconDefinitions(enabledProviderIds)
  const { allGroups, gitRoot } = await getGroups(enabledProviderIds, root, assetDir, platform)

  const expandedGroups = restoreExpandedGroups(allGroups)
  const displayItems = getDisplayItems(allGroups, expandedGroups, iconDefinitions)

  const actionsCache = enabledProviderIds.length === 0 ? Object.create(null) : await requestSourceActions(platform)
  const sourceControlButtons = enabledProviderIds.length === 0 ? [] : await requestSourceControlButtons(platform)

  // TODO make preferences async and more functional
  const splitButtonEnabled = await Preferences.get('sourceControl.splitButtonEnabled')
  const badgeCount = await SourceControl.getBadgeCount(enabledProviderIds, assetDir, platform)
  const inputPlaceholder = SourceControlStrings.messageEnterToCommitOnMaster()
  const inputBoxHeight = await getInputHeight(inputValue, width, inputFontFamily, inputFontSize, inputFontWeight, inputLetterSpacing, inputLineHeight, inputPadding)
  const headerHeight = getHeaderHeight(inputBoxHeight, sourceControlButtons)
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
    decorationIcons: iconDefinitions,
    enabledProviderIds,
    fileIconCache: newFileIconCache,
    finalDeltaY,
    gitRoot,
    headerHeight,
    iconDefinitions,
    initial: false,
    inputBoxHeight,
    inputPlaceholder,
    inputValue,
    items: displayItems,
    loading: false,
    maxLineY,
    providerUnavailableMessage,
    root,
    scrollBarHeight,
    showGenerateCommitMessageButton,
    sourceControlButtons,
    splitButtonEnabled,
    visibleItems,
  }
}
