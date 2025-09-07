import type { ActionsCache } from '../ActionsCache/ActionsCache.ts'
import type { DisplayItem } from '../DisplayItem/DisplayItem.ts'
import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { Group } from '../Group/Group.ts'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'

export interface SourceControlState {
  readonly actionsCache: ActionsCache
  readonly allGroups: readonly Group[]
  readonly deltaY: number
  readonly enabledProviderIds: readonly string[]
  readonly expandedGroups: Record<string, boolean>
  readonly fileIconCache: FileIconCache
  readonly finalDeltaY: number
  readonly gitRoot: string
  readonly handleOffset: number
  readonly headerHeight: number
  readonly height: number
  readonly id: number
  readonly index: readonly any[]
  readonly inputPlaceholder: string
  readonly inputValue: string
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
  readonly visibleItems: readonly VisibleItem[]
  readonly width: number
  readonly workingTree: readonly any[]
  readonly workspacePath: string
  readonly inputSource: number
  readonly x: number
  readonly y: number
}
