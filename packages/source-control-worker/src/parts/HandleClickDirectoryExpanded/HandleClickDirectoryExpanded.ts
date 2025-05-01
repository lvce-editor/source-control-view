import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getDisplayItems } from '../GetDisplayItems/GetDisplayItems.ts'

export const handleClickDirectoryExpanded = async (state: SourceControlState, item: any): Promise<SourceControlState> => {
  const { allGroups } = state
  const isExpanded = false
  const displayItems = getDisplayItems(allGroups, isExpanded)
  return {
    ...state,
    displayItems,
    isExpanded,
  }
}
