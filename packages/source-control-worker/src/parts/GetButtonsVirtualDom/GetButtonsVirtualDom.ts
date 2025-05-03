import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { ActionButton } from '../ActionButton/ActionButton.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as EmptySourceControlButtons from '../EmptySourceControlButtons/EmptySourceControlButton.ts'
import { getButtonVirtualDom } from '../GetButtonVirtualDom/GetButtonVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getButtonsVirtualDom = (buttons: readonly ActionButton[]): readonly VirtualDomNode[] => {
  if (buttons === EmptySourceControlButtons.emptySourceControlButtons) {
    return []
  }
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SourceControlButtons,
      childCount: buttons.length,
    },
    ...buttons.flatMap(getButtonVirtualDom),
  ]
}
