import type { ActionsCache } from '../ActionsCache/ActionsCache.ts'
import * as ExtensionMeta from '../ExtensionMeta/ExtensionMeta.ts'

export const requestSourceActions = async (): Promise<ActionsCache> => {
  const extensions = await ExtensionMeta.getExtensions()
  const newCache = Object.create(null)
  for (const extension of extensions) {
    if (!extension || !extension['source-control-actions']) {
      continue
    }
    const sourceControlActions = Object.entries(extension['source-control-actions'])
    for (const [key, value] of sourceControlActions) {
      newCache[key] = value
    }
  }
  return newCache
}
