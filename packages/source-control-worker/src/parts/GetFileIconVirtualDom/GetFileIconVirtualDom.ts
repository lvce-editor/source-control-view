import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getFileIconVirtualDom = (icon: string): VirtualDomNode => {
  return {
    type: VirtualDomElements.Img,
    className: ClassNames.FileIcon,
    src: icon,
    role: AriaRoles.None,
    childCount: 0,
  }
}
