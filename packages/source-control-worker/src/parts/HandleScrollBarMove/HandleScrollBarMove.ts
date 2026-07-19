import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { setDeltaY } from '../SetDeltaY/SetDeltaY.ts'

export const handleScrollBarMove = async (state: SourceControlState, eventY: number): Promise<SourceControlState> => {
  const { finalDeltaY, handleOffset, headerHeight, height, scrollBarActive, scrollBarHeight, y } = state
  if (!scrollBarActive) {
    return state
  }
  const listHeight = Math.max(height - headerHeight, 0)
  const relativeY = eventY - y - headerHeight - handleOffset
  const availableTrackHeight = listHeight - scrollBarHeight
  const percent = availableTrackHeight <= 0 ? 0 : relativeY / availableTrackHeight
  return setDeltaY(state, percent * finalDeltaY)
}
