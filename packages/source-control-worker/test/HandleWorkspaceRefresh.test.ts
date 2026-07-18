import { expect, test } from '@jest/globals'
import { ExtensionHost, RendererWorker } from '@lvce-editor/rpc-registry'
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
    'Extensions.getExtensions': async (): Promise<readonly unknown[]> => [],
  }
  using mockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const rendererCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
    'IconTheme.getIcons': async (): Promise<readonly string[]> => [],
    'MeasureTextHeight.measureTextBlockHeight': async (): Promise<number> => 30,
    'Preferences.get': async (): Promise<boolean> => false,
  }
  RendererWorker.registerMockRpc(rendererCommandMap)

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
})

test('handleWorkspaceRefresh should use the lightweight refresh when providers are unchanged', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getEnabledProviderIds': async (): Promise<readonly string[]> => [],
  }
  using mockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const rendererCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
    'IconTheme.getIcons': async (): Promise<readonly string[]> => [],
  }
  RendererWorker.registerMockRpc(rendererCommandMap)

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
