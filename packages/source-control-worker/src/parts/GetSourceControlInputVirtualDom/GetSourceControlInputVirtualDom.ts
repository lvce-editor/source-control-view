import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActionButton } from '../ActionButton/ActionButton.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getInputActionsVirtualDom } from '../GetInputActionsVirtualDom/GetInputActionsVirtualDom.ts'
import * as InputName from '../InputName/InputName.ts'
import * as ViewletSourceControlStrings from '../SourceControlStrings/SourceControlStrings.ts'

const messageNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.Message,
  type: VirtualDomElements.Div,
}

const inputWrapperNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.ViewSourceControlInput,
  type: VirtualDomElements.Div,
}

export const getSourceControlInputDom = (inputPlaceholder: string, inputMessage: string, inputActions: readonly ActionButton[] = []): readonly VirtualDomNode[] => {
  const dom: VirtualDomNode[] = [
    { ...inputWrapperNode, childCount: 1 + inputActions.length },
    {
      ariaLabel: ViewletSourceControlStrings.sourceControlInput(),
      autocapitalize: 'off',
      autocorrect: 'off',
      childCount: 0,
      className: mergeClassNames(ClassNames.InputBox, 'MultilineInputBox'),
      name: InputName.SourceControlInput,
      onFocus: DomEventListenerFunctions.HandleFocus,
      onInput: DomEventListenerFunctions.HandleInput,
      placeholder: inputPlaceholder,
      spellcheck: false,
      type: VirtualDomElements.TextArea,
    },
    ...getInputActionsVirtualDom(inputActions),
  ]
  if (inputMessage) {
    dom.push(messageNode, {
      text: inputMessage,
      type: VirtualDomElements.Text,
    })
  }
  return dom
}
