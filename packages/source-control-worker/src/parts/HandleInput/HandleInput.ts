import { InputSource } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getInputHeight } from '../GetInputHeight/GetInputHeight.ts'

export const handleInput = async (state: SourceControlState, value: string, inputSource = InputSource.User): Promise<SourceControlState> => {
  const { inputFontFamily, inputFontSize, inputFontWeight, inputLetterSpacing, inputLineHeight, width } = state
  const inputBoxHeight = await getInputHeight(value, width, inputFontFamily, inputFontWeight, inputFontSize, inputLetterSpacing, inputLineHeight)
  return {
    ...state,
    inputBoxHeight,
    inputSource,
    inputValue: value,
  }
}
