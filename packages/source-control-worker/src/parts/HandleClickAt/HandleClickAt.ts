import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const handleClickAt = async (state: SourceControlState, clientX: number, clientY: number): Promise<SourceControlState> => {
  console.log({ clientX, clientY })
  return state
}
