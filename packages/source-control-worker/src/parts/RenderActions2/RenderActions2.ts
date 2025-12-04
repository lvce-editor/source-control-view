import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { Action } from '../Action/Action.ts'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as GetActionsVirtualDom from '../GetActionsVirtualDom/GetActionsVirtualDom.ts'

export const renderActions = (state: SourceControlState): readonly VirtualDomNode[] => {
  const actions: readonly Action[] = []
  const dom = GetActionsVirtualDom.getActionsVirtualDom(actions)
  return dom
}
