import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getSourceControlInputDom } from '../GetSourceControlInputVirtualDom/GetSourceControlInputVirtualDom.ts'

export const getSourceControlHeaderVirtualDom = (inputPlaceholder: string, inputMessage: string): readonly VirtualDomNode[] => {
  const inputDom = getSourceControlInputDom(inputPlaceholder, inputMessage)
  return [
    {
      childCount: inputMessage ? 2 : 1,
      className: ClassNames.SourceControlHeader,
      type: VirtualDomElements.Div,
    },
    ...inputDom,
  ]
}
