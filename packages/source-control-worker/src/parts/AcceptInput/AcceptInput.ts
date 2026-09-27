import { InputSource } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { addToHistory } from '../AddToHistory/AddToHistory.ts'
import { handleInput } from '../HandleInput/HandleInput.ts'
import { loadContent } from '../LoadContent/LoadContent.ts'
import * as Logger from '../Logger/Logger.ts'
import * as SourceControl from '../SourceControl/SourceControl.ts'

export const acceptInput = async (state: SourceControlState): Promise<SourceControlState> => {
  const { applicationId, assetDir, enabledProviderIds, history, inputValue, platform } = state
  if (enabledProviderIds.length === 0) {
    Logger.info('[ViewletSourceControl] no source control provider found')
    return state
  }
  for (const providerId of enabledProviderIds) {
    await SourceControl.acceptInput(providerId, inputValue, assetDir, platform, applicationId)
  }
  const newState = await loadContent(state, {})
  const clearedState = await handleInput(newState, '', InputSource.Script)
  return {
    ...clearedState,
    defaultInputValue: '',
    history: addToHistory(history, inputValue),
    historyDraft: '',
    historyIndex: -1,
    inputMessage: '',
    inputValue: '',
  }
}
