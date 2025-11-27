import { test, expect } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderFocusContext } from '../src/parts/RenderFocusContext/RenderFocusContext.ts'

test('renderFocusContext - returns correct command with id and focus', (): void => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    id: 1,
    focus: 5,
  }

  const result = renderFocusContext(oldState, newState)

  expect(result).toEqual([ViewletCommand.SetFocusContext, 1, 5])
})

test('renderFocusContext - uses different id and focus values', (): void => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    id: 2,
    focus: 10,
  }

  const result = renderFocusContext(oldState, newState)

  expect(result).toEqual([ViewletCommand.SetFocusContext, 2, 10])
})

test('renderFocusContext - handles zero focus', (): void => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    id: 3,
    focus: 0,
  }

  const result = renderFocusContext(oldState, newState)

  expect(result).toEqual([ViewletCommand.SetFocusContext, 3, 0])
})

test('renderFocusContext - handles negative focus', (): void => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    id: 4,
    focus: -1,
  }

  const result = renderFocusContext(oldState, newState)

  expect(result).toEqual([ViewletCommand.SetFocusContext, 4, -1])
})

test('renderFocusContext - handles large focus values', (): void => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    id: 5,
    focus: 100,
  }

  const result = renderFocusContext(oldState, newState)

  expect(result).toEqual([ViewletCommand.SetFocusContext, 5, 100])
})
