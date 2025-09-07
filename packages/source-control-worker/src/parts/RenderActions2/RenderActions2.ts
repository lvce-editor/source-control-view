import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetActionsVirtualDom from '../GetActionsVirtualDom/GetActionsVirtualDom.ts'

export const renderActions = (state: SourceControlState): readonly VirtualDomNode[] => {
  const actions: readonly any[] = []
  const dom = GetActionsVirtualDom.getActionsVirtualDom(actions)
  return dom
}
