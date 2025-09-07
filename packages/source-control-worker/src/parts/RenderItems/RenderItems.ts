import { ViewletCommand } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as GetSourceControlDom from '../GetSourceControlVirtualDom/GetSourceControlVirtualDom.ts'

export const renderItems = (oldState: SourceControlState, newState: SourceControlState): any => {
  const visible = newState.visibleItems
  const dom = GetSourceControlDom.getSourceControlVirtualDom(visible, newState.splitButtonEnabled)
  return [ViewletCommand.SetDom2, dom]
}
