import { test, expect } from '@jest/globals'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetActionButtonVirtualDom from '../src/parts/GetActionButtonVirtualDom/GetActionButtonVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

test('getActionButtonVirtualDom', () => {
  const action = {
    id: 'test-action',
    icon: 'test-icon',
    command: 'test-command',
  }
  const result = GetActionButtonVirtualDom.getActionButtonVirtualDom(action)
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Button,
    className: ClassNames.IconButton,
    title: 'test-action',
    'data-command': 'test-command',
    childCount: 1,
  })
})
