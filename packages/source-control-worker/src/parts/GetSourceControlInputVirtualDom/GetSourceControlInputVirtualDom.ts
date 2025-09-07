import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputName from '../InputName/InputName.ts'
import * as ViewletSourceControlStrings from '../SourceControlStrings/SourceControlStrings.ts'

export const getSourceControlInputDom = (inputPlaceholder: string): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.TextArea,
      className: mergeClassNames(ClassNames.InputBox, 'MultilineInputBox'),
      ariaLabel: ViewletSourceControlStrings.sourceControlInput(),
      autocapitalize: 'off',
      autocorrect: 'off',
      childCount: 0,
      name: InputName.SourceControlInput,
      onFocus: DomEventListenerFunctions.HandleFocus,
      onInput: DomEventListenerFunctions.HandleInput,
      placeholder: inputPlaceholder,
      spellcheck: false,
    },
  ]
}
