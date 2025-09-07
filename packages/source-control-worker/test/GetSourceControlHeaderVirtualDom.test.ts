import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetSourceControlHeaderVirtualDom from '../src/parts/GetSourceControlHeaderVirtualDom/GetSourceControlHeaderVirtualDom.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as ViewletSourceControlStrings from '../src/parts/SourceControlStrings/SourceControlStrings.ts'

test('getSourceControlHeaderVirtualDom', () => {
  const result = GetSourceControlHeaderVirtualDom.getSourceControlHeaderVirtualDom()
  expect(result).toEqual([
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
  ])
})
