import { expect, test } from '@jest/globals'
import { ExtensionHost, ExtensionManagementWorker, IconThemeWorker, RendererWorker, TextMeasurementWorker } from '@lvce-editor/rpc-registry'
import { acceptInput } from '../src/parts/AcceptInput/AcceptInput.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { withApplicationRouting } from './test-util/WithApplicationRouting.ts'

const registerProviders = (acceptInput: () => Promise<void>): void => {
  const commandMap = {
    'ExtensionHostSourceControl.acceptInput': acceptInput,
    'ExtensionHostSourceControl.getBadgeCount': async (): Promise<number> => 0,
    'ExtensionHostSourceControl.getCurrentBranch': async (): Promise<string> => '',
    'ExtensionHostSourceControl.getEnabledProviderIds': async (): Promise<readonly string[]> => ['git'],
    'ExtensionHostSourceControl.getFeatures': async (): Promise<{ showGenerateCommitMessageButton: boolean }> => ({ showGenerateCommitMessageButton: false }),
    'ExtensionHostSourceControl.getGroups': async (): Promise<readonly any[]> => [],
    'Extensions.activateByEvent': async (): Promise<void> => {},
    'Extensions.getAllExtensions': async (): Promise<readonly any[]> => [],
    'IconTheme.getIcons': async (): Promise<readonly string[]> => [],
    'Preferences.get': async (): Promise<boolean> => false,
    'TextMeasurement.measureTextBlockHeight': async (): Promise<number> => 30,
  }
  ExtensionHost.registerMockRpc(commandMap)
  ExtensionManagementWorker.registerMockRpc(withApplicationRouting(commandMap))
  IconThemeWorker.registerMockRpc(commandMap)
  RendererWorker.registerMockRpc(commandMap)
  TextMeasurementWorker.registerMockRpc(commandMap)
}

test('acceptInput adds a successful commit message to history', async () => {
  registerProviders(async () => {})
  const state = {
    ...createDefaultState(),
    enabledProviderIds: ['git'],
    history: ['previous'],
    inputValue: '  commit\nmessage  ',
  }

  const result = await acceptInput(state)
  const receivedMessage = result.history.at(-1) || ''

  expect(receivedMessage).toBe('  commit\nmessage  ')
  expect(result.inputValue).toBe('')
  expect(result.historyIndex).toBe(-1)
})

test('acceptInput does not add a failed commit message to history', async () => {
  registerProviders(async () => {
    throw new Error('failed')
  })
  const state = {
    ...createDefaultState(),
    enabledProviderIds: ['git'],
    history: ['previous'],
    inputValue: 'failed message',
  }

  await expect(acceptInput(state)).rejects.toThrow('failed')
  const { history } = state
  expect(history).toEqual(['previous'])
})
