import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActionButton } from '../ActionButton/ActionButton.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetIconVirtualDom from '../GetIconVirtualDom/GetIconVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getSourceControlButtonVirtualDom = (button: ActionButton, disabled: boolean): readonly VirtualDomNode[] => {
  const { icon, id, label } = button
  return [
    {
      childCount: 1,
      className: MergeClassNames.mergeClassNames(ClassNames.SplitButton, disabled ? ClassNames.SplitButtonDisabled : ''),
      type: VirtualDomElements.Div,
    },
    {
      ariaDisabled: disabled,
      childCount: 2,
      className: MergeClassNames.mergeClassNames(ClassNames.SplitButtonContent, disabled ? ClassNames.SplitButtonContentDisabled : ''),
      name: label,
      tabIndex: disabled ? -1 : 0,
      title: id,
      type: VirtualDomElements.Div,
      ...(!disabled && { onClick: DomEventListenerFunctions.HandleClickSourceControlButton }),
    },
    {
      ...GetIconVirtualDom.getIconVirtualDom(icon, VirtualDomElements.Span),
      name: label,
    },
    text(label),
  ]
}
