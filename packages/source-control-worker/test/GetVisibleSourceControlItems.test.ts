import { expect, test } from '@jest/globals'
import * as DirentType from '../src/parts/DirentType/DirentType.ts'
import { getVisibleSourceControlItems } from '../src/parts/GetVisibleSourceControlItems/GetVisibleSourceControlItems.ts'

test('getVisibleSourceControlItems - empty items', () => {
  const items: any[] = []
  const minLineY = 0
  const maxLineY = 0
  const actionsCache = {}
  const fileIconCache = {}
  const result = getVisibleSourceControlItems(items, minLineY, maxLineY, actionsCache, fileIconCache)
  expect(result).toEqual([])
})

test('getVisibleSourceControlItems - single item', () => {
  const items = [
    {
      type: DirentType.File,
      file: 'test.txt',
      label: 'test.txt',
      detail: '',
      posInSet: 1,
      setSize: 1,
      icon: '',
      decorationIcon: '',
      decorationIconTitle: '',
      decorationStrikeThrough: false,
      badgeCount: 0,
      groupId: 'test',
    },
  ]
  const minLineY = 0
  const maxLineY = 1
  const actionsCache = {
    'test-item': [
      {
        command: 'test.command',
        id: 'test',
        label: 'Test',
        icon: 'test',
      },
    ],
  }
  const fileIconCache = {
    'test.txt': 'file-icon',
  }
  const result = getVisibleSourceControlItems(items, minLineY, maxLineY, actionsCache, fileIconCache)
  expect(result).toEqual([
    {
      ...items[0],
      buttons: actionsCache['test-item'],
      fileIcon: 'file-icon',
    },
  ])
})

test('getVisibleSourceControlItems - multiple items', () => {
  const items = [
    {
      type: DirentType.File,
      file: 'test1.txt',
      label: 'test1.txt',
      detail: '',
      posInSet: 1,
      setSize: 2,
      icon: '',
      decorationIcon: '',
      decorationIconTitle: '',
      decorationStrikeThrough: false,
      badgeCount: 0,
      groupId: 'test1',
    },
    {
      type: DirentType.File,
      file: 'test2.txt',
      label: 'test2.txt',
      detail: '',
      posInSet: 2,
      setSize: 2,
      icon: '',
      decorationIcon: '',
      decorationIconTitle: '',
      decorationStrikeThrough: false,
      badgeCount: 0,
      groupId: 'test2',
    },
  ]
  const minLineY = 0
  const maxLineY = 2
  const actionsCache = {
    'test1-item': [
      {
        command: 'test1.command',
        id: 'test1',
        label: 'Test1',
        icon: 'test1',
      },
    ],
    'test2-item': [
      {
        command: 'test2.command',
        id: 'test2',
        label: 'Test2',
        icon: 'test2',
      },
    ],
  }
  const fileIconCache = {
    'test1.txt': 'file-icon1',
    'test2.txt': 'file-icon2',
  }
  const result = getVisibleSourceControlItems(items, minLineY, maxLineY, actionsCache, fileIconCache)
  expect(result).toEqual([
    {
      ...items[0],
      buttons: actionsCache['test1-item'],
      fileIcon: 'file-icon1',
    },
    {
      ...items[1],
      buttons: actionsCache['test2-item'],
      fileIcon: 'file-icon2',
    },
  ])
})
