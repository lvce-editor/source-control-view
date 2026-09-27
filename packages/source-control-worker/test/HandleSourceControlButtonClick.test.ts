import { expect, jest, test } from '@jest/globals'
import { InputSource } from '@lvce-editor/constants'
import { IconThemeWorker, ExtensionHost, ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import { RendererWorker, TextMeasurementWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleSourceControlButtonClick } from '../src/parts/HandleSourceControlButtonClick/HandleSourceControlButtonClick.ts'
import { withApplicationRouting } from './test-util/WithApplicationRouting.ts'

test('handleSourceControlButtonClick', async () => {
  const commandMap = {
    'ExtensionHostSourceControl.getEnabledProviderIds': async (): Promise<readonly string[]> => [],
    'Extensions.activateByEvent': async (): Promise<void> => {},
    'Extensions.executeCommand': async (): Promise<void> => {},
    'IconTheme.getIcons': async (): Promise<readonly string[]> => [],
    'Preferences.get': async (): Promise<any> => false,
    'TextMeasurement.measureTextBlockHeight': async (): Promise<number> => 30,
  }
  using _extensionHostMockRpc = ExtensionHost.registerMockRpc(commandMap)
  using activationRpc = ExtensionManagementWorker.registerMockRpc(withApplicationRouting(commandMap))
  TextMeasurementWorker.registerMockRpc(commandMap)
  IconThemeWorker.registerMockRpc(commandMap)
  using mockRpc = RendererWorker.registerMockRpc(commandMap)

  const state = {
    ...createDefaultState(),
    inputValue: 'test message',
    sourceControlButtons: [
      {
        command: 'git.commitAndSync',
        icon: 'Check',
        id: 'git.commitAndSync',
        label: 'Commit & Sync',
      },
    ],
  }

  const result = await handleSourceControlButtonClick(state, 'Commit & Sync')

  expect(activationRpc.invocations).toContainEqual(['Extensions.invokeForApplication', '', 'Extensions.executeCommand', 'git.commitAndSync', 'test message'])
  expect(result.inputValue).toBe('')
  expect(result.history).toEqual(['test message'])
  expect(activationRpc.invocations).toEqual([
    ['Extensions.invokeForApplication', '', 'Extensions.activateByEvent', 'onCommand:git.commitAndSync'],
    ['Extensions.invokeForApplication', '', 'Extensions.executeCommand', 'git.commitAndSync', 'test message'],
    ['Extensions.invokeForApplication', '', 'Extensions.activateByEvent', 'onSourceControl:file'],
    ['Extensions.invokeForApplication', '', 'ExtensionHostSourceControl.getEnabledProviderIds', 'file', ''],
  ])
  expect(mockRpc.invocations).toEqual([['Preferences.get', 'sourceControl.splitButtonEnabled']])
  expect(result.inputSource).toBe(InputSource.Script)
  expect(result.inputBoxHeight).toBe(createDefaultState().inputLineHeight + createDefaultState().inputPadding * 2)
})

test('handleSourceControlButtonClick - failed command does not add to history', async () => {
  const commandMap = {
    'ExtensionHostSourceControl.getEnabledProviderIds': async (): Promise<readonly string[]> => [],
    'Extensions.activateByEvent': async (): Promise<void> => {},
    'Extensions.executeCommand': async (): Promise<void> => {
      throw new Error('failed')
    },
  }
  using _extensionHostMockRpc = ExtensionHost.registerMockRpc(commandMap)
  using _activationRpc = ExtensionManagementWorker.registerMockRpc(withApplicationRouting(commandMap))

  const state = {
    ...createDefaultState(),
    history: ['existing'],
    inputValue: 'failed message',
    sourceControlButtons: [{ command: 'git.commit', icon: 'Check', id: 'git.commit', label: 'Commit' }],
  }

  await expect(handleSourceControlButtonClick(state, 'Commit')).rejects.toThrow('failed')
  const { history } = state
  expect(history).toEqual(['existing'])
})

test('handleSourceControlButtonClick - unknown button', async () => {
  const consoleWarnSpy = jest.spyOn((globalThis as any).console, 'warn').mockImplementation(() => {})
  const state = createDefaultState()

  const result = await handleSourceControlButtonClick(state, 'Missing')

  expect(result).toBe(state)
  expect(consoleWarnSpy).toHaveBeenCalledWith('[source-control-worker] Source control button not found Missing')
  consoleWarnSpy.mockRestore()
})
