import { test, expect } from '@jest/globals'
import { getDisplayItems } from '../src/parts/GetDisplayItems/GetDisplayItems.ts'

test('getDisplayItems - collapsed', () => {
  const groups = [
    {
      id: '1',
      label: 'Group 1',
      items: [
        {
          file: '/path/to/file1.ts',
          icon: 'icon1',
          iconTitle: 'title1',
          strikeThrough: false,
        },
      ],
    },
  ]
  const actual = getDisplayItems(groups, false)
  expect(actual).toHaveLength(1)
  expect(actual[0]).toEqual({
    file: '',
    label: 'Group 1',
    detail: '',
    posInSet: 1,
    setSize: 1,
    icon: 'ChevronRight',
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    type: 3,
    badgeCount: 1,
    groupId: '1',
  })
})

test('getDisplayItems - expanded', () => {
  const groups = [
    {
      id: '1',
      label: 'Group 1',
      items: [
        {
          file: '/path/to/file1.ts',
          icon: 'icon1',
          iconTitle: 'title1',
          strikeThrough: false,
        },
      ],
    },
  ]
  const actual = getDisplayItems(groups, true)
  expect(actual).toHaveLength(2)
  expect(actual[0]).toEqual({
    file: '',
    label: 'Group 1',
    detail: '',
    posInSet: 1,
    setSize: 1,
    icon: 'ChevronDown',
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    type: 4,
    badgeCount: 1,
    groupId: '1',
  })
  expect(actual[1]).toEqual({
    file: '/path/to/file1.ts',
    label: 'file1.ts',
    detail: '/path/to',
    posInSet: 1,
    setSize: 1,
    icon: '',
    decorationIcon: 'icon1',
    decorationIconTitle: 'title1',
    decorationStrikeThrough: false,
    type: 7,
    badgeCount: 0,
    groupId: '1',
  })
})

test('getDisplayItems - multiple groups', () => {
  const groups = [
    {
      id: '1',
      label: 'Group 1',
      items: [
        {
          file: '/path/to/file1.ts',
          icon: 'icon1',
          iconTitle: 'title1',
          strikeThrough: false,
        },
      ],
    },
    {
      id: '2',
      label: 'Group 2',
      items: [
        {
          file: '/path/to/file2.ts',
          icon: 'icon2',
          iconTitle: 'title2',
          strikeThrough: false,
        },
      ],
    },
  ]
  const actual = getDisplayItems(groups, true)
  expect(actual).toHaveLength(4)
})
