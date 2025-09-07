import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getSourceControlInputDom } from '../GetSourceControlInputVirtualDom/GetSourceControlInputVirtualDom.ts'

export const getSourceControlHeaderVirtualDom = (inputPlaceholder: string): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SourceControlHeader,
      childCount: 1,
    },
    ...getSourceControlInputDom(inputPlaceholder),
  ]
}
