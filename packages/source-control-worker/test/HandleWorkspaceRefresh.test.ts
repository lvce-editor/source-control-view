import { expect, test } from '@jest/globals'
import { ExtensionHost, ExtensionManagementWorker, RendererWorker, TextMeasurementWorker } from '@lvce-editor/rpc-registry'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleWorkspaceRefresh } from '../src/parts/HandleWorkspaceRefresh/HandleWorkspaceRefresh.ts'

test('handleWorkspaceRefresh should discover newly available source control providers', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getEnabledProviderIds': async (): Promise<readonly string[]> => ['git'],
    'ExtensionHostSourceControl.getFeatures': async (): Promise<{ showGenerateCommitMessageButton: boolean }> => ({
      showGenerateCommitMessageButton: false,
    }),
    'ExtensionHostSourceControl.getGroups': async (): Promise<readonly never[]> => [],
    'ExtensionHostSourceControl.getIconDefinitions': async (): Promise<readonly string[]> => [],
  }
  using mockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)
  using extensionManagementMockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.activateByEvent': async (): Promise<void> => {},
    'Extensions.getAllExtensions': async (): Promise<readonly unknown[]> => [],
  })

  const rendererCommandMap = {
    'IconTheme.getIcons': async (): Promise<readonly string[]> => [],
    'Preferences.get': async (): Promise<boolean> => false,
    'TextMeasurement.measureTextBlockHeight': async (): Promise<number> => 30,
  }
  RendererWorker.registerMockRpc(rendererCommandMap)
  TextMeasurementWorker.registerMockRpc(rendererCommandMap)

  const state: SourceControlState = {
    ...createDefaultState(),
    enabledProviderIds: [],
    inputValue: 'existing commit message',
    workspacePath: '/test',
  }
  const result = await handleWorkspaceRefresh(state)

  expect(result.enabledProviderIds).toEqual(['git'])
  expect(result.inputValue).toBe('existing commit message')
  expect(mockRpc.invocations).toContainEqual(['ExtensionHostSourceControl.getEnabledProviderIds', 'file', '/test'])
  expect(extensionManagementMockRpc.invocations.filter(([method]) => method === 'Extensions.getAllExtensions')).toEqual([
    ['Extensions.getAllExtensions', '', 0],
    ['Extensions.getAllExtensions', '', 0],
    ['Extensions.getAllExtensions', '', 0],
  ])
})

test('handleWorkspaceRefresh should use the lightweight refresh when providers are unchanged', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getEnabledProviderIds': async (): Promise<readonly string[]> => [],
  }
  using mockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  using _activationRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.activateByEvent': async (): Promise<void> => {},
  })
  const rendererCommandMap = {
    'IconTheme.getIcons': async (): Promise<readonly string[]> => [],
  }
  RendererWorker.registerMockRpc(rendererCommandMap)
  TextMeasurementWorker.registerMockRpc(rendererCommandMap)

  const state: SourceControlState = {
    ...createDefaultState(),
    inputValue: 'existing commit message',
    workspacePath: '/test',
  }
  const result = await handleWorkspaceRefresh(state)

  expect(result.enabledProviderIds).toEqual([])
  expect(result.inputValue).toBe('existing commit message')
  expect(mockRpc.invocations).toEqual([['ExtensionHostSourceControl.getEnabledProviderIds', 'file', '/test']])
})
