import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { openUri } from '../OpenUri/OpenUri.ts'
import { getFileBefore } from '../SourceControl/SourceControl.ts'

export const openFileHead = async (state: SourceControlState, uri: string): Promise<SourceControlState> => {
  const { applicationId, assetDir, enabledProviderIds, items, platform, root } = state
  const item = items.find((item) => `${root}/${item.file}` === uri)
  if (!item || enabledProviderIds.length === 0) {
    return state
  }
  const before = await getFileBefore(enabledProviderIds[0], item.file, assetDir, platform, applicationId)
  await openUri(`data://${before}`, applicationId)
  return state
}
