import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getDisplayItems } from '../GetDisplayItems/GetDisplayItems.ts'
import * as GetFileIcons from '../GetFileIcons/GetFileIcons.ts'
import * as GetFinalDeltaY from '../GetFinalDeltaY/GetFinalDeltaY.ts'
import { getGroups } from '../GetGroups/GetGroups.ts'
import { getListHeight } from '../GetListHeight/GetListHeight.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import * as GetProtocol from '../GetProtocol/GetProtocol.ts'
import { getVisibleSourceControlItems } from '../GetVisibleSourceControlItems/GetVisibleSourceControlItems.ts'
import * as Preferences from '../Preferences/Preferences.ts'
import { requestSourceActions } from '../RequestSourceActions/RequestSourceActions.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'
import * as SourceControl from '../SourceControl/SourceControl.ts'

export const loadContent = async (state: SourceControlState): Promise<SourceControlState> => {
  const { itemHeight, height, minimumSliderSize, workspacePath, fileIconCache } = state
  const root = workspacePath
  const scheme = GetProtocol.getProtocol(root)
  const enabledProviderIds = await SourceControl.getEnabledProviderIds(scheme, root)
  const { allGroups, gitRoot } = await getGroups(enabledProviderIds)
  const isExpanded = true
  const displayItems = getDisplayItems(allGroups, isExpanded)
  const cache = await requestSourceActions()
  const splitButtonEnabled = Preferences.get('sourceControl.splitButtonEnabled')
  const total = displayItems.length
  const contentHeight = total * itemHeight
  const listHeight = getListHeight(total, itemHeight, height)
  const scrollBarHeight = ScrollBarFunctions.getScrollBarSize(height, contentHeight, minimumSliderSize)
  const numberOfVisible = GetNumberOfVisibleItems.getNumberOfVisibleItems(listHeight, itemHeight)
  const minLineY = 0
  const maxLineY = Math.min(numberOfVisible, total)
  const slicedItems = displayItems.slice(minLineY, maxLineY)
  const newFileIconCache = await GetFileIcons.getFileIcons(slicedItems, fileIconCache)
  const visibleItems = getVisibleSourceControlItems(displayItems, minLineY, maxLineY, cache, newFileIconCache)
  const finalDeltaY = GetFinalDeltaY.getFinalDeltaY(listHeight, itemHeight, total)
  return {
    ...state,
    allGroups,
    gitRoot,
    items: displayItems,
    visibleItems,
    enabledProviderIds,
    isExpanded,
    root,
    splitButtonEnabled,
    maxLineY,
    scrollBarHeight,
    finalDeltaY,
    fileIconCache: newFileIconCache,
  }
}
