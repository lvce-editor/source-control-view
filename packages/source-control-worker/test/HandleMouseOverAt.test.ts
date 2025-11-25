import { expect, test } from '@jest/globals'
import type { DisplayItem } from '../src/parts/DisplayItem/DisplayItem.ts'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleMouseOverAt } from '../src/parts/HandleMouseOverAt/HandleMouseOverAt.ts'

test('handleMouseOverAt - with valid index', async (): Promise<void> => {
  const item1: DisplayItem = {
    file: 'item1',
    label: 'Item 1',
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
    file: 'item2',
    label: 'Item 2',
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
    y: 10,
    headerHeight: 40,
    itemHeight: 20,
    items: [item1, item2],
  }
  const eventX = 50
  const eventY = 70
  const result = await handleMouseOverAt(state, eventX, eventY)
  expect(result).toBeDefined()
  expect(result).not.toBe(state)
})

test('handleMouseOverAt - with invalid index (no item)', async (): Promise<void> => {
  const state: SourceControlState = {
    ...createDefaultState(),
    y: 10,
    headerHeight: 40,
    itemHeight: 20,
    items: [],
  }
  const eventX = 50
  const eventY = 70
  const result = await handleMouseOverAt(state, eventX, eventY)
  expect(result).toBe(state)
})

test('handleMouseOverAt - with index out of bounds', async (): Promise<void> => {
  const item1: DisplayItem = {
    file: 'item1',
    label: 'Item 1',
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
    y: 10,
    headerHeight: 40,
    itemHeight: 20,
    items: [item1],
  }
  const eventX = 50
  const eventY = 200
  const result = await handleMouseOverAt(state, eventX, eventY)
  expect(result).toBe(state)
})

test('handleMouseOverAt - with index at first item', async (): Promise<void> => {
  const item1: DisplayItem = {
    file: 'item1',
    label: 'Item 1',
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
    file: 'item2',
    label: 'Item 2',
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
    y: 0,
    headerHeight: 40,
    itemHeight: 20,
    items: [item1, item2],
  }
  const eventX = 50
  const eventY = 50
  const result = await handleMouseOverAt(state, eventX, eventY)
  expect(result).toBeDefined()
  expect(result).not.toBe(state)
})
