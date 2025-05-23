export interface SavedState {
  readonly root: string
  readonly minLineY: number
  readonly maxLineY: number
  readonly deltaY: number
  readonly expandedGroups: Record<string, boolean>
}
