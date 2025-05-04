import { test, expect } from '@jest/globals'
import * as AriaRoles from '../src/parts/AriaRoles/AriaRoles.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getFileIconVirtualDom } from '../src/parts/GetFileIconVirtualDom/GetFileIconVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

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
