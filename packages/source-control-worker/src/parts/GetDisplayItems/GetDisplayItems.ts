import type { DisplayItem } from '../DisplayItem/DisplayItem.ts'
import type { Group } from '../Group/Group.ts'
import { getDisplayItemsGroup } from '../GetDisplayItemsGroup/GetDisplayItemsGroup.ts'

export const getDisplayItems = (allGroups: readonly Group[], expandedGroups: Record<string, boolean>): readonly DisplayItem[] => {
  const displayItems = []
  for (const group of allGroups) {
    const groupDisplayItems = getDisplayItemsGroup(group, expandedGroups)
    displayItems.push(...groupDisplayItems)
  }
  return displayItems
}
