import { expect, test } from '@jest/globals'
import { DirentType, MenuEntryId, PlatformType } from '@lvce-editor/constants'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getMenuEntries2 } from '../src/parts/GetMenuEntries2/GetMenuEntries2.ts'

const item = {
  badgeCount: 0,
  decorationIcon: '',
  decorationIconTitle: '',
  decorationStrikeThrough: false,
  detail: '',
  file: 'test.css',
  groupId: 'index',
  icon: '',
  label: 'test.css',
  posInSet: 1,
  setSize: 1,
  type: DirentType.File,
}
const props = { index: 0, menuId: MenuEntryId.SourceControl, uri: '/test/test.css' }

test('menu uses contributions for the clicked group and relative file arguments', () => {
  const state = {
    ...createDefaultState(),
    platform: PlatformType.Web,
    items: [item],
    actionsCache: {
      'index-item': [{ command: 'git.unstage', label: 'Unstage Changes', icon: '' }],
      'working-tree-item': [{ command: 'git.stage', label: 'Stage Changes', icon: '' }],
    },
  }
  const entries = getMenuEntries2(state, props)
  expect(entries.map((entry) => entry.id)).toEqual(['openChanges', 'openFile', 'openFileHead', 'revealInExplorerView', 'git.unstage'])
  expect(entries.at(-1)).toEqual({
    args: ['test.css', 'index', 'git.unstage'],
    command: 'Source Control.executeMenuAction',
    flags: 0,
    id: 'git.unstage',
    label: 'Unstage Changes',
  })
})

test('empty space has no file actions', () => {
  expect(getMenuEntries2(createDefaultState(), props)).toEqual([])
})

test('group menu only includes group contributions', () => {
  const state = {
    ...createDefaultState(),
    items: [{ ...item, type: DirentType.DirectoryExpanded, file: '' }],
    actionsCache: { index: [{ command: 'git.unstageAll', label: 'Unstage All', icon: '' }] },
  }
  expect(getMenuEntries2(state, props).map((entry) => entry.id)).toEqual(['git.unstageAll'])
})

test('native platform includes containing folder command', () => {
  const state = { ...createDefaultState(), platform: PlatformType.Electron, items: [item] }
  expect(getMenuEntries2(state, props).find((entry) => entry.id === 'openContainingFolder')?.command).toBe('Source Control.openContainingFolder')
})
