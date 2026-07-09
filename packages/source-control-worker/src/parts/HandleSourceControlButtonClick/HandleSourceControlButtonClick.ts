import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as ExtensionHostCommand from '../ExtensionHostCommand/ExtensionHostCommand.ts'
import { loadContent } from '../LoadContent/LoadContent.ts'
import * as Logger from '../Logger/Logger.ts'

export const handleSourceControlButtonClick = async (state: SourceControlState, name: string): Promise<SourceControlState> => {
  const button = state.sourceControlButtons.find((button) => button.label === name)
  if (!button) {
    Logger.warn(`[source-control-worker] Source control button not found ${name}`)
    return state
  }
  await ExtensionHostCommand.executeCommand(button.command, state.assetDir, state.platform, state.inputValue)
  const newState = await loadContent(state, {})
  return {
    ...newState,
    inputMessage: '',
    inputValue: '',
  }
}
