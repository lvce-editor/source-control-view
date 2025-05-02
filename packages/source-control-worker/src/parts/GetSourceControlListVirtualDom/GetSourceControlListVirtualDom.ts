import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetSourceControlItemVirtualDom from '../GetSourceControlItemVirtualDom/GetSourceControlItemVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getSourceControlListVirtualDom = (items: readonly VisibleItem[]): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SourceControlItems,
      role: AriaRoles.Tree,
      childCount: items.length,
      onClick: DomEventListenerFunctions.HandleClickAt,
    },
    ...items.flatMap(GetSourceControlItemVirtualDom.getSourceControlItemVirtualDom),
  ]
}
