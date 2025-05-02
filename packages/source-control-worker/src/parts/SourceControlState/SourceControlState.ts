import type { ActionButton } from '../ActionButton/ActionButton.ts'
import type { ActionsCache } from '../ActionsCache/ActionsCache.ts'
import type { DisplayItem } from '../DisplayItem/DisplayItem.ts'
import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { Group } from '../Group/Group.ts'

export interface SourceControlState {
  readonly allGroups: readonly Group[]
  readonly buttonIndex: number
  readonly buttons: readonly ActionButton[]
  readonly deltaY: number
  readonly enabledProviderIds: readonly string[]
  readonly fileIconCache: FileIconCache
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
  readonly items: readonly DisplayItem[]
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
  readonly actionsCache: ActionsCache
}
