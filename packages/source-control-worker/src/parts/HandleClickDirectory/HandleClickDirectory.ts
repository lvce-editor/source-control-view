import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getDisplayItems } from '../GetDisplayItems/GetDisplayItems.ts'

export const handleClickDirectory = async (state: SourceControlState, item: any): Promise<SourceControlState> => {
  const { allGroups } = state
  const isExpanded = true
  const displayItems = getDisplayItems(allGroups, isExpanded)
  return {
    ...state,
    items: displayItems,
    isExpanded,
  }
}
