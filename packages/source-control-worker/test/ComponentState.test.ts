import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getComponentState } from '../src/parts/GetComponentState/GetComponentState.ts'
import { setComponentState } from '../src/parts/SetComponentState/SetComponentState.ts'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import * as SourceControlStates from '../src/parts/SourceControlStates/SourceControlStates.ts'

test('gets and sets the live component state', async () => {
  const id = 101
  const oldState = { ...createDefaultState(), id, inputValue: 'Before' }
  const newState = { ...oldState, inputValue: 'After' }
  SourceControlStates.set(id, oldState, oldState)

  expect(getComponentState(id)).toBe(oldState)
  await setComponentState(id, newState)

  expect(SourceControlStates.get(id)).toEqual({ newState, oldState, scheduledState: newState })
})

test('rejects an invalid live component state', async () => {
  const id = 102
  const state = { ...createDefaultState(), id }
  SourceControlStates.set(id, state, state)

  await expect(setComponentState(id, { ...state, id: 103 })).rejects.toThrow('Source Control state id must remain 102')
  await expect(setComponentState(id, [] as unknown as SourceControlState)).rejects.toThrow('Source Control state must be an object')
})
