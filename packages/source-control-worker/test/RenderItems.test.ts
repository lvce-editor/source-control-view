import { test, expect } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RenderItems from '../src/parts/RenderItems/RenderItems.ts'

test('renderItems - returns correct command structure', () => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    id: 1,
    visibleItems: [],
    splitButtonEnabled: true,
    inputPlaceholder: 'test placeholder',
  }

  const result = RenderItems.renderItems(oldState, newState)

  expect(result).toEqual([ViewletCommand.SetDom2, 1, expect.any(Object)])
})

test('renderItems - handles different state values', () => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    id: 2,
    visibleItems: [
      {
        file: 'test.txt',
        label: 'Test Item',
        detail: 'test detail',
        posInSet: 1,
        setSize: 1,
        icon: 'file-icon',
        decorationIcon: '',
        decorationIconTitle: '',
        decorationStrikeThrough: false,
        type: 1,
        badgeCount: 0,
        groupId: 'test-group',
        buttons: [],
        fileIcon: 'file-icon',
        indent: 0,
      },
    ],
    splitButtonEnabled: false,
    inputPlaceholder: 'different placeholder',
  }

  const result = RenderItems.renderItems(oldState, newState)

  expect(result).toEqual([ViewletCommand.SetDom2, 2, expect.any(Object)])
})

test('renderItems - handles empty placeholder', () => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    id: 3,
    visibleItems: [
      {
        file: 'test1.txt',
        label: 'Test Item 1',
        detail: 'test detail 1',
        posInSet: 1,
        setSize: 2,
        icon: 'file-icon',
        decorationIcon: '',
        decorationIconTitle: '',
        decorationStrikeThrough: false,
        type: 1,
        badgeCount: 0,
        groupId: 'test-group',
        buttons: [],
        fileIcon: 'file-icon',
        indent: 0,
      },
      {
        file: 'test2.txt',
        label: 'Test Item 2',
        detail: 'test detail 2',
        posInSet: 2,
        setSize: 2,
        icon: 'file-icon',
        decorationIcon: '',
        decorationIconTitle: '',
        decorationStrikeThrough: false,
        type: 1,
        badgeCount: 0,
        groupId: 'test-group',
        buttons: [],
        fileIcon: 'file-icon',
        indent: 0,
      },
    ],
    splitButtonEnabled: true,
    inputPlaceholder: '',
  }

  const result = RenderItems.renderItems(oldState, newState)

  expect(result).toEqual([ViewletCommand.SetDom2, 3, expect.any(Object)])
})
