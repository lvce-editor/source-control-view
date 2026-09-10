import { expect, test } from '@jest/globals'
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
      { depth: 1, name: 'file1.ts', path: '/test/file1.ts', selected: false, type: 1 },
      // @ts-ignore
      { depth: 1, name: 'file2.ts', path: '/test/file2.ts', selected: false, type: 1 },
      // @ts-ignore
      { depth: 1, name: 'file3.ts', path: '/test/file3.ts', selected: false, type: 1 },
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
  expect(mockRpc.invocations).toEqual([['IconTheme.getIcons', []]])
})
