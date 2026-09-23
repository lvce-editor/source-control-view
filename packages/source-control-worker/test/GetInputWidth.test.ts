import { expect, test } from '@jest/globals'
import * as GetInputWidth from '../src/parts/GetInputWidth/GetInputWidth.ts'

test('getInputWidth subtracts source control header, textarea padding, and borders', () => {
  expect(GetInputWidth.getInputWidth(300, [])).toBe(254)
})

test('getInputWidth subtracts contributed input actions', () => {
  const actions = [{ command: 'suggest', icon: 'sparkle', label: 'Suggest message' }]
  expect(GetInputWidth.getInputWidth(300, actions)).toBe(230)
})

test('getInputWidth does not return a negative width', () => {
  expect(GetInputWidth.getInputWidth(20, [])).toBe(0)
})
