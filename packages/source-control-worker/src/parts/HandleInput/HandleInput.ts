import { InputSource } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getInputHeight } from '../GetInputHeight/GetInputHeight.ts'

export const handleInput = async (state: SourceControlState, value: string, inputSource = InputSource.User): Promise<SourceControlState> => {
  const { width } = state
  const inputBoxHeight = await getInputHeight(value, width)
  return {
    ...state,
    inputValue: value,
    inputSource,
    inputBoxHeight,
  }
}
