import type { DisplayItem } from '../DisplayItem/DisplayItem.ts'
import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { IconRequest } from '../IconRequest/IconRequest.ts'

export const getMissingIconRequests = (dirents: readonly DisplayItem[], fileIconCache: FileIconCache): readonly IconRequest[] => {
  const missingRequests: IconRequest[] = []

  for (const dirent of dirents) {
    if (!(dirent.file in fileIconCache)) {
      missingRequests.push({
        type: dirent.type,
        name: dirent.label,
        path: dirent.file,
      })
    }
  }

  return missingRequests
}
