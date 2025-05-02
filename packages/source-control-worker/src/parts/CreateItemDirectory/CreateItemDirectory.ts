import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DirentType from '../DirentType/DirentType.ts'
import * as GetBadgeVirtualDom from '../GetBadgeVirtualDom/GetBadgeVirtualDom.ts'
import { getButtonsVirtualDom } from '../GetButtonsVirtualDom/GetButtonsVirtualDom.ts'
import { getLabelClassName } from '../GetLabelClassName/GetLabelClassName.ts'
import * as TreeItemPadding from '../TreeItemPadding/TreeItemPadding.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
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
      childCount: 3 + hasButtons ? 1 : 0,
      paddingLeft: TreeItemPadding.PaddingLeft,
      paddingRight: TreeItemPadding.PaddingRight,
    },
    {
      type: VirtualDomElements.Div,
      className: `${ClassNames.Chevron} MaskIcon${icon}`,
      childCount: 0,
    },
    {
      type: VirtualDomElements.Div,
      className: labelClassName,
      childCount: 1,
    },
    text(label),
    ...buttonsDom,
    ...GetBadgeVirtualDom.getBadgeVirtualDom(ClassNames.SourceControlBadge, badgeCount),
  ]
}
