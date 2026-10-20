import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const { dispose, get, getCommandIds, registerCommands, set, wrapAsyncCommand, wrapGetter } = ViewletRegistry.create<SourceControlState>()

export const wrapCommand = (fn: ViewletRegistry.Fn<SourceControlState>): ViewletRegistry.WrappedFn =>
  wrapAsyncCommand(async (context, ...args) => {
    const state = context.getState()
    const { enabledProviderIds, progressRequestId, workspaceUri } = state
    const result = await fn(state, ...args)
    if (result === state) {
      return
    }
    const changes = Object.fromEntries(Object.entries(result).filter(([key, value]: readonly [string, unknown]) => value !== state[key as keyof SourceControlState]))
    await context.updateState((current) => {
      const { enabledProviderIds: currentProviderIds } = current
      // Reloading can allocate an equivalent provider list while a command is pending.
      const sameProviders = currentProviderIds.length === enabledProviderIds.length && currentProviderIds.every((id, index) => id === enabledProviderIds[index])
      if (current.workspaceUri !== workspaceUri || !sameProviders) {
        return current
      }
      return {
        ...current,
        ...changes,
        inProgress: (current.progressRequestId === progressRequestId ? result : current).inProgress,
        progressRequestId: current.progressRequestId,
      }
    })
  })
