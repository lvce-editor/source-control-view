import { ViewletCommand } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as GetSourceControlDom from '../GetSourceControlVirtualDom/GetSourceControlVirtualDom.ts'
import * as SourceControlStrings from '../SourceControlStrings/SourceControlStrings.ts'

export const renderItems = (oldState: SourceControlState, newState: SourceControlState): any => {
  const { enabledProviderIds, id, initial, inputMessage, inputPlaceholder, items, sourceControlButtons, visibleItems } = newState
  if (initial) {
    return [ViewletCommand.SetDom2, id, []]
  }
  const unavailableMessage = enabledProviderIds.length === 0 ? SourceControlStrings.noSourceControlProvider() : ''
  const dom = GetSourceControlDom.getSourceControlVirtualDom(visibleItems, sourceControlButtons, items.length === 0, inputPlaceholder, inputMessage, unavailableMessage)
  return [ViewletCommand.SetDom2, id, dom]
}
