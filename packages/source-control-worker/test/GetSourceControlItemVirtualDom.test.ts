import { expect, test } from '@jest/globals'
import type { VisibleItem } from '../src/parts/VisibleItem/VisibleItem.ts'
import * as DirentType from '../src/parts/DirentType/DirentType.ts'
import { getSourceControlItemVirtualDom } from '../src/parts/GetSourceControlItemVirtualDom/GetSourceControlItemVirtualDom.ts'

test('getSourceControlItemVirtualDom - directory', () => {
  const item: VisibleItem = {
    file: 'test',
    label: 'test',
    detail: '',
    posInSet: 1,
    setSize: 1,
    icon: '',
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    type: DirentType.Directory,
    badgeCount: 0,
    groupId: '',
    fileIcon: '',
    buttons: [],
  }
  const result = getSourceControlItemVirtualDom(item)
  expect(result).toBeDefined()
})

test('getSourceControlItemVirtualDom - directory expanded', () => {
  const item: VisibleItem = {
    file: 'test',
    label: 'test',
    detail: '',
    posInSet: 1,
    setSize: 1,
    icon: '',
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    type: DirentType.DirectoryExpanded,
    badgeCount: 0,
    groupId: '',
    fileIcon: '',
    buttons: [],
  }
  const result = getSourceControlItemVirtualDom(item)
  expect(result).toBeDefined()
})

test('getSourceControlItemVirtualDom - other', () => {
  const item: VisibleItem = {
    file: 'test.js',
    label: 'test.js',
    detail: '',
    posInSet: 1,
    setSize: 1,
    icon: '',
    decorationIcon: '',
    decorationIconTitle: '',
    decorationStrikeThrough: false,
    type: DirentType.File,
    badgeCount: 0,
    groupId: '',
    fileIcon: '',
    buttons: [],
  }
  const result = getSourceControlItemVirtualDom(item)
  expect(result).toBeDefined()
})
