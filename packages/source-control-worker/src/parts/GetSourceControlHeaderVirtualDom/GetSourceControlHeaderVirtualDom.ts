import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActionButton } from '../ActionButton/ActionButton.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getSourceControlInputDom } from '../GetSourceControlInputVirtualDom/GetSourceControlInputVirtualDom.ts'

export const getSourceControlHeaderVirtualDom = (
  inputPlaceholder: string,
  inputMessage: string,
  inputActions: readonly ActionButton[] = [],
): readonly VirtualDomNode[] => {
  const inputDom = getSourceControlInputDom(inputPlaceholder, inputMessage, inputActions)
  return [
    {
      childCount: inputMessage ? 2 : 1,
      className: ClassNames.SourceControlHeader,
      type: VirtualDomElements.Div,
    },
    ...inputDom,
  ]
}
