import { afterEach, beforeEach, expect, test } from '@jest/globals'
import { ExtensionHost, ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleSourceControlProgressChange } from '../src/parts/HandleSourceControlProgressChange/HandleSourceControlProgressChange.ts'
import * as SourceControlStates from '../src/parts/SourceControlStates/SourceControlStates.ts'
import { withApplicationRouting } from './test-util/WithApplicationRouting.ts'

const initialize = (): void => {
  const state = { ...createDefaultState(), enabledProviderIds: ['git'], id: 1 }
  SourceControlStates.set(1, state, state)
}

beforeEach(() => {
  ExtensionManagementWorker.registerMockRpc(withApplicationRouting({ 'Extensions.activateByEvent': async () => {} }))
})

afterEach(() => {
  SourceControlStates.dispose(1)
})

test('updates progress without replacing files or input', async () => {
  ExtensionHost.registerMockRpc({ 'ExtensionHostSourceControl.getProgress': async () => true })
  initialize()
  const before = SourceControlStates.get(1).newState
  await handleSourceControlProgressChange(1)
  const after = SourceControlStates.get(1).newState
  expect(after.inProgress).toBe(true)
  expect(after.items).toBe(before.items)
  expect(after.inputValue).toBe(before.inputValue)
})

test('a late busy response cannot overwrite a newer completion', async () => {
  const started = Promise.withResolvers<void>()
  const first = Promise.withResolvers<boolean>()
  let calls = 0
  ExtensionHost.registerMockRpc({
    'ExtensionHostSourceControl.getProgress': async () => {
      started.resolve()
      return ++calls === 1 ? first.promise : false
    },
  })
  initialize()
  const pending = handleSourceControlProgressChange(1)
  await started.promise
  await handleSourceControlProgressChange(1)
  first.resolve(true)
  await pending
  expect(SourceControlStates.get(1).newState.inProgress).toBe(false)
})

test('closing and reopening the view ignores an old response', async () => {
  const started = Promise.withResolvers<void>()
  const response = Promise.withResolvers<boolean>()
  ExtensionHost.registerMockRpc({
    'ExtensionHostSourceControl.getProgress': async () => {
      started.resolve()
      return response.promise
    },
  })
  initialize()
  const pending = handleSourceControlProgressChange(1)
  await started.promise
  SourceControlStates.dispose(1)
  initialize()
  response.resolve(true)
  await pending
  expect(SourceControlStates.get(1).newState.inProgress).toBe(false)
})

test('changing providers while querying ignores the old result', async () => {
  const started = Promise.withResolvers<void>()
  const response = Promise.withResolvers<boolean>()
  ExtensionHost.registerMockRpc({
    'ExtensionHostSourceControl.getProgress': async () => {
      started.resolve()
      return response.promise
    },
  })
  initialize()
  const pending = handleSourceControlProgressChange(1)
  await started.promise
  const before = SourceControlStates.get(1).newState
  SourceControlStates.set(1, before, { ...before, enabledProviderIds: ['other'] })
  response.resolve(true)
  await pending
  expect(SourceControlStates.get(1).newState.inProgress).toBe(false)
})

test('unsupported providers do not leave stale progress', async () => {
  ExtensionHost.registerMockRpc({
    'ExtensionHostSourceControl.getProgress': async () => {
      throw new Error('unsupported')
    },
  })
  initialize()
  await handleSourceControlProgressChange(1)
  expect(SourceControlStates.get(1).newState.inProgress).toBe(false)
})
