import { test, expect } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { isEqual } from '../src/parts/DiffItems/DiffItems.ts'

test('isEqual - equal states', () => {
  const state = CreateDefaultState.createDefaultState()
  const result = isEqual(state, state)
  expect(result).toBe(true)
})

test('isEqual - different allGroups', () => {
  const state1 = CreateDefaultState.createDefaultState()
  const state2 = {
    ...CreateDefaultState.createDefaultState(),
    allGroups: [{ id: '1', label: 'Group 1', items: [] }],
  }
  const result = isEqual(state1, state2)
  expect(result).toBe(false)
})

test('isEqual - different deltaY', () => {
  const state1 = CreateDefaultState.createDefaultState()
  const state2 = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 10,
  }
  const result = isEqual(state1, state2)
  expect(result).toBe(false)
})

test('isEqual - different items', () => {
  const state1 = CreateDefaultState.createDefaultState()
  const state2 = {
    ...CreateDefaultState.createDefaultState(),
    items: [
      {
        file: 'test.js',
        label: 'test.js',
        detail: '',
        posInSet: 1,
        setSize: 1,
        icon: '',
        decorationIcon: '',
        decorationIconTitle: '',
        decorationStrikeThrough: false,
        type: 0,
        badgeCount: 0,
        groupId: '',
      },
    ],
  }
  const result = isEqual(state1, state2)
  expect(result).toBe(false)
})

test('isEqual - different maxLineY', () => {
  const state1 = CreateDefaultState.createDefaultState()
  const state2 = {
    ...CreateDefaultState.createDefaultState(),
    maxLineY: 5,
  }
  const result = isEqual(state1, state2)
  expect(result).toBe(false)
})

test('isEqual - different minLineY', () => {
  const state1 = CreateDefaultState.createDefaultState()
  const state2 = {
    ...CreateDefaultState.createDefaultState(),
    minLineY: 2,
  }
  const result = isEqual(state1, state2)
  expect(result).toBe(false)
})

test('isEqual - different visibleItems', () => {
  const state1 = CreateDefaultState.createDefaultState()
  const state2 = {
    ...CreateDefaultState.createDefaultState(),
    visibleItems: [
      {
        file: 'test.js',
        label: 'test.js',
        detail: '',
        posInSet: 1,
        setSize: 1,
        icon: '',
        decorationIcon: '',
        decorationIconTitle: '',
        decorationStrikeThrough: false,
        type: 0,
        badgeCount: 0,
        groupId: '',
        fileIcon: '',
        buttons: [],
      },
    ],
  }
  const result = isEqual(state1, state2)
  expect(result).toBe(false)
})

test('isEqual - same values but different object references', () => {
  const state1 = CreateDefaultState.createDefaultState()
  const state2 = CreateDefaultState.createDefaultState()
  const result = isEqual(state1, state2)
  expect(result).toBe(false)
})

test('isEqual - multiple differences', () => {
  const state1 = CreateDefaultState.createDefaultState()
  const state2 = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 5,
    maxLineY: 10,
    minLineY: 2,
  }
  const result = isEqual(state1, state2)
  expect(result).toBe(false)
})
