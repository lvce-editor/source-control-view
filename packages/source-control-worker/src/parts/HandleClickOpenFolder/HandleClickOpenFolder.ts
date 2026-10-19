import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as OpenFolder from '../OpenFolder/OpenFolder.ts'

export const handleClickOpenFolder = async (state: SourceControlState): Promise<SourceControlState> => {
  const { applicationId } = state
  await OpenFolder.openFolder(applicationId)
  return state
}
