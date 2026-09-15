import { expect, test } from '@jest/globals'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as SourceControlStates from '../src/parts/SourceControlStates/SourceControlStates.ts'

test('a pending command cannot overwrite a newer progress notification', async () => {
  const state = { ...createDefaultState(), id: 701 }
  const { id } = state
  SourceControlStates.set(id, state, state)
  const response = Promise.withResolvers<SourceControlState>()
  const command = SourceControlStates.wrapCommand(async () => response.promise)
  const pending = command(id)
  const current = { ...state, inProgress: true, progressRequestId: 1 }
  SourceControlStates.set(id, state, current)
  response.resolve({ ...state, inputMessage: 'refreshed' })
  await pending
  expect(SourceControlStates.get(id).newState).toMatchObject({ inProgress: true, inputMessage: 'refreshed', progressRequestId: 1 })
})

test('a pending command cannot restore the previous workspace', async () => {
  const state = { ...createDefaultState(), id: 702 }
  const { id } = state
  SourceControlStates.set(id, state, state)
  const response = Promise.withResolvers<SourceControlState>()
  const command = SourceControlStates.wrapCommand(async () => response.promise)
  const pending = command(id)
  const current = { ...state, inProgress: true, workspacePath: '/other' }
  SourceControlStates.set(id, state, current)
  response.resolve({ ...state, inProgress: false })
  await pending
  expect(SourceControlStates.get(id).newState).toEqual(current)
})

test('a command without a concurrent notification applies its progress query', async () => {
  const state = { ...createDefaultState(), id: 703 }
  const { id } = state
  SourceControlStates.set(id, state, state)
  const command = SourceControlStates.wrapCommand(async (current) => ({ ...current, inProgress: true }))
  await command(id)
  expect(SourceControlStates.get(id).newState.inProgress).toBe(true)
})
