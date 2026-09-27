import { expect, test } from '@jest/globals'
import { DirentType } from '@lvce-editor/constants'
import { IconThemeWorker } from '@lvce-editor/rpc-registry'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as UpdateIcons from '../src/parts/UpdateIcons/UpdateIcons.ts'

const commandMap = {
  'IconTheme.getFileIcon': async (): Promise<string[]> => ['icon1', 'icon2'],
  'IconTheme.getFolderIcon': async (): Promise<string[]> => ['icon1', 'icon2'],
  'IconTheme.getIcons': async (): Promise<string[]> => ['icon1', 'icon2'],
}

test('updateIcons - should update icons for visible items', async (): Promise<void> => {
  using mockRpc = IconThemeWorker.registerMockRpc(commandMap)
  const defaultState = CreateDefaultState.createDefaultState()
  const state: SourceControlState = {
    ...defaultState,
    items: [
      // @ts-ignore
      { depth: 1, file: '/test/file1.ts', label: 'file1.ts', name: 'file1.ts', path: '/test/file1.ts', selected: false, type: 1 },
      // @ts-ignore
      { depth: 1, file: '/test/file2.ts', label: 'file2.ts', name: 'file2.ts', path: '/test/file2.ts', selected: false, type: 1 },
      // @ts-ignore
      { depth: 1, file: '/test/file3.ts', label: 'file3.ts', name: 'file3.ts', path: '/test/file3.ts', selected: false, type: 1 },
    ],
    maxLineY: 2,
    minLineY: 0,
  }

  const result = await UpdateIcons.updateIcons(state)

  expect(result.fileIconCache).toBeDefined()
  const { items, maxLineY, minLineY } = state
  expect(result.items).toEqual(items)
  expect(result.minLineY).toBe(minLineY)
  expect(result.maxLineY).toBe(maxLineY)
  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})

test('updateIcons - should handle empty visible items', async (): Promise<void> => {
  using mockRpc = IconThemeWorker.registerMockRpc(commandMap)
  const defaultState = CreateDefaultState.createDefaultState()
  const state: SourceControlState = {
    ...defaultState,
    items: [],
    maxLineY: 0,
    minLineY: 0,
  }

  const result = await UpdateIcons.updateIcons(state)

  expect(result.fileIconCache).toBeDefined()
  const { items } = state
  expect(result.items).toEqual(items)
  expect(mockRpc.invocations).toEqual([])
})

test('updateIcons - should not request icons for group headers', async (): Promise<void> => {
  using mockRpc = IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': async (): Promise<readonly string[]> => ['file-icon'],
  })
  const defaultState = CreateDefaultState.createDefaultState()
  const state: SourceControlState = {
    ...defaultState,
    items: [
      {
        badgeCount: 1,
        decorationIcon: '',
        decorationIconTitle: '',
        decorationStrikeThrough: false,
        detail: '',
        file: '',
        groupId: 'group',
        icon: 'ChevronDown',
        label: 'Changes',
        posInSet: 1,
        setSize: 1,
        type: DirentType.DirectoryExpanded,
      },
      {
        badgeCount: 0,
        decorationIcon: '',
        decorationIconTitle: '',
        decorationStrikeThrough: false,
        detail: '/test',
        file: '/test/file1.ts',
        groupId: 'group',
        icon: '',
        label: 'file1.ts',
        posInSet: 1,
        setSize: 1,
        type: DirentType.File,
      },
    ],
    maxLineY: 2,
    minLineY: 0,
  }

  const result = await UpdateIcons.updateIcons(state)

  expect(result.fileIconCache).toEqual({ '/test/file1.ts': 'file-icon' })
  expect(result.fileIconCache).not.toHaveProperty('Changes')
  expect(result.visibleItems[1].fileIcon).toBe('file-icon')
  expect(mockRpc.invocations).toEqual([['IconTheme.getIcons', [{ name: 'file1.ts', path: '/test/file1.ts', type: 1 }]]])
})
