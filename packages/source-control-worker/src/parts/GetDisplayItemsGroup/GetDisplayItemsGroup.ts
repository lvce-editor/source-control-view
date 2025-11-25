import { DirentType } from '@lvce-editor/constants'
import type { DisplayItem } from '../DisplayItem/DisplayItem.ts'
import type { Group } from '../Group/Group.ts'
import { getActualDecorationIcon } from '../GetActualDecorationIcon/GetActualDecorationIcon.ts'
import * as IconTheme from '../IconTheme/IconTheme.ts'
import * as Workspace from '../Workspace/Workspace.ts'

export const getDisplayItemsGroup = (group: Group, expandedGroups: Readonly<Record<string, boolean>>, iconDefinitions: readonly string[]): readonly DisplayItem[] => {
  const displayItems: DisplayItem[] = []
  const { id, label, items } = group
  if (!items) {
    throw new Error('Source control group is missing an items property')
  }
  const { length } = items
  const isExpanded = expandedGroups[id] || false
  const type = isExpanded ? DirentType.DirectoryExpanded : DirentType.Directory
  const icon = isExpanded ? 'ChevronDown' : 'ChevronRight'
  if (length > 0) {
    displayItems.push({
      file: '',
      label,
      detail: '',
      posInSet: 1,
      setSize: 1,
      icon,
      decorationIcon: '',
      decorationIconTitle: '',
      decorationStrikeThrough: false,
      type,
      badgeCount: length,
      groupId: id,
    })
  }
  if (isExpanded) {
    for (let i = 0; i < length; i++) {
      const item = items[i]
      const { file, icon, iconTitle, strikeThrough } = item
      const baseName = Workspace.pathBaseName(file)
      const folderName = file.slice(0, -baseName.length - 1)
      const actualDecorationIcon = getActualDecorationIcon(iconDefinitions, icon)
      displayItems.push({
        file,
        label: baseName,
        detail: folderName,
        posInSet: i + 1,
        setSize: length,
        icon: IconTheme.getFileIcon({ name: file }),
        decorationIcon: actualDecorationIcon,
        decorationIconTitle: iconTitle,
        decorationStrikeThrough: strikeThrough,
        type: DirentType.File,
        badgeCount: 0,
        groupId: id,
      })
    }
  }
  return displayItems
}
