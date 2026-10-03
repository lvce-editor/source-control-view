import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getIndents } from '../GetIndents/GetIndents.ts'
import * as GetVisibleSourceControlItemsWithIcons from '../GetVisibleSourceControlItemsWithIcons/GetVisibleSourceControlItemsWithIcons.ts'

export const updateIcons = async (state: SourceControlState): Promise<SourceControlState> => {
  const { actionsCache, focusedIndex, indents, items, maxLineY, minLineY, selectedItem } = state
  const { fileIconCache, visibleItems } = await GetVisibleSourceControlItemsWithIcons.getVisibleSourceControlItemsWithIcons(
    items,
    minLineY,
    maxLineY,
    actionsCache,
    Object.create(null),
    selectedItem,
    focusedIndex,
  )
  return {
    ...state,
    fileIconCache,
    indents: getIndents(indents, visibleItems),
    visibleItems,
  }
}
