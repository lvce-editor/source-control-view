import { expect, test } from '@jest/globals'
import { restoreState } from '../src/parts/RestoreState/RestoreState.ts'

test('restoreState - valid savedState with inputValue', (): void => {
  const savedState = {
    inputValue: 'test input',
  }
  const result = restoreState(savedState)
  expect(result).toEqual({
    history: [],
    inputValue: 'test input',
  })
})

test('restoreState - null savedState', (): void => {
  const result = restoreState(null)
  expect(result).toEqual({
    history: [],
    inputValue: '',
  })
})

test('restoreState - undefined savedState', (): void => {
  const result = restoreState(undefined)
  expect(result).toEqual({
    history: [],
    inputValue: '',
  })
})

test('restoreState - savedState is not an object', (): void => {
  const result = restoreState('not an object')
  expect(result).toEqual({
    history: [],
    inputValue: '',
  })
})

test('restoreState - savedState without inputValue property', (): void => {
  const savedState = {
    root: '/test',
  }
  const result = restoreState(savedState)
  expect(result).toEqual({
    history: [],
    inputValue: '',
  })
})

test('restoreState - savedState with inputValue that is not a string', (): void => {
  const savedState = {
    inputValue: 123,
  }
  const result = restoreState(savedState)
  expect(result).toEqual({
    history: [],
    inputValue: '',
  })
})

test('restoreState - empty object', (): void => {
  const result = restoreState({})
  expect(result).toEqual({
    history: [],
    inputValue: '',
  })
})

test('restoreState - savedState with empty string inputValue', (): void => {
  const savedState = {
    inputValue: '',
  }
  const result = restoreState(savedState)
  expect(result).toEqual({
    history: [],
    inputValue: '',
  })
})

test('restoreState - restores and limits history', (): void => {
  const history = Array.from({ length: 101 }, (_, index) => String(index))
  const result = restoreState({ history }, ['fallback'])
  expect(result.history).toEqual(history.slice(1))
})

test('restoreState - preserves the current history when saved state has no history', (): void => {
  const result = restoreState({}, ['fallback'])
  expect(result.history).toEqual(['fallback'])
})
