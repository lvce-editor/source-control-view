import { test, expect } from '@jest/globals'
import { PlatformType, ViewletCommand } from '@lvce-editor/constants'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RenderItems from '../src/parts/RenderItems/RenderItems.ts'

test('renderItems - returns correct command structure', () => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    id: 1,
    inputPlaceholder: 'test placeholder',
    splitButtonEnabled: true,
    visibleItems: [],
  }

  const result = RenderItems.renderItems(oldState, newState)

  expect(result).toEqual([ViewletCommand.SetDom2, 1, expect.any(Object)])
})

test('renderItems - handles different state values', () => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    id: 2,
    inputPlaceholder: 'different placeholder',
    splitButtonEnabled: false,
    visibleItems: [
      {
        badgeCount: 0,
        buttons: [],
        decorationIcon: '',
        decorationIconTitle: '',
        decorationStrikeThrough: false,
        detail: 'test detail',
        file: 'test.txt',
        fileIcon: 'file-icon',
        groupId: 'test-group',
        icon: 'file-icon',
        indent: 0,
        label: 'Test Item',
        posInSet: 1,
        setSize: 1,
        type: 1,
      },
    ],
  }

  const result = RenderItems.renderItems(oldState, newState)

  expect(result).toEqual([ViewletCommand.SetDom2, 2, expect.any(Object)])
})

test('renderItems - handles empty placeholder', () => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    id: 3,
    inputPlaceholder: '',
    splitButtonEnabled: true,
    visibleItems: [
      {
        badgeCount: 0,
        buttons: [],
        decorationIcon: '',
        decorationIconTitle: '',
        decorationStrikeThrough: false,
        detail: 'test detail 1',
        file: 'test1.txt',
        fileIcon: 'file-icon',
        groupId: 'test-group',
        icon: 'file-icon',
        indent: 0,
        label: 'Test Item 1',
        posInSet: 1,
        setSize: 2,
        type: 1,
      },
      {
        badgeCount: 0,
        buttons: [],
        decorationIcon: '',
        decorationIconTitle: '',
        decorationStrikeThrough: false,
        detail: 'test detail 2',
        file: 'test2.txt',
        fileIcon: 'file-icon',
        groupId: 'test-group',
        icon: 'file-icon',
        indent: 0,
        label: 'Test Item 2',
        posInSet: 2,
        setSize: 2,
        type: 1,
      },
    ],
  }

  const result = RenderItems.renderItems(oldState, newState)

  expect(result).toEqual([ViewletCommand.SetDom2, 3, expect.any(Object)])
})

test('renderItems - shows unavailable message instead of commit controls in web without providers', () => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    platform: PlatformType.Web,
    sourceControlButtons: [
      {
        command: 'git.commitAndSync',
        icon: 'Check',
        id: 'git.commitAndSync',
        label: 'Commit & Sync',
      },
    ],
  }

  const result = RenderItems.renderItems(oldState, newState)

  expect(result).toEqual([
    ViewletCommand.SetDom2,
    1,
    [
      expect.objectContaining({ childCount: 1 }),
      expect.objectContaining({ childCount: 1 }),
      expect.objectContaining({
        text: 'No source control providers are available for web.',
        type: VirtualDomElements.Text,
      }),
    ],
  ])
})

test('renderItems - disables source control buttons without changes', () => {
  const oldState: SourceControlState = createDefaultState()
  const newState: SourceControlState = {
    ...createDefaultState(),
    sourceControlButtons: [
      {
        command: 'git.commitAndSync',
        icon: 'Check',
        id: 'git.commitAndSync',
        label: 'Commit & Sync',
      },
    ],
  }

  const result = RenderItems.renderItems(oldState, newState)

  expect(result[2][3].className).toBe(`${ClassNames.SplitButton} ${ClassNames.SplitButtonDisabled}`)
  expect(result[2][4].ariaDisabled).toBe(true)
  expect(result[2][4].className).toBe(`${ClassNames.SplitButtonContent} ${ClassNames.SplitButtonContentDisabled}`)
})
