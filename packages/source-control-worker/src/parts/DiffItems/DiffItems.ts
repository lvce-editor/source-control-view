import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as DiffType from '../DiffType/DiffType.ts'

export const diffType = DiffType.RenderItems

export const isEqual = (oldState: SourceControlState, newState: SourceControlState): boolean => {
  return (
    oldState.allGroups === newState.allGroups &&
    oldState.deltaY === newState.deltaY &&
    oldState.items === newState.items &&
    oldState.maxLineY === newState.maxLineY &&
    oldState.minLineY === newState.minLineY &&
    oldState.visibleItems === newState.visibleItems
  )
}
