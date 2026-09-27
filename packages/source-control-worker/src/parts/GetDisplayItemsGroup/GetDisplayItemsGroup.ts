import { DirentType } from '@lvce-editor/constants'
import type { DisplayItem } from '../DisplayItem/DisplayItem.ts'
import type { Group } from '../Group/Group.ts'
import { getActualDecorationIcon } from '../GetActualDecorationIcon/GetActualDecorationIcon.ts'
import * as IconTheme from '../IconTheme/IconTheme.ts'
import * as Workspace from '../Workspace/Workspace.ts'

export const getDirectoryKey = (groupId: string, directory: string): string => `${groupId}\u{0000}${directory}`

const getFileDisplayItem = (item: Readonly<any>, groupId: string, iconDefinitions: readonly string[], posInSet: number, setSize: number, detail: string): DisplayItem => {
  const { file, icon, iconTitle, strikeThrough } = item
  const baseName = Workspace.pathBaseName(file)
  return {
    badgeCount: 0,
    decorationIcon: getActualDecorationIcon(iconDefinitions, icon),
    decorationIconTitle: iconTitle,
    decorationStrikeThrough: strikeThrough,
    detail,
    file,
    groupId,
    icon: IconTheme.getFileIcon({ name: file }),
    label: baseName,
    posInSet,
    setSize,
    type: DirentType.File,
  }
}

export const getDisplayItemsGroup = (group: Group, expandedGroups: Readonly<Record<string, boolean>>, iconDefinitions: readonly string[]): readonly DisplayItem[] => {
  const displayItems: DisplayItem[] = []
  const { id, items, label } = group
  if (!items) {
    throw new Error('Source control group is missing an items property')
  }
  const { length } = items
  const isExpanded = expandedGroups[id] ?? false
  const type = isExpanded ? DirentType.DirectoryExpanded : DirentType.Directory
  const icon = isExpanded ? 'ChevronDown' : 'ChevronRight'
  if (length > 0) {
    displayItems.push({
      badgeCount: length,
      decorationIcon: '',
      decorationIconTitle: '',
      decorationStrikeThrough: false,
      detail: '',
      file: '',
      groupId: id,
      icon,
      label,
      posInSet: 1,
      setSize: 1,
      type,
    })
  }
  if (isExpanded) {
    for (let i = 0; i < length; i++) {
      const item = items[i]
      const { file } = item
      const baseName = Workspace.pathBaseName(file)
      const folderName = file.slice(0, -baseName.length - 1)
      displayItems.push(getFileDisplayItem(item, id, iconDefinitions, i + 1, length, folderName))
    }
  }
  return displayItems
}
