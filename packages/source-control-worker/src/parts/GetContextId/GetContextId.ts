import * as DirentType from '../DirentType/DirentType.ts'

export const getContextId = (groupId: string, type: number): string => {
  if (type === DirentType.File) {
    return `${groupId}-item`
  }
  return groupId
}
