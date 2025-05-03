import type { ActionsCache } from '../ActionsCache/ActionsCache.ts'
import type { DisplayItem } from '../DisplayItem/DisplayItem.ts'
import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as EmptySourceControlButtons from '../EmptySourceControlButtons/EmptySourceControlButton.ts'
import { getContextId } from '../GetContextId/GetContextId.ts'

export const getVisibleSourceControlItems = (
  items: readonly DisplayItem[],
  minLineY: number,
  maxLineY: number,
  actionsCache: ActionsCache,
  fileIconCache: FileIconCache,
): readonly VisibleItem[] => {
  const visible: VisibleItem[] = []
  for (let i = minLineY; i < maxLineY; i++) {
    const item = items[i]
    const contextId = getContextId(item.groupId, item.type)
    const buttons = actionsCache[contextId] || EmptySourceControlButtons.emptySourceControlButtons
    const fileIcon = fileIconCache[item.label] || ''
    visible.push({
      ...item,
      buttons,
      fileIcon,
    })
  }
  return visible
}
