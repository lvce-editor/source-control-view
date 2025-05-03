import { expect, test } from '@jest/globals'
import { get } from '../src/parts/Preferences/Preferences.ts'

test('get', () => {
  const result = get('test')
  expect(result).toBe(false)
})
