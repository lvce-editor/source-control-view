import { DirentType } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getVisibleSourceControlItems } from '../GetVisibleSourceControlItems/GetVisibleSourceControlItems.ts'
import { handleClickDirectory } from '../HandleClickDirectory/HandleClickDirectory.ts'
import { handleClickDirectoryExpanded } from '../HandleClickDirectoryExpanded/HandleClickDirectoryExpanded.ts'
import { handleClickFile } from '../HandleClickFile/HandleClickFile.ts'
import * as Logger from '../Logger/Logger.ts'

export const selectIndex = async (state: SourceControlState, index: number): Promise<SourceControlState> => {
  const { actionsCache, fileIconCache, items, maxLineY, minLineY } = state
  if (index < 0 || index >= items.length) {
    return state
  }
  const item = items[index]
  switch (item.type) {
    case DirentType.Directory:
      return handleClickDirectory(state, item)
    case DirentType.DirectoryExpanded:
      return handleClickDirectoryExpanded(state, item)
    case DirentType.File: {
      const selectedItem = {
        file: item.file,
        groupId: item.groupId,
      }
      const selectedState = {
        ...state,
        selectedItem,
        visibleItems: getVisibleSourceControlItems(items, minLineY, maxLineY, actionsCache, fileIconCache, selectedItem),
      }
      return handleClickFile(selectedState, item)
    }
    default:
      Logger.warn(`unknown item type: ${item.type}`)
      return state
  }
}
