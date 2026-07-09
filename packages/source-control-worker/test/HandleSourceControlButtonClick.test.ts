import { expect, jest, test } from '@jest/globals'
import { ExtensionHost } from '@lvce-editor/rpc-registry'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleSourceControlButtonClick } from '../src/parts/HandleSourceControlButtonClick/HandleSourceControlButtonClick.ts'

test('handleSourceControlButtonClick', async () => {
  const commandMap = {
    'ExtensionHostCommand.executeCommand': async (): Promise<void> => {},
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
    'ExtensionHostSourceControl.getEnabledProviderIds': async (): Promise<readonly string[]> => [],
    'Extensions.getExtensions': async (): Promise<readonly any[]> => [],
    'IconTheme.getIcons': async (): Promise<readonly string[]> => [],
    'MeasureTextHeight.measureTextBlockHeight': async (): Promise<number> => 30,
    'Preferences.get': async (): Promise<any> => false,
  }
  using extensionHostMockRpc = ExtensionHost.registerMockRpc(commandMap)
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

  expect(extensionHostMockRpc.invocations).toContainEqual(['ExtensionHostCommand.executeCommand', 'git.commitAndSync', 'test message'])
  expect(result.inputValue).toBe('')
  expect(mockRpc.invocations).toEqual([
    ['ExtensionHostManagement.activateByEvent', 'onCommand:git.commitAndSync', '', 0],
    ['ExtensionHostManagement.activateByEvent', 'onSourceControl:file', '', 0],
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
