import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'

export const getIndents = (oldIndents: readonly number[], visibleItems: readonly VisibleItem[]): readonly number[] => {
  if (oldIndents.length === visibleItems.length && visibleItems.every((item, index) => item.indent === oldIndents[index])) {
    return oldIndents
  }
  return visibleItems.map((item) => item.indent)
}
