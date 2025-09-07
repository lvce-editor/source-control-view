import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getFileIconVirtualDom } from '../src/parts/GetFileIconVirtualDom/GetFileIconVirtualDom.ts'

test('getFileIconVirtualDom', () => {
  const icon = 'test-icon.png'
  const result = getFileIconVirtualDom(icon)
  expect(result).toEqual({
    type: VirtualDomElements.Img,
    className: ClassNames.FileIcon,
    src: icon,
    role: AriaRoles.None,
    childCount: 0,
  })
})
