import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'

const progressContainerNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.ProgressContainer,
  type: VirtualDomElements.Div,
}

const progressNode: VirtualDomNode = {
  childCount: 0,
  className: ClassNames.Progress,
  type: VirtualDomElements.Div,
}

export const getProgressVirtualDom = (): readonly VirtualDomNode[] => {
  return [progressContainerNode, progressNode]
}
