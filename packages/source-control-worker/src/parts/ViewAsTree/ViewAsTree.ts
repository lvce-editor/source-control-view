import { ViewMode } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { updateVisibleItems } from '../UpdateVisibleItems/UpdateVisibleItem.ts'

export const viewAsTree = (state: SourceControlState): Promise<SourceControlState> => {
  const { expandedGroups } = state
  return updateVisibleItems(
    {
      ...state,
      viewMode: ViewMode.Tree,
    },
    expandedGroups,
  )
}
