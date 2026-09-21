export interface SavedState {
  readonly deltaY: number
  readonly expandedGroups: Record<string, boolean>
  readonly history: readonly string[]
  readonly inputValue: string
  readonly maxLineY: number
  readonly minLineY: number
  readonly root: string
}
