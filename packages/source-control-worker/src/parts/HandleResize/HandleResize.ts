import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getFinalDeltaY } from '../GetFinalDeltaY/GetFinalDeltaY.ts'
import { getHeaderHeight } from '../GetHeaderHeight/GetHeaderHeight.ts'
import { getIndents } from '../GetIndents/GetIndents.ts'
import { getInputHeight } from '../GetInputHeight/GetInputHeight.ts'
import { getInputWidth } from '../GetInputWidth/GetInputWidth.ts'
import { getListHeight } from '../GetListHeight/GetListHeight.ts'
import { getNumberOfVisibleItems } from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import * as GetVisibleSourceControlItemsWithIcons from '../GetVisibleSourceControlItemsWithIcons/GetVisibleSourceControlItemsWithIcons.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'

export interface Dimensions {
  readonly height: number
  readonly width: number
  readonly x?: number
  readonly y?: number
}

export const handleResize = async (state: SourceControlState, dimensions: Dimensions): Promise<SourceControlState> => {
  const { height: rawHeight, width: rawWidth } = dimensions
  const { x: currentX, y: currentY } = state
  const { x = currentX, y = currentY } = dimensions
  if (!Number.isFinite(rawHeight) || !Number.isFinite(rawWidth) || !Number.isFinite(x) || !Number.isFinite(y)) {
    return state
  }
  const height = Math.max(0, rawHeight)
  const width = Math.max(0, rawWidth)
  const {
    actionsCache,
    buttonBlockHeight,
    deltaY: currentDeltaY,
    fileIconCache,
    indents,
    inputActions,
    inputFontFamily,
    inputFontSize,
    inputFontWeight,
    inputLetterSpacing,
    inputLineHeight,
    inputPadding,
    inputPaddingBlock,
    inputValue,
    itemHeight,
    items,
    minimumSliderSize,
    sourceControlButtons,
  } = state
  const inputBoxHeight = await getInputHeight(
    inputValue,
    getInputWidth(width, inputActions),
    inputFontFamily,
    inputFontWeight,
    inputFontSize,
    inputLetterSpacing,
    inputLineHeight,
    inputPadding,
  )
  const headerHeight = getHeaderHeight(inputBoxHeight, sourceControlButtons, inputPaddingBlock, buttonBlockHeight)
  const listHeight = Math.max(height - headerHeight, 0)
  const total = items.length
  const contentHeight = total * itemHeight
  const finalDeltaY = getFinalDeltaY(listHeight, itemHeight, total)
  const deltaY = Math.min(Math.max(currentDeltaY, 0), finalDeltaY)
  const minLineY = Math.floor(deltaY / itemHeight)
  const visibleCount = getNumberOfVisibleItems(getListHeight(total, itemHeight, listHeight), itemHeight)
  const maxLineY = Math.min(minLineY + visibleCount, total)
  const { fileIconCache: newFileIconCache, visibleItems } = await GetVisibleSourceControlItemsWithIcons.getVisibleSourceControlItemsWithIcons(
    items,
    minLineY,
    maxLineY,
    actionsCache,
    fileIconCache,
  )
  const scrollBarHeight = ScrollBarFunctions.getScrollBarSize(listHeight, contentHeight, minimumSliderSize)
  return {
    ...state,
    deltaY,
    fileIconCache: newFileIconCache,
    finalDeltaY,
    headerHeight,
    height,
    indents: getIndents(indents, visibleItems),
    inputBoxHeight,
    maxLineY,
    minLineY,
    scrollBarHeight,
    visibleItems,
    width,
    x,
    y,
  }
}
