import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetSourceControlItemsVirtualDom from '../GetSourceControlItemsVirtualDom/GetSourceControlItemsVirtualDom.js'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getSourceControlVirtualDom = (items: readonly any[], splitButtonEnabled: boolean): readonly VirtualDomNode[] => {
  const dom = [
    {
      type: VirtualDomElements.Div,
      className: 'Viewlet SourceControl',
      tabIndex: 0,
      onClick: DomEventListenerFunctions.HandleClick,
      onContextMenu: DomEventListenerFunctions.HandleContextMenu,
      onMouseOver: DomEventListenerFunctions.HandleMouseOver,
      onMouseOut: DomEventListenerFunctions.HandleMouseOut,
      onWheel: DomEventListenerFunctions.HandleWheel,
      childCount: splitButtonEnabled ? 3 : 2,
    },
    ...GetSourceControlItemsVirtualDom.getSourceControlItemsVirtualDom(items, splitButtonEnabled),
  ]
  return dom
}
