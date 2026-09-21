import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getIndents } from '../GetIndents/GetIndents.ts'
import * as GetVisibleSourceControlItemsWithIcons from '../GetVisibleSourceControlItemsWithIcons/GetVisibleSourceControlItemsWithIcons.ts'

export const updateIcons = async (state: SourceControlState): Promise<SourceControlState> => {
  const { items, maxLineY, minLineY } = state
  const { actionsCache, indents } = state
  const { fileIconCache, visibleItems } = await GetVisibleSourceControlItemsWithIcons.getVisibleSourceControlItemsWithIcons(
    items,
    minLineY,
    maxLineY,
    actionsCache,
    Object.create(null),
  )
  return {
    ...state,
    fileIconCache,
    indents: getIndents(indents, visibleItems),
    visibleItems,
  }
}
