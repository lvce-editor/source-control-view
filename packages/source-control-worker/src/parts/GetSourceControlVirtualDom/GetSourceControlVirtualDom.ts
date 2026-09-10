import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActionButton } from '../ActionButton/ActionButton.ts'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetProgressVirtualDom from '../GetProgressVirtualDom/GetProgressVirtualDom.ts'
import * as GetSourceControlButtonVirtualDom from '../GetSourceControlButtonVirtualDom/GetSourceControlButtonVirtualDom.ts'
import * as GetSourceControlHeaderVirtualDom from '../GetSourceControlHeaderVirtualDom/GetSourceControlHeaderVirtualDom.ts'
import * as GetSourceControlListVirtualDom from '../GetSourceControlListVirtualDom/GetSourceControlListVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const className = MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.SourceControl)

const messageNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.Message,
  paddingLeft: '20px',
  paddingRight: '20px',
  type: VirtualDomElements.Div,
}

export const getSourceControlVirtualDom = (
  items: readonly VisibleItem[],
  buttons: readonly ActionButton[],
  disabled: boolean,
  placeholder: string,
  inputMessage: string,
  message: string,
  loading: boolean,
  scrollBarHeight: number,
  scrollBarActive: boolean,
): readonly VirtualDomNode[] => {
  const dom: VirtualDomNode[] = [
    {
      ariaBusy: loading,
      childCount: (message ? 1 : 2 + buttons.length) + (loading ? 1 : 0),
      className: className,
      onContextMenu: DomEventListenerFunctions.HandleContextMenu,
      onMouseOver: DomEventListenerFunctions.HandleMouseOver,
      onWheel: DomEventListenerFunctions.HandleWheel,
      tabIndex: 0,
      type: VirtualDomElements.Div,
    },
  ]
  if (loading) {
    dom.push(...GetProgressVirtualDom.getProgressVirtualDom())
  }
  if (message) {
    dom.push(messageNode, text(message))
    return dom
  }
  dom.push(...GetSourceControlHeaderVirtualDom.getSourceControlHeaderVirtualDom(placeholder, inputMessage))
  for (const button of buttons) {
    dom.push(...GetSourceControlButtonVirtualDom.getSourceControlButtonVirtualDom(button, disabled))
  }
  dom.push(...GetSourceControlListVirtualDom.getSourceControlListVirtualDom(items, scrollBarHeight, scrollBarActive))
  return dom
}
