import { expect, test } from '@jest/globals'
import { PlatformType, ViewMode } from '@lvce-editor/constants'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as GetActions from '../src/parts/GetActions/GetActions.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test('getActions - omits generate commit message action when disabled', () => {
  const state = createDefaultState()

  const result = GetActions.getActions(state)

  expect(result.map((action) => action.name)).toEqual([InputName.ViewAsTree, InputName.CommitAndPush, InputName.Refresh])
})

test('getActions - does not hardcode an extension input action', () => {
  const state: SourceControlState = {
    ...createDefaultState(),
    showGenerateCommitMessageButton: true,
  }

  const result = GetActions.getActions(state)

  expect(result.map((action) => action.name)).toEqual([InputName.ViewAsTree, InputName.CommitAndPush, InputName.Refresh])
})

test('getActions - only shows refresh in web when no provider is available', () => {
  const state = {
    ...createDefaultState(),
    platform: PlatformType.Web,
  }

  const result = GetActions.getActions(state)

  expect(result.map((action) => action.name)).toEqual([InputName.Refresh])
})

test('getActions - offers list view when currently in tree view', () => {
  const state: SourceControlState = {
    ...createDefaultState(),
    viewMode: ViewMode.Tree,
  }

  const result = GetActions.getActions(state)

  expect(result.map((action) => action.name)).toEqual([InputName.ViewAsList, InputName.CommitAndPush, InputName.Refresh])
})
