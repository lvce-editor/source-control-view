import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { ClassNames, mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const className = mergeClassNames(ClassNames.Badge, ClassNames.SourceControlBadge)

const parentNode: VirtualDomNode = {
  type: VirtualDomElements.Div,
  className,
  childCount: 1,
}

export const getBadgeVirtualDom = (count: number): readonly VirtualDomNode[] => {
  return [parentNode, text(`${count}`)]
}
