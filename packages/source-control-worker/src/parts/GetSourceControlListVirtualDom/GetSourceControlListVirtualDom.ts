import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetSourceControlItemVirtualDom from '../GetSourceControlItemVirtualDom/GetSourceControlItemVirtualDom.ts'

export const getSourceControlListVirtualDom = (items: readonly VisibleItem[]): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SourceControlItems,
      role: AriaRoles.Tree,
      childCount: items.length,
      onClick: DomEventListenerFunctions.HandleClickAt,
      onPointerOver: DomEventListenerFunctions.HandleMouseOverAt,
      onPointerOut: DomEventListenerFunctions.HandleMouseOutAt,
    },
    ...items.flatMap(GetSourceControlItemVirtualDom.getSourceControlItemVirtualDom),
  ]
}
