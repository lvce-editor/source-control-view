import { ViewMode } from '@lvce-editor/constants'
import type { DisplayItem } from '../DisplayItem/DisplayItem.ts'
import type { Group } from '../Group/Group.ts'
import type { ViewMode as SourceControlViewMode } from '../ViewMode/ViewMode.ts'
import { getDisplayItemsGroup } from '../GetDisplayItemsGroup/GetDisplayItemsGroup.ts'

export function getDisplayItems(
  allGroups: readonly Group[],
  expandedGroups: Readonly<Record<string, boolean>>,
  iconDefinitions: readonly string[],
  viewMode: typeof ViewMode.Tree,
): Promise<readonly DisplayItem[]>
export function getDisplayItems(
  allGroups: readonly Group[],
  expandedGroups: Readonly<Record<string, boolean>>,
  iconDefinitions: readonly string[],
  viewMode?: typeof ViewMode.List,
): readonly DisplayItem[]
export function getDisplayItems(
  allGroups: readonly Group[],
  expandedGroups: Readonly<Record<string, boolean>>,
  iconDefinitions: readonly string[],
  viewMode: SourceControlViewMode,
): readonly DisplayItem[] | Promise<readonly DisplayItem[]>
export function getDisplayItems(
  allGroups: readonly Group[],
  expandedGroups: Readonly<Record<string, boolean>>,
  iconDefinitions: readonly string[],
  viewMode: SourceControlViewMode = ViewMode.List,
): readonly DisplayItem[] | Promise<readonly DisplayItem[]> {
  if (viewMode === ViewMode.Tree) {
    // eslint-disable-next-line unicorn/prefer-await -- the list path remains synchronous for callers
    return import('../GetTreeDisplayItemsGroup/GetTreeDisplayItemsGroup.ts').then(({ getTreeDisplayItemsGroup }) => {
      const displayItems: DisplayItem[] = []
      for (const group of allGroups) {
        displayItems.push(...getTreeDisplayItemsGroup(group, expandedGroups, iconDefinitions))
      }
      return displayItems
    })
  }
  const displayItems = []
  for (const group of allGroups) {
    const groupDisplayItems = getDisplayItemsGroup(group, expandedGroups, iconDefinitions)
    displayItems.push(...groupDisplayItems)
  }
  return displayItems
}
