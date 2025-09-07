import { InputSource } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const handleInput = async (state: SourceControlState, value: string, inputSource = InputSource.User): Promise<SourceControlState> => {
  const lines = value.split('\n')
  const lineCount = lines.length
  const lineHeight = 30
  const inputBoxHeight = lineHeight * lineCount
  return {
    ...state,
    inputValue: value,
    inputSource,
    inputBoxHeight,
  }
}
