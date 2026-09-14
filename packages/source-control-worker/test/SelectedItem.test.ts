import { expect, test } from '@jest/globals'
import type { Group } from '../src/parts/Group/Group.ts'
import { isSelectedItemValid } from '../src/parts/SelectedItem/SelectedItem.ts'

const groups: readonly Group[] = [
  {
    id: 'changes',
    items: [{ file: 'test.txt' }],
    label: 'Changes',
  },
]

test('isSelectedItemValid - no selection', () => {
  expect(isSelectedItemValid(undefined, groups)).toBe(true)
})

test('isSelectedItemValid - matching group and file', () => {
  expect(isSelectedItemValid({ file: 'test.txt', groupId: 'changes' }, groups)).toBe(true)
})

test('isSelectedItemValid - clears selection for a removed file', () => {
  expect(isSelectedItemValid({ file: 'missing.txt', groupId: 'changes' }, groups)).toBe(false)
})

test('isSelectedItemValid - clears selection for a different group', () => {
  expect(isSelectedItemValid({ file: 'test.txt', groupId: 'staged' }, groups)).toBe(false)
})
