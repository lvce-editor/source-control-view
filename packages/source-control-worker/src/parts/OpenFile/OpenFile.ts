import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { openUri } from '../OpenUri/OpenUri.ts'

const RE_URI = /^[a-z][a-z\d+.-]*:\/\//i
const RE_WINDOWS_PATH = /^[a-z]:[\\/]/i

const toFileUri = (uri: string): string => {
  if (RE_URI.test(uri)) {
    return uri
  }
  const fileUri = new URL('file:///')
  const path = RE_WINDOWS_PATH.test(uri) ? `/${uri.replaceAll('\\', '/')}` : uri
  fileUri.pathname = path
  return fileUri.href
}

export const openFile = async (state: SourceControlState, uri: string): Promise<SourceControlState> => {
  const { applicationId } = state
  await openUri(toFileUri(uri), applicationId)
  return state
}
