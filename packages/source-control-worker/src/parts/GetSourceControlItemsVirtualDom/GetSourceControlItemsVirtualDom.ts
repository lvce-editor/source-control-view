import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetSourceControlHeaderVirtualDom from '../GetSourceControlHeaderVirtualDom/GetSourceControlHeaderVirtualDom.ts'
import * as GetSourceControlItemVirtualDom from '../GetSourceControlItemVirtualDom/GetSourceControlItemVirtualDom.ts'
import * as GetSplitButtonVirtualDom from '../GetSplitButtonVirtualDom/GetSplitButtonVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getSourceControlItemsVirtualDom = (items: readonly any[], splitButtonEnabled: boolean): readonly VirtualDomNode[] => {
  const hasItems = items.length > 0
  return [
    ...GetSourceControlHeaderVirtualDom.getSourceControlHeaderVirtualDom(),
    ...GetSplitButtonVirtualDom.getSplitButtonVirtualDom(hasItems, splitButtonEnabled, 'Commit'),
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SourceControlItems,
      role: AriaRoles.Tree,
      childCount: items.length,
    },
    ...items.flatMap(GetSourceControlItemVirtualDom.getSourceControlItemVirtualDom),
  ]
}
