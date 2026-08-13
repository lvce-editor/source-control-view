import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'
import { setDeltaY } from '../SetDeltaY/SetDeltaY.ts'

export const handleScrollBarClick = async (state: SourceControlState, eventY: number): Promise<SourceControlState> => {
  const { deltaY, finalDeltaY, headerHeight, height, scrollBarHeight, y } = state
  const listHeight = Math.max(height - headerHeight, 0)
  const relativeY = eventY - y - headerHeight
  const currentScrollBarY = ScrollBarFunctions.getScrollBarY(deltaY, finalDeltaY, listHeight, scrollBarHeight)
  const offsetInThumb = relativeY - currentScrollBarY
  if (offsetInThumb >= 0 && offsetInThumb < scrollBarHeight) {
    return {
      ...state,
      handleOffset: offsetInThumb,
      scrollBarActive: true,
    }
  }
  const { handleOffset, percent } = ScrollBarFunctions.getNewDeltaPercent(listHeight, scrollBarHeight, relativeY)
  return {
    ...(await setDeltaY(state, percent * finalDeltaY)),
    handleOffset,
    scrollBarActive: true,
  }
}
