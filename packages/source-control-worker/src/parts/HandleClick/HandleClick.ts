import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as DirentType from '../DirentType/DirentType.ts'
import { handleClickDirectory } from '../HandleClickDirectory/HandleClickDirectory.ts'
import { handleClickDirectoryExpanded } from '../HandleClickDirectoryExpanded/HandleClickDirectoryExpanded.ts'
import { handleClickFile } from '../HandleClickFile/HandleClickFile.ts'

export const handleClick = async (state: SourceControlState, index: number): Promise<SourceControlState> => {
  const { items } = state
  const item = items[index]
  switch (item.type) {
    case DirentType.Directory:
      return handleClickDirectory(state, item)
    case DirentType.DirectoryExpanded:
      return handleClickDirectoryExpanded(state, item)
    case DirentType.File:
      return handleClickFile(state, item)
    default:
      console.warn(`unknown item type: ${item.type}`)
      return state
  }
}
