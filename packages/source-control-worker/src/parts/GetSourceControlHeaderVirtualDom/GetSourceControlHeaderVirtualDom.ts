import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputName from '../InputName/InputName.ts'
import * as ViewletSourceControlStrings from '../SourceControlStrings/SourceControlStrings.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getSourceControlHeaderVirtualDom = (): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SourceControlHeader,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Input,
      className: ClassNames.InputBox,
      ariaLabel: ViewletSourceControlStrings.sourceControlInput(),
      autocapitalize: 'off',
      autocorrect: 'off',
      childCount: 0,
      name: InputName.SourceControlInput,
      onFocus: DomEventListenerFunctions.HandleFocus,
      onInput: DomEventListenerFunctions.HandleInput,
      placeholder: ViewletSourceControlStrings.messageEnterToCommitOnMaster(),
      spellcheck: false,
    },
  ]
}
