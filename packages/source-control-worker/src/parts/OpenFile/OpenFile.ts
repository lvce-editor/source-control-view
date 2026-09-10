import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { openUri } from '../OpenUri/OpenUri.ts'

export const openFile = async (state: SourceControlState, uri: string): Promise<SourceControlState> => {
  const { applicationId } = state
  await openUri(uri, applicationId)
  return state
}
