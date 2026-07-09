import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getSourceControlUnavailableVirtualDom = (message: string): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: ClassNames.Message,
      type: VirtualDomElements.Div,
    },
    text(message),
  ]
}
