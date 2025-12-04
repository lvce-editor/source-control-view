import { test, expect } from '@jest/globals'
import * as ActionType from '../src/parts/ActionType/ActionType.ts'
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
  expect(result).toBeDefined()
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
