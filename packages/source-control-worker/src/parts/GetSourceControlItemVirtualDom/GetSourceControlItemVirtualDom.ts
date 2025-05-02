import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import { createItemDirectory } from '../CreateItemDirectory/CreateItemDirectory.ts'
import { createItemOther } from '../CreateItemOther/CreateItemOther.ts'
import * as DirentType from '../DirentType/DirentType.ts'

export const getSourceControlItemVirtualDom = (item: VisibleItem): readonly VirtualDomNode[] => {
  switch (item.type) {
    case DirentType.DirectoryExpanded:
    case DirentType.Directory:
      return createItemDirectory(item)
    default:
      return createItemOther(item)
  }
}
