import { InputSource } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as SourceControl from '../SourceControl/SourceControl.ts'
import { handleInput } from '../HandleInput/HandleInput.ts'

const toErrorMessage = (error: unknown): string => {
  if (error instanceof Error && error.message) {
    return `Failed to generate commit message: ${error.message}`
  }
  return 'Failed to generate commit message'
}

export const handleGenerateCommitMessage = async (state: SourceControlState): Promise<SourceControlState> => {
  const { assetDir, enabledProviderIds, platform } = state
  if (enabledProviderIds.length === 0) {
    return {
      ...state,
      inputMessage: 'Failed to generate commit message: no source control provider found',
    }
  }
  try {
    const inputValue = await SourceControl.generateCommitMessage(enabledProviderIds[0], assetDir, platform)
    const newState = await handleInput(state, inputValue, InputSource.Script)
    return {
      ...newState,
      inputMessage: '',
    }
  } catch (error) {
    return {
      ...state,
      inputMessage: toErrorMessage(error),
    }
  }
}