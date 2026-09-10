import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as ExtensionHostCommand from '../ExtensionHostCommand/ExtensionHostCommand.ts'
import { loadContent } from '../LoadContent/LoadContent.ts'

export const handleButtonClick = async (state: SourceControlState, clickedIndex: number): Promise<SourceControlState> => {
  const { applicationId, assetDir, platform, visibleItems } = state
  const item = visibleItems[clickedIndex]
  const button = item.buttons[clickedIndex]
  if (!button) {
    return state
  }
  await ExtensionHostCommand.executeCommandForApplication(applicationId, button.command, assetDir, platform, item.file)
  const newState = await loadContent(state, {})
  return newState
}
