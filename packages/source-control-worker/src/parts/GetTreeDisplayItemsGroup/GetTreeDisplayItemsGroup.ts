import { DirentType } from '@lvce-editor/constants'
import type { DisplayItem } from '../DisplayItem/DisplayItem.ts'
import type { Group } from '../Group/Group.ts'
import { getTreeDisplayItems } from '../GetTreeDisplayItems/GetTreeDisplayItems.ts'

export const getTreeDisplayItemsGroup = (group: Group, expandedGroups: Readonly<Record<string, boolean>>, iconDefinitions: readonly string[]): readonly DisplayItem[] => {
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
    displayItems.push(...getTreeDisplayItems(items, id, expandedGroups, iconDefinitions, displayItems[0]))
  }
  return displayItems
}
