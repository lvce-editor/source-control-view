export interface SourceControlState {
  readonly allGroups: readonly any[]
  readonly buttonIndex: number
  readonly buttons: readonly any[]
  readonly displayItems: readonly any[]
  readonly enabledProviderIds: readonly string[]
  readonly finalDeltaY: number
  readonly gitRoot: string
  readonly height: number
  readonly id: number
  readonly inputValue: string
  readonly isExpanded: boolean
  readonly itemHeight: number
  readonly items: readonly any[]
  readonly maxLineY: number
  readonly minimumSliderSize: number
  readonly providerId: string
  readonly root: string
  readonly scrollBarHeight: number
  readonly splitButtonEnabled: boolean
  readonly workspacePath: string
  readonly x: number
  readonly y: number
  readonly width: number
  readonly deltaY: number
  readonly minLineY: number
  readonly fileIconCache: any
  readonly icons: readonly string[]
  readonly handleOffset: number
  readonly scrollBarActive: boolean
  readonly merge: readonly any[]
  readonly index: readonly any[]
  readonly untracked: readonly any[]
  readonly workingTree: readonly any[]
}
