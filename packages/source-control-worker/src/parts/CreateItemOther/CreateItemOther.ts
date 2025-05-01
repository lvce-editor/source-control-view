import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import { addButtons } from '../AddButtons/AddButtons.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetFileIconVirtualDom from '../GetFileIconVirtualDom/GetFileIconVirtualDom.ts'
import * as GetIconVirtualDom from '../GetIconVirtualDom/GetIconVirtualDom.ts'
import { getLabelClassName } from '../GetLabelClassName/GetLabelClassName.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const chevron: VirtualDomNode = {
  type: VirtualDomElements.Div,
  className: ClassNames.Chevron,
  childCount: 1,
}

const getIconsDom = (icon: string, fileIcon: string): readonly VirtualDomNode[] => {
  if (icon === ClassNames.ChevronRight) {
    return [chevron, GetIconVirtualDom.getIconVirtualDom(icon)]
  }

  return [GetFileIconVirtualDom.getFileIconVirtualDom(fileIcon)]
}

export const createItemOther = (item: VisibleItem): readonly VirtualDomNode[] => {
  const { posInSet, setSize, icon, file, label, decorationIcon, decorationIconTitle, decorationStrikeThrough, detail, buttons, fileIcon } = item
  const labelClassName = getLabelClassName(decorationStrikeThrough)
  const dom: VirtualDomNode[] = []
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
    ...getIconsDom(icon, fileIcon),
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
