import { expect, test } from '@jest/globals'
import { IconThemeWorker, ExtensionHost, ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import { RendererWorker, TextMeasurementWorker } from '@lvce-editor/rpc-registry'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleButtonClick } from '../src/parts/HandleButtonClick/HandleButtonClick.ts'

test('handleButtonClick - valid button click', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getEnabledProviderIds': async (): Promise<never[]> => [],
    'ExtensionHostSourceControl.getGroups': async (): Promise<{ allGroups: never[]; gitRoot: string }> => ({
      allGroups: [],
      gitRoot: '',
    }),
    'ExtensionHostSourceControl.getIconDefinitions': async (): Promise<never[]> => [],
    'Extensions.executeCommand': async (): Promise<void> => {},
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const rendererCommandMap = {
    'Extensions.activateByEvent': async (): Promise<void> => {},
    'IconTheme.getIcons': async (): Promise<never[]> => [],
    'Preferences.get': async (): Promise<any> => false,
    'TextMeasurement.measureTextBlockHeight': async (): Promise<number> => 30,
  }
  ExtensionManagementWorker.registerMockRpc(rendererCommandMap)
  IconThemeWorker.registerMockRpc(rendererCommandMap)
  const rendererMockRpc = RendererWorker.registerMockRpc(rendererCommandMap)
  TextMeasurementWorker.registerMockRpc(rendererCommandMap)

  const state: SourceControlState = {
    ...createDefaultState(),
    visibleItems: [
      {
        badgeCount: 0,
        buttons: [
          {
            command: 'git.stage',
            icon: '',
            label: 'Stage',
          },
        ],
        decorationIcon: '',
        decorationIconTitle: '',
        decorationStrikeThrough: false,
        detail: '',
        file: 'test.js',
        fileIcon: '',
        groupId: '',
        icon: '',
        indent: 16,
        label: 'test.js',
        posInSet: 1,
        setSize: 1,
        type: 0,
      },
    ],
  }

  const newState = await handleButtonClick(state, 0)
  expect(newState).toBeDefined()
  expect(extensionHostMockRpc.invocations.length).toBeGreaterThan(0)
  expect(rendererMockRpc.invocations.length).toBeGreaterThan(0)
})

test('handleButtonClick - invalid index', async (): Promise<void> => {
  const state: SourceControlState = {
    ...createDefaultState(),
    visibleItems: [],
  }
  await expect(handleButtonClick(state, 0)).rejects.toThrow()
})

test('handleButtonClick - invalid button index', async (): Promise<void> => {
  const state: SourceControlState = {
    ...createDefaultState(),
    visibleItems: [
      {
        badgeCount: 0,
        buttons: [],
        decorationIcon: '',
        decorationIconTitle: '',
        decorationStrikeThrough: false,
        detail: '',
        file: 'test.js',
        fileIcon: '',
        groupId: '',
        icon: '',
        indent: 16,
        label: 'test.js',
        posInSet: 1,
        setSize: 1,
        type: 0,
      },
    ],
  }

  const newState = await handleButtonClick(state, 0)
  expect(newState).toBe(state)
})
