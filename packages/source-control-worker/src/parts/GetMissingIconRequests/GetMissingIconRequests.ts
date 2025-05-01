import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { IconRequest } from '../IconRequest/IconRequest.ts'

export const getMissingIconRequests = (dirents: readonly any[], fileIconCache: FileIconCache): readonly IconRequest[] => {
  const missingRequests: IconRequest[] = []

  for (const dirent of dirents) {
    if (!(dirent.path in fileIconCache)) {
      missingRequests.push({
        type: dirent.type,
        name: dirent.name,
        path: dirent.path,
      })
    }
  }

  return missingRequests
}
