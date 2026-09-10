import * as OpenUri from '../OpenUri/OpenUri.ts'

export const openDiffEditor = async (before: string, afterPath: string, width: number, inlineDiffEditorBreakpoint: number, applicationId?: string): Promise<void> => {
  // TODO handle error
  // TODO should only pass uris to diff editor, diff editor should then resolve file contents
  if (width < inlineDiffEditorBreakpoint) {
    await OpenUri.openUri(`inline-diff://data://${before}<->${afterPath}`, applicationId)
  } else {
    await OpenUri.openUri(`diff://data://${before}<->${afterPath}`, applicationId)
  }
}
