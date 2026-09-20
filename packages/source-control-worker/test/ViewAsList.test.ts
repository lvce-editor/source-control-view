import { test, expect } from '@jest/globals'
import { ViewMode } from '@lvce-editor/constants'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewAsList from '../src/parts/ViewAsList/ViewAsList.ts'

test('viewAsList - sets viewMode to List', async () => {
  const state: SourceControlState = createDefaultState()

  const result = await ViewAsList.viewAsList(state)

  expect(result.viewMode).toBe(1)
})

test('viewAsList - preserves other state properties', async () => {
  const state: SourceControlState = {
    ...createDefaultState(),
    height: 200,
    id: 123,
    width: 300,
  }

  const result = await ViewAsList.viewAsList(state)

  expect(result.viewMode).toBe(1)
  expect(result.id).toBe(123)
  expect(result.width).toBe(300)
  expect(result.height).toBe(200)
})

test('viewAsList - changes viewMode from Tree to List', async () => {
  const state: SourceControlState = {
    ...createDefaultState(),
    viewMode: 2,
  }

  const result = await ViewAsList.viewAsList(state)

  expect(result.viewMode).toBe(1)
})

test('viewAsList - changes viewMode from List to List', async () => {
  const state: SourceControlState = {
    ...createDefaultState(),
    viewMode: 1,
  }

  const result = await ViewAsList.viewAsList(state)

  expect(result.viewMode).toBe(1)
})

test('viewAsList - rebuilds flat display items after tree view', async () => {
  const state: SourceControlState = {
    ...createDefaultState(),
    allGroups: [
      {
        id: 'changes',
        items: [{ file: '/src/file.ts', icon: '', iconTitle: '', strikeThrough: false }],
        label: 'Changes',
      },
    ],
    expandedGroups: { changes: true },
    viewMode: ViewMode.Tree,
  }

  const result = await ViewAsList.viewAsList(state)

  expect(result.items.map(({ directory, label }) => ({ directory, label }))).toEqual([
    { directory: undefined, label: 'Changes' },
    { directory: undefined, label: 'file.ts' },
  ])
})
