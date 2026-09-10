import { expect, test } from '@jest/globals'
import { ExtensionHost, ExtensionManagementWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'

test('loadContent - returns an error state when loading fails', async (): Promise<void> => {
  const commandMap = {
    'ExtensionHostSourceControl.getEnabledProviderIds': async (): Promise<readonly string[]> => {
      throw new Error('Unable to read repository state')
    },
    'Extensions.activateByEvent': async (): Promise<void> => {},
  }
  ExtensionHost.registerMockRpc(commandMap)
  ExtensionManagementWorker.registerMockRpc(commandMap)
  RendererWorker.registerMockRpc(commandMap)

  const state: SourceControlState = {
    ...createDefaultState(),
    loading: true,
  }
  const result = await loadContent(state, {})

  expect(result.initial).toBe(false)
  expect(result.loading).toBe(false)
  expect(result.providerUnavailableMessage).toBe('Unable to read repository state')
})

test('loadContent - basic with empty state', async (): Promise<void> => {
  const commandMap = {
    'ExtensionHostSourceControl.getEnabledProviderIds': async (): Promise<readonly string[]> => [],
    'Extensions.activateByEvent': async (): Promise<void> => {},
    'Extensions.getAllExtensions': async (): Promise<readonly any[]> => [],
    'IconTheme.getIcons': async (): Promise<readonly string[]> => [],
    'MeasureTextHeight.measureTextBlockHeight': async (): Promise<number> => 30,
    'Preferences.get': async (): Promise<any> => false,
  }
  ExtensionHost.registerMockRpc(commandMap)
  ExtensionManagementWorker.registerMockRpc(commandMap)
  RendererWorker.registerMockRpc(commandMap)

  const state: SourceControlState = createDefaultState()
  const result = await loadContent(state, {})

  expect(result).toBeDefined()
  expect(result.enabledProviderIds).toEqual([])
  expect(result.allGroups).toEqual([])
  expect(result.items).toEqual([])
  expect(result.visibleItems).toEqual([])
  expect(result.inputValue).toBe('')
  expect(result.inputPlaceholder).toBeDefined()
  // Empty input returns lineHeight + inputPadding * 2
  expect(result.inputBoxHeight).toBe(state.inputLineHeight + state.inputPadding * 2)
})

test('loadContent - with saved state inputValue', async (): Promise<void> => {
  const commandMap = {
    'ExtensionHostSourceControl.getEnabledProviderIds': async (): Promise<readonly string[]> => [],
    'Extensions.activateByEvent': async (): Promise<void> => {},
    'Extensions.getAllExtensions': async (): Promise<readonly any[]> => [],
    'IconTheme.getIcons': async (): Promise<readonly string[]> => [],
    'MeasureTextHeight.measureTextBlockHeight': async (): Promise<number> => 45,
    'Preferences.get': async (): Promise<any> => false,
  }
  ExtensionHost.registerMockRpc(commandMap)
  ExtensionManagementWorker.registerMockRpc(commandMap)
  RendererWorker.registerMockRpc(commandMap)

  const state: SourceControlState = createDefaultState()
  const savedState = {
    inputValue: 'test commit message',
  }
  const result = await loadContent(state, savedState)

  expect(result.inputValue).toBe('test commit message')
  expect(result.inputBoxHeight).toBe(49) // 45 from RPC + inputPadding * 2 (2 * 2 = 4)
})

test('loadContent - with enabled providers', async (): Promise<void> => {
  const commandMap = {
    'ExtensionHostSourceControl.getEnabledProviderIds': async (): Promise<readonly string[]> => ['git'],
    'ExtensionHostSourceControl.getFeatures': async (): Promise<{ showGenerateCommitMessageButton: boolean }> => ({ showGenerateCommitMessageButton: false }),
    'ExtensionHostSourceControl.getGroups': async (): Promise<readonly any[]> => [],
    'Extensions.activateByEvent': async (): Promise<void> => {},
    'Extensions.getAllExtensions': async (): Promise<readonly any[]> => [
      {
        id: 'builtin.git',
        'source-control-icons': ['icon1', 'icon2'],
        uri: 'https://example.com/extensions/builtin.git',
      },
    ],
    'IconTheme.getIcons': async (): Promise<readonly string[]> => [],
    'MeasureTextHeight.measureTextBlockHeight': async (): Promise<number> => 30,
    'Preferences.get': async (): Promise<any> => false,
  }
  ExtensionHost.registerMockRpc(commandMap)
  ExtensionManagementWorker.registerMockRpc(commandMap)
  RendererWorker.registerMockRpc(commandMap)

  const state: SourceControlState = {
    ...createDefaultState(),
    workspacePath: '/test/workspace',
  }
  const result = await loadContent(state, {})

  expect(result.enabledProviderIds).toEqual(['git'])
  expect(result.iconDefinitions).toEqual(['https://example.com/extensions/builtin.git/icon1', 'https://example.com/extensions/builtin.git/icon2'])
  expect(result.decorationIcons).toEqual(['https://example.com/extensions/builtin.git/icon1', 'https://example.com/extensions/builtin.git/icon2'])
  expect(result.showGenerateCommitMessageButton).toBe(false)
})

test('loadContent - with groups', async (): Promise<void> => {
  const mockGroups = [
    {
      id: 'group1',
      items: [
        {
          file: '/test/file1.js',
          icon: 'icon1',
          iconTitle: 'Modified',
          strikeThrough: false,
        },
      ],
      label: 'Changes',
    },
  ]

  const commandMap = {
    'ExtensionHostSourceControl.getEnabledProviderIds': async (): Promise<readonly string[]> => ['git'],
    'ExtensionHostSourceControl.getGroups': async (): Promise<readonly any[]> => mockGroups,
    'ExtensionHostSourceControl.getIconDefinitions': async (): Promise<readonly string[]> => [],
    'Extensions.activateByEvent': async (): Promise<void> => {},
    'Extensions.getAllExtensions': async (): Promise<readonly any[]> => [],
    'IconTheme.getIcons': async (): Promise<readonly string[]> => [],
    'MeasureTextHeight.measureTextBlockHeight': async (): Promise<number> => 30,
    'Preferences.get': async (): Promise<any> => false,
  }
  ExtensionHost.registerMockRpc(commandMap)
  ExtensionManagementWorker.registerMockRpc(commandMap)
  RendererWorker.registerMockRpc(commandMap)

  const state: SourceControlState = {
    ...createDefaultState(),
    workspacePath: '/test/workspace',
  }
  const result = await loadContent(state, {})

  expect(result.allGroups).toEqual(mockGroups)
  expect(result.items).toBeDefined()
  expect(result.items.length).toBeGreaterThan(0)
})

test('loadContent - with source control actions', async (): Promise<void> => {
  const mockExtensions = [
    {
      'source-control-actions': {
        action1: 'value1',
        action2: 'value2',
      },
      'source-control-buttons': [
        {
          command: 'git.commitAndSync',
          icon: 'Check',
          id: 'git.commitAndSync',
          label: 'Commit & Sync',
        },
      ],
    },
  ]

  const commandMap = {
    'ExtensionHostSourceControl.getEnabledProviderIds': async (): Promise<readonly string[]> => ['git'],
    'ExtensionHostSourceControl.getGroups': async (): Promise<readonly any[]> => [],
    'ExtensionHostSourceControl.getIconDefinitions': async (): Promise<readonly string[]> => [],
    'Extensions.activateByEvent': async (): Promise<void> => {},
    'Extensions.getAllExtensions': async (): Promise<readonly any[]> => mockExtensions,
    'IconTheme.getIcons': async (): Promise<readonly string[]> => [],
    'MeasureTextHeight.measureTextBlockHeight': async (): Promise<number> => 30,
    'Preferences.get': async (): Promise<any> => false,
  }
  ExtensionHost.registerMockRpc(commandMap)
  ExtensionManagementWorker.registerMockRpc(commandMap)
  RendererWorker.registerMockRpc(commandMap)

  const state: SourceControlState = createDefaultState()
  const result = await loadContent(state, {})

  expect(result.actionsCache).toEqual({
    action1: 'value1',
    action2: 'value2',
  })
  expect(result.sourceControlButtons).toEqual([
    {
      command: 'git.commitAndSync',
      icon: 'Check',
      id: 'git.commitAndSync',
      label: 'Commit & Sync',
    },
  ])
  expect(result.headerHeight).toBe(result.inputBoxHeight + 11 + 34)
})

test('loadContent - calculates scroll bar and visible items correctly', async (): Promise<void> => {
  const mockGroups = [
    {
      id: 'group1',
      items: [
        {
          file: '/test/file1.js',
          icon: 'icon1',
          iconTitle: 'Modified',
          strikeThrough: false,
        },
        {
          file: '/test/file2.js',
          icon: 'icon2',
          iconTitle: 'Modified',
          strikeThrough: false,
        },
      ],
      label: 'Changes',
    },
  ]

  const commandMap = {
    'ExtensionHostSourceControl.getEnabledProviderIds': async (): Promise<readonly string[]> => ['git'],
    'ExtensionHostSourceControl.getGroups': async (): Promise<readonly any[]> => mockGroups,
    'ExtensionHostSourceControl.getIconDefinitions': async (): Promise<readonly string[]> => [],
    'Extensions.activateByEvent': async (): Promise<void> => {},
    'Extensions.getAllExtensions': async (): Promise<readonly any[]> => [],
    'IconTheme.getIcons': async (): Promise<readonly string[]> => ['icon1', 'icon2'],
    'MeasureTextHeight.measureTextBlockHeight': async (): Promise<number> => 30,
    'Preferences.get': async (): Promise<any> => false,
  }
  ExtensionHost.registerMockRpc(commandMap)
  ExtensionManagementWorker.registerMockRpc(commandMap)
  RendererWorker.registerMockRpc(commandMap)

  const state: SourceControlState = {
    ...createDefaultState(),
    height: 200,
    itemHeight: 20,
    minimumSliderSize: 30,
    workspacePath: '/test/workspace',
  }
  const result = await loadContent(state, {})

  expect(result.scrollBarHeight).toBeDefined()
  expect(result.maxLineY).toBeGreaterThanOrEqual(0)
  expect(result.visibleItems).toBeDefined()
  expect(result.finalDeltaY).toBeDefined()
})
