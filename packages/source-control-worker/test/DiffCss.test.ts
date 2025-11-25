import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { isEqual } from '../src/parts/DiffCss/DiffCss.ts'

test('isEqual - same inputBoxHeight', () => {
  const oldState = {
    ...createDefaultState(),
    inputBoxHeight: 30,
  }
  const newState = {
    ...createDefaultState(),
    inputBoxHeight: 30,
  }
  expect(isEqual(oldState, newState)).toBe(true)
})

test('isEqual - different inputBoxHeight', () => {
  const oldState = {
    ...createDefaultState(),
    inputBoxHeight: 30,
  }
  const newState = {
    ...createDefaultState(),
    inputBoxHeight: 50,
  }
  expect(isEqual(oldState, newState)).toBe(false)
})

test('isEqual - zero values', () => {
  const oldState = {
    ...createDefaultState(),
    inputBoxHeight: 0,
  }
  const newState = {
    ...createDefaultState(),
    inputBoxHeight: 0,
  }
  expect(isEqual(oldState, newState)).toBe(true)
})
