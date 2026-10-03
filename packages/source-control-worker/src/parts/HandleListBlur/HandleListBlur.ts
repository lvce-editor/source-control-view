import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getVisibleSourceControlItems } from '../GetVisibleSourceControlItems/GetVisibleSourceControlItems.ts'

export const handleListBlur = (state: SourceControlState): SourceControlState => {
  const { actionsCache, fileIconCache, items, maxLineY, minLineY, selectedItem } = state
  return {
    ...state,
    focus: 0,
    visibleItems: getVisibleSourceControlItems(items, minLineY, maxLineY, actionsCache, fileIconCache, selectedItem),
  }
}
