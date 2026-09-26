import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import type { ViewMode } from '../ViewMode/ViewMode.ts'
import { updateVisibleItems } from '../UpdateVisibleItems/UpdateVisibleItem.ts'

export const setViewMode = (state: SourceControlState, viewMode: ViewMode): Promise<SourceControlState> => {
  const { allGroups, expandedGroups: savedExpandedGroups } = state
  const expandedGroups = { ...savedExpandedGroups }
  for (const { id } of allGroups) {
    if (!(id in expandedGroups)) {
      expandedGroups[id] = true
    }
  }
  return updateVisibleItems({ ...state, viewMode }, expandedGroups)
}
