import { test, expect } from '@jest/globals'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ViewAsTree from '../src/parts/ViewAsTree/ViewAsTree.ts'

test('viewAsTree - sets viewMode to Tree', async () => {
  const state: SourceControlState = createDefaultState()

  const result = await ViewAsTree.viewAsTree(state)

  expect(result.viewMode).toBe(2)
})

test('viewAsTree - preserves other state properties', async () => {
  const state: SourceControlState = {
    ...createDefaultState(),
    height: 200,
    id: 123,
    width: 300,
  }

  const result = await ViewAsTree.viewAsTree(state)

  expect(result.viewMode).toBe(2)
  expect(result.id).toBe(123)
  expect(result.width).toBe(300)
  expect(result.height).toBe(200)
})

test('viewAsTree - changes viewMode from List to Tree', async () => {
  const state: SourceControlState = {
    ...createDefaultState(),
    viewMode: 1,
  }

  const result = await ViewAsTree.viewAsTree(state)

  expect(result.viewMode).toBe(2)
})

test('viewAsTree - changes viewMode from Tree to Tree', async () => {
  const state: SourceControlState = {
    ...createDefaultState(),
    viewMode: 2,
  }

  const result = await ViewAsTree.viewAsTree(state)

  expect(result.viewMode).toBe(2)
})

test('viewAsTree - rebuilds display items', async () => {
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
  }

  const result = await ViewAsTree.viewAsTree(state)

  expect(result.items.map(({ directory, label }) => ({ directory, label }))).toEqual([
    { directory: undefined, label: 'Changes' },
    { directory: '/src', label: 'src' },
    { directory: undefined, label: 'file.ts' },
  ])
})
