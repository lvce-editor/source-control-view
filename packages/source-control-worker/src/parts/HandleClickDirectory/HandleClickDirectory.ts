import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { updateVisibleItems } from '../UpdateVisibleItems/UpdateVisibleItem.ts'

export const handleClickDirectory = async (state: SourceControlState, item: any): Promise<SourceControlState> => {
  const isExpanded = true
  return updateVisibleItems(state, isExpanded)
}
