import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputName from '../InputName/InputName.ts'
import * as ViewletSourceControlStrings from '../SourceControlStrings/SourceControlStrings.ts'

const messageNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.Message,
  type: VirtualDomElements.Div,
}

export const getSourceControlInputDom = (inputPlaceholder: string, inputMessage: string): readonly VirtualDomNode[] => {
  const dom: VirtualDomNode[] = [
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
  ]
  if (inputMessage) {
    dom.push(messageNode, {
      text: inputMessage,
      type: VirtualDomElements.Text,
    })
  }
  return dom
}
