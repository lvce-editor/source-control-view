import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as Bounds from '../Bounds/Bounds.ts'
import * as FileSystem from '../FileSystem/FileSystem.ts'
import * as OpenUri from '../OpenUri/OpenUri.ts'
import * as SourceControl from '../SourceControl/SourceControl.ts'

const inlineDiffEditorBreakpoint = 800

export const handleClickFile = async (state: SourceControlState, item: any): Promise<SourceControlState> => {
  const { enabledProviderIds, root } = state
  const providerId = enabledProviderIds[0]
  const absolutePath = `${root}/${item.file}`
  // TODO handle error
  const [fileBefore] = await Promise.all([SourceControl.getFileBefore(providerId, item.file), FileSystem.readFile(absolutePath)])
  if (Bounds.get().width < inlineDiffEditorBreakpoint) {
    await OpenUri.openUri(`inline-diff://data://${fileBefore}<->${absolutePath}`)
  } else {
    await OpenUri.openUri(`diff://data://${fileBefore}<->${absolutePath}`)
  }
  return state
}
