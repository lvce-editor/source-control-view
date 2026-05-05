import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as GetActions from '../src/parts/GetActions/GetActions.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test('getActions - omits generate commit message action when disabled', () => {
  const state = createDefaultState()

  const result = GetActions.getActions(state)

  expect(result.map((action) => action.name)).toEqual([InputName.ViewAsTree, InputName.CommitAndPush, InputName.Refresh])
})

test('getActions - includes generate commit message action when enabled', () => {
  const state = {
    ...createDefaultState(),
    showGenerateCommitMessageButton: true,
  }

  const result = GetActions.getActions(state)

  expect(result.map((action) => action.name)).toEqual([
    InputName.ViewAsTree,
    InputName.CommitAndPush,
    InputName.GenerateCommitMessage,
    InputName.Refresh,
  ])
})