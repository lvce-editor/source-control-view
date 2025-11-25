import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as Bounds from '../Bounds/Bounds.ts'
import * as FileSystem from '../FileSystem/FileSystem.ts'
import { openDiffEditor } from '../OpenDiffEditor/OpenDiffEditor.ts'
import * as SourceControl from '../SourceControl/SourceControl.ts'

export const handleClickFile = async (state: SourceControlState, item: any): Promise<SourceControlState> => {
  const { enabledProviderIds, root } = state
  const providerId = enabledProviderIds[0]
  const absolutePath = `${root}/${item.file}`
  // TODO handle error
  const [fileBefore] = await Promise.all([SourceControl.getFileBefore(providerId, item.file), FileSystem.readFile(absolutePath)])

  // TODO diff editor should determine width by itself
  await openDiffEditor(fileBefore, absolutePath, Bounds.get().width)
  return state
}
