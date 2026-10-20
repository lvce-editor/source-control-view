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
  const current = { ...state, inProgress: true, workspaceUri: '/other' }
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

test('a pending no-op command cannot restore stale source control groups', async () => {
  const state = { ...createDefaultState(), id: 704 }
  const { id } = state
  SourceControlStates.set(id, state, state)
  const response = Promise.withResolvers<SourceControlState>()
  const pending = SourceControlStates.wrapCommand(async () => response.promise)(id)
  const current = { ...state, allGroups: [{ id: 'index', items: [{ file: '0.css' }], label: 'Staged Changes' }], badgeCount: 1 }
  SourceControlStates.set(id, state, current)
  response.resolve({ ...state })
  await pending
  expect(SourceControlStates.get(id).newState).toEqual(current)
})

test('a pending refresh preserves concurrent input while applying its own changes', async () => {
  const state = { ...createDefaultState(), id: 705 }
  const { id } = state
  SourceControlStates.set(id, state, state)
  const response = Promise.withResolvers<SourceControlState>()
  const pending = SourceControlStates.wrapCommand(async () => response.promise)(id)
  const current = { ...state, inputValue: 'new draft' }
  SourceControlStates.set(id, state, current)
  response.resolve({ ...state, badgeCount: 1 })
  await pending
  expect(SourceControlStates.get(id).newState).toMatchObject({ badgeCount: 1, inputValue: 'new draft' })
})

test('a pending command survives reloading the same provider IDs', async () => {
  const state = { ...createDefaultState(), enabledProviderIds: ['sample'], id: 706 }
  const { id } = state
  SourceControlStates.set(id, state, state)
  const response = Promise.withResolvers<SourceControlState>()
  const pending = SourceControlStates.wrapCommand(async () => response.promise)(id)
  const current = { ...state, enabledProviderIds: ['sample'] }
  SourceControlStates.set(id, state, current)
  response.resolve({ ...state, allGroups: [{ id: 'index', items: [{ file: '0.css' }], label: 'Staged Changes' }] })
  await pending
  expect(SourceControlStates.get(id).newState.allGroups).toEqual([{ id: 'index', items: [{ file: '0.css' }], label: 'Staged Changes' }])
})

test('a pending command is discarded when provider IDs change', async () => {
  const state = { ...createDefaultState(), enabledProviderIds: ['sample'], id: 707 }
  const { id } = state
  SourceControlStates.set(id, state, state)
  const response = Promise.withResolvers<SourceControlState>()
  const pending = SourceControlStates.wrapCommand(async () => response.promise)(id)
  const current = { ...state, enabledProviderIds: ['other'] }
  SourceControlStates.set(id, state, current)
  response.resolve({ ...state, badgeCount: 1 })
  await pending
  expect(SourceControlStates.get(id).newState).toEqual(current)
})
