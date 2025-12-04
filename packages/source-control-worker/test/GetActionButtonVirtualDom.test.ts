import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActionButton } from '../src/parts/ActionButton/ActionButton.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetActionButtonVirtualDom from '../src/parts/GetActionButtonVirtualDom/GetActionButtonVirtualDom.ts'

test('getActionButtonVirtualDom', () => {
  const action: ActionButton = {
    id: 'test-action',
    icon: 'test-icon',
    command: 'test-command',
    label: 'test-label',
  }
  const result = GetActionButtonVirtualDom.getActionButtonVirtualDom(action)
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Button,
    className: ClassNames.IconButton,
    title: 'test-action',
    name: 'test-label',
    childCount: 1,
  })
})
