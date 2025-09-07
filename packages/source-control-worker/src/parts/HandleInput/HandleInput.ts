import { InputSource } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getInputHeight } from '../GetInputHeight/GetInputHeight.ts'

export const handleInput = async (state: SourceControlState, value: string, inputSource = InputSource.User): Promise<SourceControlState> => {
  const { width, inputFontFamily, inputFontSize, inputFontWeight, inputLetterSpacing } = state
  const lineHeight = 30
  const inputBoxHeight = await getInputHeight(value, width, inputFontFamily, inputFontWeight, inputFontSize, inputLetterSpacing, lineHeight)
  return {
    ...state,
    inputValue: value,
    inputSource,
    inputBoxHeight,
  }
}
