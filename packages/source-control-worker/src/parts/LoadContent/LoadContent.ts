import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getDisplayItems } from '../GetDisplayItems/GetDisplayItems.ts'
import * as GetFileIcons from '../GetFileIcons/GetFileIcons.ts'
import * as GetFinalDeltaY from '../GetFinalDeltaY/GetFinalDeltaY.ts'
import { getGroups } from '../GetGroups/GetGroups.ts'
import { getListHeight } from '../GetListHeight/GetListHeight.ts'
import { getNewButtons } from '../GetNewButtons/GetNewButtons.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import * as GetProtocol from '../GetProtocol/GetProtocol.ts'
import * as Preferences from '../Preferences/Preferences.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'
import * as SourceControl from '../SourceControl/SourceControl.ts'

export const loadContent = async (state: SourceControlState): Promise<SourceControlState> => {
  const { itemHeight, height, minimumSliderSize, workspacePath, fileIconCache, providerId, buttonIndex, actionsCache } = state
  const root = workspacePath
  const scheme = GetProtocol.getProtocol(root)
  const enabledProviderIds = await SourceControl.getEnabledProviderIds(scheme, root)
  const { allGroups, gitRoot } = await getGroups(enabledProviderIds)
  const isExpanded = true
  const items = getDisplayItems(allGroups, isExpanded)
  const buttons = await getNewButtons(items, providerId, buttonIndex, actionsCache)
  const splitButtonEnabled = Preferences.get('sourceControl.splitButtonEnabled')
  const total = items.length
  const contentHeight = total * itemHeight
  const listHeight = getListHeight(total, itemHeight, height)
  const scrollBarHeight = ScrollBarFunctions.getScrollBarSize(height, contentHeight, minimumSliderSize)
  const numberOfVisible = GetNumberOfVisibleItems.getNumberOfVisibleItems(listHeight, itemHeight)
  const maxLineY = Math.min(numberOfVisible, total)
  const finalDeltaY = GetFinalDeltaY.getFinalDeltaY(listHeight, itemHeight, total)
  const { icons, newFileIconCache } = await GetFileIcons.getFileIcons(items, fileIconCache)

  return {
    ...state,
    allGroups,
    gitRoot,
    items,
    enabledProviderIds,
    isExpanded,
    buttons,
    root,
    splitButtonEnabled,
    maxLineY,
    scrollBarHeight,
    finalDeltaY,
    icons,
    fileIconCache: newFileIconCache,
  }
}
