import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as SourceControlStates from '../SourceControlStates/SourceControlStates.ts'

export const create2 = (id: number, uri: string, x: number, y: number, width: number, height: number, workspacePath: string): void => {
  const state: SourceControlState = {
    actionsCache: Object.create(null),
    allGroups: [],
    deltaY: 0,
    enabledProviderIds: [],
    fileIconCache: Object.create(null),
    finalDeltaY: 0,
    gitRoot: '',
    handleOffset: 0,
    headerHeight: 40, // TODO
    height,
    id,
    index: [],
    inputValue: '',
    isExpanded: true,
    itemHeight: 20,
    items: [],
    maxLineY: 0,
    merge: [],
    minimumSliderSize: 20,
    minLineY: 0,
    providerId: '',
    root: '',
    scrollBarActive: false,
    scrollBarHeight: 0,
    splitButtonEnabled: false,
    untracked: [],
    visibleItems: [],
    width,
    workingTree: [],
    workspacePath,
    x,
    y,
  }
  SourceControlStates.set(id, state, state)
}
