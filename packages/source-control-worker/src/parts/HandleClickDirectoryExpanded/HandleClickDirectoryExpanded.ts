import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getDisplayItems } from '../GetDisplayItems/GetDisplayItems.ts'

export const handleClickDirectoryExpanded = async (state: SourceControlState, item: any): Promise<SourceControlState> => {
  const { allGroups, maxLineY } = state
  const isExpanded = false
  const displayItems = getDisplayItems(allGroups, isExpanded)
  const newMaxLineY = Math.min(displayItems.length, maxLineY)
  return {
    ...state,
    items: displayItems,
    isExpanded,
    maxLineY: newMaxLineY,
  }
}
