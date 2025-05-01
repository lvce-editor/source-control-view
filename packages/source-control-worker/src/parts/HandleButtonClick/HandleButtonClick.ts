import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as ExtensionHostCommand from '../ExtensionHostCommand/ExtensionHostCommand.ts'
import { loadContent } from '../LoadContent/LoadContent.ts'

export const handleButtonClick = async (state: SourceControlState, clickedIndex: number): Promise<SourceControlState> => {
  const { buttonIndex, buttons, items } = state
  const button = buttons[clickedIndex]
  const item = items[buttonIndex]
  if (!button) {
    return state
  }
  await ExtensionHostCommand.executeCommand(button.command, item.file)
  const newState = await loadContent(state)
  return newState
}
