import type { DisplayItem } from '../DisplayItem/DisplayItem.ts'
import { getDisplayItemsGroup } from '../GetDisplayItemsGroup/GetDisplayItemsGroup.ts'

export const getDisplayItems = (allGroups: readonly any[], isExpanded: boolean): readonly DisplayItem[] => {
  const displayItems = []
  for (const group of allGroups) {
    const groupDisplayItems = getDisplayItemsGroup(group, isExpanded)
    displayItems.push(...groupDisplayItems)
  }
  return displayItems
}
