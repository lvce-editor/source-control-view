import { expect, test } from '@jest/globals'
import type { DisplayItem } from '../src/parts/DisplayItem/DisplayItem.ts'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleMouseOut } from '../src/parts/HandleMouseOut/HandleMouseOut.ts'

test('handleMouseOut - returns same state when index is valid', (): void => {
  const state: SourceControlState = createDefaultState()
  const newState = handleMouseOut(state, 0)
  expect(newState).toBe(state)
})

test('handleMouseOut - returns new state when index is -1', (): void => {
  const state: SourceControlState = createDefaultState()
  const newState = handleMouseOut(state, -1)
  expect(newState).not.toBe(state)
  expect(newState).toEqual(state)
})

test('handleMouseOut - returns new state when index is greater than items length', (): void => {
  const state: SourceControlState = createDefaultState()
  const newState = handleMouseOut(state, 10)
  expect(newState).not.toBe(state)
  expect(newState).toEqual(state)
})

test('handleMouseOut - returns same state when index equals items length', (): void => {
  const state: SourceControlState = createDefaultState()
  const newState = handleMouseOut(state, state.items.length)
  expect(newState).toBe(state)
})

test('handleMouseOut - returns same state when index is within valid range', (): void => {
  const items: DisplayItem[] = [
    {
      file: '/test/file1.ts',
      label: 'file1.ts',
      detail: 'modified',
      posInSet: 1,
      setSize: 2,
      icon: '',
      decorationIcon: '',
      decorationIconTitle: '',
      decorationStrikeThrough: false,
      type: 0,
      badgeCount: 0,
      groupId: '',
    },
    {
      file: '/test/file2.ts',
      label: 'file2.ts',
      detail: 'added',
      posInSet: 2,
      setSize: 2,
      icon: '',
      decorationIcon: '',
      decorationIconTitle: '',
      decorationStrikeThrough: false,
      type: 0,
      badgeCount: 0,
      groupId: '',
    },
  ]
  const state: SourceControlState = {
    ...createDefaultState(),
    items,
  }
  const newState = handleMouseOut(state, 1)
  expect(newState).toBe(state)
})
