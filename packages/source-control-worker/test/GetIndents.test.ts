import { expect, test } from '@jest/globals'
import type { VisibleItem } from '../src/parts/VisibleItem/VisibleItem.ts'
import { getIndents } from '../src/parts/GetIndents/GetIndents.ts'

const item: VisibleItem = {
  badgeCount: 0,
  buttons: [],
  decorationIcon: '',
  decorationIconTitle: '',
  decorationStrikeThrough: false,
  detail: '',
  file: 'test',
  fileIcon: '',
  groupId: 'test',
  icon: '',
  indent: 0,
  label: 'test',
  posInSet: 1,
  setSize: 1,
  type: 0,
}

test('reuses indents when other visible item properties change', () => {
  const indents = [0, 16]
  expect(
    getIndents(indents, [
      { ...item, label: 'changed' },
      { ...item, indent: 16 },
    ]),
  ).toBe(indents)
})

test('reuses empty indents', () => {
  const indents: readonly number[] = []
  expect(getIndents(indents, [])).toBe(indents)
})

test('replaces changed indents without mutating the previous array', () => {
  const indents = [0, 16]
  const result = getIndents(indents, [{ ...item, indent: 16 }, item])
  expect(result).toEqual([16, 0])
  expect(result).not.toBe(indents)
  expect(indents).toEqual([0, 16])
})

test('updates indents when items are added or removed', () => {
  expect(getIndents([], [item, item])).toEqual([0, 0])
  expect(getIndents([0, 0], [item])).toEqual([0])
  expect(getIndents([0], [])).toEqual([])
})
