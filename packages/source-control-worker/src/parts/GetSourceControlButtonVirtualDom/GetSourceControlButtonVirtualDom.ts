import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActionButton } from '../ActionButton/ActionButton.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetIconVirtualDom from '../GetIconVirtualDom/GetIconVirtualDom.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getSourceControlButtonVirtualDom = (button: ActionButton): readonly VirtualDomNode[] => {
  const { icon, id, label } = button
  return [
    {
      childCount: 1,
      className: ClassNames.SplitButton,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: ClassNames.SplitButtonContent,
      name: label,
      onClick: DomEventListenerFunctions.HandleClickSourceControlButton,
      tabIndex: 0,
      title: id,
      type: VirtualDomElements.Div,
    },
    GetIconVirtualDom.getIconVirtualDom(icon, VirtualDomElements.Span),
    text(label),
  ]
}
