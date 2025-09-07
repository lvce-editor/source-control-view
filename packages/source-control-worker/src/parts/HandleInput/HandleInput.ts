import { InputSource } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const handleInput = async (state: SourceControlState, value: string, inputSource = InputSource.User): Promise<SourceControlState> => {
  return {
    ...state,
    inputValue: value,
    inputSource,
  }
}
