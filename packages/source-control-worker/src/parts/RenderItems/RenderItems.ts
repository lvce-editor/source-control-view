import { ViewletCommand } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as GetSourceControlDom from '../GetSourceControlVirtualDom/GetSourceControlVirtualDom.ts'

export const renderItems = (oldState: SourceControlState, newState: SourceControlState): any => {
  const {
    focus,
    focusedIndex,
    id,
    initial,
    inProgress,
    inputActions,
    inputMessage,
    inputPlaceholder,
    items,
    loading,
    providerUnavailableMessage,
    scrollBarActive,
    scrollBarHeight,
    sourceControlButtons,
    visibleItems,
    width,
    workspaceUri,
  } = newState
  if (initial) {
    return [ViewletCommand.SetDom2, id, []]
  }
  const dom = GetSourceControlDom.getSourceControlVirtualDom(
    visibleItems,
    sourceControlButtons,
    items.length === 0,
    inputPlaceholder,
    inputMessage,
    loading ? '' : providerUnavailableMessage,
    loading,
    scrollBarHeight,
    scrollBarActive,
    inputActions,
    inProgress,
    focus,
    focusedIndex,
    !workspaceUri && !loading && !inProgress,
    width > 450,
  )
  return [ViewletCommand.SetDom2, id, dom]
}
