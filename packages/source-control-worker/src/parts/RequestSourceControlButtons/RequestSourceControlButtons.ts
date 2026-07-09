import type { ActionButton } from '../ActionButton/ActionButton.ts'
import * as ExtensionMeta from '../ExtensionMeta/ExtensionMeta.ts'

export const requestSourceControlButtons = async (): Promise<readonly ActionButton[]> => {
  const extensions = await ExtensionMeta.getExtensions()
  const buttons: ActionButton[] = []
  for (const extension of extensions) {
    if (!extension || !Array.isArray(extension['source-control-buttons'])) {
      continue
    }
    buttons.push(...extension['source-control-buttons'])
  }
  return buttons
}
