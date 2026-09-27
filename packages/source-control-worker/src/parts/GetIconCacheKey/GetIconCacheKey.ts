import { DirentType } from '@lvce-editor/constants'

export const getIconCacheKey = (path: string, type: number): string => {
  if (type === DirentType.DirectoryExpanded) {
    return `${path}#expanded`
  }
  return path
}
