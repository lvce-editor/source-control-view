import { test, expect } from '@jest/globals'
import { InputSource } from '@lvce-editor/constants'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { isEqual } from '../src/parts/DiffValue/DiffValue.ts'

test('isEqual - returns true when newState inputSource is User', (): void => {
  const oldState: SourceControlState = {
    ...createDefaultState(),
    inputValue: 'old value',
    inputSource: InputSource.Script,
  }

  const newState: SourceControlState = {
    ...createDefaultState(),
    inputValue: 'different value',
    inputSource: InputSource.User,
  }

  expect(isEqual(oldState, newState)).toBe(true)
})

test('isEqual - returns true when inputValues are equal and inputSource is not User', (): void => {
  const oldState: SourceControlState = {
    ...createDefaultState(),
    inputValue: 'same value',
    inputSource: InputSource.Script,
  }

  const newState: SourceControlState = {
    ...createDefaultState(),
    inputValue: 'same value',
    inputSource: InputSource.Script,
  }

  expect(isEqual(oldState, newState)).toBe(true)
})

test('isEqual - returns false when inputValues differ and inputSource is not User', (): void => {
  const oldState: SourceControlState = {
    ...createDefaultState(),
    inputValue: 'old value',
    inputSource: InputSource.Script,
  }

  const newState: SourceControlState = {
    ...createDefaultState(),
    inputValue: 'new value',
    inputSource: InputSource.Script,
  }

  expect(isEqual(oldState, newState)).toBe(false)
})

test('isEqual - returns true when inputValues are equal and inputSource is User', (): void => {
  const oldState: SourceControlState = {
    ...createDefaultState(),
    inputValue: 'same value',
    inputSource: InputSource.User,
  }

  const newState: SourceControlState = {
    ...createDefaultState(),
    inputValue: 'same value',
    inputSource: InputSource.User,
  }

  expect(isEqual(oldState, newState)).toBe(true)
})

test('isEqual - returns true when inputValues differ but inputSource is User', (): void => {
  const oldState: SourceControlState = {
    ...createDefaultState(),
    inputValue: 'old value',
    inputSource: InputSource.User,
  }

  const newState: SourceControlState = {
    ...createDefaultState(),
    inputValue: 'new value',
    inputSource: InputSource.User,
  }

  expect(isEqual(oldState, newState)).toBe(true)
})

test('isEqual - returns true when both inputValues are empty and inputSource is not User', (): void => {
  const oldState: SourceControlState = {
    ...createDefaultState(),
    inputValue: '',
    inputSource: InputSource.Script,
  }

  const newState: SourceControlState = {
    ...createDefaultState(),
    inputValue: '',
    inputSource: InputSource.Script,
  }

  expect(isEqual(oldState, newState)).toBe(true)
})

test('isEqual - returns false when one inputValue is empty and inputSource is not User', (): void => {
  const oldState: SourceControlState = {
    ...createDefaultState(),
    inputValue: 'value',
    inputSource: InputSource.Script,
  }

  const newState: SourceControlState = {
    ...createDefaultState(),
    inputValue: '',
    inputSource: InputSource.Script,
  }

  expect(isEqual(oldState, newState)).toBe(false)
})
