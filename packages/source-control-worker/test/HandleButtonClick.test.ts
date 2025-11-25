import { expect, test } from '@jest/globals'
import { ExtensionHost } from '@lvce-editor/rpc-registry'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleButtonClick } from '../src/parts/HandleButtonClick/HandleButtonClick.ts'

test('handleButtonClick - valid button click', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHostCommand.executeCommand': (): Promise<void> => Promise.resolve(),
    'ExtensionHostSourceControl.getEnabledProviderIds': (): Promise<never[]> => Promise.resolve([]),
    'ExtensionHostSourceControl.getIconDefinitions': (): Promise<never[]> => Promise.resolve([]),
    'ExtensionHostSourceControl.getGroups': (): Promise<{ allGroups: never[]; gitRoot: string }> =>
      Promise.resolve({
        allGroups: [],
        gitRoot: '',
      }),
    'Extensions.getExtensions': (): Promise<never[]> => Promise.resolve([]),
  }
  const extensionHostMockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const rendererCommandMap = {
    'ExtensionHostManagement.activateByEvent': (): Promise<void> => Promise.resolve(),
    'IconTheme.getIcons': (): Promise<never[]> => Promise.resolve([]),
    'MeasureTextHeight.measureTextBlockHeight': (): Promise<number> => Promise.resolve(30),
  }
  const rendererMockRpc = RendererWorker.registerMockRpc(rendererCommandMap)

  const state = {
    ...createDefaultState(),
    visibleItems: [
      {
        file: 'test.js',
        label: 'test.js',
        detail: '',
        posInSet: 1,
        setSize: 1,
        icon: '',
        decorationIcon: '',
        decorationIconTitle: '',
        decorationStrikeThrough: false,
        type: 0,
        badgeCount: 0,
        groupId: '',
        fileIcon: '',
        buttons: [
          {
            label: 'Stage',
            command: 'git.stage',
            icon: '',
          },
        ],
      },
    ],
  }

  const newState = await handleButtonClick(state, 0)
  expect(newState).toBeDefined()
  expect(extensionHostMockRpc.invocations.length).toBeGreaterThan(0)
  expect(rendererMockRpc.invocations.length).toBeGreaterThan(0)
})

test('handleButtonClick - invalid index', async (): Promise<void> => {
  const state = {
    ...createDefaultState(),
    visibleItems: [],
  }
  await expect(handleButtonClick(state, 0)).rejects.toThrow()
})

test('handleButtonClick - invalid button index', async (): Promise<void> => {
  const state = {
    ...createDefaultState(),
    visibleItems: [
      {
        file: 'test.js',
        label: 'test.js',
        detail: '',
        posInSet: 1,
        setSize: 1,
        icon: '',
        decorationIcon: '',
        decorationIconTitle: '',
        decorationStrikeThrough: false,
        type: 0,
        badgeCount: 0,
        groupId: '',
        fileIcon: '',
        buttons: [],
      },
    ],
  }

  const newState = await handleButtonClick(state, 0)
  expect(newState).toBe(state)
})
