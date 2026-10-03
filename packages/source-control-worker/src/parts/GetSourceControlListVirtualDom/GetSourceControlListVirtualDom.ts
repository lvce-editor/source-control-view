import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { WhenExpression } from '@lvce-editor/constants'
import { AriaRoles } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getScrollBarVirtualDom } from '../GetScrollBarVirtualDom/GetScrollBarVirtualDom.ts'
import * as GetSourceControlItemVirtualDom from '../GetSourceControlItemVirtualDom/GetSourceControlItemVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as TabIndex from '../TabIndex/TabIndex.ts'

const listClassName = MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.List)
const itemsClassName = MergeClassNames.mergeClassNames(ClassNames.ListItems, ClassNames.SourceControlItems)

const getAriaActiveDescendant = (focusedIndex: number, focusedItem: VisibleItem | undefined): string | undefined => {
  if (focusedIndex < 0) {
    return undefined
  }
  if (focusedItem?.selected) {
    return 'TreeItemActive'
  }
  return 'SourceControlTreeItemFocused'
}

export const getSourceControlListVirtualDom = (
  items: readonly VisibleItem[],
  scrollBarHeight: number,
  scrollBarActive: boolean,
  focus: number,
  focusedIndex: number,
): readonly VirtualDomNode[] => {
  const scrollBarDom = getScrollBarVirtualDom(scrollBarHeight, scrollBarActive)
  const activeIndex = focus === WhenExpression.FocusSourceControlList ? focusedIndex : -1
  const focusedItem = items.find((item) => item.focused)
  const ariaActiveDescendant = getAriaActiveDescendant(activeIndex, focusedItem)
  return [
    {
      childCount: scrollBarDom.length > 0 ? 2 : 1,
      className: listClassName,
      type: VirtualDomElements.Div,
    },
    {
      ariaActiveDescendant,
      childCount: items.length,
      className: activeIndex === -1 && focus === WhenExpression.FocusSourceControlList ? MergeClassNames.mergeClassNames(itemsClassName, 'FocusOutline') : itemsClassName,
      onBlur: DomEventListenerFunctions.HandleListBlur,
      onClick: DomEventListenerFunctions.HandleClickAt,
      onFocus: DomEventListenerFunctions.HandleListFocus,
      onPointerOut: DomEventListenerFunctions.HandleMouseOutAt,
      onPointerOver: DomEventListenerFunctions.HandleMouseOverAt,
      role: AriaRoles.Tree,
      tabIndex: TabIndex.Focusable,
      type: VirtualDomElements.Div,
    },
    ...items.flatMap(GetSourceControlItemVirtualDom.getSourceControlItemVirtualDom),
    ...scrollBarDom,
  ]
}
