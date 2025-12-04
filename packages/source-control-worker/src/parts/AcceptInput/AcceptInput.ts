import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { loadContent } from '../LoadContent/LoadContent.ts'
import * as Logger from '../Logger/Logger.ts'
import * as SourceControl from '../SourceControl/SourceControl.ts'

export const acceptInput = async (state: SourceControlState): Promise<SourceControlState> => {
  const { enabledProviderIds, inputValue } = state
  if (enabledProviderIds.length === 0) {
    Logger.info('[ViewletSourceControl] no source control provider found')
    return state
  }
  const providerId = enabledProviderIds[0]
  await SourceControl.acceptInput(providerId, inputValue)
  const newState = await loadContent(state, {})
  return {
    ...newState,
    inputValue: '',
  }
}
