import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

export const getScrollBarVirtualDom = (scrollBarHeight: number, scrollBarActive: boolean): readonly VirtualDomNode[] => {
  if (scrollBarHeight <= 0) {
    return []
  }
  return [
    {
      childCount: 1,
      className: MergeClassNames.mergeClassNames(ClassNames.ScrollBar, ClassNames.ScrollBarSmall),
      onPointerDown: DomEventListenerFunctions.HandleScrollBarPointerDown,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: MergeClassNames.mergeClassNames(ClassNames.ScrollBarThumb, scrollBarActive ? ClassNames.ScrollBarThumbActive : ''),
      type: VirtualDomElements.Div,
    },
  ]
}
