import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getDirectoryKey } from '../GetDisplayItemsGroup/GetDisplayItemsGroup.ts'
import { updateVisibleItems } from '../UpdateVisibleItems/UpdateVisibleItem.ts'

export const handleClickDirectoryExpanded = async (state: SourceControlState, item: any): Promise<SourceControlState> => {
  const { expandedGroups } = state
  const key = item.directory ? getDirectoryKey(item.groupId, item.directory) : item.groupId
  const newExpandedGroups = {
    ...expandedGroups,
    [key]: false,
  }
  return updateVisibleItems(state, newExpandedGroups)
}
