import { expect, test } from '@jest/globals'
import { getErrorMessage } from '../src/parts/GetErrorMessage/GetErrorMessage.ts'

test('getErrorMessage - error', () => {
  expect(getErrorMessage(new Error('Unable to load'))).toBe('Unable to load')
})

test('getErrorMessage - string', () => {
  expect(getErrorMessage('Unable to load')).toBe('Unable to load')
})
