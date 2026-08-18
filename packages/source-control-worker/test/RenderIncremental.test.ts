import { expect, test } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RenderIncremental from '../src/parts/RenderIncremental/RenderIncremental.ts'

test('loading state changed', () => {
  const oldState = {
    ...createDefaultState(),
    loading: true,
  }
  const newState = {
    ...oldState,
    loading: false,
  }

  const result = RenderIncremental.renderIncremental(oldState, newState)

  expect(result).toEqual([ViewletCommand.SetDom2, newState.id, expect.any(Array)])
})

test('workspace path changed', () => {
  const oldState = {
    ...createDefaultState(),
    workspacePath: '/old',
  }
  const newState = {
    ...oldState,
    workspacePath: '/new',
  }

  const result = RenderIncremental.renderIncremental(oldState, newState)

  expect(result).toEqual([ViewletCommand.SetDom2, newState.id, expect.any(Array)])
})

test('stable loading state and workspace path', () => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    providerUnavailableMessage: 'No source control providers',
  }

  const result = RenderIncremental.renderIncremental(oldState, newState)

  expect(result).toEqual([ViewletCommand.SetPatches, newState.id, expect.any(Array)])
})
