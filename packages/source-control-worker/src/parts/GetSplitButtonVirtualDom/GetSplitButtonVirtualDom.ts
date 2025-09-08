import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getSplitButtonVirtualDom = (hasItems: boolean, splitButtonEnabled: boolean, buttonText: string): readonly VirtualDomNode[] => {
  if (!splitButtonEnabled || !hasItems) {
    return []
  }
  return [
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.SplitButton, hasItems ? '' : ClassNames.SplitButtonDisabled),
      childCount: 3,
    },
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.SplitButtonContent, hasItems ? '' : ClassNames.SplitButtonContentDisabled),
      childCount: 1,
      tabIndex: 0,
    },
    text(buttonText),
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SplitButtonSeparator,
      childCount: 0,
    },
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.SplitButtonDropDown, hasItems ? '' : ClassNames.SplitButtonDropDownDisabled),
      childCount: 1,
      tabIndex: 0,
    },
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.MaskIcon, ClassNames.MaskIconChevronDown),
      childCount: 0,
    },
  ]
}
