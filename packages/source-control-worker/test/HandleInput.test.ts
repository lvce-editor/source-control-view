import { test, expect } from '@jest/globals'
import { InputSource } from '@lvce-editor/constants'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getIndex } from '../src/parts/GetIndex/GetIndex.ts'
import * as HandleInput from '../src/parts/HandleInput/HandleInput.ts'

test('handleInput - updates state with input value', async () => {
  const state: SourceControlState = {
    ...createDefaultState(),
    inputFontFamily: 'Arial',
    inputFontSize: 14,
    inputFontWeight: 400,
    inputLetterSpacing: 0,
    inputMessage: 'Previous error',
    width: 200,
  }

  const result = await HandleInput.handleInput(state, 'test input')

  expect(result.inputValue).toBe('test input')
  expect(result.inputMessage).toBe('')
  expect(result.inputSource).toBe(InputSource.User)
  expect(typeof result.inputBoxHeight).toBe('number')
})

test('handleInput - uses custom input source', async () => {
  const state: SourceControlState = createDefaultState()

  const result = await HandleInput.handleInput(state, 'custom input', InputSource.Script)

  expect(result.inputValue).toBe('custom input')
  expect(result.inputSource).toBe(InputSource.Script)
  expect(typeof result.inputBoxHeight).toBe('number')
})

test('handleInput - handles empty input', async () => {
  const state: SourceControlState = createDefaultState()

  const result = await HandleInput.handleInput(state, '')

  expect(result.inputValue).toBe('')
  expect(result.inputSource).toBe(InputSource.User)
  expect(typeof result.inputBoxHeight).toBe('number')
})

test('handleInput - preserves other state properties', async () => {
  const state: SourceControlState = {
    ...createDefaultState(),
    id: 123,
    inputFontFamily: 'Monaco',
    inputFontSize: 16,
    inputFontWeight: 600,
    inputLetterSpacing: 1,
    width: 300,
  }

  const result = await HandleInput.handleInput(state, 'preserve test')

  expect(result.inputValue).toBe('preserve test')
  expect(result.inputSource).toBe(InputSource.User)
  expect(typeof result.inputBoxHeight).toBe('number')
  expect(result.id).toBe(123)
})

test.each([
  ['first line\nsecond line', 35, 0],
  ['', 55, 0],
  ['first line\nsecond line', 35, 40],
])('handleInput - keeps row hit testing aligned for %p', async (value, headerHeight, deltaY) => {
  const state: SourceControlState = {
    ...createDefaultState(),
    deltaY,
    headerHeight,
    inputBoxHeight: 24,
    inputLineHeight: 20,
    itemHeight: 20,
    y: 100,
  }

  const result = await HandleInput.handleInput(state, value)
  const firstFileCenterY = state.y + result.inputBoxHeight + state.inputPaddingBlock + state.itemHeight * 1.5

  expect(getIndex(result, 0, firstFileCenterY)).toBe(1 + deltaY / state.itemHeight)
})
