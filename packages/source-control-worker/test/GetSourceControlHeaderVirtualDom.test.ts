import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetSourceControlHeaderVirtualDom from '../src/parts/GetSourceControlHeaderVirtualDom/GetSourceControlHeaderVirtualDom.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as ViewletSourceControlStrings from '../src/parts/SourceControlStrings/SourceControlStrings.ts'

test('getSourceControlHeaderVirtualDom', () => {
  const inputPlaceholder = 'Test placeholder'
  const result = GetSourceControlHeaderVirtualDom.getSourceControlHeaderVirtualDom(inputPlaceholder)
  expect(result).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SourceControlHeader,
      childCount: 1,
    },
    {
      type: VirtualDomElements.TextArea,
      className: 'InputBox MultilineInputBox',
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
  ])
})
