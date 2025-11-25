import { DirentType } from '@lvce-editor/constants'
import type { DisplayItem } from '../DisplayItem/DisplayItem.ts'
import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { IconRequest } from '../IconRequest/IconRequest.ts'

const getIconType = (direntType: number): number => {
  switch (direntType) {
    case DirentType.Directory:
    case DirentType.DirectoryExpanded:
      return 2
    default:
      return 1
  }
}

export const getMissingIconRequests = (dirents: readonly DisplayItem[], fileIconCache: FileIconCache): readonly IconRequest[] => {
  const missingRequests: IconRequest[] = []

  for (const dirent of dirents) {
    if (!(dirent.file in fileIconCache)) {
      missingRequests.push({
        type: getIconType(dirent.type),
        name: dirent.label,
      })
    }
  }

  return missingRequests
}
