import { expect, test } from '@jest/globals'
import type { DisplayItem } from '../src/parts/DisplayItem/DisplayItem.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { setDeltaY } from '../src/parts/SetDeltaY/SetDeltaY.ts'

test('setDeltaY - basic', async () => {
  const state = createDefaultState()
  const newState = await setDeltaY(state, 100)
  expect(newState.deltaY).toBe(100)
  expect(newState.visibleItems).toBeDefined()
  expect(newState.minLineY).toBeDefined()
  expect(newState.maxLineY).toBeDefined()
})

test('setDeltaY - negative value', async () => {
  const state = createDefaultState()
  const newState = await setDeltaY(state, -100)
  expect(newState.deltaY).toBe(-100)
  expect(newState.visibleItems).toBeDefined()
  expect(newState.minLineY).toBe(0)
})

test('setDeltaY - with items', async () => {
  const items: DisplayItem[] = [
    {
      file: 'file1.txt',
      label: 'file1.txt',
      detail: 'modified',
      posInSet: 1,
      setSize: 3,
      icon: '',
      decorationIcon: '',
      decorationIconTitle: '',
      decorationStrikeThrough: false,
      type: 0,
      badgeCount: 0,
      groupId: '',
    },
    {
      file: 'file2.txt',
      label: 'file2.txt',
      detail: 'added',
      posInSet: 2,
      setSize: 3,
      icon: '',
      decorationIcon: '',
      decorationIconTitle: '',
      decorationStrikeThrough: false,
      type: 0,
      badgeCount: 0,
      groupId: '',
    },
    {
      file: 'file3.txt',
      label: 'file3.txt',
      detail: 'deleted',
      posInSet: 3,
      setSize: 3,
      icon: '',
      decorationIcon: '',
      decorationIconTitle: '',
      decorationStrikeThrough: false,
      type: 0,
      badgeCount: 0,
      groupId: '',
    },
  ]
  const state = {
    ...createDefaultState(),
    items,
  }
  const newState = await setDeltaY(state, 50)
  expect(newState.deltaY).toBe(50)
  expect(newState.visibleItems.length).toBeGreaterThan(0)
})
