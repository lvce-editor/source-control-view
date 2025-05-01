import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as DiffType from '../DiffType/DiffType.ts'

export const diffType = DiffType.RenderItems

export const isEqual = (oldState: SourceControlState, newState: SourceControlState): boolean => {
  return (
    oldState.allGroups === newState.allGroups &&
    oldState.displayItems === newState.displayItems &&
    oldState.items === newState.items &&
    oldState.minLineY === newState.minLineY &&
    oldState.maxLineY === newState.maxLineY &&
    oldState.deltaY === newState.deltaY &&
    oldState.buttonIndex === newState.buttonIndex &&
    oldState.buttons === newState.buttons
  )
}
