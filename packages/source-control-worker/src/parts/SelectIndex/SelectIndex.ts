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
      return handleClickDirectory({ ...state, focusedIndex: index }, item)
    case DirentType.DirectoryExpanded:
      return handleClickDirectoryExpanded({ ...state, focusedIndex: index }, item)
    case DirentType.File: {
      const selectedItem = `${item.groupId}\0${item.file}`
      return handleClickFile(
        {
          ...state,
          focusedIndex: index,
          selectedItem,
          visibleItems: getVisibleSourceControlItems(items, minLineY, maxLineY, actionsCache, fileIconCache, selectedItem, index),
        },
        item,
      )
    }
    default:
      Logger.warn(`unknown item type: ${item.type}`)
      return state
  }
}
