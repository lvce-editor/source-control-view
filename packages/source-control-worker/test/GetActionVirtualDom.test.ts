import { test, expect } from '@jest/globals'
import * as ActionType from '../src/parts/ActionType/ActionType.ts'
import { getActionVirtualDom } from '../src/parts/GetActionVirtualDom/GetActionVirtualDom.ts'

test('getActionVirtualDom - Button action', () => {
  const action = {
    type: ActionType.Button,
    text: 'Click me',
    onClick: (): void => {},
  }
  const result = getActionVirtualDom(action)
  expect(result).toBeDefined()
})

test('getActionVirtualDom - unknown action type', () => {
  const action = {
    type: 'unknown',
  }
  const result = getActionVirtualDom(action)
  expect(result).toEqual([])
})
