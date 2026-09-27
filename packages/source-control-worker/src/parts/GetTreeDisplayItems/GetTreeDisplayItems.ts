import { DirentType } from '@lvce-editor/constants'
import type { DisplayItem } from '../DisplayItem/DisplayItem.ts'
import { getActualDecorationIcon } from '../GetActualDecorationIcon/GetActualDecorationIcon.ts'
import { getDirectoryKey } from '../GetDisplayItemsGroup/GetDisplayItemsGroup.ts'
import * as IconTheme from '../IconTheme/IconTheme.ts'
import * as Workspace from '../Workspace/Workspace.ts'

const getFileDisplayItem = (item: Readonly<any>, groupId: string, depth: number, iconDefinitions: readonly string[]): DisplayItem => {
  const { file, icon, iconTitle, strikeThrough } = item
  return {
    badgeCount: 0,
    decorationIcon: getActualDecorationIcon(iconDefinitions, icon),
    decorationIconTitle: iconTitle,
    decorationStrikeThrough: strikeThrough,
    depth,
    detail: '',
    file,
    groupId,
    icon: IconTheme.getFileIcon({ name: file }),
    label: Workspace.pathBaseName(file),
    posInSet: 1,
    setSize: 1,
    type: DirentType.File,
  }
}

const addDirectoryDisplayItems = (
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- this helper incrementally builds the display rows and directory set
  displayItems: DisplayItem[],
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- this helper incrementally builds the display rows and directory set
  directories: Set<string>,
  parts: readonly string[],
  groupId: string,
  expandedGroups: Readonly<Record<string, boolean>>,
  baseItem: DisplayItem,
  file: string,
): boolean => {
  let directory = file.startsWith('/') ? '/' : ''
  for (let i = 0; i < parts.length - 1; i++) {
    directory += `${directory && directory !== '/' ? '/' : ''}${parts[i]}`
    const key = getDirectoryKey(groupId, directory)
    const isExpanded = expandedGroups[key] ?? true
    if (!directories.has(key)) {
      directories.add(key)
      displayItems.push({
        ...baseItem,
        badgeCount: 0,
        depth: i,
        directory,
        icon: isExpanded ? 'ChevronDown' : 'ChevronRight',
        label: Workspace.pathBaseName(directory),
        posInSet: 1,
        setSize: 1,
        type: isExpanded ? DirentType.DirectoryExpanded : DirentType.Directory,
      })
    }
    if (!isExpanded) {
      return false
    }
  }
  return true
}

export const getTreeDisplayItems = (
  items: readonly any[],
  groupId: string,
  expandedGroups: Readonly<Record<string, boolean>>,
  iconDefinitions: readonly string[],
  baseItem: DisplayItem,
): readonly DisplayItem[] => {
  const displayItems: DisplayItem[] = []
  const directories = new Set<string>()
  const sortedItems = items.toSorted((a, b) => a.file.localeCompare(b.file))
  for (const item of sortedItems) {
    const parts = item.file.split('/').filter(Boolean)
    if (addDirectoryDisplayItems(displayItems, directories, parts, groupId, expandedGroups, baseItem, item.file)) {
      displayItems.push(getFileDisplayItem(item, groupId, parts.length - 1, iconDefinitions))
    }
  }
  return displayItems
}
