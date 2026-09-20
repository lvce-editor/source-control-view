import { DirentType, ViewMode } from '@lvce-editor/constants'
import type { DisplayItem } from '../DisplayItem/DisplayItem.ts'
import type { Group } from '../Group/Group.ts'
import type { ViewMode as SourceControlViewMode } from '../ViewMode/ViewMode.ts'
import { getActualDecorationIcon } from '../GetActualDecorationIcon/GetActualDecorationIcon.ts'
import * as IconTheme from '../IconTheme/IconTheme.ts'
import * as Workspace from '../Workspace/Workspace.ts'

export const getDirectoryKey = (groupId: string, directory: string): string => `${groupId}\u{0000}${directory}`

interface TreeDirectory {
  readonly children: TreeNode[]
  readonly directory: string
  readonly kind: 'directory'
}

interface TreeFile {
  readonly children: readonly TreeNode[]
  readonly item: any
  readonly kind: 'file'
}

type TreeNode = TreeDirectory | TreeFile

interface ReadonlyTreeDirectory {
  readonly children: readonly ReadonlyTreeNode[]
  readonly directory: string
  readonly kind: 'directory'
}

interface ReadonlyTreeFile {
  readonly children: readonly ReadonlyTreeNode[]
  readonly item: Readonly<any>
  readonly kind: 'file'
}

type ReadonlyTreeNode = ReadonlyTreeDirectory | ReadonlyTreeFile

const getPathParts = (file: string): readonly string[] => file.split('/').filter(Boolean)

const getDirectoryPath = (file: string, parts: readonly string[], index: number): string => {
  const prefix = file.startsWith('/') ? '/' : ''
  return `${prefix}${parts.slice(0, index + 1).join('/')}`
}

const getTree = (items: readonly Readonly<any>[]): readonly TreeNode[] => {
  const root: TreeNode[] = []
  for (const item of items) {
    const parts = getPathParts(item.file)
    let children = root
    for (let i = 0; i < parts.length - 1; i++) {
      const directory = getDirectoryPath(item.file, parts, i)
      let directoryNode = children.find((candidate: ReadonlyTreeNode): candidate is TreeDirectory => candidate.kind === 'directory' && candidate.directory === directory)
      if (!directoryNode) {
        directoryNode = {
          children: [],
          directory,
          kind: 'directory',
        }
        children.push(directoryNode)
      }
      const { children: directoryChildren } = directoryNode
      children = directoryChildren
    }
    children.push({
      children: [],
      item,
      kind: 'file',
    })
  }
  return root
}

const getFileDisplayItem = (item: Readonly<any>, groupId: string, depth: number, posInSet: number, setSize: number, iconDefinitions: readonly string[]): DisplayItem => {
  const { file, icon, iconTitle, strikeThrough } = item
  const baseName = Workspace.pathBaseName(file)
  const actualDecorationIcon = getActualDecorationIcon(iconDefinitions, icon)
  return {
    badgeCount: 0,
    decorationIcon: actualDecorationIcon,
    decorationIconTitle: iconTitle,
    decorationStrikeThrough: strikeThrough,
    depth,
    detail: '',
    file,
    groupId,
    icon: IconTheme.getFileIcon({ name: file }),
    label: baseName,
    posInSet,
    setSize,
    type: DirentType.File,
  }
}

const getTreeDisplayItems = (
  nodes: readonly ReadonlyTreeNode[],
  groupId: string,
  expandedGroups: Readonly<Record<string, boolean>>,
  iconDefinitions: readonly string[],
  depth: number,
): readonly DisplayItem[] => {
  const displayItems: DisplayItem[] = []
  const setSize = nodes.length
  for (const [index, node] of nodes.entries()) {
    const posInSet = index + 1
    if (node.kind === 'file') {
      displayItems.push(getFileDisplayItem(node.item, groupId, depth, posInSet, setSize, iconDefinitions))
      continue
    }
    const key = getDirectoryKey(groupId, node.directory)
    const isExpanded = expandedGroups[key] ?? true
    displayItems.push({
      badgeCount: 0,
      decorationIcon: '',
      decorationIconTitle: '',
      decorationStrikeThrough: false,
      depth,
      detail: '',
      directory: node.directory,
      file: '',
      groupId,
      icon: isExpanded ? 'ChevronDown' : 'ChevronRight',
      label: Workspace.pathBaseName(node.directory),
      posInSet,
      setSize,
      type: isExpanded ? DirentType.DirectoryExpanded : DirentType.Directory,
    })
    if (isExpanded) {
      displayItems.push(...getTreeDisplayItems(node.children, groupId, expandedGroups, iconDefinitions, depth + 1))
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
      displayItems.push(...getTreeDisplayItems(getTree(items), id, expandedGroups, iconDefinitions, 0))
      return displayItems
    }
    for (let i = 0; i < length; i++) {
      const item = items[i]
      const { file, icon, iconTitle, strikeThrough } = item
      const baseName = Workspace.pathBaseName(file)
      const folderName = file.slice(0, -baseName.length - 1)
      const actualDecorationIcon = getActualDecorationIcon(iconDefinitions, icon)
      displayItems.push({
        badgeCount: 0,
        decorationIcon: actualDecorationIcon,
        decorationIconTitle: iconTitle,
        decorationStrikeThrough: strikeThrough,
        detail: folderName,
        file,
        groupId: id,
        icon: IconTheme.getFileIcon({ name: file }),
        label: baseName,
        posInSet: i + 1,
        setSize: length,
        type: DirentType.File,
      })
    }
  }
  return displayItems
}
