import * as ApplyRender from '../ApplyRender/ApplyRender.ts'
import * as SourceControlStates from '../SourceControlStates/SourceControlStates.ts'

export const render2 = (uid: number, diffResult: readonly number[]): readonly any[] => {
  const { oldState, newState } = SourceControlStates.get(uid)
  SourceControlStates.set(uid, newState, newState)
  const commands = ApplyRender.applyRender(oldState, newState, diffResult)
  return commands
}
