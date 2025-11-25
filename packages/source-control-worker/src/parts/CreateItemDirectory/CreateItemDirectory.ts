import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { DirentType } from '@lvce-editor/constants'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetBadgeVirtualDom from '../GetBadgeVirtualDom/GetBadgeVirtualDom.ts'
import { getButtonsVirtualDom } from '../GetButtonsVirtualDom/GetButtonsVirtualDom.ts'
import { getLabelClassName } from '../GetLabelClassName/GetLabelClassName.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as TreeItemPadding from '../TreeItemPadding/TreeItemPadding.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const createItemDirectory = (item: VisibleItem): readonly VirtualDomNode[] => {
  const { posInSet, setSize, icon, label, badgeCount, decorationStrikeThrough, type, buttons } = item
  const labelClassName = getLabelClassName(decorationStrikeThrough)
  const buttonsDom = getButtonsVirtualDom(buttons)
  const hasButtons = buttons.length
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.TreeItem,
      role: AriaRoles.TreeItem,
      ariaExpanded: type === DirentType.DirectoryExpanded,
      ariaPosInSet: posInSet,
      ariaSetSize: setSize,
      childCount: 3 + (hasButtons ? 1 : 0),
      paddingLeft: TreeItemPadding.PaddingLeft, // TODO classname for indent / padding
      paddingRight: TreeItemPadding.PaddingRight,
    },
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.Chevron, `MaskIcon${icon}`),
      childCount: 0,
    },
    {
      type: VirtualDomElements.Div,
      className: labelClassName,
      childCount: 1,
    },
    text(label),
    ...buttonsDom,
    ...GetBadgeVirtualDom.getBadgeVirtualDom(badgeCount),
  ]
}
