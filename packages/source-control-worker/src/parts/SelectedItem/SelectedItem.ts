import type { Group } from '../Group/Group.ts'

export interface SelectedItem {
  readonly file: string
  readonly groupId: string
}

export const isSelectedItemValid = (selectedItem: SelectedItem | undefined, groups: readonly Group[]): boolean => {
  if (!selectedItem) {
    return true
  }
  const group = groups.find((group) => group.id === selectedItem.groupId)
  return Boolean(group?.items.some((item) => item.file === selectedItem.file))
}
