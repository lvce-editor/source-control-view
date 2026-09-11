import { getHeaderHeight } from '../GetHeaderHeight/GetHeaderHeight.ts'
import { loadContent } from '../LoadContent/LoadContent.ts'
import * as SourceControlStates from '../SourceControlStates/SourceControlStates.ts'

export const loadContentCommand = SourceControlStates.wrapAsyncCommand(async (context, savedState: unknown) => {
  const state = context.getState()
  const { inputValue: previousInputValue, loading } = state
  const loadedState = await loadContent(state, savedState)
  await context.updateState((current) => {
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
