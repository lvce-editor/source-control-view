import { InputSource } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getHeaderHeight } from '../GetHeaderHeight/GetHeaderHeight.ts'
import { getInputHeight } from '../GetInputHeight/GetInputHeight.ts'
import { getInputWidth } from '../GetInputWidth/GetInputWidth.ts'

export const handleInput = async (state: SourceControlState, value: string, inputSource = InputSource.User): Promise<SourceControlState> => {
  const {
    buttonBlockHeight,
    inputActions,
    inputFontFamily,
    inputFontSize,
    inputFontWeight,
    inputLetterSpacing,
    inputLineHeight,
    inputPadding,
    inputPaddingBlock,
    sourceControlButtons,
    width,
  } = state
  const inputBoxHeight = await getInputHeight(
    value,
    getInputWidth(width, inputActions),
    inputFontFamily,
    inputFontWeight,
    inputFontSize,
    inputLetterSpacing,
    inputLineHeight,
    inputPadding,
  )
  const historyState = inputSource === InputSource.User ? { historyDraft: '', historyIndex: -1 } : {}
  return {
    ...state,
    ...historyState,
    headerHeight: getHeaderHeight(inputBoxHeight, sourceControlButtons, inputPaddingBlock, buttonBlockHeight),
    inputBoxHeight,
    inputMessage: '',
    inputSource,
    inputValue: value,
  }
}
