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
  expect(result).toEqual([{ name: 'file.txt', type: 1 }])
})

test('getMissingIconRequests - preserves file-backed directory requests', (): void => {
  const directory = createDisplayItem({
    file: '/test/src',
    label: 'src',
    type: DirentType.Directory,
  })
  const result = getMissingIconRequests([directory], {})
  expect(result).toEqual([{ name: 'src', type: 2 }])
})
