import { expect, test } from '@jest/globals'
import type { DisplayItem } from '../src/parts/DisplayItem/DisplayItem.ts'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleMouseOver } from '../src/parts/HandleMouseOver/HandleMouseOver.ts'

test('handleMouseOver - returns state when index is out of bounds', async (): Promise<void> => {
  const state: SourceControlState = createDefaultState()
  const result = await handleMouseOver(state, 0)
  expect(result).toBe(state)
})

test('handleMouseOver - returns state when index is negative', async (): Promise<void> => {
  const state: SourceControlState = createDefaultState()
  const result = await handleMouseOver(state, -1)
  expect(result).toBe(state)
})

test('handleMouseOver - returns new state when item exists', async (): Promise<void> => {
  const item: DisplayItem = {
    file: 'test.ts',
    label: 'test.ts',
    detail: '',
    posInSet: 1,
    setSize: 1,
    icon: '',
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    type: 0,
    badgeCount: 0,
    groupId: 'group1',
  }
  const state: SourceControlState = {
    ...createDefaultState(),
    items: [item],
  }
  const result = await handleMouseOver(state, 0)
  expect(result).not.toBe(state)
  expect(result).toEqual({
    ...state,
  })
})

test('handleMouseOver - returns new state when multiple items exist', async (): Promise<void> => {
  const item1: DisplayItem = {
    file: 'test1.ts',
    label: 'test1.ts',
    detail: '',
    posInSet: 1,
    setSize: 2,
    icon: '',
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    type: 0,
    badgeCount: 0,
    groupId: 'group1',
  }
  const item2: DisplayItem = {
    file: 'test2.ts',
    label: 'test2.ts',
    detail: '',
    posInSet: 2,
    setSize: 2,
    icon: '',
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    type: 0,
    badgeCount: 0,
    groupId: 'group1',
  }
  const state: SourceControlState = {
    ...createDefaultState(),
    items: [item1, item2],
  }
  const result = await handleMouseOver(state, 1)
  expect(result).not.toBe(state)
  expect(result).toEqual({
    ...state,
  })
})
