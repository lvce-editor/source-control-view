import { test, expect } from '@jest/globals'
import { ViewMode } from '@lvce-editor/constants'
import { getDisplayItems } from '../src/parts/GetDisplayItems/GetDisplayItems.ts'
import { getDirectoryKey } from '../src/parts/GetDisplayItemsGroup/GetDisplayItemsGroup.ts'

test('getDisplayItems - collapsed', () => {
  const groups = [
    {
      id: '1',
      items: [
        {
          file: '/path/to/file1.ts',
          icon: 'icon1',
          iconTitle: 'title1',
          strikeThrough: false,
        },
      ],
      label: 'Group 1',
    },
  ]
  const expandedGroups = {}
  const actual = getDisplayItems(groups, expandedGroups, [])
  expect(actual).toHaveLength(1)
  expect(actual[0]).toEqual({
    badgeCount: 1,
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    detail: '',
    file: '',
    groupId: '1',
    icon: 'ChevronRight',
    label: 'Group 1',
    posInSet: 1,
    setSize: 1,
    type: 3,
  })
})

test('getDisplayItems - expanded', () => {
  const groups = [
    {
      id: '1',
      items: [
        {
          file: '/path/to/file1.ts',
          icon: 'icon1',
          iconTitle: 'title1',
          strikeThrough: false,
        },
      ],
      label: 'Group 1',
    },
  ]
  const expandedGroups = { '1': true }
  const actual = getDisplayItems(groups, expandedGroups, [])
  expect(actual).toHaveLength(2)
  expect(actual[0]).toEqual({
    badgeCount: 1,
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    detail: '',
    file: '',
    groupId: '1',
    icon: 'ChevronDown',
    label: 'Group 1',
    posInSet: 1,
    setSize: 1,
    type: 4,
  })
  expect(actual[1]).toEqual({
    badgeCount: 0,
    decorationIcon: 'icon1',
    decorationIconTitle: 'title1',
    decorationStrikeThrough: false,
    detail: '/path/to',
    file: '/path/to/file1.ts',
    groupId: '1',
    icon: '',
    label: 'file1.ts',
    posInSet: 1,
    setSize: 1,
    type: 7,
  })
})

test('getDisplayItems - multiple groups with different expansion states', () => {
  const groups = [
    {
      id: '1',
      items: [
        {
          file: '/path/to/file1.ts',
          icon: 'icon1',
          iconTitle: 'title1',
          strikeThrough: false,
        },
      ],
      label: 'Group 1',
    },
    {
      id: '2',
      items: [
        {
          file: '/path/to/file2.ts',
          icon: 'icon2',
          iconTitle: 'title2',
          strikeThrough: false,
        },
      ],
      label: 'Group 2',
    },
  ]
  const expandedGroups = { '1': true, '2': false }
  const actual = getDisplayItems(groups, expandedGroups, [])
  expect(actual).toHaveLength(3)
  expect(actual[0]).toEqual({
    badgeCount: 1,
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    detail: '',
    file: '',
    groupId: '1',
    icon: 'ChevronDown',
    label: 'Group 1',
    posInSet: 1,
    setSize: 1,
    type: 4,
  })
  expect(actual[1]).toEqual({
    badgeCount: 0,
    decorationIcon: 'icon1',
    decorationIconTitle: 'title1',
    decorationStrikeThrough: false,
    detail: '/path/to',
    file: '/path/to/file1.ts',
    groupId: '1',
    icon: '',
    label: 'file1.ts',
    posInSet: 1,
    setSize: 1,
    type: 7,
  })
  expect(actual[2]).toEqual({
    badgeCount: 1,
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    detail: '',
    file: '',
    groupId: '2',
    icon: 'ChevronRight',
    label: 'Group 2',
    posInSet: 1,
    setSize: 1,
    type: 3,
  })
})

test('getDisplayItems - tree mode builds independent nested folders for each group', async () => {
  const groups = [
    {
      id: 'changes',
      items: [
        { file: '/src/z.ts', icon: 'icon-z', iconTitle: 'Modified', strikeThrough: false },
        { file: '/root.ts', icon: 'icon-root', iconTitle: 'Added', strikeThrough: false },
        { file: '/src/nested/a.ts', icon: 'icon-a', iconTitle: 'Deleted', strikeThrough: true },
      ],
      label: 'Changes',
    },
    {
      id: 'staged',
      items: [{ file: '/src/z.ts', icon: 'icon-staged', iconTitle: 'Modified', strikeThrough: false }],
      label: 'Staged Changes',
    },
  ]

  const actual = await getDisplayItems(groups, { changes: true, staged: true }, [], ViewMode.Tree)

  expect(actual.map(({ depth, directory, file, label }) => ({ depth, directory, file, label }))).toEqual([
    { depth: undefined, directory: undefined, file: '', label: 'Changes' },
    { depth: 0, directory: undefined, file: '/root.ts', label: 'root.ts' },
    { depth: 0, directory: '/src', file: '', label: 'src' },
    { depth: 1, directory: '/src/nested', file: '', label: 'nested' },
    { depth: 2, directory: undefined, file: '/src/nested/a.ts', label: 'a.ts' },
    { depth: 1, directory: undefined, file: '/src/z.ts', label: 'z.ts' },
    { depth: undefined, directory: undefined, file: '', label: 'Staged Changes' },
    { depth: 0, directory: '/src', file: '', label: 'src' },
    { depth: 1, directory: undefined, file: '/src/z.ts', label: 'z.ts' },
  ])
  expect(actual[0].badgeCount).toBe(3)
  expect(actual.filter((item) => item.file).map((item) => item.file)).toEqual(['/root.ts', '/src/nested/a.ts', '/src/z.ts', '/src/z.ts'])
})

test('getDisplayItems - tree mode hides only descendants of a collapsed folder', async () => {
  const group = {
    id: 'changes',
    items: [
      { file: '/src/nested/a.ts', icon: '', iconTitle: '', strikeThrough: false },
      { file: '/src/other.ts', icon: '', iconTitle: '', strikeThrough: false },
    ],
    label: 'Changes',
  }

  const actual = await getDisplayItems([group], { changes: true, [getDirectoryKey('changes', '/src')]: false }, [], ViewMode.Tree)

  expect(actual.map(({ directory, file, label }) => ({ directory, file, label }))).toEqual([
    { directory: undefined, file: '', label: 'Changes' },
    { directory: '/src', file: '', label: 'src' },
  ])
})
