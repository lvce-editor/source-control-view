import { ViewletCommand } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as GetSourceControlDom from '../GetSourceControlVirtualDom/GetSourceControlVirtualDom.ts'

export const renderItems = (oldState: SourceControlState, newState: SourceControlState): any => {
  const { id, initial, inputMessage, inputPlaceholder, sourceControlButtons, visibleItems } = newState
  if (initial) {
    return [ViewletCommand.SetDom2, id, []]
  }
  const dom = GetSourceControlDom.getSourceControlVirtualDom(visibleItems, sourceControlButtons, inputPlaceholder, inputMessage)
  return [ViewletCommand.SetDom2, id, dom]
}
