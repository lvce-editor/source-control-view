import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActionButton } from '../ActionButton/ActionButton.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getIconVirtualDom } from '../GetIconVirtualDom/GetIconVirtualDom.ts'

export const getInputActionsVirtualDom = (actions: readonly ActionButton[]): readonly VirtualDomNode[] => {
  return actions.flatMap((action, index): readonly VirtualDomNode[] => [
    {
      ariaLabel: action.label,
      childCount: 1,
      className: 'SourceControlInputAction',
      name: String(index),
      onClick: DomEventListenerFunctions.HandleInputActionClick,
      title: action.label,
      type: VirtualDomElements.Button,
    },
    getIconVirtualDom(action.icon, VirtualDomElements.Span),
  ])
}
