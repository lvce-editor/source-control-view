import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as SourceControlStates from '../SourceControlStates/SourceControlStates.ts'

export const create2 = (id: number, uri: string, x: number, y: number, width: number, height: number, workspacePath: string): void => {
  const state: SourceControlState = {
    id,
    root: '',
    items: [],
    x,
    y,
    width,
    height,
    deltaY: 0,
    minLineY: 0,
    maxLineY: 0,
    fileIconCache: Object.create(null),
    icons: [],
    finalDeltaY: 0,
    handleOffset: 0,
    scrollBarActive: false,
    scrollBarHeight: 0,
    merge: [],
    index: [],
    untracked: [],
    workingTree: [],
    inputValue: '',
    buttonIndex: -1,
    enabledProviderIds: [],
    isExpanded: true,
    buttons: [],
    providerId: '',
    splitButtonEnabled: false,
    allGroups: [],
    gitRoot: '',
    itemHeight: 20,
    minimumSliderSize: 20,
    workspacePath,
    headerHeight: 40, // TODO
  }
  SourceControlStates.set(id, state, state)
}
