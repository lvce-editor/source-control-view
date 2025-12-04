import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ActionType from '../src/parts/ActionType/ActionType.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getActionVirtualDom } from '../src/parts/GetActionVirtualDom/GetActionVirtualDom.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as MaskIcon from '../src/parts/MaskIcon/MaskIcon.ts'

test('getActionVirtualDom - Button action', () => {
  const action = {
    type: ActionType.Button as 1,
    id: 'test-action',
    name: InputName.ViewAsTree,
    icon: MaskIcon.Check,
    command: 'test-command',
  }
  const result = getActionVirtualDom(action)
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Button,
    className: ClassNames.IconButton,
    title: 'test-action',
    name: InputName.ViewAsTree,
    childCount: 1,
  })
})

test('getActionVirtualDom - unknown action type', () => {
  const action = {
    type: 999 as 1,
    id: 'test',
    name: InputName.ViewAsTree,
    icon: MaskIcon.Check,
    command: 'test',
  }
  const result = getActionVirtualDom(action)
  expect(result).toEqual([])
})
