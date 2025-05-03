import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { updateVisibleItems } from '../UpdateVisibleItems/UpdateVisibleItem.ts'

export const handleClickDirectoryExpanded = async (state: SourceControlState, item: any): Promise<SourceControlState> => {
  const isExpanded = false
  return updateVisibleItems(state, isExpanded)
}
