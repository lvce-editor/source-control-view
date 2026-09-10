import { InputSource } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as ExtensionHostCommand from '../ExtensionHostCommand/ExtensionHostCommand.ts'
import { handleInput } from '../HandleInput/HandleInput.ts'

export const handleInputActionClick = async (state: SourceControlState, name: string): Promise<SourceControlState> => {
  const { applicationId, assetDir, inputActions, inputValue, platform } = state
  const index = Number(name)
  const action = Number.isSafeInteger(index) && String(index) === name ? inputActions[index] : undefined
  if (!action) {
    return state
  }
  try {
    const result = await ExtensionHostCommand.executeCommandForApplication(applicationId, action.command, assetDir, platform, inputValue)
    if (typeof result === 'string') {
      return await handleInput(state, result, InputSource.Script)
    }
    return state
  } catch (error) {
    return { ...state, inputMessage: error instanceof Error ? error.message : String(error) }
  }
}
