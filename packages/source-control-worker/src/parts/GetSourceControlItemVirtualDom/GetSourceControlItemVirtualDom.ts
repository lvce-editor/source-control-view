import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DirentType from '../DirentType/DirentType.ts'
import * as EmptySourceControlButtons from '../EmptySourceControlButtons/EmptySourceControlButton.ts'
import * as GetBadgeVirtualDom from '../GetBadgeVirtualDom/GetBadgeVirtualDom.ts'
import * as GetFileIconVirtualDom from '../GetFileIconVirtualDom/GetFileIconVirtualDom.ts'
import * as GetIconVirtualDom from '../GetIconVirtualDom/GetIconVirtualDom.ts'
import * as TreeItemPadding from '../TreeItemPadding/TreeItemPadding.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const getLabelClassName = (decorationStrikeThrough: boolean): string => {
  let className = ClassNames.Label + ' Grow'
  if (decorationStrikeThrough) {
    className += ` ${ClassNames.StrikeThrough}`
  }
  return className
}

const addButtons = (dom: any[], buttons: any[]): void => {
  if (buttons === EmptySourceControlButtons.emptySourceControlButtons) {
    return
  }
  dom[0].childCount += buttons.length
  for (const button of buttons) {
    const { icon, label } = button
    dom.push(
      {
        type: VirtualDomElements.Button,
        className: ClassNames.SourceControlButton,
        title: label,
        ariaLabel: label,
        childCount: 1,
      },
      GetIconVirtualDom.getIconVirtualDom(icon, VirtualDomElements.Span),
    )
  }
}

const createItemDirectory = (item: any): readonly VirtualDomNode[] => {
  const { posInSet, setSize, icon, label, badgeCount, decorationStrikeThrough, type, buttons } = item
  const labelClassName = getLabelClassName(decorationStrikeThrough)
  const dom = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.TreeItem,
      role: AriaRoles.TreeItem,
      ariaExpanded: type === DirentType.DirectoryExpanded,
      ariaPosInSet: posInSet,
      ariaSetSize: setSize,
      childCount: 3,
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
  ]
  addButtons(dom, buttons)
  dom.push(...GetBadgeVirtualDom.getBadgeVirtualDom(ClassNames.SourceControlBadge, badgeCount))
  return dom
}

const createItemOther = (item: any): readonly VirtualDomNode[] => {
  const { posInSet, setSize, icon, file, label, decorationIcon, decorationIconTitle, decorationStrikeThrough, detail, buttons } = item
  const labelClassName = getLabelClassName(decorationStrikeThrough)
  /**
   * @type {any[]}
   */
  const dom = []
  dom.push(
    {
      type: VirtualDomElements.Div,
      className: ClassNames.TreeItem,
      role: AriaRoles.TreeItem,
      ariaPosInSet: posInSet,
      ariaSetSize: setSize,
      title: file,
      childCount: 3,
      paddingLeft: '1rem',
      paddingRight: '12px',
    },
    ...(icon === ClassNames.ChevronRight
      ? [
          {
            type: VirtualDomElements.Div,
            className: ClassNames.Chevron,
            childCount: 1,
          },
          GetIconVirtualDom.getIconVirtualDom(icon),
        ]
      : [GetFileIconVirtualDom.getFileIconVirtualDom(icon)]),
  )
  const labelDom = {
    type: VirtualDomElements.Div,
    className: labelClassName,
    childCount: 1,
  }
  dom.push(labelDom, text(label))

  if (detail) {
    labelDom.childCount++
    dom.push(
      {
        type: VirtualDomElements.Span,
        className: ClassNames.LabelDetail,
        childCount: 1,
      },
      text(detail),
    )
  }
  addButtons(dom, buttons)
  dom.push({
    type: VirtualDomElements.Img,
    className: ClassNames.DecorationIcon,
    title: decorationIconTitle,
    src: decorationIcon,
    childCount: 0,
  })
  return dom
}

export const getSourceControlItemVirtualDom = (item: any): readonly VirtualDomNode[] => {
  switch (item.type) {
    case DirentType.DirectoryExpanded:
    case DirentType.Directory:
      return createItemDirectory(item)
    default:
      return createItemOther(item)
  }
}
