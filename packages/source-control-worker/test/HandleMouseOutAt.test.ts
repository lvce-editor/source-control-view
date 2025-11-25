import { expect, test } from '@jest/globals'
import type { DisplayItem } from '../src/parts/DisplayItem/DisplayItem.ts'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleMouseOutAt } from '../src/parts/HandleMouseOutAt/HandleMouseOutAt.ts'

test('handleMouseOutAt - with valid coordinates', (): void => {
  const item1: DisplayItem = {
    file: 'item1',
    label: 'item1',
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
    label: 'item2',
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
  const eventX = 100
  const eventY = 50

  const result = handleMouseOutAt(state, eventX, eventY)

  expect(result).toBe(state)
})

test('handleMouseOutAt - with coordinates outside items area (index -1)', (): void => {
  const item1: DisplayItem = {
    file: 'item1',
    label: 'item1',
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
    label: 'item2',
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
  const eventX = 100
  const eventY = 30

  const result = handleMouseOutAt(state, eventX, eventY)

  expect(result).not.toBe(state)
  expect(result).toEqual(state)
})

test('handleMouseOutAt - with coordinates beyond items length', (): void => {
  const item1: DisplayItem = {
    file: 'item1',
    label: 'item1',
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
    y: 0,
    headerHeight: 40,
    itemHeight: 20,
    items: [item1],
  }
  const eventX = 100
  const eventY = 100

  const result = handleMouseOutAt(state, eventX, eventY)

  expect(result).not.toBe(state)
  expect(result).toEqual(state)
})
