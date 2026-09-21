import { expect, test } from '@jest/globals'
import { addToHistory } from '../src/parts/AddToHistory/AddToHistory.ts'

test('addToHistory preserves the exact submitted message', () => {
  expect(addToHistory([], '  first line\nsecond line  ')).toEqual(['  first line\nsecond line  '])
})

test('addToHistory ignores empty messages', () => {
  const history = ['existing']
  expect(addToHistory(history, '')).toBe(history)
})

test('addToHistory keeps the most recent 100 messages', () => {
  const history = Array.from({ length: 100 }, (_, index) => String(index))
  expect(addToHistory(history, 'newest')).toHaveLength(100)
  expect(addToHistory(history, 'newest')).toEqual([...history.slice(1), 'newest'])
})
