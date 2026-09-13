import * as SourceControl from '../SourceControl/SourceControl.ts'
import * as SourceControlStates from '../SourceControlStates/SourceControlStates.ts'

export const handleSourceControlProgressChange = SourceControlStates.wrapAsyncCommand(async (context) => {
  const state = await context.updateState((current) => ({ ...current, progressRequestId: current.progressRequestId + 1 }))
  const { applicationId, assetDir, enabledProviderIds, platform, progressRequestId, workspacePath } = state
  const operationInProgress = await SourceControl.getProgress(enabledProviderIds, assetDir, platform, applicationId)
  await context.updateState((current) => {
    if (current.progressRequestId !== progressRequestId || current.workspacePath !== workspacePath || current.enabledProviderIds !== enabledProviderIds) {
      return current
    }
    return { ...current, operationInProgress }
  })
})
