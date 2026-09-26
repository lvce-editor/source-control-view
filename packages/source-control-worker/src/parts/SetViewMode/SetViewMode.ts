import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import type { ViewMode } from '../ViewMode/ViewMode.ts'
import { updateVisibleItems } from '../UpdateVisibleItems/UpdateVisibleItem.ts'

export const setViewMode = (state: SourceControlState, viewMode: ViewMode): Promise<SourceControlState> => {
  const expandedGroups = { ...state.expandedGroups }
  for (const { id } of state.allGroups) {
    if (!(id in expandedGroups)) {
      expandedGroups[id] = true
    }
  }
  return updateVisibleItems({ ...state, viewMode }, expandedGroups)
}
