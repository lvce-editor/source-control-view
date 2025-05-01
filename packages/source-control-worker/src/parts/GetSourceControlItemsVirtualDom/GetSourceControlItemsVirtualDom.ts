import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetSourceControlItemVirtualDom from '../GetSourceControlItemVirtualDom/GetSourceControlItemVirtualDom.ts'
import * as GetSplitButtonVirtualDom from '../GetSplitButtonVirtualDom/GetSplitButtonVirtualDom.ts'
import * as ViewletSourceControlStrings from '../SourceControlStrings/SourceControlStrings.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getSourceControlItemsVirtualDom = (items: readonly any[], splitButtonEnabled: boolean): readonly VirtualDomNode[] => {
  const dom = []
  dom.push(
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SourceControlHeader,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Input,
      className: ClassNames.InputBox,
      spellcheck: false,
      autocapitalize: 'off',
      autocorrect: 'off',
      placeholder: ViewletSourceControlStrings.messageEnterToCommitOnMaster(),
      ariaLabel: ViewletSourceControlStrings.sourceControlInput(),
      childCount: 0,
      onInput: 'handleInput',
      onFocus: 'handleFocus',
    },
  )
  if (splitButtonEnabled) {
    const hasItems = items.length > 0
    dom.push(...GetSplitButtonVirtualDom.getSourceControlItemsVirtualDom(hasItems, 'Commit'))
  }
  dom.push(
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SourceControlItems,
      role: AriaRoles.Tree,
      childCount: items.length,
    },
    ...items.flatMap(GetSourceControlItemVirtualDom.getSourceControlItemVirtualDom),
  )
  return dom
}
