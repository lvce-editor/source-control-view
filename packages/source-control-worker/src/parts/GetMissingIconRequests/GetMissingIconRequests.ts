import { DirentType } from '@lvce-editor/constants'
import type { DisplayItem } from '../DisplayItem/DisplayItem.ts'
import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { IconRequest } from '../IconRequest/IconRequest.ts'
import * as GetIconCacheKey from '../GetIconCacheKey/GetIconCacheKey.ts'
import { getIconType } from '../GetIconType/GetIconType.ts'

export const getMissingIconRequests = (dirents: readonly DisplayItem[], fileIconCache: FileIconCache): readonly IconRequest[] => {
  const missingRequests: IconRequest[] = []
  const requestedCacheKeys = new Set<string>()

  for (const dirent of dirents) {
    const path = dirent.file || dirent.directory
    if (!path) {
      continue
    }
    const cacheKey = GetIconCacheKey.getIconCacheKey(path, dirent.type)
    if (!(cacheKey in fileIconCache) && !requestedCacheKeys.has(cacheKey)) {
      requestedCacheKeys.add(cacheKey)
      missingRequests.push({
        ...(dirent.type === DirentType.DirectoryExpanded && { expanded: true }),
        name: dirent.label,
        path,
        type: getIconType(dirent.type),
      })
    }
  }

  return missingRequests
}
