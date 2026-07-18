import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as GetProtocol from '../GetProtocol/GetProtocol.ts'
import { loadContent } from '../LoadContent/LoadContent.ts'
import { refresh } from '../Refresh/Refresh.ts'
import * as SourceControl from '../SourceControl/SourceControl.ts'

const isEqual = (oldProviderIds: readonly string[], newProviderIds: readonly string[]): boolean => {
  if (oldProviderIds.length !== newProviderIds.length) {
    return false
  }
  for (let index = 0; index < oldProviderIds.length; index++) {
    if (oldProviderIds[index] !== newProviderIds[index]) {
      return false
    }
  }
  return true
}

export const handleWorkspaceRefresh = async (state: SourceControlState): Promise<SourceControlState> => {
  const { assetDir, enabledProviderIds, platform, workspacePath } = state
  const scheme = GetProtocol.getProtocol(workspacePath)
  const newProviderIds = await SourceControl.getEnabledProviderIds(scheme, workspacePath, assetDir, platform)
  if (isEqual(enabledProviderIds, newProviderIds)) {
    return refresh(state)
  }
  return loadContent(state, {
    inputValue: state.inputValue,
  })
}
