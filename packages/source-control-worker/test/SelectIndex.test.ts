import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DirentType from '../src/parts/DirentType/DirentType.ts'
import * as ExtensionHost from '../src/parts/ExtensionHost/ExtensionHost.ts'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'
import { selectIndex } from '../src/parts/SelectIndex/SelectIndex.ts'

test('selectIndex - invalid index', async () => {
  const state = createDefaultState()
  const newState = await selectIndex(state, -1)
  expect(newState).toBe(state)
})

test('selectIndex - directory', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'FileSystem.readDirWithFileTypes') {
        return Promise.resolve([])
      }
      if (method === 'IconTheme.getIcons') {
        return Promise.resolve([])
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ParentRpc.set(mockRpc)

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

test('selectIndex - expanded directory', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'FileSystem.readDirWithFileTypes') {
        return Promise.resolve([])
      }
      if (method === 'IconTheme.getIcons') {
        return Promise.resolve([])
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ParentRpc.set(mockRpc)

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

test('selectIndex - file', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostManagement.activateByEvent') {
        return Promise.resolve()
      }
      if (method === 'FileSystem.readFile') {
        return Promise.resolve('')
      }
      if (method === 'IconTheme.getIcons') {
        return Promise.resolve([])
      }
      if (method === 'Main.openUri') {
        return Promise.resolve()
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ParentRpc.set(mockRpc)

  const mockExtensionHost = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ExtensionHostSourceControl.getFileBefore') {
        return Promise.resolve('')
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  ExtensionHost.set(mockExtensionHost)

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
