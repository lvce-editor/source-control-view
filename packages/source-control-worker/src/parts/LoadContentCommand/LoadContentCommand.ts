import { getHeaderHeight } from '../GetHeaderHeight/GetHeaderHeight.ts'
import { loadContent } from '../LoadContent/LoadContent.ts'
import * as SourceControlStates from '../SourceControlStates/SourceControlStates.ts'

export const loadContentCommand = SourceControlStates.wrapAsyncCommand(async (context, savedState: unknown) => {
  const state = context.getState()
  const { inputValue: previousInputValue, loading, progressRequestId } = state
  const loaded = await loadContent(state, savedState)
  await context.updateState((current) => {
    const sameProviders =
      current.enabledProviderIds.length === loaded.enabledProviderIds.length && current.enabledProviderIds.every((id, index) => id === loaded.enabledProviderIds[index])
    const loadedState = {
      ...loaded,
      operationInProgress: (sameProviders && current.progressRequestId !== progressRequestId ? current : loaded).operationInProgress,
      progressRequestId: current.progressRequestId,
    }
    if (loading && current.inputValue === previousInputValue) {
      return loadedState
    }
    const { inputBoxHeight, inputMessage, inputSource, inputValue } = current
    const { buttonBlockHeight, inputPaddingBlock, sourceControlButtons } = loadedState
    return {
      ...loadedState,
      headerHeight: getHeaderHeight(inputBoxHeight, sourceControlButtons, inputPaddingBlock, buttonBlockHeight),
      inputBoxHeight,
      inputMessage,
      inputSource,
      inputValue,
    }
  })
})
