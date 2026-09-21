import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { addToHistory } from '../AddToHistory/AddToHistory.ts'
import * as ExtensionHostCommand from '../ExtensionHostCommand/ExtensionHostCommand.ts'
import { loadContent } from '../LoadContent/LoadContent.ts'
import * as Logger from '../Logger/Logger.ts'

export const handleSourceControlButtonClick = async (state: SourceControlState, name: string): Promise<SourceControlState> => {
  const { applicationId, assetDir, history, inputValue, platform, sourceControlButtons } = state
  const button = sourceControlButtons.find((button) => button.label === name)
  if (!button) {
    Logger.warn(`[source-control-worker] Source control button not found ${name}`)
    return state
  }
  await ExtensionHostCommand.executeCommandForApplication(applicationId, button.command, assetDir, platform, inputValue)
  const newState = await loadContent(state, {})
  return {
    ...newState,
    history: addToHistory(history, inputValue),
    historyDraft: '',
    historyIndex: -1,
    inputMessage: '',
    inputValue: '',
  }
}
