import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { isEqual } from '../src/parts/DiffItems/DiffItems.ts'
import { getSourceControlVirtualDom } from '../src/parts/GetSourceControlVirtualDom/GetSourceControlVirtualDom.ts'

test('operation progress keeps the input and file list visible', () => {
  const dom = getSourceControlVirtualDom([], [], false, 'Commit message', '', '', false, 0, false, [], true)
  expect(dom[0].ariaBusy).toBe(true)
  expect(dom[0].childCount).toBe(3)
  expect(dom.some((node) => node.className === 'ProgressContainer')).toBe(true)
  expect(dom.length).toBeGreaterThan(3)
})

test('completing an operation schedules a render and removes progress', () => {
  const state = createDefaultState()
  expect(isEqual(state, { ...state, operationInProgress: true })).toBe(false)
  const dom = getSourceControlVirtualDom([], [], false, '', '', '', false, 0, false)
  expect(dom[0].ariaBusy).toBe(false)
  expect(dom.some((node) => node.className === 'ProgressContainer')).toBe(false)
})
