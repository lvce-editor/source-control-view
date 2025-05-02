import type { ActionButton } from '../ActionButton/ActionButton.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as EmptySourceControlButtons from '../EmptySourceControlButtons/EmptySourceControlButton.ts'
import * as GetIconVirtualDom from '../GetIconVirtualDom/GetIconVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const addButtons = (dom: any[], buttons: readonly ActionButton[]): void => {
  if (buttons === EmptySourceControlButtons.emptySourceControlButtons) {
    return
  }
  dom[0].childCount += buttons.length
  for (const button of buttons) {
    const { icon, label } = button
    dom.push(
      {
        type: VirtualDomElements.Button,
        className: ClassNames.SourceControlButton,
        title: label,
        ariaLabel: label,
        childCount: 1,
      },
      GetIconVirtualDom.getIconVirtualDom(icon, VirtualDomElements.Span),
    )
  }
}
