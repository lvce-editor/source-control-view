import { DirentType, ViewMode } from '@lvce-editor/constants'
import type { DisplayItem } from '../DisplayItem/DisplayItem.ts'
import type { Group } from '../Group/Group.ts'
import type { ViewMode as SourceControlViewMode } from '../ViewMode/ViewMode.ts'
import { getActualDecorationIcon } from '../GetActualDecorationIcon/GetActualDecorationIcon.ts'
import * as IconTheme from '../IconTheme/IconTheme.ts'
import * as Workspace from '../Workspace/Workspace.ts'

export const getDirectoryKey = (groupId: string, directory: string): string => `${groupId}\u{0000}${directory}`

const getFileDisplayItem = (
  item: Readonly<any>,
  groupId: string,
  depth: number | undefined,
  posInSet: number,
  setSize: number,
  iconDefinitions: readonly string[],
  detail = '',
): DisplayItem => {
  const { file, icon, iconTitle, strikeThrough } = item
  const baseName = Workspace.pathBaseName(file)
  const actualDecorationIcon = getActualDecorationIcon(iconDefinitions, icon)
  const displayItem = {
    badgeCount: 0,
    decorationIcon: actualDecorationIcon,
    decorationIconTitle: iconTitle,
    decorationStrikeThrough: strikeThrough,
    depth,
    detail,
    file,
    groupId,
    icon: IconTheme.getFileIcon({ name: file }),
    label: baseName,
    posInSet,
    setSize,
    type: DirentType.File,
  } as Omit<DisplayItem, 'depth'> & { depth?: number }
  if (depth !== undefined) {
    displayItem.depth = depth
  }
  return displayItem
}

const getRelativePath = (file: string, parent: string): string => {
  if (parent) {
    return file.slice(parent.length + 1)
  }
  const start = file.startsWith('/') ? 1 : 0
  return file.slice(start)
}

const getDirectoryPath = (file: string, parent: string, name: string): string => {
  if (parent) {
    return `${parent}/${name}`
  }
  return file.startsWith('/') ? `/${name}` : name
}

const getTreeChildren = (items: readonly any[], parent: string): Map<string, any[]> => {
  const children = new Map<string, any[]>()
  for (const item of items) {
    const name = getRelativePath(item.file, parent).split('/', 1)[0]
    const childItems = children.get(name) || []
    childItems.push(item)
    children.set(name, childItems)
  }
  return children
}

const getTreeDisplayItems = (
  items: readonly any[],
  groupId: string,
  expandedGroups: Readonly<Record<string, boolean>>,
  iconDefinitions: readonly string[],
  parent: string,
  depth: number,
  baseItem: DisplayItem,
): readonly DisplayItem[] => {
  const displayItems: DisplayItem[] = []
  const children = getTreeChildren(items, parent)
  const setSize = children.size
  let index = 0
  for (const [name, childItems] of children) {
    const posInSet = ++index
    const firstFile = childItems[0].file
    const relative = getRelativePath(firstFile, parent)
    if (!relative.includes('/')) {
      displayItems.push(getFileDisplayItem(childItems[0], groupId, depth, posInSet, setSize, iconDefinitions))
      continue
    }
    const directory = getDirectoryPath(firstFile, parent, name)
    const key = getDirectoryKey(groupId, directory)
    const isExpanded = expandedGroups[key] ?? true
    displayItems.push({
      ...baseItem,
      badgeCount: 0,
      depth,
      directory,
      icon: isExpanded ? 'ChevronDown' : 'ChevronRight',
      label: Workspace.pathBaseName(directory),
      posInSet,
      setSize,
      type: isExpanded ? DirentType.DirectoryExpanded : DirentType.Directory,
    })
    if (isExpanded) {
      displayItems.push(...getTreeDisplayItems(childItems, groupId, expandedGroups, iconDefinitions, directory, depth + 1, baseItem))
    }
  }
  return displayItems
}

export const getDisplayItemsGroup = (
  group: Group,
  expandedGroups: Readonly<Record<string, boolean>>,
  iconDefinitions: readonly string[],
  viewMode: SourceControlViewMode = ViewMode.List,
): readonly DisplayItem[] => {
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
    if (viewMode === ViewMode.Tree) {
      displayItems.push(...getTreeDisplayItems(items, id, expandedGroups, iconDefinitions, '', 0, displayItems[0]))
      return displayItems
    }
    for (let i = 0; i < length; i++) {
      const item = items[i]
      const { file } = item
      const baseName = Workspace.pathBaseName(file)
      const folderName = file.slice(0, -baseName.length - 1)
      displayItems.push(getFileDisplayItem(item, id, undefined, i + 1, length, iconDefinitions, folderName))
    }
  }
  return displayItems
}
