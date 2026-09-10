import { expect, jest, test } from '@jest/globals'
import { ExtensionHost, ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import { RendererWorker, TextMeasurementWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleSourceControlButtonClick } from '../src/parts/HandleSourceControlButtonClick/HandleSourceControlButtonClick.ts'

test('handleSourceControlButtonClick', async () => {
  const commandMap = {
    'ExtensionHostSourceControl.getEnabledProviderIds': async (): Promise<readonly string[]> => [],
    'Extensions.activateByEvent': async (): Promise<void> => {},
    'Extensions.executeCommand': async (): Promise<void> => {},
    'IconTheme.getIcons': async (): Promise<readonly string[]> => [],
    'TextMeasurement.measureTextBlockHeight': async (): Promise<number> => 30,
    'Preferences.get': async (): Promise<any> => false,
  }
  using extensionHostMockRpc = ExtensionHost.registerMockRpc(commandMap)
  using activationRpc = ExtensionManagementWorker.registerMockRpc(commandMap)
  TextMeasurementWorker.registerMockRpc(commandMap)
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

  expect(extensionHostMockRpc.invocations).toContainEqual(['Extensions.executeCommand', 'git.commitAndSync', 'test message'])
  expect(result.inputValue).toBe('')
  expect(activationRpc.invocations).toEqual([
    ['Extensions.activateByEvent', 'onCommand:git.commitAndSync', '', 0],
    ['Extensions.activateByEvent', 'onSourceControl:file', '', 0],
    ['Extensions.getAllExtensions', '', 0],
  ])
  expect(mockRpc.invocations).toEqual([
    ['Preferences.get', 'sourceControl.splitButtonEnabled'],
    ['IconTheme.getIcons', []],
  ])
})

test('handleSourceControlButtonClick - unknown button', async () => {
  const consoleWarnSpy = jest.spyOn((globalThis as any).console, 'warn').mockImplementation(() => {})
  const state = createDefaultState()

  const result = await handleSourceControlButtonClick(state, 'Missing')

  expect(result).toBe(state)
  expect(consoleWarnSpy).toHaveBeenCalledWith('[source-control-worker] Source control button not found Missing')
  consoleWarnSpy.mockRestore()
})
