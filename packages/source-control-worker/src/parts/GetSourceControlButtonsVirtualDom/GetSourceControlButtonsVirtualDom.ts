import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { ActionButton } from '../ActionButton/ActionButton.ts'
import * as GetSourceControlButtonVirtualDom from '../GetSourceControlButtonVirtualDom/GetSourceControlButtonVirtualDom.ts'

export const getSourceControlButtonsVirtualDom = (buttons: readonly ActionButton[], disabled: boolean): readonly VirtualDomNode[] => {
  return buttons.flatMap((button) => GetSourceControlButtonVirtualDom.getSourceControlButtonVirtualDom(button, disabled))
}
