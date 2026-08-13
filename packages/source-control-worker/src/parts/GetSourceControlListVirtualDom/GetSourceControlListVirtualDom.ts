import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getScrollBarVirtualDom } from '../GetScrollBarVirtualDom/GetScrollBarVirtualDom.ts'
import * as GetSourceControlItemVirtualDom from '../GetSourceControlItemVirtualDom/GetSourceControlItemVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

export const getSourceControlListVirtualDom = (items: readonly VisibleItem[], scrollBarHeight: number, scrollBarActive: boolean): readonly VirtualDomNode[] => {
  const scrollBarDom = getScrollBarVirtualDom(scrollBarHeight, scrollBarActive)
  return [
    {
      childCount: scrollBarDom.length > 0 ? 2 : 1,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.List),
      type: VirtualDomElements.Div,
    },
    {
      childCount: items.length,
      className: ClassNames.SourceControlItems,
      onClick: DomEventListenerFunctions.HandleClickAt,
      onPointerOut: DomEventListenerFunctions.HandleMouseOutAt,
      onPointerOver: DomEventListenerFunctions.HandleMouseOverAt,
      role: AriaRoles.Tree,
      type: VirtualDomElements.Div,
    },
    ...items.flatMap(GetSourceControlItemVirtualDom.getSourceControlItemVirtualDom),
    ...scrollBarDom,
  ]
}
