import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const { dispose, get, getCommandIds, registerCommands, set, wrapAsyncCommand, wrapGetter } = ViewletRegistry.create<SourceControlState>()

export const wrapCommand = (fn: ViewletRegistry.Fn<SourceControlState>): ViewletRegistry.WrappedFn =>
  wrapAsyncCommand(async (context, ...args) => {
    const state = context.getState()
    const { enabledProviderIds, progressRequestId, workspacePath } = state
    const result = await fn(state, ...args)
    if (result === state) {
      return
    }
    await context.updateState((current) => {
      if (current.workspacePath !== workspacePath || current.enabledProviderIds !== enabledProviderIds) {
        return current
      }
      return {
        ...result,
        inProgress: (current.progressRequestId === progressRequestId ? result : current).inProgress,
        progressRequestId: current.progressRequestId,
      }
    })
  })
