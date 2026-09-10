import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { executeCommandForApplication } from '../ExtensionHostCommand/ExtensionHostCommand.ts'
import { getContextId } from '../GetContextId/GetContextId.ts'
import { refresh } from '../Refresh/Refresh.ts'

export const executeMenuAction = async (state: SourceControlState, file: string, groupId: string, command: string): Promise<SourceControlState> => {
  const { actionsCache, applicationId, assetDir, items, platform } = state
  const item = items.find((item) => item.file === file && item.groupId === groupId)
  if (!item || !actionsCache[getContextId(item.groupId, item.type)]?.some((action) => action.command === command)) {
    return state
  }
  await executeCommandForApplication(applicationId, command, assetDir, platform, file)
  return refresh(state)
}
