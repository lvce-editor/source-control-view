import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActionButton } from '../ActionButton/ActionButton.ts'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetSourceControlButtonVirtualDom from '../GetSourceControlButtonVirtualDom/GetSourceControlButtonVirtualDom.ts'
import * as GetSourceControlHeaderVirtualDom from '../GetSourceControlHeaderVirtualDom/GetSourceControlHeaderVirtualDom.ts'
import * as GetSourceControlListVirtualDom from '../GetSourceControlListVirtualDom/GetSourceControlListVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const className = MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.SourceControl)

export const getSourceControlVirtualDom = (
  items: readonly VisibleItem[],
  sourceControlButtons: readonly ActionButton[],
  sourceControlButtonsDisabled: boolean,
  inputPlaceholder: string,
  inputMessage: string,
  unavailableMessage: string,
): readonly VirtualDomNode[] => {
  const content = unavailableMessage
    ? [
        {
          childCount: 1,
          className: ClassNames.Message,
          type: VirtualDomElements.Div,
        },
        text(unavailableMessage),
      ]
    : [
        ...GetSourceControlHeaderVirtualDom.getSourceControlHeaderVirtualDom(inputPlaceholder, inputMessage),
        ...sourceControlButtons.flatMap<VirtualDomNode>((button) =>
          GetSourceControlButtonVirtualDom.getSourceControlButtonVirtualDom(button, sourceControlButtonsDisabled),
        ),
        ...GetSourceControlListVirtualDom.getSourceControlListVirtualDom(items),
      ]
  const dom = [
    {
      childCount: unavailableMessage ? 1 : 2 + sourceControlButtons.length,
      className: className,
      onContextMenu: DomEventListenerFunctions.HandleContextMenu,
      onMouseOver: DomEventListenerFunctions.HandleMouseOver,
      // onMouseOut: DomEventListenerFunctions.HandleMouseOut,
      onWheel: DomEventListenerFunctions.HandleWheel,
      tabIndex: 0,
      type: VirtualDomElements.Div,
    },
    ...content,
  ]
  return dom
}
