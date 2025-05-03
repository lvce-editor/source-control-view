import * as ExtensionHostCommand from '../ExtensionHostCommand/ExtensionHostCommand.ts'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const handleClickSourceControlButtons = async (state: SourceControlState, index: number, name: string): Promise<SourceControlState> => {
  const { visibleItems } = state
  const item = visibleItems[index]
  if (!item) {
    return state
  }
  const button = item.buttons.find((button) => button.label === name)
  if (!button) {
    return state
  }
  const file = item.file
  await ExtensionHostCommand.executeCommand(button.command, file)
  return state
}
