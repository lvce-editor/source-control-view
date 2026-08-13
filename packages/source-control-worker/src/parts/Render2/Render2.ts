import { ViewletCommand } from '@lvce-editor/constants'
import * as ApplyRender from '../ApplyRender/ApplyRender.ts'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'
import * as SourceControlStates from '../SourceControlStates/SourceControlStates.ts'

export const render2 = async (uid: number, diffResult: readonly number[]): Promise<readonly any[]> => {
  const { newState, oldState } = SourceControlStates.get(uid)
  SourceControlStates.set(uid, newState, newState)
  const commands = ApplyRender.applyRender(oldState, newState, diffResult)
  if (!RendererProcess.isConnected()) {
    return commands
  }
  const rendererWorkerCommands = commands.filter((command) => command[0] === ViewletCommand.SetFocusContext)
  const rendererProcessCommands = commands.filter((command) => command[0] !== ViewletCommand.SetFocusContext)
  const transactionId = await RendererProcess.invoke('Viewlet.queueCommands', uid, rendererProcessCommands)
  return [...rendererWorkerCommands, ['Viewlet.commitPending', uid, transactionId]]
}
