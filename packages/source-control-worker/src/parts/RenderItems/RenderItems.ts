import { ViewletCommand } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as GetSourceControlDom from '../GetSourceControlVirtualDom/GetSourceControlVirtualDom.ts'

export const renderItems = (oldState: SourceControlState, newState: SourceControlState): any => {
  const { visibleItems, splitButtonEnabled, inputPlaceholder, id } = newState
  const dom = GetSourceControlDom.getSourceControlVirtualDom(visibleItems, splitButtonEnabled, inputPlaceholder)
  return [ViewletCommand.SetDom2, id, dom]
}
