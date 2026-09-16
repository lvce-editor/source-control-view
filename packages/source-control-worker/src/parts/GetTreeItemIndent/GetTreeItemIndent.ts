import { DirentType } from '@lvce-editor/constants'

const defaultIndent = 16 // 1rem = 16px
const groupIndent = 4

export const getTreeItemIndent = (type: number): number => {
  if (type === DirentType.Directory || type === DirentType.DirectoryExpanded) {
    return groupIndent
  }
  return defaultIndent
}
