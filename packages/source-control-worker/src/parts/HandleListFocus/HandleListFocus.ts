import { WhenExpression } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getVisibleSourceControlItems } from '../GetVisibleSourceControlItems/GetVisibleSourceControlItems.ts'

export const handleListFocus = (state: SourceControlState): SourceControlState => {
  const { actionsCache, fileIconCache, focusedIndex, items, maxLineY, minLineY, selectedItem } = state
  return {
    ...state,
    focus: WhenExpression.FocusSourceControlList,
    visibleItems: getVisibleSourceControlItems(items, minLineY, maxLineY, actionsCache, fileIconCache, selectedItem, focusedIndex),
  }
}
