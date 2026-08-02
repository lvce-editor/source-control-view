import { ViewletCommand } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as GetSourceControlDom from '../GetSourceControlVirtualDom/GetSourceControlVirtualDom.ts'

export const renderItems = (oldState: SourceControlState, newState: SourceControlState): any => {
  const {
    id,
    initial,
    inputMessage,
    inputPlaceholder,
    items,
    loadErrorMessage,
    loading,
    providerUnavailableMessage,
    scrollBarActive,
    scrollBarHeight,
    sourceControlButtons,
    visibleItems,
  } = newState
  if (initial) {
    return [ViewletCommand.SetDom2, id, []]
  }
  const message = loading ? '' : loadErrorMessage || providerUnavailableMessage
  const dom = GetSourceControlDom.getSourceControlVirtualDom(
    visibleItems,
    sourceControlButtons,
    items.length === 0,
    inputPlaceholder,
    inputMessage,
    message,
    loading,
    scrollBarHeight,
    scrollBarActive,
  )
  return [ViewletCommand.SetDom2, id, dom]
}
