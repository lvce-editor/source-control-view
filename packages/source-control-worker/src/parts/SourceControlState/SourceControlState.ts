import type { DisplayItem } from '../DisplayItem/DisplayItem.ts'
import type { Group } from '../Group/Group.ts'

export interface SourceControlState {
  readonly allGroups: readonly Group[]
  readonly buttonIndex: number
  readonly buttons: readonly any[]
  readonly deltaY: number
  readonly displayItems: readonly DisplayItem[]
  readonly enabledProviderIds: readonly string[]
  readonly fileIconCache: any
  readonly finalDeltaY: number
  readonly gitRoot: string
  readonly handleOffset: number
  readonly height: number
  readonly icons: readonly string[]
  readonly id: number
  readonly index: readonly any[]
  readonly inputValue: string
  readonly isExpanded: boolean
  readonly itemHeight: number
  readonly items: readonly any[]
  readonly maxLineY: number
  readonly merge: readonly any[]
  readonly minimumSliderSize: number
  readonly minLineY: number
  readonly providerId: string
  readonly root: string
  readonly scrollBarActive: boolean
  readonly scrollBarHeight: number
  readonly splitButtonEnabled: boolean
  readonly untracked: readonly any[]
  readonly width: number
  readonly workingTree: readonly any[]
  readonly workspacePath: string
  readonly x: number
  readonly y: number
  readonly headerHeight: number
}
