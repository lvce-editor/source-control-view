import { expect, test } from '@jest/globals'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { nextHistory } from '../src/parts/NextHistory/NextHistory.ts'
import { previousHistory } from '../src/parts/PreviousHistory/PreviousHistory.ts'

const createState = (inputValue = ''): SourceControlState => ({
  ...createDefaultState(),
  history: ['first\nmessage', 'second message', 'third message'],
  inputValue,
})

test('previousHistory recalls messages from newest to oldest and preserves a draft', async () => {
  let state = createState('draft')
  state = await previousHistory(state)
  const { historyDraft, historyIndex, inputValue } = state
  expect(inputValue).toBe('third message')
  expect(historyIndex).toBe(2)
  expect(historyDraft).toBe('draft')

  state = await previousHistory(state)
  const { inputValue: secondInputValue } = state
  expect(secondInputValue).toBe('second message')
  state = await previousHistory(state)
  const { inputValue: firstInputValue } = state
  expect(firstInputValue).toBe('first\nmessage')
  const previousState = await previousHistory(state)
  const { inputValue: previousInputValue } = previousState
  expect(previousInputValue).toBe('first\nmessage')
})

test('nextHistory moves forward and restores the draft after the newest message', async () => {
  let state = createState('draft')
  state = await previousHistory(state)
  state = await previousHistory(state)
  state = await previousHistory(state)
  state = await nextHistory(state)
  const { historyIndex, inputValue } = state
  expect(inputValue).toBe('second message')
  expect(historyIndex).toBe(1)

  state = await nextHistory(state)
  const { inputValue: nextInputValue } = state
  expect(nextInputValue).toBe('third message')
  state = await nextHistory(state)
  const { historyDraft: nextHistoryDraft, historyIndex: nextHistoryIndex, inputValue: draftInputValue } = state
  expect(draftInputValue).toBe('draft')
  expect(nextHistoryIndex).toBe(-1)
  expect(nextHistoryDraft).toBe('')
  const nextState = await nextHistory(state)
  expect(nextState).toBe(state)
})

test('history navigation is safe with empty history', async () => {
  const state = createDefaultState()
  expect(await previousHistory(state)).toBe(state)
  expect(await nextHistory(state)).toBe(state)
})
