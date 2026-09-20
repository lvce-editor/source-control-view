import { ViewMode } from '@lvce-editor/constants'
import type { DisplayItem } from '../DisplayItem/DisplayItem.ts'
import type { Group } from '../Group/Group.ts'
import type { ViewMode as SourceControlViewMode } from '../ViewMode/ViewMode.ts'
import { getDisplayItemsGroup } from '../GetDisplayItemsGroup/GetDisplayItemsGroup.ts'

export const getDisplayItems = (
  allGroups: readonly Group[],
  expandedGroups: Readonly<Record<string, boolean>>,
  iconDefinitions: readonly string[],
  viewMode: SourceControlViewMode = ViewMode.List,
): readonly DisplayItem[] => {
  const displayItems = []
  for (const group of allGroups) {
    const groupDisplayItems = getDisplayItemsGroup(group, expandedGroups, iconDefinitions, viewMode)
    displayItems.push(...groupDisplayItems)
  }
  return displayItems
}
