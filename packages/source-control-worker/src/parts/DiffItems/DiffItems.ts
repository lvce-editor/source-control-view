import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as DiffType from '../DiffType/DiffType.ts'

export const diffType = DiffType.RenderItems

export const isEqual = (oldState: SourceControlState, newState: SourceControlState): boolean => {
  return oldState.allGroups === newState.allGroups && oldState.displayItems === newState.displayItems
}
