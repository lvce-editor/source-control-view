import type { ActionsCache } from '../ActionsCache/ActionsCache.ts'
import type { DisplayItem } from '../DisplayItem/DisplayItem.ts'
import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as GetFileIcons from '../GetFileIcons/GetFileIcons.ts'
import { getVisibleSourceControlItems } from '../GetVisibleSourceControlItems/GetVisibleSourceControlItems.ts'

export interface VisibleSourceControlItemsWithIcons {
  readonly fileIconCache: FileIconCache
  readonly visibleItems: readonly VisibleItem[]
}

export const getVisibleSourceControlItemsWithIcons = async (
  items: readonly DisplayItem[],
  minLineY: number,
  maxLineY: number,
  actionsCache: ActionsCache,
  fileIconCache: FileIconCache,
  selectedItem: string | undefined = undefined,
): Promise<VisibleSourceControlItemsWithIcons> => {
  const visible = items.slice(minLineY, maxLineY)
  const newFileIconCache = await GetFileIcons.getFileIcons(visible, fileIconCache)
  const visibleItems = getVisibleSourceControlItems(items, minLineY, maxLineY, actionsCache, newFileIconCache, selectedItem)
  return {
    fileIconCache: newFileIconCache,
    visibleItems,
  }
}
