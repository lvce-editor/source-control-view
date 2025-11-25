import { expect, test } from '@jest/globals'
import { ExtensionHost } from '@lvce-editor/rpc-registry'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'

test('loadContent - basic with empty state', async (): Promise<void> => {
  const commandMap = {
    'ExtensionHostManagement.activateByEvent': (): Promise<void> => Promise.resolve(),
    'ExtensionHostSourceControl.getEnabledProviderIds': (): Promise<readonly string[]> => Promise.resolve([]),
    'Extensions.getExtensions': (): Promise<readonly any[]> => Promise.resolve([]),
    'MeasureTextHeight.measureTextBlockHeight': (): Promise<number> => Promise.resolve(30),
    'IconTheme.getIcons': (): Promise<readonly string[]> => Promise.resolve([]),
    'Preferences.get': (): Promise<any> => Promise.resolve(false),
  }
  ExtensionHost.registerMockRpc(commandMap)
  RendererWorker.registerMockRpc(commandMap)

  const state = createDefaultState()
  const result = await loadContent(state, {})

  expect(result).toBeDefined()
  expect(result.enabledProviderIds).toEqual([])
  expect(result.allGroups).toEqual([])
  expect(result.items).toEqual([])
  expect(result.visibleItems).toEqual([])
  expect(result.inputValue).toBe('')
  expect(result.inputPlaceholder).toBeDefined()
  expect(result.inputBoxHeight).toBe(30)
})

test('loadContent - with saved state inputValue', async (): Promise<void> => {
  const commandMap = {
    'ExtensionHostManagement.activateByEvent': (): Promise<void> => Promise.resolve(),
    'ExtensionHostSourceControl.getEnabledProviderIds': (): Promise<readonly string[]> => Promise.resolve([]),
    'Extensions.getExtensions': (): Promise<readonly any[]> => Promise.resolve([]),
    'MeasureTextHeight.measureTextBlockHeight': (): Promise<number> => Promise.resolve(45),
    'IconTheme.getIcons': (): Promise<readonly string[]> => Promise.resolve([]),
    'Preferences.get': (): Promise<any> => Promise.resolve(false),
  }
  ExtensionHost.registerMockRpc(commandMap)
  RendererWorker.registerMockRpc(commandMap)

  const state = createDefaultState()
  const savedState = {
    inputValue: 'test commit message',
  }
  const result = await loadContent(state, savedState)

  expect(result.inputValue).toBe('test commit message')
  expect(result.inputBoxHeight).toBe(45)
})

test('loadContent - with enabled providers', async (): Promise<void> => {
  const commandMap = {
    'ExtensionHostManagement.activateByEvent': (): Promise<void> => Promise.resolve(),
    'ExtensionHostSourceControl.getEnabledProviderIds': (): Promise<readonly string[]> => Promise.resolve(['git']),
    'ExtensionHostSourceControl.getIconDefinitions': (): Promise<readonly string[]> => Promise.resolve(['icon1', 'icon2']),
    'ExtensionHostSourceControl.getGroups': (): Promise<readonly any[]> => Promise.resolve([]),
    'Extensions.getExtensions': (): Promise<readonly any[]> => Promise.resolve([]),
    'MeasureTextHeight.measureTextBlockHeight': (): Promise<number> => Promise.resolve(30),
    'IconTheme.getIcons': (): Promise<readonly string[]> => Promise.resolve([]),
    'Preferences.get': (): Promise<any> => Promise.resolve(false),
  }
  ExtensionHost.registerMockRpc(commandMap)
  RendererWorker.registerMockRpc(commandMap)

  const state = {
    ...createDefaultState(),
    workspacePath: '/test/workspace',
  }
  const result = await loadContent(state, {})

  expect(result.enabledProviderIds).toEqual(['git'])
  expect(result.iconDefinitions).toEqual(['icon1', 'icon2'])
  expect(result.decorationIcons).toEqual(['icon1', 'icon2'])
})

