import { DirentType } from '@lvce-editor/constants'

const defaultIndent = 16 // 1rem = 16px

export const getTreeItemIndent = (type: number, depth?: number): number => {
  if (depth !== undefined) {
    return (depth + 1) * defaultIndent
  }
  if (type === DirentType.Directory || type === DirentType.DirectoryExpanded) {
    return 4
  }
  return defaultIndent
}
