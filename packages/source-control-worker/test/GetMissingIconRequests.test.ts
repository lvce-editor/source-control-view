import { expect, test } from '@jest/globals'
import { DirentType } from '@lvce-editor/constants'
import type { DisplayItem } from '../src/parts/DisplayItem/DisplayItem.ts'
import { getMissingIconRequests } from '../src/parts/GetMissingIconRequests/GetMissingIconRequests.ts'

const createDisplayItem = (overrides: Partial<DisplayItem>): DisplayItem => ({
  badgeCount: 0,
  decorationIcon: '',
  decorationIconTitle: '',
  decorationStrikeThrough: false,
  detail: '',
  file: '',
  groupId: 'group',
  icon: '',
  label: '',
  posInSet: 1,
  setSize: 1,
  type: DirentType.File,
  ...overrides,
})

test('getMissingIconRequests - skips group headers', (): void => {
  const header = createDisplayItem({
    badgeCount: 1,
    label: 'Changes',
    type: DirentType.Directory,
  })
  const file = createDisplayItem({
    file: '/test/file.txt',
    label: 'file.txt',
  })
  const result = getMissingIconRequests([header, file], {})
  expect(result).toEqual([{ name: 'file.txt', path: '/test/file.txt', type: 1 }])
})

test('getMissingIconRequests - preserves file-backed directory requests', (): void => {
  const directory = createDisplayItem({
    file: '/test/src',
    label: 'src',
    type: DirentType.Directory,
  })
  const result = getMissingIconRequests([directory], {})
  expect(result).toEqual([{ name: 'src', path: '/test/src', type: 2 }])
})

test('getMissingIconRequests - uses full paths and deduplicates identical requests', (): void => {
  const first = createDisplayItem({
    file: '/one/file.txt',
    label: 'file.txt',
  })
  const second = createDisplayItem({
    file: '/two/file.txt',
    label: 'file.txt',
  })
  const duplicate = createDisplayItem({
    file: '/one/file.txt',
    label: 'file.txt',
  })
  const result = getMissingIconRequests([first, second, duplicate], {})
  expect(result).toEqual([
    { name: 'file.txt', path: '/one/file.txt', type: 1 },
    { name: 'file.txt', path: '/two/file.txt', type: 1 },
  ])
})

test('getMissingIconRequests - keeps expanded directory requests separate', (): void => {
  const directory = createDisplayItem({
    directory: '/test/src',
    label: 'src',
    type: DirentType.DirectoryExpanded,
  })
  const result = getMissingIconRequests([directory], {})
  expect(result).toEqual([{ expanded: true, name: 'src', path: '/test/src', type: 2 }])
})
