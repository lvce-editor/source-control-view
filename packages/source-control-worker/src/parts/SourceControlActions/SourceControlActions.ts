import * as Assert from '../Assert/Assert.ts'
import * as DirentType from '../DirentType/DirentType.ts'
import * as ExtensionMeta from '../ExtensionMeta/ExtensionMeta.ts'

export const state = {
  cache: Object.create(null),
}

const getContextId = (groupId: string, type: number): string => {
  if (type === DirentType.File) {
    return `${groupId}-item`
  }
  return groupId
}

const ensureActions = async (): Promise<void> => {
  if (Object.keys(state.cache).length > 0) {
    return
  }
  const extensions = await ExtensionMeta.getExtensions()
  for (const extension of extensions) {
    if (extension && extension['source-control-actions']) {
      for (const [key, value] of Object.entries(extension['source-control-actions'])) {
        state.cache[key] = value
      }
    }
  }
}

export const getSourceControlActions = async (providerId: any, groupId: string, type: number): Promise<readonly any[]> => {
  Assert.string(groupId)
  await ensureActions()
  const contextId = getContextId(groupId, type)
  const value = state.cache[contextId] || []
  return value
}
