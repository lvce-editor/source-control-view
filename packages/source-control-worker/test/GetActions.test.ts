import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as GetActions from '../src/parts/GetActions/GetActions.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test('getActions - omits generate commit message action when disabled', () => {
  const state = {
    ...createDefaultState(),
    enabledProviderIds: ['git'],
  }

  const result = GetActions.getActions(state)

  expect(result.map((action) => action.name)).toEqual([InputName.ViewAsTree, InputName.CommitAndPush, InputName.Refresh])
})

test('getActions - includes generate commit message action when enabled', () => {
  const state = {
    ...createDefaultState(),
    enabledProviderIds: ['git'],
    showGenerateCommitMessageButton: true,
  }

  const result = GetActions.getActions(state)

  expect(result.map((action) => action.name)).toEqual([InputName.ViewAsTree, InputName.CommitAndPush, InputName.GenerateCommitMessage, InputName.Refresh])
})

test('getActions - only shows refresh when no provider is available', () => {
  const state = createDefaultState()

  const result = GetActions.getActions(state)

  expect(result.map((action) => action.name)).toEqual([InputName.Refresh])
})
