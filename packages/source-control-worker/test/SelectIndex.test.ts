import { expect, test } from '@jest/globals'
import { ExtensionHost, RendererWorker as ParentRpc } from '@lvce-editor/rpc-registry'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DirentType from '../src/parts/DirentType/DirentType.ts'
import { selectIndex } from '../src/parts/SelectIndex/SelectIndex.ts'

test('selectIndex - invalid index', async (): Promise<void> => {
  const state: SourceControlState = createDefaultState()
  const newState = await selectIndex(state, -1)
  expect(newState).toBe(state)
})

test('selectIndex - directory', async (): Promise<void> => {
  const commandMap = {
    'FileSystem.readDirWithFileTypes': async (): Promise<never[]> => [],
    'IconTheme.getIcons': async (): Promise<never[]> => [],
  }
  ParentRpc.registerMockRpc(commandMap)

  const testItem = {
    type: DirentType.Directory,
    file: 'test',
    label: 'test',
    detail: '',
    posInSet: 1,
    setSize: 1,
    icon: '',
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    badgeCount: 0,
    groupId: 'test',
  }

  const state: SourceControlState = {
    ...createDefaultState(),
    items: [testItem],
    allGroups: [
      {
        id: 'test',
        label: 'test',
        items: [testItem],
      },
    ],
    enabledProviderIds: ['test'],
  }
  const newState = await selectIndex(state, 0)
  expect(newState.expandedGroups['test']).toBe(true)
})

test('selectIndex - expanded directory', async (): Promise<void> => {
  const commandMap = {
    'FileSystem.readDirWithFileTypes': async (): Promise<never[]> => [],
    'IconTheme.getIcons': async (): Promise<never[]> => [],
  }
  ParentRpc.registerMockRpc(commandMap)

  const testItem = {
    type: DirentType.DirectoryExpanded,
    file: 'test',
    label: 'test',
    detail: '',
    posInSet: 1,
    setSize: 1,
    icon: '',
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    badgeCount: 0,
    groupId: 'test',
  }

  const state: SourceControlState = {
    ...createDefaultState(),
    items: [testItem],
    allGroups: [
      {
        id: 'test',
        label: 'test',
        items: [testItem],
      },
    ],
    enabledProviderIds: ['test'],
    expandedGroups: { test: true },
  }
  const newState = await selectIndex(state, 0)
  expect(newState.expandedGroups['test']).toBe(false)
})

test('selectIndex - file', async (): Promise<void> => {
  const parentCommandMap = {
    'ExtensionHostManagement.activateByEvent': async (): Promise<void> => {},
    'FileSystem.readFile': async (): Promise<string> => '',
    'IconTheme.getIcons': async (): Promise<never[]> => [],
    'Main.openUri': async (): Promise<void> => {},
  }
  ParentRpc.registerMockRpc(parentCommandMap)

  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getFileBefore': async (): Promise<string> => '',
  }
  ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const testItem = {
    type: DirentType.File,
    file: 'test.txt',
    label: 'test.txt',
    detail: '',
    posInSet: 1,
    setSize: 1,
    icon: '',
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    badgeCount: 0,
    groupId: 'test',
  }

  const state: SourceControlState = {
    ...createDefaultState(),
    items: [testItem],
    allGroups: [
      {
        id: 'test',
        label: 'test',
        items: [testItem],
      },
    ],
    enabledProviderIds: ['test'],
    root: '/test',
  }
  const newState = await selectIndex(state, 0)
  expect(newState.items[0].type).toBe(DirentType.File)
})
