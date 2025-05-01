export interface SourceControlState {
  readonly id: number
  readonly itemHeight: number
  readonly height: number
  readonly minimumSliderSize: number
  readonly allGroups: readonly any[]
  readonly gitRoot: string
  readonly items: readonly any[]
  readonly enabledProviderIds: readonly string[]
  readonly isExpanded: boolean
  readonly buttons: readonly any[]
  readonly root: string
  readonly maxLineY: number
  readonly scrollBarHeight: number
  readonly finalDeltaY: number
  readonly splitButtonEnabled: boolean
  readonly providerId: string
  readonly buttonIndex: number
  readonly workspacePath: string
  readonly inputValue: string
}
