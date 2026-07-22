import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'

const progressDom: readonly VirtualDomNode[] = [
  {
    childCount: 1,
    className: ClassNames.ProgressContainer,
    type: VirtualDomElements.Div,
  },
  {
    childCount: 0,
    className: ClassNames.Progress,
    type: VirtualDomElements.Div,
  },
]

export const getProgressVirtualDom = (): readonly VirtualDomNode[] => {
  return progressDom
}
