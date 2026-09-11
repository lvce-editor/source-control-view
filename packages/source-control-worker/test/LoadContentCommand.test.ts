import { expect, test } from '@jest/globals'
import { InputSource } from '@lvce-editor/constants'
import { ExtensionHost, ExtensionManagementWorker, RendererWorker, TextMeasurementWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { loadContentCommand } from '../src/parts/LoadContentCommand/LoadContentCommand.ts'
import * as SourceControlStates from '../src/parts/SourceControlStates/SourceControlStates.ts'

const registerProviders = (getEnabledProviderIds: () => Promise<readonly string[]>): void => {
  const commandMap = {
    'ExtensionHostSourceControl.getEnabledProviderIds': getEnabledProviderIds,
    'Extensions.activateByEvent': async (): Promise<void> => {},
    'Extensions.getAllExtensions': async (): Promise<readonly unknown[]> => [],
    'IconTheme.getIcons': async (): Promise<readonly string[]> => [],
    'Preferences.get': async (): Promise<boolean> => false,
    'TextMeasurement.measureTextBlockHeight': async (): Promise<number> => 30,
  }
  ExtensionHost.registerMockRpc(commandMap)
  ExtensionManagementWorker.registerMockRpc(commandMap)
  RendererWorker.registerMockRpc(commandMap)
  TextMeasurementWorker.registerMockRpc(commandMap)
}

test('extension reload preserves a message generated while providers are loading', async () => {
  const started = Promise.withResolvers<void>()
  const providers = Promise.withResolvers<readonly string[]>()
  registerProviders(async () => {
    started.resolve()
    return providers.promise
  })
  const state = { ...createDefaultState(), id: 1, inputValue: 'My change' }
  SourceControlStates.set(1, state, state)
  const pending = loadContentCommand(1, { inputValue: 'old saved message' })
  await started.promise
  const generated = {
    ...state,
    inputBoxHeight: 60,
    inputMessage: '',
    inputSource: InputSource.Script,
    inputValue: 'Suggested: My change',
  }
  SourceControlStates.set(1, state, generated)
  providers.resolve([])
  await pending
  const { inputPaddingBlock } = state
  expect(SourceControlStates.get(1).newState).toMatchObject({
    headerHeight: 60 + inputPaddingBlock,
    inputBoxHeight: 60,
    inputSource: InputSource.Script,
    inputValue: 'Suggested: My change',
    loading: false,
  })
})

test('initial load restores the saved message', async () => {
  registerProviders(async () => [])
  const state = { ...createDefaultState(), id: 2, loading: true }
  SourceControlStates.set(2, state, state)
  await loadContentCommand(2, { inputValue: 'saved message' })
  expect(SourceControlStates.get(2).newState.inputValue).toBe('saved message')
})

test('extension reload preserves a message already entered before loading', async () => {
  registerProviders(async () => [])
  const state = { ...createDefaultState(), id: 3, inputValue: 'My change' }
  SourceControlStates.set(3, state, state)
  await loadContentCommand(3, undefined)
  expect(SourceControlStates.get(3).newState.inputValue).toBe('My change')
})