test('loadContent - with groups', async (): Promise<void> => {
  const mockGroups = [
    {
      id: 'group1',
      label: 'Changes',
      items: [
        {
          file: '/test/file1.js',
          icon: 'icon1',
          iconTitle: 'Modified',
          strikeThrough: false,
        },
      ],
    },
  ]

  const commandMap = {
    'ExtensionHostManagement.activateByEvent': (): Promise<void> => Promise.resolve(),
    'ExtensionHostSourceControl.getEnabledProviderIds': (): Promise<readonly string[]> => Promise.resolve(['git']),
    'ExtensionHostSourceControl.getIconDefinitions': (): Promise<readonly string[]> => Promise.resolve([]),
    'ExtensionHostSourceControl.getGroups': (): Promise<readonly any[]> => Promise.resolve(mockGroups),
    'Extensions.getExtensions': (): Promise<readonly any[]> => Promise.resolve([]),
    'MeasureTextHeight.measureTextBlockHeight': (): Promise<number> => Promise.resolve(30),
    'IconTheme.getIcons': (): Promise<readonly string[]> => Promise.resolve([]),
    'Preferences.get': (): Promise<any> => Promise.resolve(false),
  }
  ExtensionHost.registerMockRpc(commandMap)
  RendererWorker.registerMockRpc(commandMap)

  const state = {
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
    },
  ]

  const commandMap = {
    'ExtensionHostManagement.activateByEvent': (): Promise<void> => Promise.resolve(),
    'ExtensionHostSourceControl.getEnabledProviderIds': (): Promise<readonly string[]> => Promise.resolve([]),
    'Extensions.getExtensions': (): Promise<readonly any[]> => Promise.resolve(mockExtensions),
    'MeasureTextHeight.measureTextBlockHeight': (): Promise<number> => Promise.resolve(30),
    'IconTheme.getIcons': (): Promise<readonly string[]> => Promise.resolve([]),
    'Preferences.get': (): Promise<any> => Promise.resolve(false),
  }
  ExtensionHost.registerMockRpc(commandMap)
  RendererWorker.registerMockRpc(commandMap)

  const state = createDefaultState()
  const result = await loadContent(state, {})

  expect(result.actionsCache).toEqual({
    action1: 'value1',
    action2: 'value2',
  })
})

test('loadContent - calculates scroll bar and visible items correctly', async (): Promise<void> => {
  const mockGroups = [
    {
      id: 'group1',
      label: 'Changes',
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
    },
  ]

  const commandMap = {
    'ExtensionHostManagement.activateByEvent': (): Promise<void> => Promise.resolve(),
    'ExtensionHostSourceControl.getEnabledProviderIds': (): Promise<readonly string[]> => Promise.resolve(['git']),
    'ExtensionHostSourceControl.getIconDefinitions': (): Promise<readonly string[]> => Promise.resolve([]),
    'ExtensionHostSourceControl.getGroups': (): Promise<readonly any[]> => Promise.resolve(mockGroups),
    'Extensions.getExtensions': (): Promise<readonly any[]> => Promise.resolve([]),
    'MeasureTextHeight.measureTextBlockHeight': (): Promise<number> => Promise.resolve(30),
    'IconTheme.getIcons': (): Promise<readonly string[]> => Promise.resolve(['icon1', 'icon2']),
    'Preferences.get': (): Promise<any> => Promise.resolve(false),
  }
  ExtensionHost.registerMockRpc(commandMap)
  RendererWorker.registerMockRpc(commandMap)

  const state = {
    ...createDefaultState(),
    workspacePath: '/test/workspace',
    height: 200,
    itemHeight: 20,
    minimumSliderSize: 30,
  }
  const result = await loadContent(state, {})

  expect(result.scrollBarHeight).toBeDefined()
  expect(result.maxLineY).toBeGreaterThanOrEqual(0)
  expect(result.visibleItems).toBeDefined()
  expect(result.finalDeltaY).toBeDefined()
})
