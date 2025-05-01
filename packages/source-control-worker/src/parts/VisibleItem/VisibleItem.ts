import type { DisplayItem } from '../DisplayItem/DisplayItem.ts'

export interface VisibleItem extends DisplayItem {
  readonly buttons: readonly any[]
}
