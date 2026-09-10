import type { ActionButton } from '../ActionButton/ActionButton.ts'
import * as ExtensionMeta from '../ExtensionMeta/ExtensionMeta.ts'

export const requestInputActions = async (assetDir: string, platform: number, applicationId?: string): Promise<readonly ActionButton[]> => {
  const extensions = await ExtensionMeta.getExtensions(assetDir, platform, applicationId)
  const actions: ActionButton[] = []
  for (const extension of extensions) {
    const contributed = extension?.['source-control-input-actions']
    if (!Array.isArray(contributed)) {
      continue
    }
    for (const action of contributed) {
      if (action && typeof action.command === 'string' && action.command && typeof action.label === 'string' && action.label && typeof action.icon === 'string') {
        actions.push({ command: action.command, icon: action.icon, label: action.label })
      }
    }
  }
  return actions
}
