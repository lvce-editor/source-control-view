import type { ActionsCache } from '../ActionsCache/ActionsCache.ts'
import * as ExtensionMeta from '../ExtensionMeta/ExtensionMeta.ts'

export const requestSourceActions = async (assetDir = '', platform = 0, applicationId?: string): Promise<ActionsCache> => {
  const extensions = await ExtensionMeta.getExtensions(assetDir, platform, applicationId)
  const newCache = Object.create(null)
  for (const extension of extensions) {
    if (!extension || !extension['source-control-actions']) {
      continue
    }
    const sourceControlActions = Object.entries(extension['source-control-actions']).filter(([, value]: readonly [string, unknown]) => Array.isArray(value))
    for (const [key, value] of sourceControlActions) {
      const actions = (value as unknown[]).filter((action: any) => action && typeof action.command === 'string' && typeof action.label === 'string')
      newCache[key] = [...(newCache[key] || []), ...actions]
    }
  }
  return newCache
}
