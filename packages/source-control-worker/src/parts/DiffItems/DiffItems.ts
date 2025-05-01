import * as DiffType from '../DiffType/DiffType.ts'
import { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const diffType = DiffType.RenderItems

export const isEqual = (oldState: SourceControlState, newState: SourceControlState): boolean => {
  return oldState.allGroups === newState.allGroups && oldState.displayItems === newState.displayItems
}
