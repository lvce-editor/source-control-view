import { DirentType } from '@lvce-editor/constants'

export const getContextId = (groupId: string, type: number, directory = ''): string => {
  if (directory) {
    return `${groupId}-directory`
  }
  if (type === DirentType.File) {
    return `${groupId}-item`
  }
  return groupId
}
